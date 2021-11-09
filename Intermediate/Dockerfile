FROM node:12
WORKDIR /
COPY ./package*.json ./ 
RUN npm install
COPY . .
#CMD ["node", "./intermediate.js"]
RUN ["chmod", "+x", "./utils/wait-for-it.sh"]

CMD ["npm", "start"]