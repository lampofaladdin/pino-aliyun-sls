import build from 'pino-abstract-transport';
import createTransport from '../src/index';

jest.mock('pino-abstract-transport', () => jest.fn());

describe('pino-aliyun-sls', () => {
    test('build transport', async () => {
        const options = {
            accessKeyId: 'xx',
            secretAccessKey: 'xx',
            endpoint: 'http://cn-hangzhou.log.aliyuncs.com',
            projectName:'xx',
            logStoreName:'xx',
            logKeys:{
                topic:'1',
                source:'1',
                time:'1'
            }
        };

        await createTransport(options);

        expect(build).toHaveBeenCalled();
    });
});
