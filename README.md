# SkillHunt Web

SkillHunt React SSR application.

## Environments

- [Stage environment](https://d35r9h8hqd5b12.cloudfront.net/)
- [Prod environment](https://dqb3ejqwotj5e.cloudfront.net/) or [SkillHunt](https://skillhunt.codrixtech.com)

## Available Scripts

### Run Application Locally

Run `npm run dev` to run the application locally.

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Dev Build

Run `npm run build:dev` to generate a dev build

Run `npm run start` to run the dev build

### Prod Build

Run `npm run build:prod` to generate a dev build

Run `npm run start` to run the dev build

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### Create S3 bucket in CLI

-Run `aws s3 mb <target> s3://<bucket-name>/`
-Run `aws s3api create-bucket --bucket <Bucket Name> --region <Region> --create-bucket-configuration LocationConstraint=<Region>`

### List S3 bucket in CLI

-Run `aws s3 ls`
-Run `aws s3api list-buckets`

### Upload file in S3 in CLI

-Run `aws s3 cp <File path> s3://<bucket-name>/`

### Delete objects

-Run `aws s3 rm  <target> s3://<bucket-name>/`

### Create Distribution:

Open a new json file(FILE NAME)

-Run `aws cloudfront create-distribution --origin-domain-name <ORIGIN-NAME> --default-root-object index.html ><FILE-NAME>`

### Update Distribution:

-Run `aws cloudfront update-distribution --id <ID> --default-root-object index.html`

### Get Distribution:

-Run `aws cloudfront get-distribution --id <DISTRIBUTION ID>`

### List Distribution:

-Run `aws cloudfront list-distributions`

### Get-distribution-config:

-Run `aws cloudfront get-distribution-config --id <DISTRIBUTION ID>`

### create-invalidation

-Run `aws cloudfront create-invalidation --distribution-id <DISTRIBUTION ID> --paths "/*"`
SEO and Bots: If SEO is important, consider implementing server-side rendering properly using a service like AWS Lambda@Edge or hosting your app on a server that can handle SSR.
Security Headers: Ensure that you're serving your content with the appropriate security headers to protect against common web vulnerabilities.
HTTPS Configuration: Make sure your CloudFront distribution is properly configured to use HTTPS, and that your SSL/TLS certificates are valid.

https://chatgpt.com/share/66f4bf39-6660-8004-a6d3-a0853f683fb8