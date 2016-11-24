# google-cloud-node-cluster [![Build Status](https://travis-ci.org/RomansBermans/google-cloud-node-cluster.svg?branch=master)](https://travis-ci.org/RomansBermans/google-cloud-node-cluster)

Run a Node.js Cluster on Google Cloud Platform.

## Setup

### Travis CI (optional)
1. Create an account on [Travis CI](https://travis-ci.org/) and activate your repository.
2. Create a private repository (e.g. google-cloud-node-cluster-environment) on GitHub where you will store your Google Cloud Platform private keys and settings.
3. Generate a [personal access token](https://github.com/settings/tokens) with `repo` scope on GitHub and add the `GITHUB_ACCESS_TOKEN` environment variable in the Travis CI repository settings.

### Google Cloud Platform
1. Install [Cloud SDK](https://cloud.google.com/sdk/downloads).
2. Create a project on [Google Cloud Platform](https://console.cloud.google.com) and save the `settings.json` file containing `{ "project": "GOOGLE-CLOUD-PLATFORM-PROJECT-ID" }` in the `environment/private/prod` folder.
<br/><img src="https://cloud.githubusercontent.com/assets/358467/20582569/18393e1a-b1da-11e6-826f-6e559e5db3a3.png" width="511" />
3. If using Travis CI:
    1. Create a service account on [Google Cloud Platform > IAM](https://console.cloud.google.com/iam-admin/serviceaccounts) with Project > Editor role and download the JSON private key.
    <br/><img src="https://cloud.githubusercontent.com/assets/358467/20582347/666189b4-b1d8-11e6-889f-c58a0a2c927a.png" width="872" />
    2. Rename the downloaded private key to `travis.server.key.json` and save it in the `environment/private/prod` folder in your private GitHub repository (e.g. google-cloud-node-cluster-environment).
    3. Save the `settings.json` file containing `{ "project": "GOOGLE-CLOUD-PLATFORM-PROJECT-ID" }` in the `environment/private/prod` folder in your private GitHub repository (e.g. google-cloud-node-cluster-environment).
    4. Enable [Google Cloud Platform > App Engine Admin API](https://console.cloud.google.com/apis/api/appengine/overview).


## Install
```
npm install
```

## Start
```
npm start
```

## Develop
```
npm run develop
```

## Test
```
npm test
```

## Deploy

### Travis CI (optional)
Add `[deploy]` to you git commit message.

### Command Line
```
export ENVIRONMENT=prod && export PROJECT=$(node -p -e "require('./environment/private/$ENVIRONMENT/settings').project") && export VERSION=$(node -p -e "require('./package').version") && export VERSION=${VERSION//[^[:alnum:]^-]} && npm run deploy
```
