import pino from 'pino';

const transport = pino.transport({
    targets: [
        {
            target: '../dist/index.js',
            level: 'debug',
            options: {
                accessKeyId: 'xxx',
                secretAccessKey: 'xxx',
                endpoint: 'http://cn-hangzhou.log.aliyuncs.com',
                projectName:'xx',
                logStoreName:'xxx'
            },
        },
        {
            target: 'pino-pretty',
            level: 'debug',
            options: { destination: 1 },
        },
    ],
});

const now = new Date();

const logger = pino({ level: 'debug' }, transport);

logger.debug('nihapo debug log!!', now);
logger.info('nihapo info log!!', now);
logger.error('nihapo error log!!', now);
