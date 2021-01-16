FROM node:alpine

EXPOSE 3000

WORKDIR /usr/api
COPY package.json package-lock.json ./

RUN npm ci
ENV PATH /usr/app/node_modules/.bin:$PATH

CMD ["npm", "start"]
VOLUME ["/usr/app"]