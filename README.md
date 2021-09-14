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

