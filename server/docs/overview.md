# Overview

## Location

The API is located at `http://boilerplate.com`.

## Schema

The API is accessible over HTTP. All requests and responses are in JSON format.

## Authentication

API access is restricted to authenticated users. Authentication is performed using [JSON Web Tokens](https://jwt.io/) which should be included as a Bearer token in the Authorization header.

```
curl GET http://boilerplate.com -H "Authorization: Bearer TOKEN"
```

You can request an authentication token by using the `login` API.

```
curl POST http://boilerplate.com/users/login \
    -H "Content-Type: application/json" \
    -d "{
        "email": "johndoe@gmail.com",
        "password": "password123"
    }"
```
