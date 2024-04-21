FROM node:20.10.0-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json tsconfig.json turbo.json ./

COPY apps ./apps
COPY packages ./packages

RUN npm install
RUN npm run db:generate
RUN npm run build

CMD ["npm", "run", 'start-user-app']