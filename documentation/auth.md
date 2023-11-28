# Auth API Spec

## Register

Endpoint : POST /api/v1/auth/register

Request Body :

```json
{
  "name" : "sita nuria",
  "email" : "mirona2208@scubalm.com",
  "password" : "qwerty123"
}
```

Response Body (Success) :
```json
{
  "success": true,
  "message": "Please check yout email at afdulrohmat03@gmail.com to activate yout account",
  "data" : {
    "activation_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJhZmR1bCByb2htYXQiLCJlbWFpbCI6ImFmZHVscm9obWF0MDNAZ21haWwuY29tIiwicGFzc3dvcmQiOiJxd2VydHkxMjMifSwiYWN0aXZhdGlvbkNvZGUiOiIzOTQ5IiwiaWF0IjoxNzAxMTMxODMxLCJleHAiOjE3MDExMzI3MzF9.3ewPoPGy1wyGXvi9UeT6K08UGXvhDThGn7D7Q9PSdY0"
  }
}
```

## Activation

Endpoint : POST /api/v1/auth/activate-user

Request Body :

```json
{
  "activation_code" : "4458",
  "activation_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJhZmR1bCByb2htYXQiLCJlbWFpbCI6ImFmZHVscm9obWF0MDNAZ21haWwuY29tIiwicGFzc3dvcmQiOiJxd2VydHkxMjMifSwiYWN0aXZhdGlvbkNvZGUiOiI0NDU4IiwiaWF0IjoxNzAxMTMxODc4LCJleHAiOjE3MDExMzI3Nzh9.uhalcza3YwLr5YoVu-DBdNAucyUstg3HexboWq1Q4oc"
}
```

Response Body (Success) :
```json
{
  "success": true,
  "message": "User succesfully activated. Please login then",
  "data" : null
}
```

Response Body (Failed) :
```json
{
  "success": false,
  "message": "Invalid activation code",
  "data" :null
}
```

## Login

Endpoint : POST /api/v1/auth/login

Request Body :

```json
{
  "email" : "afdulrohmat03@gmail.com",
  "password" : "qwerty123"
}
```

Response Body (Success) :
```json
{
  "success": true,
  "message": "User succesfully activated. Please login then",
  "data" : {
    "user": {
      "_id": "656536aaf96f3599ac26547e",
      "name": "afdul rohmat",
      "email": "afdulrohmat03@gmail.com",
      "password": "$2a$10$x9xMF25om9p7OETbThynFejkfmVMcoOLVaH3atlztAV5mJGoNCdH2",
      "role": "user",
      "isVerified": "false",
      "courses": [],
      "createdAt": "2023-11-28T00:39:06.538Z",
      "updatedAt": "2023-11-28T00:39:06.538Z",
      "__v": 0
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjAzMiwiZXhwIjoxNzAxMTMyMzMyfQ.GBSZ0XGPcOzevuxm_aWIcbFf4p1R_dxnQmT30VCCFJc"
  }
}
```

Response Body (Failed) :
```json
{
  "success": false,
  "message": "Invalid email or password",
  "data" : null
}
```

## Refresh Token

Endpoint : GET /api/v1/auth/refresh-token

Request Body :

Response Body (Success) :
```json
{
  "success": true,
  "message": "User succesfully activated. Please login then",
  "data" : {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMTMyNjE5fQ.R2X5UTbEDn-pqEdHw2KYcw0ZcDHCMFynpKzfD-Y-Ruk"
  }
}
```


## Logout

Endpoint : GET /api/v1/auth/logout

Response Body (Success) :
```json
{
  "success": false,
  "message": "Logged out successfully",
  "data" : null
}
```
