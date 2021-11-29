FROM node:latest as node

# I am the wizard who conjured this machine
MAINTAINER Sam Reaves

# On container start, build src directory inside
RUN mkdir /src

# Add local current directory to container's src directory
ADD . /src

# Set src directory as default directory for start command
WORKDIR /src

# Install dependencies
RUN npm install
RUN node_modules/.bin/ng build

# Open port 4200
EXPOSE 4200

# It's business time
# CMD npm start
CMD node_modules/.bin/ng serve --host 0.0.0.0