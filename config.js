var url = require('url'),
    config = config || {};

config.redis = config.redis || {};

config.redis.secret = process.env.CLIENT_SECRET || 'shouldbealongkey';
config.redis.url = url.parse(process.env.REDISTOGO_URL || '127.0.0.1:6379');
config.redis.port = config.redis.url.port;
config.redis.hostname = config.redis.url.hostname;

module.exports = config;

