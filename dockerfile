FROM node:erbium

WORKDIR /usr/src/pubg-nepal

# Install the Nodemon
# RUN npm install -g nodemon

COPY . .

# FOR DEVELOPMENT
# RUN npm install -g nodemon

RUN npm install

EXPOSE 3000


# This are development CMD
# CMD [ "index.js" ]
# CMD [ "/bin/bash" ]
# CMD [ "npm","run", "dev" ]

# This is Production
CMD [ "npm","start"]