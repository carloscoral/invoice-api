FROM node:lts

WORKDIR /app

COPY ./src/ ./src
COPY ./package-lock.json .
COPY ./package.json .
COPY ./tsconfig.json .

RUN ls
RUN npm install
RUN npm run build

ENV PORT 3000

EXPOSE 3000

CMD node .