/*
 *
 * 目录
 */

import { createAPI } from "@/utils/request";

class Directory {
  // 目录列表
  list = (data) => createAPI("/directorys", "get", data);

  // 目录简单列表
  simple = (data) => createAPI("/directorys/simple", "get", data);

  // 目录详情
  detail = (data) => createAPI(`/directorys/${data.id}`, "get", data);

  // 目录添加
  add = (data) => createAPI("/directorys", "post", data);

  // 目录修改
  update = (data) => createAPI(`/directorys/${data.id}`, "put", data);

  // 目录删除
  remove = (data) => createAPI(`/directorys/${data.id}`, "delete", data);

  // 目录状态
  changeState = (data) =>
    createAPI(`/directorys/${data.id}/${data.state}`, "post", data);
}

export default new Directory();
