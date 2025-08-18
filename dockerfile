    # import base image
    FROM node:24-alpine

    # set working dir
    WORKDIR /app

    # copy all dependencies
    COPY package*.json ./

    # install dependencies
    RUN npm install 

    # copy API source code
    COPY /Backend_API ./Backend_API/  

    # expose the API port
    EXPOSE 5000

    # start the server
    CMD [ "npm", "run", "dev" ]

