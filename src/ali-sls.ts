
/**
 * 阿里云SLS日志配置
 * https://help.aliyun.com/zh/sls/developer-reference/node-js-sdk/
 */
export interface PinoAliSLSOption {
    /**
     * 阿里云 accessKeyId
     *  @requires
     */
    accessKeyId: string;

    /**
   * 阿里云 secretAccessKey
   *  @requires
   */
    secretAccessKey: string;

    /**
   * 日志服务的域名。此处以杭州为例，其它地域请根据实际情况填写。 
   *  @requires
   * @example http://cn-hangzhou.log.aliyuncs.com
   */
    endpoint: string;

 /**
   * 必选，Project名称。 
   * @requires
   * @example api
   */
    projectName: string;

     /**
   * 必选，Logstore名称。 
   * @requires
   * @example 'xx-service'
   */
    logStoreName: string;


    /**
     * 日志对象对应阿里云字段
     * @example
     * ```
     * // 上传日志
     * const logs = {timestampe:1698400152047,service:'msgService',hostname:'xx-pc' };
     * const logKeys = {
     *     time:'timestampe',
     *     topic:'service',
     *     source:'hostname'
     * };
     * ```
     */
    logKeys?: {
        /**
         * 阿里云 __topic__ 字段
         * @default null
         */
        topic?: string;

        /**
         * 阿里云 __source__ 字段
         * @default null
         */
        source?: string;

        /**
         * 阿里云 __receive_time__ 字段
         * 
         * 不传使用当前时间
         * @default undefined
         */
        time?: string | number
    }
}
