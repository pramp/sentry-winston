# winston-sentry [![NPM version](https://badge.fury.io/js/sentry-winston.svg)](https://npmjs.org/package/opbeat-winston) [![Build Status](https://travis-ci.org/pramp/opbeat-winston.svg?branch=master)](https://travis-ci.org/pramp/opbeat-winston)

> A winston transport that sends stuff to sentry.

## Installation

```sh
$ npm install --save sentry-winston
```

## Usage

```js
var WinstonSentryTransport = require('sentry-winston').default;
this.logger.add(new WinstonSentryTransport({sentry}));
```
```js
this.logger.log(level, "This is a message");
this.logger.log(level, new Error("I'm an error"));
```

## License

Apache-2.0 © [Omer Gelbard](pramp.com)
