# AWS Amplify Project

## Setting up the amplify Project

- Run `amplify pull --appId d2h02p5qpcwsgr --envName dev` to pull dev environment configuration

## Lists all the environments

- Run `amplify env list` to list all the environments associated with your Amplify project

## Checkout environments

- Run `amplify env checkout dev` to move your environment to the environment specified in the command

## Get details of an amplify environment

- Run `amplify env get --name dev` to get details of an Amplify environments

## Adding a new environment

- Run `amplify env add prod` to add a new environment

## Amplify Setup Commands

- Run `amplify status` will show you what you've added already and if it's locally configured or deployed

- Run `amplify add <category>` will allow you to add features like user login or a backend API

- Run `amplify push` will build all your local backend resources and provision it in the cloud

- Run `amplify console` to open the Amplify Console and view your project status

- Run `amplify publish` will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud
