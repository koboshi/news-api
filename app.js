import Fastify from "fastify";
import AutoLoad from "@fastify/autoload";
import CONFIG from "./config.js";
import path from "node:path";

const fastify = Fastify({
  logger: CONFIG.DEBUG,
});

//加载插件
fastify.register(AutoLoad, {
  dir: path.join(CONFIG.ROOT_DIR, "plugins"),
  options: {
    debug: CONFIG.DEBUG,
    url: CONFIG.MONGO.URL,
    db: CONFIG.MONGO.DB,
    min_pool_size: CONFIG.MONGO.MIN_POOL_SIZE,
    max_pool_size: CONFIG.MONGO.MAX_POOL_SIZE,
  },
});

//加载model
fastify.register(AutoLoad, {
  dir: path.join(CONFIG.ROOT_DIR, "models"),
});

//加载路由
fastify.register(AutoLoad, {
  dir: path.join(CONFIG.ROOT_DIR, "routes"),
  maxDepth: 2,
});

const start = async () => {
  try {
    await fastify.listen({
      host: CONFIG.SERVER.HOST,
      port: CONFIG.SERVER.PORT,
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

export default {
  start: start,
};
