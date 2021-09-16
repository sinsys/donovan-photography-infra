- [donovan-infra](#donovan-infra)
  - [Getting Started](#getting-started)
  - [Testing](#testing)
  - [Architecture](#architecture)
    - [Database](#database)
      - [Projects](#projects)
    - [Storage](#storage)
      - [Photos Bucket](#photos-bucket)
    - [Users](#users)
      - [User Pool](#user-pool)
    - [Functions](#functions)
      - [Lambdas](#lambdas)
        - [getPhoto](#getphoto)
        - [deletePhoto](#deletephoto)
        - [getProject](#getproject)
        - [deleteProject](#deleteproject)
        - [createProject](#createproject)
        - [updateProject](#updateproject)
    - [API Gateway](#api-gateway)
      - [Projects API](#projects-api)
  - [Contribution](#contribution)
  - [Attributions](#attributions)

# donovan-infra

This repository handles all of the back-end deployment necessary for Donovan Photography.

## Getting Started

1. Install dependencies

```bash
npm ci
```

2. Create initial bucket for resources to live:  
   This command only needs to be run once for each **AWS account OR region**.  
   It will create the S3 bucket to store all resources used for CDK.

```bash
cdk bootstrap
```

3. Setup environment variables  
   A sample environment file has been provided for tests. These values will need to be populated when in a runtime. One option is to create a local `.env` file to populate the variables.  
   During CI/CD deployment, these variables should be configured on your build agent.
   > -**_DO NOT COMMIT YOUR SECRETS_**-
   >
   > **Disclaimer**: Execution will fail immediately if any environment variables are missing or are the incorrect type.

## Testing

Testing is done with [Jest](https://jestjs.io/docs/getting-started) and the [AWS CDK Assertion Library](https://www.npmjs.com/package/@aws-cdk/assert).

```bash
npm t
```

## Architecture

Here is a brief run down of the architecture this repository will deploy

### Database

[Dynamo DB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) will be used as a storage mechanism for relating S3 contents to Cognito user pools <tbd>

#### Projects

This database serves as a symbolic link between user accounts and S3 storage locations for photos and media

> Schema: TBD

### Storage

[Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html) will serve as a mechanism to store photos uploaded for clients <tbd>

#### Photos Bucket

tbd

### Users

[Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html) will serve as an authentication protocol to grant access to purchased content <tbd>

#### User Pool

tbd

### Functions

#### Lambdas

##### getPhoto

This retrieves a photo from S3 storage

##### deletePhoto

This deletes a photo from S3 storage

##### getProject

This retrieves a project's details from S3 storage

##### deleteProject

This deletes a project from S3 storage

##### createProject

This creates a new project

##### updateProject

This updates an existing project

### API Gateway

#### Projects API

This API has 6 resources available:

```bash
 - GET     /projects/{id}
 - DELETE  /projects/{id}
 - POST    /projects/{id}
 - PUT     /projects/{id}
 - GET     /projects/{id}/{photoId}
 - DELETE  /projects/{id}/{photoId}
```

> You can view mapping at `src/api-gateway/lambdas.ts`

## Contribution

Want to use this? Like the style? Want to work together? Contact below.

## Attributions

Author - [Nicholas Hazel](https://github.com/sinsys)
