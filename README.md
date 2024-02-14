# node-jwtAuthenticator
`node-jwt-authenticator` provides authentication in web applications to ensure users have a secure and personalized experience. Encrypting and signing the contained information provides guarantees that the information has not been tampered with and is trustworthy.

## Goal

JSON Web Token is a way of securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret or a public/private key. JWTs protect against data tampering and impersonation. 

**How JWT Works**

JSON Web Tokens consist of three parts separated by dots (.), which are:
- Header
- Payload
- Signature

Therefore, a JWT typically looks like the following.

`xxxxx.yyyyy.zzzzz`

Let's break down the different parts.

- **Header**

The header typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA.

For example:

`{
  "alg": "HS256",
  "typ": "JWT"
}`

Then, this JSON is Base64Url encoded to form the first part of the JWT.

- **Payload**

The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public, and private claims.

An example payload could be:

`{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}`

The payload is then Base64Url encoded to form the second part of the JSON Web Token.

> [!CAUTION]
> Do note that for signed tokens this information, though protected against tampering, is readable by anyone. Do not put secret information in the payload or header elements of a JWT unless it is encrypted.

- **Signature**

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.

The signature is used to verify the message wasn't changed along the way, and, in the case of tokens signed with a private key, it can also verify that the sender of the JWT is who it says it is.

## Usage

## features
- JSON Web Tokens
- Custom error-handler classes
- Custom error-handler middleware
- Custom not-found middleware

## ⚙️ Installation

- Open CMD
  
- Change directory to desktop

  `cd desktop`
   
- Clone this repository

  `git clone git@github.com:backendkolawole/node-jwt-authenticator.git`

- Change the current directory

  `cd node-jwt-authenticator`
  
- Install packages

  `npm install`

- Create a `.env` file in the root directory

  - Set up the `MONGO_URI` variable equal to the DB connection string
  - Set up the `PORT` variable
  - Set up `JWT_SECRET` in .env file

> [!IMPORTANT]
>  `JWT_SECRET` is a string or buffer containing the secret key for verifying the token's signature.

- Run the server

  `npm start`
  

## Authenticate Requests
Use the authentication middleware to authenticate requests.

For example:

```
myapp/middleaware/auth.js
------

require('dotenv').config()
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors/index')


const authenticationMiddleware = async (req, res, next)=> {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('No token provided')
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = { id, username }
        next()
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }
}


module.exports = authenticationMiddleware

```

```
myapp/routes/routes.js
----
const express = require('express')
const router = express.Router()
const { login, dashboard } = require('../controllers/main')
const authenticationMiddleware = require('../middleware/auth')

router.route('/login').post(login)
router.route('/dashboard').get(authenticationMiddleware, dashboard)


module.exports = router

```

**Endpoints**

when the user successfully logs in using their credentials, a JSON Web Token will be returned.

Each subsequent request will include the JWT in the Authorization header using the Bearer schema, allowing the user to access routes, services, and resources that are permitted with that token

The content of the header should look like the following:

`Authorization: Bearer <token>`

The server's protected routes will check for a valid JWT in the Authorization header, and if it's present, the user will be allowed to access protected resources. 

**POST [project_url]/api/v1/login**

- Payload
  - username
  - password

- Possible responses

```
200 (OK)

{
    "msg": "username logged in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidXNlcm5hbWUiLCJpYXQiOjE3MDc5MTE0MTcsImV4cCI6MTcwODA4NDIxN30.hu-miLSYTAJXd90s7Rn8-lhpL3n9jTLXMLqgtRZ6bds"
}

400 (Bad Request)

{
    "msg": "Please provide username and password"
}

```

**GET [project_url]/api/v1/dashboard**
- Possible responses

```
200 (OK)

Hello username, your lucky number is 81


401 (Unauthorized)

{
    "msg": "Not authorized to access this route"
}

401 (Unauthorized)

{
    "msg": "No token provided"
}

```
