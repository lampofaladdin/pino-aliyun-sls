import * as ALY from 'aliyun-sdk';
import build from 'pino-abstract-transport';
import { promisify } from 'util';
import { PinoAliSLSOption } from './ali-sls';

export default async function (opts: PinoAliSLSOption) {
    const {
        accessKeyId,
        secretAccessKey,
        endpoint,
        projectName,
        logStoreName,
        logKeys
    } = opts;

    if (!accessKeyId || !secretAccessKey || !endpoint || !projectName || !logStoreName) {
        throw new Error(
            'The required options(accessKeyId, secretAccessKey, endpoint, projectName, logStoreName) are missing'
        );
    }
    const sls = new ALY.SLS({
        accessKeyId,
        secretAccessKey,
        endpoint,
        apiVersion: '2015-06-01', //SDK版本号，固定值。
    });
    return build(async (source) => {
        for await (const obj of source) {

            const logContents = Object.keys(obj).map((item) => {
                return {
                    key: item,
                    value: `${obj[item]}`,
                };
            });

            const param = {
                projectName,
                logStoreName,
                logGroup: {
                    // 必选，写入的日志数据。
                    logs: [
                        {
                            time: Math.floor((logKeys?.time ? (new Date(logKeys.time) || new Date()) : new Date()).getTime() / 1000),
                            contents: logContents,
                        },
                    ],
                    topic: logKeys?.topic ? obj[logKeys.topic] || null : null,
                    source: logKeys?.source ? obj[logKeys.source] || null : null,
                },
            };
            const puLogs = promisify(sls.putLogs);
            try {
                await puLogs.bind(sls)(param);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    console.error(`push log to aliyun error ${e.stack}`);
                    return; 
                }
                console.error(`push log to aliyun error ${e}`);
            }
        }
    });
}

export type {
    PinoAliSLSOption
};