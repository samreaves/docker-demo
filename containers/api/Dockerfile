# Begin with Linux distro with only node installed
FROM node:latest

# I am the wizard who conjured this machine
MAINTAINER Sam Reaves

# On container start, build src directory inside
RUN mkdir /src

# Install global node monitor
RUN npm install nodemon -g

# Set src directory as default directory for start command
WORKDIR /src

# Add local current directory to container's src directory
ADD . /src

# Install dependencies
RUN npm install

# Open port 3000
EXPOSE 3000

# It's business time
CMD npm start