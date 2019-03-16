FROM ubuntu:18.04

# installing chrome stable

RUN apt-get update
RUN apt-get -qq install wget gnupg2
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list
RUN apt-get update
RUN apt-get -qq install google-chrome-stable

# installing firefox stable

RUN apt-get -qq install software-properties-common
RUN add-apt-repository ppa:mozillateam/firefox-next
RUN apt-get update
RUN apt-get -qq install firefox nodejs npm
RUN node --version && npm --version

