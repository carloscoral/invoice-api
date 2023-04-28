# Billing api

This project contains the billing api for invoices management.

## Documentation

You can found the swagger file with api specification in docs folder.

## Tests

To run tests execute

```bash
npm test
```

This command executes test and code coverage

## Build

To build the project execute

```bash
npm run build
```

This command generates dist folder with project ready to start.

## Start project

To start the server execute

```bash
npm run start
```

### Start dev environment

To start the development server execute

```bash
npm run start:dev
```

## Deploy

The project can be deployed in any server with docker.
To start deployed project in docker, execute

```bash
cd containers
docker compose up -d
```