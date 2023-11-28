# Notification API Spec

## Get All Notification

Endpoint : GET /api/v1/notifications

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
      "_id": "6565450edd37f380d0daa904",
      "title": "New Question Reply Received",
      "message": "New Question reply was received. The Video : Lorem Ipsum have one question reply by afdul rohmat",
      "status": "unread",
      "userId": "6539b9b352c946c5694175dd",
      "createdAt": "2023-11-28T01:40:30.111Z",
      "updatedAt": "2023-11-28T01:40:30.111Z",
      "__v": 0
    },
    {
      "_id": "656544b0dd37f380d0daa8f4",
      "title": "New Question Received",
      "message": "New Question was Added. The Video : Lorem Ipsum have one question added by afdul rohmat",
      "status": "unread",
      "userId": "6539b9b352c946c5694175dd",
      "createdAt": "2023-11-28T01:38:56.087Z",
      "updatedAt": "2023-11-28T01:38:56.087Z",
      "__v": 0
    },
    {
      "_id": "656543e7dd37f380d0daa8cd",
      "title": "New Order",
      "message": "New Order Confirmed. The Course : MERN STACK LMS has been ordered",
      "status": "unread",
      "userId": "6539b9b352c946c5694175dd",
      "createdAt": "2023-11-28T01:35:35.018Z",
      "updatedAt": "2023-11-28T01:35:35.018Z",
      "__v": 0
    },
    {
      "_id": "6539ca0be0718b151bc3c9f4",
      "title": "New Question",
      "message": "New Question was Added. The Course : MERN STACK LMS have one question added by sita nuria",
      "status": "read",
      "userId": "6539bafb52c946c5694175e2",
      "createdAt": "2023-10-26T02:08:11.159Z",
      "updatedAt": "2023-10-31T00:22:41.420Z",
      "__v": 0
    },
    {
      "_id": "6539c9c8e0718b151bc3c9d3",
      "title": "New Order",
      "message": "New Order Confirmed. The Course : MERN STACK LMS has been ordered",
      "status": "unread",
      "userId": "6539bafb52c946c5694175e2",
      "createdAt": "2023-10-26T02:07:04.219Z",
      "updatedAt": "2023-10-26T02:07:04.219Z",
      "__v": 0
    },
    {
      "_id": "6539c0a29f66cf6e804ec268",
      "title": "New Order",
      "message": "New Order Confirmed. The Course : MERN STACK LMS has been ordered",
      "status": "read",
      "userId": "6539b9b352c946c5694175dd",
      "createdAt": "2023-10-26T01:28:02.701Z",
      "updatedAt": "2023-10-26T01:57:52.445Z",
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

## Update Notification Status -- Only Admin

Endpoint : PUT /api/v1/notification/status/{notification_id}

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
  "data": {
    "_id": "6539c9c8e0718b151bc3c9d3",
    "title": "New Order",
    "message": "New Order Confirmed. The Course : MERN STACK LMS has been ordered",
    "status": "read",
    "userId": "6539bafb52c946c5694175e2",
    "createdAt": "2023-10-26T02:07:04.219Z",
    "updatedAt": "2023-11-28T01:50:57.432Z",
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