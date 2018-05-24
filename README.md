# winston-sentry [![NPM version](https://badge.fury.io/js/sentry-winston.svg)](https://npmjs.org/package/opbeat-winston) [![Build Status](https://travis-ci.org/pramp/opbeat-winston.svg?branch=master)](https://travis-ci.org/pramp/opbeat-winston)

> A winston transport that sends stuff to sentry.

## Installation

```sh
$ npm install --save sentry-winston
```

## Usage

```js
var WinstonSentryTransport = require('sentry-winston').default;
this.logger.add(WinstonSentryTransport, {sentry:sentryInstance}, false);
```
```js
this.logger.log(level, "This is a message");
this.logger.log(level, "This is an error", {error:new Error("I'm an error")});
```
```js
var error = new Error("I'm an error");
var info = {extraInfo: "extra info should be in an info field"};
this.logger.log(level, "This is an error with extra metadata", {error, info});
```

## License

Apache-2.0 © [Omer Gelbard](pramp.com)
