FROM nginx:1.17.3-alpine
MAINTAINER Cat.lin

ENV TZ=Asia/Shanghai
ENV DIST_NAME=${DIST_NAME}

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && mkdir -p /jinko3-vue

WORKDIR /jinko3-vue

ADD /dist-jenkins/  /usr/share/nginx/html/


CMD  nginx -g 'daemon off;'
