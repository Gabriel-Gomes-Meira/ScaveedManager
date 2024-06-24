FROM node:16.18.0
WORKDIR /myapp
#RUN npm install -g npm@latest
CMD [ "yarn", "serve" ]