FROM resin/raspberrypi-node
MAINTAINER Stefan Kastenholz <stefan.kastenholz@gmail.com>

# 1. Install WiringPi and RC-Switch (http://smarthome.hallojapan.de/2014/11/controlling-lights-with-openhab-raspberry-pi-and-433mhz-remote-switches/)
RUN apt-get update && apt-get install -y git sudo build-essential && rm -rf /var/lib/apt/lists/*
RUN mkdir -p /opt/rc-switch && cd /opt/rc-switch && git clone git://git.drogon.net/wiringPi && cd wiringPi && ./build
RUN mkdir -p /opt/rc-switch && cd /opt/rc-switch && git clone https://github.com/r10r/rcswitch-pi.git && cd rcswitch-pi && make

# 2. Install node dependencies
COPY package.json /opt/rc-switch/
RUN cd /opt/rc-switch/ && npm install --only=production

COPY server.js /opt/rc-switch/

EXPOSE 8080

CMD node /opt/rc-switch/server.js
