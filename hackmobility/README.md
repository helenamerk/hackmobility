```
GET getGroupNames
```

RETURNS:

```JSON
{
"GroupNames": [
"password",
"password1"
]
}
```

```
GET getUsersInGroup?group_name=password
```

RETURNS

```JSON
{
"Users": [
"earny",
"bert"
]
}
```

```
GET getUserPoints?user_name=earny
```

RETURNS

```JSON
{
"Points": [
0
]
}
```

````
GET getUserGroup?user_name=earny

```JSON
{
"Group": [
1
]
}
````

## POST REQUESTS

POST
addGroup
{
    "group_name": "password1",
    "group_pass": "password1",
    "car_id": 1
}

joinGroup
