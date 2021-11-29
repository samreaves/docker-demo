# It begins with alpine linux distro.
FROM alpine

# I am the wizard who conjured this machine.
MAINTAINER Sam Reaves

# Install nginx
RUN apk add --update nginx && \
    rm -rf /var/cache/apk/*

# Copy custom nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

# Expose master port
EXPOSE 80

# Enter the center of the maze
CMD ["nginx", "-g", "daemon off;"]
