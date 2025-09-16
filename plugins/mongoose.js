import fp from "fastify-plugin";
import mongoose from "mongoose";

export default fp(
  async function (fastify, opts) {
    //初始化配置
    const option = Object.assign(
      {
        debug: false,
        disconnected: function () {
          this.debug ? fastify.log.info("mongoose disconnected") : "";
        },
        connecting: function () {
          this.debug ? fastify.log.info("mongoose connecting") : "";
        },
        connected: function () {
          this.debug ? fastify.log.info("mongoose connected") : "";
        },
        disconnecting: function () {
          this.debug ? fastify.log.info("mongoose disconnecting") : "";
        },
        url: "mongodb://127.0.0.1:27017/",
        db: "test",
        min_pool_size: 15,
        max_pool_size: 100,
      },
      opts
    );
    //mongoose插件
    //注册事件回调
    mongoose.connection.on("disconnected", () => {
      option.disconnected ? option.disconnected() : "";
    });
    mongoose.connection.on("connecting", () => {
      option.connecting ? option.connecting() : "";
    });
    mongoose.connection.on("connected", () => {
      option.connected ? option.connected() : "";
    });
    mongoose.connection.on("disconnecting", () => {
      option.disconnecting ? option.disconnecting() : "";
    });
    //配置连接
    await mongoose.connect(option.url, {
      dbName: option.db,
      minPoolSize: option.min_pool_size,
      maxPoolSize: option.max_pool_size,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      maxIdleTimeMS: 30000,
      bufferCommands: option.debug,
    });
    //注册关闭回调
    fastify.addHook("onClose", async () => {
      await mongoose.disconnect();
    });
    //暴露mongoose实例
    fastify.decorate("mongoose", mongoose);
  },
  {
    name: "plugin-mongoose",
  }
);
