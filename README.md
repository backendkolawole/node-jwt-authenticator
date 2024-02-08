# node-jwtAuthenticator
node-jwtAuthenticator provides authentication in web applications to ensure users have a secure and personalized experience. Encrypting and signing the contained information provides guarantees that the information has not been tampered with and is trustworthy.

## Motivation


## Goal

JWTs protect against data tampering and impersonation. JSON Web Token is a way of securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret or a public/private key

## ⚙️ Installation

## Usage

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

**Documentation**

when the user successfully logs in using their credentials, a JSON Web Token will be returned.

Each subsequent request will include the JWT in the Authorization header using the Bearer schema, allowing the user to access routes, services, and resources that are permitted with that token

The content of the header should look like the following:

`Authorization: Bearer <token>`

The server's protected routes will check for a valid JWT in the Authorization header, and if it's present, the user will be allowed to access protected resources. 

## Contact
