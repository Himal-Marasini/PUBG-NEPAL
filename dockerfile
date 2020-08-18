# Commenting out for reference
# FROM node:erbium

# WORKDIR /usr/src/NEW FOLDER

# # install nodemon globally
# RUN npm install nodemon -g

# COPY ./ ./

# RUN npm install

# EXPOSE 3000

# # CMD [ "nodemon", "index.js" ]
# CMD [ "/bin/bash" ]


# DIFFERENT ONE HERE

# FROM node:erbium

# EXPOSE 3000

# WORKDIR /app

# COPY ./ ./

# # ADD index.js /app/index.js

# # ADD package.json /app/package.json

# RUN npm install

# ENTRYPOINT ["node"]

# CMD [ "index.js" ]




FROM node:erbium

WORKDIR /usr/src/pubgNepalPractice

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