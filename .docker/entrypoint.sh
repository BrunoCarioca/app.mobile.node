#!/bin/bash

npm install
npm run typeorm -- -d ./src/shared/infra/typeorm/index.ts migration:run
# desenvolvimento
#npm run dev
# produção
npm run build
node dist/shared/infra/http/server.js
