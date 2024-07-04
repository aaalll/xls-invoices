FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npm install pm2 -g

COPY . .

RUN npm run build

EXPOSE 3000

#CMD ["npm", "start"]
CMD ["pm2-runtime", "ecosystem.config.js"]
