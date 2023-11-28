# Order API Spec

## Create Order

Endpoint : POST /api/v1/order

Request Header :

- Cookie :
  access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMTMyNjE5fQ.R2X5UTbEDn-pqEdHw2KYcw0ZcDHCMFynpKzfD-Y-Ruk;
  refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMjE4NzE5fQ.xkM0W2LETb0dt2dEQgFWRsJyGM5r3kIuPptn4NUf0Yc

Request Body :

```json
{
  "course_id" : "65405bf80271fae988e46c41",
  "payment_info" : ""
}
```

Response Body (Success) :
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "courseId": "65405bf80271fae988e46c41",
    "userId": "6539b9b352c946c5694175dd",
    "paymentInfo": "",
    "_id": "656543e7dd37f380d0daa8d0",
    "createdAt": "2023-11-28T01:35:35.070Z",
    "updatedAt": "2023-11-28T01:35:35.070Z",
    "__v": 0
  }
}
```

Response Body (Failed) :
```json
{
  "success": true,
  "message": "jwt expired",
  "data": {}
}
```

## Get All Orders -- Only Admin

Endpoint : GET /api/v1/orders

Request Header :

- Cookie :
  access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMTMyNjE5fQ.R2X5UTbEDn-pqEdHw2KYcw0ZcDHCMFynpKzfD-Y-Ruk;
  refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMjE4NzE5fQ.xkM0W2LETb0dt2dEQgFWRsJyGM5r3kIuPptn4NUf0Yc

Request Body :

Response Body (Success) :
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "656543e7dd37f380d0daa8d0",
      "courseId": "65405bf80271fae988e46c41",
      "userId": "6539b9b352c946c5694175dd",
      "paymentInfo": "",
      "createdAt": "2023-11-28T01:35:35.070Z",
      "updatedAt": "2023-11-28T01:35:35.070Z",
      "__v": 0
    },
    {
      "_id": "6539c9c8e0718b151bc3c9d6",
      "courseId": "6539bb6c52c946c5694175e6",
      "userId": "6539bafb52c946c5694175e2",
      "paymentInfo": "",
      "createdAt": "2023-10-26T02:07:04.262Z",
      "updatedAt": "2023-10-26T02:07:04.262Z",
      "__v": 0
    },
    {
      "_id": "6539c0a29f66cf6e804ec26b",
      "courseId": "6539bb6c52c946c5694175e6",
      "userId": "6539b9b352c946c5694175dd",
      "paymentInfo": "",
      "createdAt": "2023-10-26T01:28:02.741Z",
      "updatedAt": "2023-10-26T01:28:02.741Z",
      "__v": 0
    },
    {
      "_id": "6539beeea236a4dee2991f0b",
      "courseId": "6539bb6c52c946c5694175e6",
      "userId": "6539b9b352c946c5694175dd",
      "paymentInfo": "",
      "createdAt": "2023-10-26T01:20:46.063Z",
      "updatedAt": "2023-10-26T01:20:46.063Z",
      "__v": 0
    },
    {
      "_id": "6539bc8f08c758a430b7ad48",
      "courseId": "6539bb6c52c946c5694175e6",
      "userId": "6539b9b352c946c5694175dd",
      "paymentInfo": "",
      "createdAt": "2023-10-26T01:10:39.007Z",
      "updatedAt": "2023-10-26T01:10:39.007Z",
      "__v": 0
    }
  ]
}
```

Response Body (Failed) :
```json
{
  "success": true,
  "message": "jwt expired",
  "data": {}
}
```
