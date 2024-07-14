#!/usr/bin/env bash

set -euxo pipefail

if [[ "$@" == *"--clean" ]]; then
  echo "Removing app artifacts..."
  echo "Removing node_modules..."
  rm -rf node_modules
  echo "Removing android and ios directories..."
  rm -rf android ios
fi

yarn install

ANDROID_DIR=android
IOS_DIR=ios

if [[ ! -d ${ANDROID_DIR} || ! -d ${IOS_DIR} ]]; then
  echo "android and/or ios directory does not exist. Performing prebuild.."
  npx expo prebuild
fi