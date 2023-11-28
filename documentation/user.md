# User API Spec

## Get All Users -- Only Admin

Endpoint : GET /api/v1/users

Request Header :

- Cookie : access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMTMyNjE5fQ.R2X5UTbEDn-pqEdHw2KYcw0ZcDHCMFynpKzfD-Y-Ruk; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMjE4NzE5fQ.xkM0W2LETb0dt2dEQgFWRsJyGM5r3kIuPptn4NUf0Yc

Request Body :

Response Body (Success) :
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "6539b9b352c946c5694175dd",
      "name": "afdul rohmat",
      "email": "afdulrohmat03@gmail.com",
      "role": "admin",
      "isVerified": "false",
      "courses": [
        {
          "_id": "6539bb6c52c946c5694175e6"
        }
      ],
      "createdAt": "2023-10-26T00:58:27.367Z",
      "updatedAt": "2023-10-31T00:39:00.579Z",
      "__v": 3
    }
  ]
}
```

Response Body (Failed) :
```json
{
  "success": false,
  "message": "Role 'user' is not allowed to access this route",
  "data" : null
}
```

## Update User Role -- Only Admin 

Endpoint : PUT /api/v1/user/role

Request Header :

- Cookie : access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMTMyNjE5fQ.R2X5UTbEDn-pqEdHw2KYcw0ZcDHCMFynpKzfD-Y-Ruk; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMjE4NzE5fQ.xkM0W2LETb0dt2dEQgFWRsJyGM5r3kIuPptn4NUf0Yc

Request Body :
```json
{
    "user_id": "6539b9b352c946c5694175dd",
    "role": "admin"
}
```

Response Body (Success) :
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "_id": "6539b9b352c946c5694175dd",
    "name": "afdul rohmat",
    "email": "afdulrohmat03@gmail.com",
    "role": "admin",
    "isVerified": "false",
    "courses": [
      {
        "_id": "6539bb6c52c946c5694175e6"
      }
    ],
    "createdAt": "2023-10-26T00:58:27.367Z",
    "updatedAt": "2023-11-28T00:56:28.056Z",
    "__v": 3
  }
}
```

Response Body (Failed) :
```json
{
  "success": false,
  "message": "Cast to ObjectId failed for value \"6539b9b352c946c5694175d\" (type string) at path \"_id\" for model \"User\"",
  "data" : null
}
```

## Get User That Currently Login

Endpoint : GET /api/v1/user/user/info

Request Header :

- Cookie : access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMTMyNjE5fQ.R2X5UTbEDn-pqEdHw2KYcw0ZcDHCMFynpKzfD-Y-Ruk; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMjE4NzE5fQ.xkM0W2LETb0dt2dEQgFWRsJyGM5r3kIuPptn4NUf0Yc

Request Body :

Response Body (Success) :
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "_id": "6539b9b352c946c5694175dd",
    "name": "afdul rohmat",
    "email": "afdulrohmat03@gmail.com",
    "password": "$2a$10$.Ks9vwVVPEYsbYlENDQhSekxPpjg1hSGTjxUzQV2fBuhXxC/KYcr.",
    "role": "admin",
    "isVerified": "false",
    "courses": [
      {
        "_id": "6539bb6c52c946c5694175e6"
      }
    ],
    "createdAt": "2023-10-26T00:58:27.367Z",
    "updatedAt": "2023-10-31T00:39:00.579Z",
    "__v": 3
  }
}
```

Response Body (Failed) :
```json
{
  "success": false,
  "message": "JWT is expired, try again",
  "data" : null
}
```

## Update User Info

Endpoint : PUT /api/v1/user/user/info

Request Header :

- Cookie : access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMTMyNjE5fQ.R2X5UTbEDn-pqEdHw2KYcw0ZcDHCMFynpKzfD-Y-Ruk; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMjE4NzE5fQ.xkM0W2LETb0dt2dEQgFWRsJyGM5r3kIuPptn4NUf0Yc

Request Body :
```json
{
    "name" : "afdul rohmat",
    "email" : "afdulrohmat03@gmail.com"
}
```

Response Body (Success) :
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "_id": "6539b9b352c946c5694175dd",
    "name": "afdul rohmat",
    "email": "afdulrohmat@gmail.com",
    "role": "admin",
    "isVerified": "false",
    "courses": [
      {
        "_id": "6539bb6c52c946c5694175e6"
      }
    ],
    "createdAt": "2023-10-26T00:58:27.367Z",
    "updatedAt": "2023-11-28T00:57:11.647Z",
    "__v": 3
  }
}
```

Response Body (Failed) :
```json
{
  "success": false,
  "message": "Email already exist",
  "data" : null
}
```

## Update User Avatar Profile

Endpoint : PUT /api/v1/user/user/avatar

Request Header :

- Cookie : access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMTMyNjE5fQ.R2X5UTbEDn-pqEdHw2KYcw0ZcDHCMFynpKzfD-Y-Ruk; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMjE4NzE5fQ.xkM0W2LETb0dt2dEQgFWRsJyGM5r3kIuPptn4NUf0Yc

Request Body :
```json
{
   "avatar" : "url base64 to image"
}
```

Response Body (Success) :
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "avatar": {
      "publicId": "avatar-profile-picture/zctu7hvjmiqdxwgd17pa",
      "url": "https://res.cloudinary.com/dmyo8iuwy/image/upload/v1701134530/avatar-profile-picture/zctu7hvjmiqdxwgd17pa.webp"
    },
    "_id": "6539b9b352c946c5694175dd",
    "name": "afdul rohmat",
    "email": "afdulrohmat03@gmail.com",
    "role": "admin",
    "isVerified": "false",
    "courses": [
      {
        "_id": "6539bb6c52c946c5694175e6"
      }
    ],
    "createdAt": "2023-10-26T00:58:27.367Z",
    "updatedAt": "2023-11-28T00:57:11.647Z",
    "__v": 3
  }
}
```

Response Body (Failed) :
```json
{
  "success": false,
  "message": "jwt expired",
  "data" : null
}
```

## Delete User By Id -- Only Admin

Endpoint : DELETE /api/v1/user/user/{user_id}

Request Header :

- Cookie : access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMTMyNjE5fQ.R2X5UTbEDn-pqEdHw2KYcw0ZcDHCMFynpKzfD-Y-Ruk; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMjE4NzE5fQ.xkM0W2LETb0dt2dEQgFWRsJyGM5r3kIuPptn4NUf0Yc

Request Body :

Response Body (Success) :
```json
{
  "success": true,
  "message": "Success",
  "data": null
}
```

Response Body (Failed) :
```json
{
  "success": false,
  "message": "User not found!",
  "data" : null
}
```

## Update Password

Endpoint : PUT /api/v1/user/user/password

Request Header :

- Cookie : access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMTMyNjE5fQ.R2X5UTbEDn-pqEdHw2KYcw0ZcDHCMFynpKzfD-Y-Ruk; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMjE4NzE5fQ.xkM0W2LETb0dt2dEQgFWRsJyGM5r3kIuPptn4NUf0Yc

Request Body :
```json
{
    "old_password" : "qwerty123",
    "new_password" : "qwerty12345"
}
```

Response Body (Success) :
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "_id": "6539b9b352c946c5694175dd",
    "name": "afdul rohmat",
    "email": "afdulrohmat03@gmail.com",
    "password": "qwerty123",
    "role": "admin",
    "isVerified": "false",
    "courses": [
      {
        "_id": "6539bb6c52c946c5694175e6"
      }
    ],
    "createdAt": "2023-10-26T00:58:27.367Z",
    "updatedAt": "2023-11-28T00:57:11.647Z",
    "__v": 3
  }
}
```

Response Body (Failed) :
```json
{
  "success": false,
  "message": "jwt expired",
  "data" : null
}
```

