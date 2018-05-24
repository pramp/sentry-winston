'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _coreUtilIs = require('core-util-is');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/*
 *  winston-sentry.js: Winston Transport for Sentry (sentry.io)
 *
 *  Pramp Inc. is not affiliated with Sentry or Functional Software, Inc.
 *  (C) 2018 Pramp Inc.
 *  Apache-2 License
 *
 */

var WinstonSentry = function (_Winston$Transport) {
    _inherits(WinstonSentry, _Winston$Transport);

    function WinstonSentry(options) {
        _classCallCheck(this, WinstonSentry);

        var _this = _possibleConstructorReturn(this, (WinstonSentry.__proto__ || Object.getPrototypeOf(WinstonSentry)).call(this, options));

        _this.log = function (level, msg, meta, callback) {
            var extra = {};
            var error = void 0;

            // handle when meta field isn't included
            if (typeof meta === 'function' && !callback) {
                callback = meta;
                meta = false;
            }

            if (!_this.sentry) {
                return callback(null, true);
            }

            if (meta && meta.info) {
                extra.extra = meta.info;
            }

            if (meta && meta.error && (0, _coreUtilIs.isError)(meta.error)) {
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
            _this.sentry.captureException(error, extra);

            // noinspection JSUnresolvedFunction
            _this.emit('logged');
            callback(null, true);
        };

        var sentry = options.sentry,
            level = options.level,
            name = options.name;

        _this.sentry = sentry;
        _this.name = name || 'sentry';
        _this.level = level || 'error';
        return _this;
    }

    /**
     *  Pass errors in the meta.error fields.
     *  Pass additional data in meta.info.
     */


    return WinstonSentry;
}(_winston2.default.Transport);

exports.default = WinstonSentry;