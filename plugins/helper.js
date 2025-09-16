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
};

export default fp(
  async function (fastify, opts) {
    fastify.decorate("helper", helper);
  },
  {
    name: "plugin-helper",
  }
);
