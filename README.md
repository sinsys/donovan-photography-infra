- [donovan-infra](#donovan-infra)
  - [Getting Started](#getting-started)
  - [Testing](#testing)
  - [Architecture](#architecture)
    - [Databases](#databases)
      - [Projects](#projects)
    - [Functions](#functions)
      - [Lambdas](#lambdas)
        - [Get Photo](#get-photo)
        - [Delete Photo](#delete-photo)
        - [Get Project](#get-project)
        - [Delete Project](#delete-project)
        - [Create Project](#create-project)
        - [Update Project](#update-project)
    - [API Gateway](#api-gateway)
      - [Projects API](#projects-api)
  - [Contributing](#contributing)
  - [Made With](#made-with)

# donovan-infra
This repository handles all of the back-end deployment necessary for Donovan Photography.

## Getting Started
1. Install dependencies
```bash
npm ci
```

2. Create initial bucket for resources to live:
> This command only needs to be run once for each **AWS account OR region**.  
> It will create the S3 bucket to store all resources used for CDK.
```bash
cdk bootstrap
```

## Testing
Testing is done with [Jest](https://jestjs.io/docs/getting-started) and the [AWS CDK Assertion Library](https://www.npmjs.com/package/@aws-cdk/assert).

```bash
npm t
```

## Architecture
Here is a brief run down of the architecture this repository will deploy

### Databases
#### Projects
This database serves as a symbolic link between user accounts and S3 storage locations for photos and media
> Schema: TBD

### Functions
#### Lambdas
##### Get Photo
> This retrieves a photo from S3 storage
##### Delete Photo
> This deletes a photo from S3 storage
##### Get Project
> This retrieves a project's details from S3 storage
##### Delete Project
> This deletes a project from S3 storage
##### Create Project
> This creates a new project
##### Update Project
> This updates an existing project

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

## Contributing
Contact [@sinsys](https://github.com/sinsys)

## Made With
 - will fill out when finalized