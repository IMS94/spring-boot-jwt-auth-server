# Spring Boot REST API JWT Authentication with an external Authorization Server

_**keywords**_: Spring Boot, REST API, JWT, Authentication, Authorization Server, OAuth2 Resource Server

## Overview

This is a demo to show how we can use the Spring Boot's OAuthResourceServer's `jwt` authentication to protect a REST API 
using OpenID/OAuth2 tokens (ID Tokens/JWT) obtained from an external authorization server.
* `frontend` directory contains the example frontend

## Getting Started

1. Run the following command to build the backend
```bash
./mvnw clean install -DskipTests
```
2. Start the `JwtAuthIdentityProviderApplication` main class to start the REST API. It will start at http://localhost:8080
3. Run the following command to build and start the frontend (within the `frontend` directory):
```bash
npm install
npm start
```
The frontend React.js app will start at http://localhost:3000

## Authorization Code Flow

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
    Auth ->> SPA: id_token (optionally an access_token)
    
    deactivate Auth
    SPA ->> SPA: validate id_token
    SPA ->> SPA: login user to the app
    SPA -->> User: show functionalities
    
    deactivate SPA
    deactivate User
```

## Invoking the backend REST API

```mermaid
sequenceDiagram
    autonumber
    
    actor User
    participant SPA as Single Page Application<br/>(Browser)
    participant API as Backend REST API
    participant Auth as Authorization Server
    
    activate User
    activate SPA
    
    User ->> SPA: list products
    SPA ->> API: GET https://api.com/products
    Note right of SPA: Include authorization header<br/>Authorization: Bearer ${id_token}

    rect rgb(191, 223, 255)
    API ->> API: validate JWT in "Authorization" header
    API ->> Auth: get JWKS from authorization server<br/>https://auth-server.com/jwks
    Note over API, Auth: Obtaining JWKS is a one time task<br/>and will be cached for future usage
    Auth ->> API: JWKS (Json Web Key Set)
    
    API ->> API: Validate
    end

```