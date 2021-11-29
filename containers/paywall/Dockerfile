# Begin with raw Linux distro
FROM mhart/alpine-node:7.9.0

# I am the wizard who conjured this machine
MAINTAINER Sam Reaves

# On container start, build src directory inside
RUN mkdir /src

# Add local current directory to container's src directory
ADD . /src

# Set src directory as default directory for start command
WORKDIR /src

# Install dependencies
RUN npm install --only=production

# Open port 3000
EXPOSE 3000

# It's business time
CMD npm start
