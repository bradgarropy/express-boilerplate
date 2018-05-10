# Users


## Register

Create a new user account and emails the user an activation link.

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
    "active": false,
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@gmail.com",
    "id": "5af26e87bfe8522140d2d69d"
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
    "active": true,
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@gmail.com",
    "id": "5af26e87bfe8522140d2d69d"
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZjI3MDBjYmZlODUyMjE0MGQyZDY5ZiIsImZpcnN0X25hbWUiOiJCcmFkIiwibGFzdF9uYW1lIjoiR2Fycm9weSIsImVtYWlsIjoiYnJhZGdhcnJvcHlAZ21haWwuY29tIiwiaWF0IjoxNTI1ODM4MDEyLCJleHAiOjE1MjY0NDI4MTJ9.2LtZ4w2StT3mdZP3ZUbhOeA4DQ70dtpAjjXABbuiqaw"
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
    "active": true,
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@gmail.com",
    "id": "5af26e87bfe8522140d2d69d"
}
```


## Update

Change a user's information and update their token.

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
        "id": "5af26e87bfe8522140d2d69d"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZjI3MDBjYmZlODUyMjE0MGQyZDY5ZiIsImZpcnN0X25hbWUiOiJCcmFkbGV5IiwibGFzdF9uYW1lIjoiR2Fycm9weSIsImVtYWlsIjoiYnJhZGdhcnJvcHlAZ21haWwuY29tIiwiaWF0IjoxNTI1ODM4MjcxLCJleHAiOjE1MjY0NDMwNzF9.2pX9LDJa6N4SpBcu0W19ZzVvoIQYQI8C9-elNrx-0d4"
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZjI3MDBjYmZlODUyMjE0MGQyZDY5ZiIsImZpcnN0X25hbWUiOiJCcmFkIiwibGFzdF9uYW1lIjoiR2Fycm9weSIsImVtYWlsIjoiYnJhZGdhcnJvcHlAZ21haWwuY29tIiwiaWF0IjoxNTI1ODM4Njc0LCJleHAiOjE1MjY0NDM0NzR9.NTXb4UeC02IYzl8eXTzgLc1oqOF6QRwD97L4gGuCZsM"
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
    "message": "Password reset email sent!"
}
```


## Reset Password

Reset's the user's password.

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
    "message": "Password reset successfully!"
}
```
