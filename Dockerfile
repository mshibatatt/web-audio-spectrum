FROM node:22-alpine

ENV DEBIAN_FRONTEND=noninteractive 
ENV TZ=Asia/Tokyo 

RUN apk add git

EXPOSE 5173