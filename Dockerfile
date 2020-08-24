FROM node:12.16.3-alpine3.10

LABEL maintainer 'João neto <anbetec at joao.neto@anbetec.com.br>'
LABEL maintainer 'Marcos Buganeme <anbetec at marcos.buganeme@anbetec.com.br>'

ENV CLIENT_FILENAME instantclient-basic-linux.x64-12.1.0.1.0.zip

WORKDIR /opt/oracle/lib

ADD https://github.com/bumpx/oracle-instantclient/raw/master/${CLIENT_FILENAME} .

RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories && \
  apk add --update libaio libnsl && \
  ln -s /usr/lib/libnsl.so.2 /usr/lib/libnsl.so.1

RUN LIBS="*/libociei.so */libons.so */libnnz12.so */libclntshcore.so.12.1 */libclntsh.so.12.1" && \
  unzip ${CLIENT_FILENAME} ${LIBS} && \
  for lib in ${LIBS}; do mv ${lib} /usr/lib; done && \
  ln -s /usr/lib/libclntsh.so.12.1 /usr/lib/libclntsh.so && \
  rm ${CLIENT_FILENAME}

#RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

#WORKDIR /home/node/api

#COPY --chown=node:node package.json yarn.* ./

#USER node

#RUN yarn

#COPY --chown=node:node . .

#RUN yarn prebuild && yarn build

#CMD ["yarn", "start"]