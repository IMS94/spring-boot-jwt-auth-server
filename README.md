# Spring Boot REST API JWT Authentication with an external Authorization Server

_**keywords**_: Spring Boot, REST API, JWT, Authentication, Authorization Server, OAuth2 Resource Server

## Overview

**NOTE:** See the original article at [**JWT Authentication with OAuth2 Resource Server and an external Authorization Server**](https://medium.com/geekculture/jwt-authentication-with-oauth2-resource-server-and-an-external-authorization-server-2b8fd1524fc8)

This is a demo to show how we can use the Spring Boot's OAuthResourceServer's `jwt` authentication to protect a REST API
using OIDC/OAuth2 tokens (Access Tokens/JWT) obtained from an external authorization server.
* `frontend` directory contains the example frontend

## Getting Started

### Backend
1. Run the following command to build the backend
```bash
./mvnw clean install -DskipTests
```
2. Start the `JwtAuthIdentityProviderApplication` main class to start the REST API. It will start at http://localhost:8080

### Frontend (React.js Example)
1. Run the following command to build and start the frontend (within the `frontend` directory):
```bash
npm install
npm start
```
The frontend React.js app will start at http://localhost:3000

## Solution Overview

### Authorization Code Flow

```mermaid
sequenceDiagram
    actor User
    participant SPA as Single Page Application<br/>(Browser)
    participant Auth as Authorization Server
    
    activate User
    activate SPA
    User -->> SPA: open web application
    SPA ->> SPA: show login page
    
    User -->> SPA: click "login"
    
    activate Auth
    SPA ->> Auth: redirect to auth server<br/>https://auth-server.com/authorize
    Note over SPA,Auth: this redirect contains the "grant_type" and<br/>requested "scopes"
    Auth ->> Auth: show login page
    User -->> Auth: login
    Auth ->> SPA: redirect to SPA<br/>https://webapp.com/auth-callback?code=xxxx
    Note over SPA, Auth: the redirect URI has the authorization code<br/>as a query parameter
    
    SPA ->> Auth: get access token<br/>https://auth-server.com/token
    Note right of SPA: /token request includes the "auth code" received
    Auth ->> SPA: id_token and access_token
    
    deactivate Auth
    SPA ->> SPA: validate id_token
    SPA ->> SPA: login user to the app
    SPA -->> User: show functionalities
    
    deactivate SPA
    deactivate User
```

### Invoking the backend REST API

```mermaid
sequenceDiagram
    autonumber
    
    actor User
    participant SPA as Single Page Application<br/>(Browser)
    participant Filter as OAuth2 Resource Server<br>(Backend)
    participant API as Product REST API<br>(Backend)
    participant Auth as Authorization Server<br>(External)
    
    activate User
    activate SPA
    
    User -->> SPA: list products
    
    activate Filter
    
    SPA ->> Filter: GET https://api.com/products
    Note right of SPA: Include authorization header<br/>Authorization: Bearer ${access_token}
    
    Filter ->> Filter: validate JWT in "Authorization" header
    
    activate Auth
    rect rgb(191, 223, 255)
    Filter ->> Auth: get JWKS from authorization server<br/>https://auth-server.com/jwks
    Note over Filter,Auth: Obtaining JWKS is a one time task<br/>and will be cached for future usage
    Auth ->> Filter: JWKS (Json Web Key Set)
    end
    deactivate Auth
    
    alt JWT valid
        activate API
        Filter ->> API: Forward to /products service
        API ->> API: Fetch products from DB
        API ->> SPA: products list
        deactivate API
        SPA -->> User: show product list
    else JWT not valid
        Filter ->> SPA: Unauthorized
        SPA -->> User: show not permitted error
    end
    
    deactivate Filter
    
    deactivate User
    deactivate SPA

```
