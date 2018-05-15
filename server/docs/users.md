# Users


## Register

Create a new user account and email the user an activation link.

```
POST /users
```

### Parameters

| Name | Type | Required | Description | Example |
| ---- | ---- | :------: | ----------- | ------- |
| first_name | string | yes | New user's first name. | John |
| last_name | string | yes | New user's last name. | Doe |
| email | string | yes | New user's email address. | johndoe@gmail.com |
| password | string | yes | New user's password. | password123 |
| confirmation | string | yes | Confirmation of new user's password. | password123 |

### Response

```
{
    "message": "Account activation link sent to johndoe@gmail.com.",
    "user": {
        "active": false,
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@gmail.com",
        "id": "5af5d29c6d34b918a89537aa"
    }
}
```


## Activate

Activate a new user account.

```
POST /users/activate
```

### Parameters

| Name | Type | Required | Description | Example |
| ---- | ---- | :------: | ----------- | ------- |
| token | string | yes | Activation token. | |

### Response

```
{
    "user": {
        "active": true,
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@gmail.com",
        "id": "5af5d29c6d34b918a89537aa"
    }
}
```


## Login

Authenticate a user and provide a token.

```
POST /users/login
```

### Parameters

| Name | Type | Required | Description | Example |
| ---- | ---- | :------: | ----------- | ------- |
| email | string | yes | User's email address. | johndoe@gmail.com |
| password | string | yes | User's password. | password123 |

### Response

```
{
    "user": {
        "active": true,
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@gmail.com",
        "id": "5af5d29c6d34b918a89537aa"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZjVkMjljNmQzNGI5MThhODk1MzdhYSIsImlhdCI6MTUyNjA2MDAwOCwiZXhwIjoxNTI2NjY0ODA4fQ.rNsFI-b1yA2ixosyvNfWfCHkbyehw-5SKi1QVuafdVE"
}
```


## Get One

Retrieve a single user.

```
GET /users
```

### Response

```
{
    "user": {
        "active": true,
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@gmail.com",
        "id": "5af5d29c6d34b918a89537aa"
    }
}
```


## Update

Change a user's information.

```
PATCH /users
```

### Parameters

| Name | Type | Required | Description | Example |
| ---- | ---- | :------: | ----------- | ------- |
| first_name | string | no | User's new first name. | Jon |
| last_name | string | no | User's new last name. | Deer |
| email | string | no | User's new email address. | jondeer@gmail.com |

### Response

```
{
    "user": {
        "active": true,
        "first_name": "Jon",
        "last_name": "Deer",
        "email": "JonDeer@gmail.com",
        "id": "5af5d29c6d34b918a89537aa"
    }
}
```


## Change Password

Change a user's password.

```
POST /users/password
```

### Parameters

| Name | Type | Required | Description | Example |
| ---- | ---- | :------: | ----------- | ------- |
| current_password | string | yes | User's current password. | password123 |
| new_password | string | yes | User's new password. | 123password |
| confirmation | string | yes | Confirmation of user's new password. | 123password |

### Response

```
{
    "user": {
        "active": true,
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@gmail.com",
        "id": "5af5d29c6d34b918a89537aa"
    }
}
```


## Forgot Password

Provide a link to reset the user's password via email.

```
POST /users/forgot
```

### Parameters

| Name | Type | Required | Description | Example |
| ---- | ---- | :------: | ----------- | ------- |
| email | string | yes | User's email address. | johndoe@gmail.com |

### Response

```
{
    "message": "Password reset link sent to johndoe@gmail.com.",
    "user": {
        "active": true,
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@gmail.com",
        "id": "5af5d29c6d34b918a89537aa"
    }
}
```


## Reset Password

Resets the user's password.

```
POST /users/reset
```

### Parameters

| Name | Type | Required | Description | Example |
| ---- | ---- | :------: | ----------- | ------- |
| token | string | yes | Password reset token. | |
| password | string | yes | User's new password. | password123 |
| confirmation | string | yes | Confirmation of user's new password. | password123 |

### Response

```
{
    "user": {
        "active": true,
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@gmail.com",
        "id": "5af5d29c6d34b918a89537aa"
    }
}
```
