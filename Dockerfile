FROM node:lts-alpine

LABEL email="cobill6747@gmail.com"
LABEL name="bill"
LABEL version="1.0"
LABEL description="Node Cluster Container"

# 애플리케이션 폴더 생성
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --immutable --immutable-cache --check-cache

COPY . .
RUN npm run build

EXPOSE 3000

# Product Mode로 실행
ENV NODE_ENV=production

CMD ["npm", "start"]

