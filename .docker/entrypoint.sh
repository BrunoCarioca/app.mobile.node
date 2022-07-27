#!/bin/bash

yarn install
yarn typeorm migration:run
yarn dev
