import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
  ROOT_DIR: __dirname,
  DEBUG: true,
  MONGO: {
    URL: "mongodb://127.0.0.1:27017/",
    DB: "spider",
    MIN_POOL_SIZE: 20,
    MAX_POOL_SIZE: 100,
  },
  SERVER: {
    HOST: "0.0.0.0",
    PORT: 7878,
  },
};

export default CONFIG;
