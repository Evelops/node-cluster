FROM node:carbon
LABEL key = "bill node cluster container"

#app 폴더 만들기 - NodeJS 어플리케이션 폴더
RUN mkdir -p /app
# RUN mkdir -p /app/loggers
# 애플리 케이션 폴더 지정 
WORKDIR /app

ADD ./ /app

#패키지 설치 
RUN npm i --save 

# Product Mode로 실행 
ENV NODE_ENV=production

# start server 
CMD node nodejs_tutorial_server.js