# Course API Spec

## Create Course

Endpoint : GET /api/v1/course

Request Header :

- Cookie :
  access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMTMyNjE5fQ.R2X5UTbEDn-pqEdHw2KYcw0ZcDHCMFynpKzfD-Y-Ruk;
  refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMjE4NzE5fQ.xkM0W2LETb0dt2dEQgFWRsJyGM5r3kIuPptn4NUf0Yc

Request Body :

```json
{
  "name": "MERN STACK LMS",
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  "price": 29,
  "estimatedPrice": 80,
  "tags": "MRN,LMS,node js,next13,typescript",
  "level": "Intermediate",
  "demoUrl": "https://www.youtube.com/watch?v=kf6yyxMck8Y&t=16705s&ab_channel=Becodemy",
  "benefits": [
    {
      "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      "title": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
    },
    {
      "title": "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
    }
  ],
  "prerequisites": [
    {
      "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      "title": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
    },
    {
      "title": "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
    }
  ],
  "courseData": [
    {
      "title": "Lorem Ipsum",
      "description": "desc Lorem Ipsum",
      "videoUrl": "hyerkjd23",
      "videoLength": 12,
      "links": [
        {
          "title": "link video 1",
          "url": "https://www.youtube.com/watch?v=kf6yyxMck8Y&t=16705s&ab_channel=Becodemy"
        }
      ]
    },
    {
      "title": "Dolor Amet",
      "description": "desc Dolor Amet",
      "videoUrl": "aaassddff",
      "videoLength": 18,
      "links": [
        {
          "title": "link video 2",
          "url": "https://www.youtube.com/watch?v=kf6yyxMck8Y&t=16705s&ab_channel=Becodemy"
        }
      ]
    }
  ]
}
```

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
  "message": "jwt expired",
  "data": null
}
```

## Update Course

Endpoint : PUT /api/v1/course/{course_id}

Request Header :

- Cookie :
  access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMTMyNjE5fQ.R2X5UTbEDn-pqEdHw2KYcw0ZcDHCMFynpKzfD-Y-Ruk;
  refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMjE4NzE5fQ.xkM0W2LETb0dt2dEQgFWRsJyGM5r3kIuPptn4NUf0Yc

Request Body :

```json
{
  "name": "MERN STACK LMS UPDATE 2023",
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  "price": 30,
  "estimatedPrice": 100,
  "tags": "MRN,LMS,node js,next13,typescript,best practices",
  "level": "Intermediate",
  "demoUrl": "https://www.youtube.com/watch?v=kf6yyxMck8Y&t=16705s&ab_channel=Becodemy",
  "benefits": [
    {
      "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      "title": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
    },
    {
      "title": "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
    }
  ],
  "prerequisites": [
    {
      "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    },
    {
      "title": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
    },
    {
      "title": "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
    }
  ],
  "courseData": [
    {
      "title": "Lorem Ipsum",
      "description": "desc Lorem Ipsum",
      "videoUrl": "hyerkjd23",
      "videoLength": 12,
      "links": [
        {
          "title": "link video 1",
          "url": "https://www.youtube.com/watch?v=kf6yyxMck8Y&t=16705s&ab_channel=Becodemy"
        }
      ]
    }
  ]
}
```

Response Body (Success) :

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "_id": "656541e3dd37f380d0daa87d",
    "name": "MERN STACK LMS",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "price": 29,
    "estimatedPrice": 80,
    "tags": "MRN,LMS,node js,next13,typescript",
    "level": "Intermediate",
    "demoUrl": "https://www.youtube.com/watch?v=kf6yyxMck8Y&t=16705s&ab_channel=Becodemy",
    "benefits": [
      {
        "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        "_id": "656541e3dd37f380d0daa87e"
      },
      {
        "title": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        "_id": "656541e3dd37f380d0daa87f"
      },
      {
        "title": "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
        "_id": "656541e3dd37f380d0daa880"
      }
    ],
    "prerequisites": [
      {
        "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        "_id": "656541e3dd37f380d0daa881"
      },
      {
        "title": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        "_id": "656541e3dd37f380d0daa882"
      },
      {
        "title": "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
        "_id": "656541e3dd37f380d0daa883"
      }
    ],
    "courseData": [
      {
        "title": "Lorem Ipsum",
        "description": "desc Lorem Ipsum",
        "videoLength": 12,
        "_id": "656541e3dd37f380d0daa884"
      },
      {
        "title": "Dolor Amet",
        "description": "desc Dolor Amet",
        "videoLength": 18,
        "_id": "656541e3dd37f380d0daa886"
      }
    ],
    "ratings": 0,
    "purchased": 0,
    "reviews": [],
    "createdAt": "2023-11-28T01:26:59.048Z",
    "updatedAt": "2023-11-28T01:26:59.048Z",
    "__v": 0
  }
}
```

Response Body (Failed) :

```json
{
  "success": false,
  "message": "jwt expired",
  "data": null
}
```

## Get All Courses -- Without Purchasing

Endpoint : GET /api/v1/courses

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
      "_id": "65405bf80271fae988e46c41",
      "name": "MERN STACK LMS",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "price": 29,
      "estimatedPrice": 80,
      "tags": "MRN,LMS,node js,next13,typescript",
      "level": "Intermediate",
      "demoUrl": "https://www.youtube.com/watch?v=kf6yyxMck8Y&t=16705s&ab_channel=Becodemy",
      "benefits": [
        {
          "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
          "_id": "65405bf80271fae988e46c42"
        },
        {
          "title": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          "_id": "65405bf80271fae988e46c43"
        },
        {
          "title": "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
          "_id": "65405bf80271fae988e46c44"
        }
      ],
      "prerequisites": [
        {
          "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
          "_id": "65405bf80271fae988e46c45"
        },
        {
          "title": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          "_id": "65405bf80271fae988e46c46"
        },
        {
          "title": "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
          "_id": "65405bf80271fae988e46c47"
        }
      ],
      "courseData": [
        {
          "title": "Lorem Ipsum",
          "description": "desc Lorem Ipsum",
          "videoLength": 12,
          "_id": "65405bf80271fae988e46c48"
        },
        {
          "title": "Dolor Amet",
          "description": "desc Dolor Amet",
          "videoLength": 18,
          "_id": "65405bf80271fae988e46c4a"
        }
      ],
      "ratings": 0,
      "purchased": 0,
      "reviews": [],
      "createdAt": "2023-10-31T01:44:24.939Z",
      "updatedAt": "2023-10-31T01:44:24.939Z",
      "__v": 0
    },
    {
      "_id": "656541e3dd37f380d0daa87d",
      "name": "MERN STACK LMS",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "price": 29,
      "estimatedPrice": 80,
      "tags": "MRN,LMS,node js,next13,typescript",
      "level": "Intermediate",
      "demoUrl": "https://www.youtube.com/watch?v=kf6yyxMck8Y&t=16705s&ab_channel=Becodemy",
      "benefits": [
        {
          "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
          "_id": "656541e3dd37f380d0daa87e"
        },
        {
          "title": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          "_id": "656541e3dd37f380d0daa87f"
        },
        {
          "title": "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
          "_id": "656541e3dd37f380d0daa880"
        }
      ],
      "prerequisites": [
        {
          "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
          "_id": "656541e3dd37f380d0daa881"
        },
        {
          "title": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          "_id": "656541e3dd37f380d0daa882"
        },
        {
          "title": "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
          "_id": "656541e3dd37f380d0daa883"
        }
      ],
      "courseData": [
        {
          "title": "Lorem Ipsum",
          "description": "desc Lorem Ipsum",
          "videoLength": 12,
          "_id": "656541e3dd37f380d0daa884"
        },
        {
          "title": "Dolor Amet",
          "description": "desc Dolor Amet",
          "videoLength": 18,
          "_id": "656541e3dd37f380d0daa886"
        }
      ],
      "ratings": 0,
      "purchased": 0,
      "reviews": [],
      "createdAt": "2023-11-28T01:26:59.048Z",
      "updatedAt": "2023-11-28T01:26:59.048Z",
      "__v": 0
    }
  ]
}
```

Response Body (Failed) :

```json
{
  "success": false,
  "message": "jwt expired",
  "data": null
}
```

## Get All Courses -- Only Admin

Endpoint : GET /api/v1/courses/admin

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
      "_id": "656541e3dd37f380d0daa87d",
      "name": "MERN STACK LMS",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "price": 29,
      "estimatedPrice": 80,
      "tags": "MRN,LMS,node js,next13,typescript",
      "level": "Intermediate",
      "demoUrl": "https://www.youtube.com/watch?v=kf6yyxMck8Y&t=16705s&ab_channel=Becodemy",
      "benefits": [
        {
          "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
          "_id": "656541e3dd37f380d0daa87e"
        },
        {
          "title": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          "_id": "656541e3dd37f380d0daa87f"
        },
        {
          "title": "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
          "_id": "656541e3dd37f380d0daa880"
        }
      ],
      "prerequisites": [
        {
          "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
          "_id": "656541e3dd37f380d0daa881"
        },
        {
          "title": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          "_id": "656541e3dd37f380d0daa882"
        },
        {
          "title": "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
          "_id": "656541e3dd37f380d0daa883"
        }
      ],
      "courseData": [
        {
          "title": "Lorem Ipsum",
          "description": "desc Lorem Ipsum",
          "videoUrl": "hyerkjd23",
          "videoLength": 12,
          "links": [
            {
              "title": "link video 1",
              "url": "https://www.youtube.com/watch?v=kf6yyxMck8Y&t=16705s&ab_channel=Becodemy",
              "_id": "656541e3dd37f380d0daa885"
            }
          ],
          "_id": "656541e3dd37f380d0daa884",
          "questions": []
        },
        {
          "title": "Dolor Amet",
          "description": "desc Dolor Amet",
          "videoUrl": "aaassddff",
          "videoLength": 18,
          "links": [
            {
              "title": "link video 2",
              "url": "https://www.youtube.com/watch?v=kf6yyxMck8Y&t=16705s&ab_channel=Becodemy",
              "_id": "656541e3dd37f380d0daa887"
            }
          ],
          "_id": "656541e3dd37f380d0daa886",
          "questions": []
        }
      ],
      "ratings": 0,
      "purchased": 0,
      "reviews": [],
      "createdAt": "2023-11-28T01:26:59.048Z",
      "updatedAt": "2023-11-28T01:26:59.048Z",
      "__v": 0
    },
    {
      "_id": "65405bf80271fae988e46c41",
      "name": "MERN STACK LMS",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "price": 29,
      "estimatedPrice": 80,
      "tags": "MRN,LMS,node js,next13,typescript",
      "level": "Intermediate",
      "demoUrl": "https://www.youtube.com/watch?v=kf6yyxMck8Y&t=16705s&ab_channel=Becodemy",
      "benefits": [
        {
          "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
          "_id": "65405bf80271fae988e46c42"
        },
        {
          "title": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          "_id": "65405bf80271fae988e46c43"
        },
        {
          "title": "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
          "_id": "65405bf80271fae988e46c44"
        }
      ],
      "prerequisites": [
        {
          "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
          "_id": "65405bf80271fae988e46c45"
        },
        {
          "title": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          "_id": "65405bf80271fae988e46c46"
        },
        {
          "title": "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
          "_id": "65405bf80271fae988e46c47"
        }
      ],
      "courseData": [
        {
          "title": "Lorem Ipsum",
          "description": "desc Lorem Ipsum",
          "videoUrl": "hyerkjd23",
          "videoLength": 12,
          "links": [
            {
              "title": "link video 1",
              "url": "https://www.youtube.com/watch?v=kf6yyxMck8Y&t=16705s&ab_channel=Becodemy",
              "_id": "65405bf80271fae988e46c49"
            }
          ],
          "_id": "65405bf80271fae988e46c48",
          "questions": []
        },
        {
          "title": "Dolor Amet",
          "description": "desc Dolor Amet",
          "videoUrl": "aaassddff",
          "videoLength": 18,
          "links": [
            {
              "title": "link video 2",
              "url": "https://www.youtube.com/watch?v=kf6yyxMck8Y&t=16705s&ab_channel=Becodemy",
              "_id": "65405bf80271fae988e46c4b"
            }
          ],
          "_id": "65405bf80271fae988e46c4a",
          "questions": []
        }
      ],
      "ratings": 0,
      "purchased": 0,
      "reviews": [],
      "createdAt": "2023-10-31T01:44:24.939Z",
      "updatedAt": "2023-10-31T01:44:24.939Z",
      "__v": 0
    }
  ]
}
```

Response Body (Failed) :

```json
{
  "success": false,
  "message": "jwt expired",
  "data": null
}
```

## Get Course Content Already Purchased by User

Endpoint : GET /api/v1/course/content/{course_id

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
      "title": "Lorem Ipsum",
      "description": "desc Lorem Ipsum",
      "videoUrl": "hyerkjd23",
      "videoLength": 12,
      "links": [
        {
          "title": "link video 1",
          "url": "https://www.youtube.com/watch?v=kf6yyxMck8Y&t=16705s&ab_channel=Becodemy",
          "_id": "65405bf80271fae988e46c49"
        }
      ],
      "_id": "65405bf80271fae988e46c48",
      "questions": []
    },
    {
      "title": "Dolor Amet",
      "description": "desc Dolor Amet",
      "videoUrl": "aaassddff",
      "videoLength": 18,
      "links": [
        {
          "title": "link video 2",
          "url": "https://www.youtube.com/watch?v=kf6yyxMck8Y&t=16705s&ab_channel=Becodemy",
          "_id": "65405bf80271fae988e46c4b"
        }
      ],
      "_id": "65405bf80271fae988e46c4a",
      "questions": []
    }
  ]
}
```

Response Body (Failed) :

```json
{
  "success": false,
  "message": "jwt expired",
  "data": null
}
```

## Add Question

Endpoint : PUT /api/v1/course/content/question

Request Header :

- Cookie :
  access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMTMyNjE5fQ.R2X5UTbEDn-pqEdHw2KYcw0ZcDHCMFynpKzfD-Y-Ruk;
  refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMjE4NzE5fQ.xkM0W2LETb0dt2dEQgFWRsJyGM5r3kIuPptn4NUf0Yc

Request Body :
```json
{
    "question" : "Will i get the source code of this course ?",
    "course_id" : "6539bb6c52c946c5694175e6",
    "content_id" : "6539bb6c52c946c5694175ed"
}
```

Response Body (Success) :

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "title": "Lorem Ipsum",
    "description": "desc Lorem Ipsum",
    "videoUrl": "hyerkjd23",
    "videoLength": 12,
    "links": [
      {
        "title": "link video 1",
        "url": "https://www.youtube.com/watch?v=kf6yyxMck8Y&t=16705s&ab_channel=Becodemy",
        "_id": "65405bf80271fae988e46c49"
      }
    ],
    "_id": "65405bf80271fae988e46c48",
    "questions": [
      {
        "user": {
          "_id": "6539b9b352c946c5694175dd",
          "name": "afdul rohmat",
          "email": "afdulrohmat03@gmail.com",
          "role": "admin",
          "isVerified": "false",
          "courses": [
            {
              "_id": "6539bb6c52c946c5694175e6"
            },
            {
              "_id": "65405bf80271fae988e46c41"
            }
          ],
          "createdAt": "2023-10-26T00:58:27.367Z",
          "updatedAt": "2023-11-28T01:35:35.013Z",
          "__v": 4
        },
        "question": "Will i get the source code of this course ?",
        "questionReplies": [],
        "_id": "656544b0dd37f380d0daa8f2"
      }
    ]
  }
}
```

Response Body (Failed) :

```json
{
  "success": false,
  "message": "jwt expired",
  "data": null
}
```

## Reply Question

Endpoint : PUT /api/v1/course/content/reply-question

Request Header :

- Cookie :
  access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMTMyNjE5fQ.R2X5UTbEDn-pqEdHw2KYcw0ZcDHCMFynpKzfD-Y-Ruk;
  refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMjE4NzE5fQ.xkM0W2LETb0dt2dEQgFWRsJyGM5r3kIuPptn4NUf0Yc

Request Body :
```json
{
  "reply": "yes, this is the very beginning part of the playlist",
  "course_id": "652980ddc4ded8210eca4342",
  "content_id": "652983563fd86b8276110c2b",
  "question_id": "6530fcda7c964cc4841cadac"
}
```

Response Body (Success) :

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "_id": "65405bf80271fae988e46c41",
    "name": "MERN STACK LMS",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "price": 29,
    "estimatedPrice": 80,
    "tags": "MRN,LMS,node js,next13,typescript",
    "level": "Intermediate",
    "demoUrl": "https://www.youtube.com/watch?v=kf6yyxMck8Y&t=16705s&ab_channel=Becodemy",
    "benefits": [
      {
        "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        "_id": "65405bf80271fae988e46c42"
      },
      {
        "title": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        "_id": "65405bf80271fae988e46c43"
      },
      {
        "title": "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
        "_id": "65405bf80271fae988e46c44"
      }
    ],
    "prerequisites": [
      {
        "title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        "_id": "65405bf80271fae988e46c45"
      },
      {
        "title": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        "_id": "65405bf80271fae988e46c46"
      },
      {
        "title": "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
        "_id": "65405bf80271fae988e46c47"
      }
    ],
    "courseData": [
      {
        "title": "Lorem Ipsum",
        "description": "desc Lorem Ipsum",
        "videoUrl": "hyerkjd23",
        "videoLength": 12,
        "links": [
          {
            "title": "link video 1",
            "url": "https://www.youtube.com/watch?v=kf6yyxMck8Y&t=16705s&ab_channel=Becodemy",
            "_id": "65405bf80271fae988e46c49"
          }
        ],
        "_id": "65405bf80271fae988e46c48",
        "questions": [
          {
            "user": {
              "_id": "6539b9b352c946c5694175dd",
              "name": "afdul rohmat",
              "email": "afdulrohmat03@gmail.com",
              "role": "admin",
              "isVerified": "false",
              "courses": [
                {
                  "_id": "6539bb6c52c946c5694175e6"
                },
                {
                  "_id": "65405bf80271fae988e46c41"
                }
              ],
              "createdAt": "2023-10-26T00:58:27.367Z",
              "updatedAt": "2023-11-28T01:35:35.013Z",
              "__v": 4
            },
            "question": "Will i get the source code of this course ?",
            "questionReplies": [
              {
                "user": {
                  "_id": "6539b9b352c946c5694175dd",
                  "name": "afdul rohmat",
                  "email": "afdulrohmat03@gmail.com",
                  "role": "admin",
                  "isVerified": "false",
                  "courses": [
                    {
                      "_id": "6539bb6c52c946c5694175e6"
                    },
                    {
                      "_id": "65405bf80271fae988e46c41"
                    }
                  ],
                  "createdAt": "2023-10-26T00:58:27.367Z",
                  "updatedAt": "2023-11-28T01:35:35.013Z",
                  "__v": 4
                },
                "reply": "yes, this is the very beginning part of the playlist"
              }
            ],
            "_id": "656544b0dd37f380d0daa8f2"
          }
        ]
      },
      {
        "title": "Dolor Amet",
        "description": "desc Dolor Amet",
        "videoUrl": "aaassddff",
        "videoLength": 18,
        "links": [
          {
            "title": "link video 2",
            "url": "https://www.youtube.com/watch?v=kf6yyxMck8Y&t=16705s&ab_channel=Becodemy",
            "_id": "65405bf80271fae988e46c4b"
          }
        ],
        "_id": "65405bf80271fae988e46c4a",
        "questions": []
      }
    ],
    "ratings": 0,
    "purchased": 0,
    "reviews": [],
    "createdAt": "2023-10-31T01:44:24.939Z",
    "updatedAt": "2023-11-28T01:40:30.108Z",
    "__v": 2
  }
}
```

Response Body (Failed) :

```json
{
  "success": false,
  "message": "jwt expired",
  "data": null
}
```

## Add Review on Course

Endpoint : PUT /api/v1/course/review/{course_id}

Request Header :

- Cookie :
  access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMTMyNjE5fQ.R2X5UTbEDn-pqEdHw2KYcw0ZcDHCMFynpKzfD-Y-Ruk;
  refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMjE4NzE5fQ.xkM0W2LETb0dt2dEQgFWRsJyGM5r3kIuPptn4NUf0Yc

Request Body :
```json
{
  "review" : "This is really good courses",
  "rating" : 4
}
```

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
  "message": "jwt expired",
  "data": null
}
```

## Add Reply to Review -- Only Admin Can Reply

Endpoint : PUT /api/v1/course/review/reply

Request Header :

- Cookie :
  access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMTMyNjE5fQ.R2X5UTbEDn-pqEdHw2KYcw0ZcDHCMFynpKzfD-Y-Ruk;
  refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjUzNmFhZjk2ZjM1OTlhYzI2NTQ3ZSIsImlhdCI6MTcwMTEzMjMxOSwiZXhwIjoxNzAxMjE4NzE5fQ.xkM0W2LETb0dt2dEQgFWRsJyGM5r3kIuPptn4NUf0Yc

Request Body :
```json
{
  "comment" : "Thank you",
  "course_id" : "652980ddc4ded8210eca4342",
  "review_id" : "653723500274e3afaa720411"
}
```

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
  "message": "jwt expired",
  "data": null
}
```

## Delete Course -- Only Admin

Endpoint : DELETE /api/v1/course/{course_id}

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
  "data": null
}
```

Response Body (Failed) :

```json
{
  "success": false,
  "message": "jwt expired",
  "data": null
}
```