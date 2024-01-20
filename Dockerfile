FROM node:carbon

LABEL email="cobill6747@gmail.com"
LABEL name="bill"
LABEL version="1.0"
LABEL description="Node Cluster Conatiner"

RUN mkdir -p /app
# RUN mkdir -p /app/loggers
WORKDIR /app
ADD ./ /app

#패키지 설치 
RUN npm i --save 

# Product Mode로 실행 
ENV NODE_ENV=production

# start server 
CMD node nodejs_tutorial_server.js