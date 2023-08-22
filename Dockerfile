FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN pnpm install
RUN pnpm run build:prod
EXPOSE 8899
