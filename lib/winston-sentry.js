'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _coreUtilIs = require('core-util-is');

var _winstonTransport = require('winston-transport');

var _winstonTransport2 = _interopRequireDefault(_winstonTransport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 *  winston-sentry.js: Winston Transport for Sentry (sentry.io)
 *
 *  Pramp Inc. is not affiliated with Sentry or Functional Software, Inc.
 *  (C) 2018 Pramp Inc.
 *  Apache-2 License
 *
 */

class WinstonSentry extends _winstonTransport2.default {
    constructor(options) {
        super(options);
        const { sentry, level, name } = options;
        this.sentry = sentry;
        this.name = name || 'sentry';
        this.level = level || 'error';
    }

    /**
     * @param {Object} info
     * @param {string} info.level
     * @param {string} info.message
     * @param {Error}  [info.error]
     * @param {string} [info.fullStack]
     * @param {Object} [info.info]
     * @param {Object} [info.meta]
     * @param {Function} callback
     */
    log(info, callback) {
        setImmediate(() => {
            // noinspection JSUnresolvedFunction
            this.emit('logged', info);
        });

        const { message, error, info: extra, meta } = info;
        let err;
        let args = { extra };

        if (!this.sentry) {
            callback && callback();
            return;
        }

        if (error && (0, _coreUtilIs.isError)(error)) {
            err = error;
            args.message = message;
        } else {
            err = message;
        }

        if (meta && meta.request) {
            args.request = meta.request;
        } else if (meta && meta.req) {
            args.request = meta.req;
        }

        if (meta && meta.user) {
            args.user = meta.user;
        }

        // noinspection JSUnresolvedFunction
        this.sentry.captureException(err, args);

        callback && callback();
    }
}
exports.default = WinstonSentry;