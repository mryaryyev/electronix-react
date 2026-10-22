#!/bin/bash

# PRODUCTION
git reset --hard
git checkout main
git pull origin main

command -v yarn >/dev/null || npm i yarn -g
yarn global add serve
yarn
yarn run build
pm2 start "yarn run start:prod" --name=ELECTRONIX-REACT


# DEVELOPMENT
# git reset --hard
# git checkout develop
# git pull origin develop

# yarn
# pm2 start "yarn dev" --name=ELECTRONIX-REACT