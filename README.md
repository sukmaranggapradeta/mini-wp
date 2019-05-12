# Mini - WP http://miniwp.sukmaranggapradeta.com/

### Register :
```sh
URL: http://127.0.0.1:3000/users/register
METHOD : POST
Authenticated Required : NO
Authorized Required : NO
Data Input :
    {
        name: "nobita",
        email: "nobita@mail.com",
        password: "nobita"
    }
Response Status : 201
Data Output :
    {
        "_id": "5ccf109c227c7e1387ab12f1",
        "name": "nobita",
        "email": "nobita@mail.com",
        "password": "$2a$10$BwEf3Bwsa8PJfliNr7UVOOoHPU0z8ucUdyt9JyJzM4KU3hdTwxHTW",
        "__v": 0
    }

Response Status : 400 Bad Request
Output :
    "User validation failed: name: Name is required, email: Email is required, password: Password is required"
    
Response Status : 500
Output :
    "Internal Server Error"
```


### Login :

```sh
URL: http://127.0.0.1:3000/users/login
METHOD : POST
Authenticated Required : NO
Authorized Required : NO
Data Input :
    {
        email: "naruto@gmail.com",
        password: "naruto"
    }
Response Status : 200
Data Output :
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZDY2MjM1YjM5NWYxNDNmNzU5YzY3YiIsImVtYWlsIjoibmFydXRvQGdtYWlsLmNvbSIsImlhdCI6MTU1NzYxOTUwNywiZXhwIjoxNTU3NzA1OTA3fQ.ybuqEKrYVIzCJBGP6QjzD1Lcrd-lS08q5BOwNtnNFCo",
        "currentUser": {
            "userId": "5cd66235b395f143f759c67b",
            "name": "naruto",
            "email": "naruto@gmail.com"
        }
    }
    
Response Status : 400 Bad Request
Output :
    {
        "err": "email/password wrong!"
    }

Response Status : 500
Output :
    "Internal Server Error"
```

### list User :

```sh
http://127.0.0.1:3000/users
METHOD : GET
Authenticated Required : NO
Authorized Required : NO

Response Status : 200
[
    {
        "_id": "5cd66235b395f143f759c67b",
        "name": "naruto",
        "email": "naruto@gmail.com",
        "password": "$2a$10$NrYHAA94S/uCtYl2VsGqz.pbXqPqMbYtx.HyiaRbyMxy4VMu6JAoe",
        "__v": 0
    },
    {
        "_id": "5cd76100aaa5a74b2da055f6",
        "name": "nobita",
        "email": "nobita@gmail.com",
        "password": "$2a$10$.rsdx6VQImhJZ/e6hdgSAOtImrilnlGc80XU2RozzqfGzuBQr944i",
        "__v": 0
    },
    {...},{...}
]

Response Status : 500
Output :
    "Internal Server Error"
```

### Find Email :

```sh
http://127.0.0.1:3000/users/findEmail/naruto@gmail.com
METHOD : GET
Authenticated Required : NO
Authorized Required : NO

Response Status : 200
    {
        "_id": "5cd66235b395f143f759c67b",
        "name": "naruto",
        "email": "naruto@gmail.com",
        "password": "$2a$10$NrYHAA94S/uCtYl2VsGqz.pbXqPqMbYtx.HyiaRbyMxy4VMu6JAoe",
        "__v": 0
    }

Response Status : 500
Output :
    "Internal Server Error"
```
### list Articles:

```sh
http://localhost:3000/articles
METHOD : GET
Authenticated Required : NO
Authorized Required : NO
Response Status : 200
[
    {
        "_id": "5cd6d56b2fc1c94b08fde8c9",
        "title": "naruto21",
        "content": "nartuo211111111",
        "created_at": "2019-05-11T14:00:11.801Z",
        "author": {
            "_id": "5cd66235b395f143f759c67b",
            "name": "naruto",
            "email": "naruto@gmail.com",
            "password": "$2a$10$NrYHAA94S/uCtYl2VsGqz.pbXqPqMbYtx.HyiaRbyMxy4VMu6JAoe",
            "__v": 0
        },
        "featured_image": "",
        "__v": 0
    },
    {...},{...},{...}
]

Response Status : 500
Output :
    "Internal Server Error"
```

### Create Article :

```sh
http://localhost:3000/articles
METHOD : POST
Authenticated Required : YES
Authorized Required : NO

Data Input :
    {
        title: "Naruto Shipuden",
        content: "Cerita naruto shipuden",
        auhtor: <UserId>
        featured_image: <image>
    }
    
Response Status : 200
Data Output :
    {
        "_id": "5cd767ebaaa5a74b2da055fc",
        "title": "Naruto Shipuden",
        "content": "ini content ceritanya",
        "author": {
            "_id": "5cd66235b395f143f759c67b",
            "name": "naruto",
            "email": "naruto@gmail.com",
            "password": "$2a$10$NrYHAA94S/uCtYl2VsGqz.pbXqPqMbYtx.HyiaRbyMxy4VMu6JAoe",
            "__v": 0
        },
        "featured_image": "ini image",
        "__v": 0
    }
    
Response Status : 400 Bad Request
Output :
    "Article validation failed: title: Title is required, content: Conten is required"
    
Response Status : 400 Bad Request
Output :
    "Token wrong!"

Response Status : 500
Output :
    "Internal Server Error"
```

### Delete Article :

```sh
http://localhost:3000/articles/5cd6d56b2fc1c94b08fde8c9
METHOD : DELETE
Authenticated Required : YES
Authorized Required : YES

Response Status : 200
    {
        "_id": "5cd6d56b2fc1c94b08fde8c9",
        "title": "naruto21",
        "content": "nartuo211111111",
        "created_at": "2019-05-11T14:00:11.801Z",
        "author": "5cd66235b395f143f759c67b",
        "featured_image": "image",
        "__v": 0
    }

Response Status : 404
Output :
    {
        "msg": "You dont have access"
    }
    
Response Status : 400 Bad Request
Output :
    "Token wrong!"
    
Response Status : 500
Output :
    "Internal Server Error"
```

### Update Article :

```sh
http://localhost:3000/articles/5cd6d56b2fc1c94b08fde8c9
METHOD : PUT
Authenticated Required : YES
Authorized Required : YES

Response Status : 200
    "Success"

Response Status : 404
Output :
    {
        "msg": "You dont have access"
    }
    
Response Status : 400 Bad Request
Output :
    "Token wrong!"

Response Status : 500
Output :
    "Internal Server Error"
```

```
Mini WP License
----
**Free Software, Yeah!**
