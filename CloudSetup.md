# SkillHunt Web Cloud Setup

## Prod Setup

### Create S3 bucket

- Run `aws s3api create-bucket --bucket skillhunt-web-prod --region ap-south-1 --create-bucket-configuration LocationConstraint=ap-south-1 --profile codrix-lead` to create S3 bucket in Prod environment

### Create CloudFront Distribution:

-Run `aws cloudfront create-distribution --origin-domain-name <ORIGIN-NAME> --default-root-object index.html ><FILE-NAME>`

- Run `aws cloudfront create-distribution --distribution-config file://cloudfront/prod.config.json --profile codrix-lead` to create a cloud front distribution
