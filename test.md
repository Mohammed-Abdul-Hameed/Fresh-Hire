# Register

POST /api/auth/register

``
{
    "name": "Recruiter6",
    "email": "recruiter6@example.com",
    "password": "1234567",
    "role": "recruiter"
}
``

## Login

POST /api/auth/login

``
{"email": "recruiter3@example.com",
"password": "1234567"
}
``

``
{
    "_id": "688789b931f61508b58e9158",
    "name": "Recruiter6",
    "email": "recruiter6@example.com",
    "role": "recruiter",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODc4OWI5MzFmNjE1MDhiNThlOTE1OCIsImlhdCI6MTc1MzcxMzA4MSwiZXhwIjoxNzU0MzE3ODgxfQ.JcEGK_1O-wcv_5KHKR4Yy6-YTDVZIvodBJ2VozJYYRM"
}
``

