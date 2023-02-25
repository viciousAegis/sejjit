FROM node:17-alpine

RUN npm install -g nodemon

WORKDIR /backend

ENV PATH=/backend/node_modules/.bin:$PATH

COPY package.json .
RUN npm install
# copy the files 
COPY . .
# 
EXPOSE 4000
CMD ["npm", "run", "dev"]

