# google-cloud-node-cluster

Run a Node.js Cluster with Express on Google Cloud Platform.

## Setup
1. Install [Google Cloud SDK](https://cloud.google.com/sdk/downloads)
2. Create a project on [Google Cloud Platform](https://console.cloud.google.com) and note down the Project ID
3. Enable [Google Cloud Platform > Billing](https://console.cloud.google.com/billing)
4. If using Travis CI:
    1. Create an account on [Travis CI](https://travis-ci.org/) and activate your repository
    2. Enable [Google Cloud Platform > Google App Engine Admin API](https://console.cloud.google.com/apis/api/appengine/overview)
    3. Create a service account on [Google Cloud Platform > IAM](https://console.cloud.google.com/iam-admin/serviceaccounts) with Project > Editor role and download the JSON private key
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

#### Command Line
Replace GOOGLE-CLOUD-PLATFORM-PROJECT-ID with your Project ID and execute the following command.
```
export ENVIRONMENT=prod && export PROJECT=GOOGLE-CLOUD-PLATFORM-PROJECT-ID && export VERSION=$(node -p -e "require('./package').version") && export VERSION=${VERSION//[^[:alnum:]^-]} && npm run deploy
```

#### Travis CI
Add `[deploy]` to you git commit message.
