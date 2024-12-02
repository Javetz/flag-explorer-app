This is a flag explorer web application built with [Next.js](https://nextjs.org)

## Local Environment Pre-requisites

1. [Node.JS](https://nodejs.org/en) (v23 recommended via nvm) even though the project will run on node 18 and above.
2. Docker, this is used to build the applications image

## Getting Started

First, run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

The entry point to the application is the `app/page.tsx` file.

## Unit tests
The project uses jest for unit-testing, execute the following command to run tests ```npm run tests```


## Deployment

The application is intended to run as a docker container.
You will need to build and publish the docker image to your image repository.

*Multi-stage docker builds*
The project uses a multi-stage docker file, to reduce the size of the production image.
There are 2 stages ```Builder stage``` and ```Runner Stage```.

*Building the builder stage*
```
docker build --target builder -t nextjs-builder .
```

*Building the runner stage*
```
docker build --target runner -t nextjs-builder .
```

*Building all the stages*
```
docker build -t flag-explorer .
```

*Running the docker container*
```
docker run -it --rm -p 3000:3000 flag-explorer
```