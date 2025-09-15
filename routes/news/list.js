import validator from "validator";

export const autoPrefix = "/news";

// /news/list/page/12312
export default async function (fastify, opts) {
  fastify.get("/list/page/:pageNum(^\\d+$)", async function (request, reply) {
    const pageNum = request.params.pageNum ? request.params.pageNum : 1;
    const pageSize = 20;
    if (!validator.isNumeric(pageNum) || pageNum < 1) {
      return fastify.helper.resJson({}, 1, "invalid pageNum");
    }
    const newsList = await fastify.NewsModel.findNewsList({
      page: pageNum,
      size: pageSize,
    });
    const newsCount = await fastify.NewsModel.findNewsCount();
    return fastify.helper.resJson(
      { total: newsCount, page: pageNum, size: pageSize, list: newsList },
      0,
      ""
    );
  });
}
