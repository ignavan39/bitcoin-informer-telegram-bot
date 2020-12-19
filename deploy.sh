#!/bin/sh

set -e

DEPLOY_USER_NAME=$(grep DEPLOY_USER_NAME .env | xargs)
DEPLOY_USER_NAME=${DEPLOY_USER_NAME#*=}
echo $DEPLOY_USER_NAME

DEPLOY_IP=$(grep DEPLOY_IP .env | xargs)
DEPLOY_IP=${DEPLOY_IP#*=}
echo $DEPLOY_IP

DEPLOY_KEY=$(grep DEPLOY_KEY .env | xargs)
DEPLOY_KEY=${DEPLOY_KEY#*=}


scp ./"${PWD##*/}" $DEPLOY_USER_NAME@$DEPLOY_IP:/app