# donovan-infra
Infrastructure for Donovan Photography

## Getting Started
1. Install dependencies
```bash
npm install
```

2. Create initial bucket for resources to live:
```bash
cdk bootstrap
```

> This command only needs to be run once for each AWS account or region.  
> It will create the S3 bucket to store all resources used for CDK.

## Deployment Pattern

1. Compile JavaScript from TS (no emit, just Type checking)
  - > `tsc`
2. Bundle Lambda functions with webpack
  - > `webpack`
3. Execute all unit tests
  - > `jest`
4. Deploy stacks
  - > `cdk`
