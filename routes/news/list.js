import validator from "validator";

export const autoPrefix = "/news";

// /news/list/page/12312
export default async function (fastify, opts) {
  fastify.get("/list/page/:pageNum(^\\d+$)", async function (request, reply) {
    const pageNum = parseInt(request.params.pageNum, 10);
    if (Number.isNaN(pageNum) || pageNum < 1) {
      return fastify.helper.resErrJson(1, "invalid page");
    }

    const pageSize = 20;
    const newsList = await fastify.NewsModel.findNewsList({
      page: pageNum,
      size: pageSize,
    });
    const newsCount = await fastify.NewsModel.findNewsCount();
    return fastify.helper.resListJson(newsCount, pageNum, pageSize, newsList);
  });
}
