FROM node:14-alpine as builder
ARG NODE_ENV

COPY package.json yarn.lock /app/
WORKDIR /app/
RUN yarn install --frozen-lockfile --production=false --no-progress

COPY ./ /app/

RUN yarn run build


FROM node:14-alpine as clean
ARG NODE_ENV

COPY --from=builder /app/package.json /app/yarn.lock /app/
COPY --from=builder /app/dist/ /app/

FROM node:14-alpine
ARG NODE_ENV

EXPOSE 4000
WORKDIR /app/
COPY --from=clean /app/ /app/

RUN yarn install --frozen-lockfile --production=true --no-progress

ENTRYPOINT ["node", "index.js"]