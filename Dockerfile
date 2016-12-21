FROM node:wheezy

WORKDIR /wain
# some bash niceties
ADD .docker/root/.bashrc /root/

ENV PATH="/wain/node_modules/.bin:${PATH}"

RUN echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.2 main" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list

RUN apt-get update
RUN apt-get install -y --force-yes mongodb-org

RUN cd /wain; npm i nodemon

#RUN mongo test --eval "db.dropDatabase();"
#RUN mongorestore --db test --dir=dump/test

EXPOSE 3000 27017

ENTRYPOINT service mongod start && node_modules/.bin/nodemon --delay 3 --watch models --watch routes --watch util -L /usr/local/bin/npm start
