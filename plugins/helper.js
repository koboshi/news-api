import fp from "fastify-plugin";

const helper = {
  //助手类
  resJson: function (result, errCode, errMsg) {
    return {
      error_code: errCode,
      error_message: errMsg,
      result: result,
    };
  },

  resInfoJson: function (info) {
    return this.resJson({ info: info }, 0, "");
  },

  resListJson: function (total, page, size, list) {
    return this.resJson(
      { total: total, page: page, size: size, list: list },
      0,
      ""
    );
  },

  resErrJson: function (errCode, errMsg) {
    return this.resJson({}, errCode, errMsg);
  },

  stripEOL: function (str) {
    // 匹配所有的 \r\n, \n, \r 并替换为空字符串
    return str.replace(/\r\n|\n|\r/g, "");
  },

  delay: function (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};

export default fp(
  async function (fastify, opts) {
    fastify.decorate("helper", helper);
  },
  {
    name: "plugin-helper",
  }
);
