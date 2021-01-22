FROM node:alpine

EXPOSE 3000

WORKDIR /usr/api
COPY package.json package-lock.json ./

RUN npm install
ENV PATH /usr/app/node_modules/.bin:$PATH

RUN chown -R node:node /usr/api
USER node

CMD ["npm", "start"]
VOLUME ["/usr/app"]
