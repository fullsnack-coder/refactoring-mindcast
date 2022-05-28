FROM reactnativecommunity/react-native-android

RUN mkdir src

COPY yarn.lock /src/
COPY package.json /src/

WORKDIR /src/
RUN yarn
RUN touch .env

COPY . .

# setting environment variable - envs variables must be deployed in cloud
ENV RELEASE_KEY_PASSWORD
ENV RELEASE_STORE_PASSWORD
ENV RELEASE_KEYALIAS

# compile app
RUN cd android && chmod +x ./gradlew

# build-apk  RUN cd android && ./gradlew assembleRelease
RUN cd android && ./gradlew bundleRelease