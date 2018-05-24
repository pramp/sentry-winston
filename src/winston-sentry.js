
/*
 *  winston-sentry.js: Winston Transport for Sentry (sentry.io)
 *
 *  Pramp Inc. is not affiliated with Sentry or Functional Software, Inc.
 *  (C) 2018 Pramp Inc.
 *  Apache-2 License
 *
 */

import Winston from 'winston';
import {isError} from 'core-util-is';

export default class WinstonSentry extends Winston.Transport{
    constructor(options) {
        super(options);
        const {sentry, level, name} = options;
        this.sentry = sentry;
        this.name = name || 'sentry';
        this.level = level || 'error';
    }

    /**
     *  Pass errors in the meta.error fields.
     *  Pass additional data in meta.info.
     */
    log = (level, msg, meta, callback) => {
        let extra = {};
        let error;

        // handle when meta field isn't included
        if (typeof(meta) === 'function' && !callback) {
            callback = meta;
            meta = false;
        }

        if (!this.sentry) {
            return callback(null, true);
        }

        if (meta && meta.info) {
            extra.extra = meta.info;
        }

        if (meta && meta.error && isError(meta.error)) {
            error = meta.error;
            extra.message = msg;
        } else {
            error = msg;
        }

        if (meta && meta.request) {
            extra.request = meta.request;
        } else if (meta && meta.req) {
            extra.request = meta.req;
        }

        if (meta && meta.user) {
            extra.user = meta.user;
        }

        // noinspection JSUnresolvedFunction
        this.sentry.captureException(error, extra);

        // noinspection JSUnresolvedFunction
        this.emit('logged');
        callback(null, true);
    };
}