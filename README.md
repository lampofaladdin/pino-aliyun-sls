[![ESLint](https://github.com/lampofaladdin/pino-aliyun-sls/actions/workflows/eslint.yml/badge.svg)](https://github.com/lampofaladdin/pino-aliyun-sls/actions/workflows/eslint.yml)
[![Node.js CI](https://github.com/lampofaladdin/pino-aliyun-sls/actions/workflows/node.js.yml/badge.svg)](https://github.com/lampofaladdin/pino-aliyun-sls/actions/workflows/node.js.yml)

[//]: # "[![npm version](https://badge.fury.io/js/@wddv/pino-aliyun-sls)](https://badge.fury.io/js/@wddv/pino-aliyun-sls)"

[![NPM downloads](http://img.shields.io/npm/dm/@wddv/pino-aliyun-sls.svg?style=flat-square)](http://www.npmtrends.com/@wddv/pino-aliyun-sls)

# @wddv/pino-aliyun-sls

Fork by [pino-slack-webhook](https://github.com/lampofaladdin/pino-slack-webhook)

A [Pino v7+ transport](https://getpino.io/#/docs/transports?id=v7-transports) to send events to [Aliyun SLS](https://help.aliyun.com/zh/sls/product-overview)

## Installation

```
npm install --save @wddv/pino-aliyun-sls
```

## Usage

```js
import pino from "pino";
import { PinoAliSLSOption } from "@wddv/pino-aliyun-sls";

const logOptions: PinoAliSLSOption = {
  accessKeyId: "xxx",
  secretAccessKey: "xxx",
  endpoint: "http://cn-hangzhou.log.aliyuncs.com",
  projectName: "xx",
  logStoreName: "xxx",
};

const logger = pino({
  transport: {
    target: "@wddv/pino-aliyun-sls",
    level: "info",
    options: logOptions,
  },
});

logger.info("test log!");
```

[app.ts](example/app.ts)

## Reference

- https://github.com/lampofaladdin/pino-slack-webhook
- [https://getpino.io/#/docs/transports?id=writing-a-transport](https://github.com/pinojs/pino/blob/master/docs/transports.md#writing-a-transport)
- https://github.com/autotelic/pino-seq-transport
- https://github.com/technicallyjosh/pino-http-send
