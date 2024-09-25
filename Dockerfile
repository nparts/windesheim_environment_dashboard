# syntax=docker/dockerfile:1.4
FROM --platform=$BUILDPLATFORM node:20-alpine AS build-stage

RUN mkdir /project
WORKDIR /project

COPY . .

RUN yarn install
ENV HOST=0.0.0.0
CMD ["yarn", "run", "build"]

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /project/dist /app

CMD ["nginx", "-g", "daemon off;"]