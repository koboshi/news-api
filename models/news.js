import mongoose from "mongoose";
import validator from "validator";
import fp from "fastify-plugin";

const newsSchema = new mongoose.Schema({
  id: { type: String, unique: [true, "id must be unique"] },
  title: String,
  content: String,
  url: String,
  createAt: { type: Date, default: Date.now },
  updateAt: Date,
});

const newsModel = mongoose.model("News", newsSchema);

const news = {
  _schema: newsSchema,

  _model: newsModel,

  findNewsInfo: function (
    id,
    projection = {
      id: 1,
      content: 1,
      title: 1,
      url: 1,
      createAt: 1,
      updateAt: 1,
      _id: 0,
    }
  ) {
    if (validator.isEmpty(id)) {
      throw new Error("empty news id");
    }
    return this._model.findOne({ id: id }, projection);
  },

  findNewsList: function (
    page,
    where,
    projection = { id: 1, title: 1, url: 1, createAt: 1, updateAt: 1, _id: 0 }
  ) {
    const pageCond = Object.assign(
      {
        page: 1,
        size: 20,
      },
      page
    );
    const whereCond = Object.assign({}, where);

    const skip = (pageCond.page - 1) * pageCond.size;
    return this._model
      .find(whereCond)
      .sort({ createAt: "desc" })
      .select(projection)
      .skip(skip)
      .limit(pageCond.size);
  },

  findNewsCount: function (where) {
    const whereCond = Object.assign({}, where);
    return this._model.countDocuments(whereCond);
  },
};

export default fp(async function (fastify, opts) {
  fastify.decorate("NewsModel", news);
});
