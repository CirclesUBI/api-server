FROM node:latest
LABEL org.opencontainers.image.source=https://github.com/circlesland/api-server

WORKDIR /usr/o-platform/api-server
COPY . /usr/o-platform/api-server
RUN /usr/o-platform/api-server/build.sh

WORKDIR /usr/o-platform/api-server/dist
CMD ["node", "main.js"]