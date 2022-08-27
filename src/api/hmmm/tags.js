/*
 * 标签
 */

import { createAPI } from "@/utils/request";
class Tag {
  // 标签列表
  list = (data) => createAPI("/tags", "get", data);

  // 标签简单列表
  simple = (data) => createAPI("/tags/simple", "get", data);

  // 标签详情
  detail = (data) => createAPI(`/tags/${data.id}`, "get", data);

  // 标签添加
  add = (data) => createAPI("/tags", "post", data);

  // 标签修改
  update = (data) => createAPI(`/tags/${data.id}`, "put", data);

  // 标签删除
  remove = (data) => createAPI(`/tags/${data.id}`, "delete", data);

  // 标签状态
  changeState = (data) =>
    createAPI(`/tags/${data.id}/${data.state}`, "post", data);
}

export default new Tag();
