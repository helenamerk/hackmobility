var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var pg = require('pg');

var smartcar = require('smartcar');

app.use(bodyParser.json()); // to support JSON-encoded bodies

/******************************************************
 * Hack Mobility Start
 */
var HackMobilityConfig = {
	user: "hackmobility",
	password: "hackmobility",
	host: "127.0.0.1",
	port: 5432,
	database: "hackmobility",
	ssl: false,
	max: 10, //max number of clients
	idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
var hackMobilityPool = new pg.Pool(HackMobilityConfig);

app.get("/hackmobility/getGroupNames", function(req, res) {
	hackMobilityPool.query('SELECT collection_name FROM collection;', [], function (err, queryRes) {
		if(err) {
			console.log(err);
			res.status(500).end();
		} else {
			res.status(200).send({
				"GroupNames": queryRes.rows.map(row => row.collection_name)
			});
		}
	});
});

// deprecated
// app.post("/hackmobility/addGroup", function(req, res) {
// 	if (!req.body.group_name || !req.body.group_pass || !req.body.car_id) {
// 		return res.status(400).end();
// 	}

// 	hackMobilityPool.query('INSERT INTO collection(collection_name, collection_pass, car_id) VALUES ($1, $2, $3);', [req.body.group_name, req.body.group_pass, req.body.car_id], function (err, queryRes) {
// 		if(err) {
// 			console.log(err);
// 			res.status(500).end();
// 			return;
// 		}

// 		res.status(200).end();
// 	});
// });

app.get("/hackmobility/getUsersInGroup", function(req, res) {
	if (!req.query.group_name) {
		return res.status(400).end();
	}

	hackMobilityPool.query('SELECT people_name FROM people p join collection c ON p.collection_id = c.collection_id WHERE c.collection_name = $1;', [req.query.group_name], function (err, queryRes) {
		if(err) {
			console.log(err);
			res.status(500).end();
		} else {
			res.status(200).send({
				"Users": queryRes.rows.map(row => row.people_name)
			});
		}
	});
});

app.get("/hackmobility/getUserPoints", function(req, res) {
	if (!req.query.user_name) {
		return res.status(400).end();
	}
	hackMobilityPool.query('SELECT points FROM people WHERE people_name = $1;', [req.query.user_name], function (err, queryRes) {
		if(err) {
			console.log(err);
			res.status(500).end();
		} else {
			res.status(200).send({
				"Points": queryRes.rows.map(row => row.points)
			});
		}
	});
});

app.post("/hackmobility/useUserPoints", function(req, res) {
	if (!req.body.user_name) {
		return res.status(400).end();
	}
	hackMobilityPool.query('UPDATE people SET points = (CASE WHEN 0 > points - 30 THEN 0 ELSE points - 30 END) WHERE people_name = $1 RETURNING points;', [req.body.user_name], function (err, queryRes) {
		if(err) {
			console.log(err);
			res.status(500).end();
		} else {
			res.status(200).send({
				"Points": queryRes.rows.map(row => row.points)
			});
		}
	});
});

app.get("/hackmobility/getUserGroup", function(req, res) {
	if (!req.query.user_name) {
		return res.status(400).end();
	}
	hackMobilityPool.query('SELECT collection_name FROM people p join collection c ON c.collection_id = p.collection_id WHERE people_name = $1;', [req.query.user_name], function (err, queryRes) {
		if(err) {
			console.log(err);
			res.status(500).end();
		} else {
			res.status(200).send({
				"Group": queryRes.rows.map(row => row.collection_name)
			});
		}
	});
});

app.post("/hackmobility/joinGroup", function(req, res) {
	if (!req.body.group_name || !req.body.group_pass || !req.body.user_name) {
		return res.status(400).end();
	}

	hackMobilityPool.query('SELECT collection_id FROM collection WHERE collection_name = $1 AND collection_pass = $2;', [req.body.group_name, req.body.group_pass], function (err, queryRes) {
		if(err) {
			console.log(err);
			res.status(500).end();
			return;
		}

		if (queryRes.rowCount != 1) {
			res.status(401).send('get fucked');
			return;
		}
		// INSERT INTO people(people_name, collection_id) ON CONFLICT DO UPDATE;
		hackMobilityPool.query('INSERT INTO people(collection_id, people_name) VALUES($1, $2) ON CONFLICT (people_name) DO UPDATE SET collection_id = EXCLUDED.collection_id;', [queryRes.rows[0].collection_id, req.body.user_name], function (err, queryRes) {
			if(err) {
				console.log(err);
				res.status(500).end();
			} else {
				res.status(200).send("sucess");
			}
		});
	});
});

var cars_being_queries = {};
var cars_being_stopped = {};
app.post("/hackmobility/SpongeBob", function(req, res) {
	console.log(req.body);
	if (!req.body.user_lat || !req.body.user_lon || !req.body.user_name) {
		return res.status(400).end();
	}

	hackMobilityPool.query('UPDATE people SET ready_time = now(), lat = $1, lon = $2 where people_name = $3;', [req.body.user_lat, req.body.user_lon, req.body.user_name], function (err, queryRes) {
		if(err) {
			console.log(err);
			res.status(500).end();
		} else {
			hackMobilityPool.query('SELECT count(*) AS the_count FROM people p WHERE p.collection_id IN (select collection_id from people where people_name = $1) AND ready_time <= NOW() - INTERVAL \'2 minutes\';', [req.body.user_name], function (err, queryRes) {
				if(err) {
					console.log(err);
					res.status(500).end();
				} else {
					if (queryRes.rows[0].the_count != 0) {
						res.status(200).send({"status": false, "count": queryRes.rows[0].the_count});
						return;
					}

					hackMobilityPool.query('SELECT car_access_token as accesstoken, c.collection_id as collection_id FROM collection c join people p on p.collection_id = c.collection_id WHERE people_name = $1;', [req.body.user_name], function (err, queryRes) {
						if(err) {
							console.log(err);
							return;
						}

						var collection_id = queryRes.rows[0].collection_id;
						var accessToken = queryRes.rows[0].accesstoken;

						cars_being_stopped[collection_id] = false;
						if (cars_being_queries[collection_id] == true) {
							// timeout and just get the data we need
							setTimeout(function() {
								hackMobilityPool.query('SELECT start_lat, start_lon FROM trip WHERE collection_id = $1;', [collection_id], function(err, queryRes) {
									if (err) {
										console.log(err);
									}
									var in_range = Math.sqrt((req.body.user_lat - queryRes.rows[0].start_lat)**2 + (req.body.user_lon - queryRes.rows[0].start_lon)**2) < 100000000;
									res.status(200).send({"status": true, "in_range": in_range});
								});
							}, 1500);
							return;
						}
						cars_being_queries[collection_id] = true;

						// create the trip
						smartcar.getVehicleIds(accessToken).then(function(data) {
							// the list of vehicle ids
							return data.vehicles;
						}).then(function(vehicleIds) {
							// instantiate the first vehicle in the vehicle id list
							const vehicle = new smartcar.Vehicle(vehicleIds[0], accessToken);

							vehicle.location().then(result => {
								// here we have location I think
								var lat = result.data.latitude;
								var lon = result.data.longitude;

								var in_range = Math.sqrt((req.body.user_lat - lat)**2 + (req.body.user_lon - lon)**2) < 100000000;
								res.status(200).send({"status": true, "in_range": in_range});
								if (in_range) {
									hackMobilityPool.query('UPDATE people SET valid_ride = true WHERE people_name = $1;', [req.body.user_name], function(err, queryRes) {
										if (err) {
											console.log(err);
										}
									});
								} else {
									hackMobilityPool.query('UPDATE people SET valid_ride = false WHERE people_name = $1;', [req.body.user_name], function(err, queryRes) {
										if (err) {
											console.log(err);
										}
									});
								}

								vehicle.odometer().then(result => {
									// here we have odometer I think
									var odomiter = result.data.distance;
									console.log(lat, lon, odomiter);

									hackMobilityPool.query('DELETE FROM trip WHERE end_time IS NOT NULL AND collection_id = $1;', [collection_id], function(err, queryRes) {
										if (err) {
											console.log(err);
											return;
										}

										hackMobilityPool.query('INSERT INTO trip(collection_id, start_time, start_lat, start_lon, start_odometer) VALUES ($1, now(), $2, $3, $4) ON CONFLICT (collection_id) DO NOTHING;', [collection_id, lat, lon, odomiter], function(err, queryRes) {
											if (err) {
												console.log(err);
												return;
											}
										});
									});
								});
							});
						});
					});
				}
			});
		}
	});
});

app.post("/hackmobility/Squidward", function(req, res) {
	console.log(req.body);
	if (!req.body.user_lat || !req.body.user_lon || !req.body.user_name) {
		return res.status(400).end();
	}

	hackMobilityPool.query('UPDATE people SET ready_time = now(), lat = $1, lon = $2 where people_name = $3;', [req.body.user_lat, req.body.user_lon, req.body.user_name], function (err, queryRes) {
		if(err) {
			console.log(err);
			res.status(500).end();
		} else {
			hackMobilityPool.query('SELECT count(*) AS the_count FROM people p WHERE p.collection_id IN (select collection_id from people where people_name = $1) AND ready_time <= NOW() - INTERVAL \'2 minutes\' AND p.valid_ride = TRUE;', [req.body.user_name], function (err, queryRes) {
				if(err) {
					console.log(err);
					res.status(500).end();
				} else {
					if (queryRes.rows[0].the_count != 0) {
						return res.status(200).send({"result": false});
					}

					hackMobilityPool.query('SELECT car_access_token as accesstoken, c.collection_id as collection_id FROM collection c join people p on p.collection_id = c.collection_id WHERE people_name = $1;', [req.body.user_name], function (err, queryRes) {
						if(err) {
							console.log(err);
							return;
						}

						var accessToken = queryRes.rows[0].accesstoken;
						var collection_id = queryRes.rows[0].collection_id;
						cars_being_queries[collection_id] = false;

						if (cars_being_stopped[collection_id] == true) {
							// timeout and just get the data we need
							setTimeout(function() {
								// sending data back
								hackMobilityPool.query('SELECT start_odometer, end_odometer, start_time, end_time FROM trip WHERE collection_id = $1;', [collection_id], function(err, queryRes) {
									if (err) {
										console.log(err);
										return;
									}

									console.log('returning data');
									var dist_traveled = Math.abs(queryRes.rows[0].end_odometer - queryRes.rows[0].start_odometer);
									var points = parseInt(dist_traveled * .1, 10);
									res.status(200).send({"result": true, "distance": dist_traveled, "points": points, "time": queryRes.rows[0].end_time - queryRes.rows[0].start_time});
									hackMobilityPool.query('UPDATE people set points = points + $1 WHERE people_name = $2 AND valid_ride = true;', [points, req.body.user_name], function(err, queryRes) {
										if (err) {
											console.log(err);
										}
									});
								});
							}, 1500);
							return;
						}
						cars_being_stopped[collection_id] = true;

						// create the trip
						smartcar.getVehicleIds(accessToken).then(function(data) {
							// the list of vehicle ids
							return data.vehicles;
						}).then(function(vehicleIds) {
							// instantiate the first vehicle in the vehicle id list
							const vehicle = new smartcar.Vehicle(vehicleIds[0], accessToken);

							vehicle.location().then(result => {
								// here we have location I think
								var lat = result.data.latitude;
								var lon = result.data.longitude;
								vehicle.odometer().then(result => {
									// here we have odometer I think
									var odomiter = result.data.distance;
									console.log(lat, lon, odomiter);

									hackMobilityPool.query('UPDATE trip SET end_odometer = $1, end_time = NOW(), end_lat = $2, end_lon = $3 WHERE collection_id = $4;', [odomiter, lat, lon, collection_id], function(err, queryRes) {
										if (err) {
											console.log(err);
											return;
										}

										hackMobilityPool.query('SELECT start_odometer, start_time FROM trip WHERE collection_id = $1;', [collection_id], function(err, queryRes) {
											if (err) {
												console.log(err);
												return;
											}

											var d = new Date();
											console.log('returning data');
											var dist_traveled = Math.abs(odomiter - queryRes.rows[0].start_odometer);
											var points = parseInt(dist_traveled * .1, 10);
											res.status(200).send({"result": true, "distance": dist_traveled, "points": points, "time": d.getTime() - queryRes.rows[0].start_time});
											hackMobilityPool.query('UPDATE people set points = points + $1 WHERE people_name = $2 AND valid_ride = true;', [points, req.body.user_name], function(err, queryRes) {
												if (err) {
													console.log(err);
												}
											});
										});
									});
								});
							});
						});
					});
				}
			});
		}
	});
});


const startCarClient = new smartcar.AuthClient({
	clientId: process.env.SMARTCAR_CLIENT_ID,
	clientSecret: process.env.SMARTCAR_CLIENT_SECRET,
	redirectUri: 'https://www.mdshulman.com/hackmobility/smartcarRedirect',
	scope: ['required:read_location','required:read_odometer'],
	testMode: true,
});
app.post("/hackmobility/createGroup", function(req, res) {
	if (!req.body.group_name || !req.body.group_password) {
		return res.status(400).end();
	}

	hackMobilityPool.query('INSERT INTO collection(collection_name, collection_pass) VALUES ($1, $2);', [req.body.group_name, req.body.group_password], function (err, queryRes) {
		if(err) {
			console.log(err);
			res.status(401).end();
			return;
		}

		var url = startCarClient.getAuthUrl({state: req.body.group_name});
		console.log(url);
		res.status(200).send({"url": url});
	});
});

app.get("/hackmobility/smartcarRedirect", function(req, res) {
	res.status(200).end();

	startCarClient.exchangeCode(req.query.code).then(access => {
		hackMobilityPool.query('UPDATE collection SET car_access_token = $1, car_refresh_token = $2 WHERE collection_name = $3;', [access.accessToken, access.refreshToken, req.query.state], function (err, queryRes) {
			if(err) {
				console.log(err);
			}
		});
    });
});

/******************************************************
 * Hack Mobility End
 */

app.get('*', function(req, res) {
	res.status(404).send('Page Not Found');
  });
  
  app.listen(3002, function() {
	console.log('Example app listening on port 3002!');
  });
