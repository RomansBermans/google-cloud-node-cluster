# google-cloud-node-cluster [![Build Status](https://travis-ci.org/RomansBermans/google-cloud-node-cluster.svg?branch=master)](https://travis-ci.org/RomansBermans/google-cloud-node-cluster)

Run a Node.js Cluster with Restify on Google Cloud Platform.

## Setup

### Google Cloud Platform
1. Install [Google Cloud SDK](https://cloud.google.com/sdk/downloads)
2. Create a project on [Google Cloud Platform](https://console.cloud.google.com) and note down the Project ID
<br/><img src="https://cloud.githubusercontent.com/assets/358467/20582878/e34acaae-b1dc-11e6-85b6-5c3b1c694a69.png" width="511" />
3. If using Travis CI:
    1. Create an account on [Travis CI](https://travis-ci.org/) and activate your repository
    2. Enable [Google Cloud Platform > App Engine Admin API](https://console.cloud.google.com/apis/api/appengine/overview)
    3. Create a service account on [Google Cloud Platform > IAM](https://console.cloud.google.com/iam-admin/serviceaccounts) with Project > Editor role and download the JSON private key
    <br/><img src="https://cloud.githubusercontent.com/assets/358467/20593572/e0fa2134-b22a-11e6-8dbc-35a954f80bcb.png" width="640" />
    4. Rename the downloaded private key to `travis.server.prod.key.json` and save it in the `environment/private` folder
    5. Execute `gem install travis`
    6. Execute `travis login`
    7. Execute `tar cvf environment/private.tar -C environment/private . && travis encrypt-file environment/private.tar environment/private.tar.enc -f && rm -f environment/private.tar`
    8. Replace `encrypted_xxxxxxxxxxxx_key` and `encrypted_xxxxxxxxxxxx_iv` in the .travis.yml with the values generated in the previous step
    
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

### Command Line
Replace GOOGLE-CLOUD-PLATFORM-PROJECT-ID with your Project ID and execute the following command.
```
export ENVIRONMENT=prod && export PROJECT=GOOGLE-CLOUD-PLATFORM-PROJECT-ID && export VERSION=$(node -p -e "require('./package').version") && export VERSION=${VERSION//[^[:alnum:]^-]} && npm run deploy
```

### Travis CI
Add `[deploy]` to you git commit message.
