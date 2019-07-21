--
DROP TABLE IF EXISTS trip;
DROP TABLE IF EXISTS people;
DROP TABLE IF EXISTS collection;

CREATE TABLE collection (
    collection_id SERIAL PRIMARY KEY,
    collection_name VARCHAR(64) UNIQUE NOT NULL,
    collection_pass VARCHAR(64) NOT NULL,
    car_access_token VARCHAR(64),
    car_refresh_token VARCHAR(64)
);


CREATE TABLE people (
    people_id SERIAL PRIMARY KEY,
    people_name VARCHAR(64) UNIQUE NOT NULL,
    collection_id INTEGER REFERENCES collection(collection_id),
    ready_time TIMESTAMP DEFAULT NOW() - INTERVAL '2 minutes',
    lat FLOAT,
    lon FLOAT,
    points INTEGER DEFAULT 0,
    
    valid_ride BOOLEAN DEFAULT TRUE
);

CREATE TABLE trip (
    trip_id SERIAL PRIMARY KEY,
    collection_id INTEGER REFERENCES collection(collection_id) UNIQUE,

    start_time TIMESTAMP NOT NULL DEFAULT NOW(),
    start_lat FLOAT NOT NULL,
    start_lon FLOAT NOT NULL,
    start_odometer FLOAT NOT NULL,

    end_time TIMESTAMP,
    end_lat FLOAT,
    end_lon FLOAT,
    end_odometer FLOAT
);
