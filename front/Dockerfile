FROM node:16-alpine as build-stage

ENV NODE_ENV build

WORKDIR /home/node 

COPY . /home/node

RUN npm install 
RUN npm run build

# ---

FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY --from=build-stage /home/node/dist /var/www/html/
EXPOSE 3000
CMD ["nginx","-g","daemon off;"]