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
        logKeys,
        serializer
    } = opts;

    if (
        !accessKeyId ||
    !secretAccessKey ||
    !endpoint ||
    !projectName ||
    !logStoreName
    ) {
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

    function serializeValue(value: any): string {
        if (value instanceof Date) {
            return value.toISOString();
        }
        if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value); // Serializes nested objects
        }
        return String(value);
    }

    const serializerFunc = typeof serializer === 'function' ? serializer : serializeValue
    
    return build(async (source) => {
        for await (const logRecord of source) {

            // 转换日志对象
            const logContents = Object.keys(logRecord).map((item) => {
                return {
                    key: item,
                    value: serializerFunc(logRecord[item]),
                };
            });

            const param = {
                projectName,
                logStoreName,
                logGroup: {
                    logs: [
                        {
                            time: getLogDate(logRecord, logKeys?.time),
                            contents: logContents,
                        },
                    ],
                    topic: logKeys?.topic ? logRecord[logKeys.topic] || null : null,
                    source: logKeys?.source ? logRecord[logKeys.source] || null : null,
                },
            };
            const puLogs = promisify(sls.putLogs);
            try {
                await puLogs.bind(sls)(param);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    console.error(`Push log to aliyun error ${e.stack}`);
                    return;
                }
                console.error(`Push log to aliyun error ${e}`);
            }
        }
    });

    /**
   * 格式化日期
   */
    function getTimestampe(date: Date) {
        return Math.floor(date.getTime() / 1000);
    }

    /**
   * 获取日志时间
   */
    function getLogDate(log: Record<string, any>, key?: string | number) {
        if (!key) {
            return getTimestampe(new Date());
        }
        if (!log[key]) {
            return getTimestampe(new Date());
        }
        const date = new Date(log[key]);
        if (isNaN(date.getTime())) {
            return getTimestampe(new Date());
        }
        return getTimestampe(date);
    }
}

export type {
    PinoAliSLSOption
};
