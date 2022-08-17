<template>
  <div class="management-container">
    <div class="app-container">
      <el-card shadow="never">
        <el-button
          type="success"
          icon="el-icon-edit"
          style="float: right; padding: 10px; margin: 2px 15px"
          @click="handleCreate"
          >添加菜单</el-button
        >
        <tree-table
          border
          :data="dataList"
          :columns="columns"
          :tree-structure="true"
          :listLoading="listLoading"
          :rowClassStatus="rowClassStatus"
          @handleUpdate="handleUpdate"
          @removeUser="removeUser"
        >
        </tree-table>

        <!-- 新增标签弹层 -->
        <menuAdd
          ref="editMenu"
          :text="text"
          :pageTitle="pageTitle"
          :PermissionGroupsList="PermissionGroupsList"
          :notPointDataList="notPointDataList"
          :parentDataList="parentDataList"
          @newDataes="handleLoadData"
          @handleCloseModal="handleCloseModal"
        >
        </menuAdd>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTable from "@/components/TreeTable/index.vue";
import menuAdd from "./../components/menu-add";
import { list, remove, detail, update, add } from "@/api/base/menus";
export default {
  name: "Menus",
  components: { treeTable, menuAdd },
  data() {
    return {
      listLoading: true,
      dataList: [],
      newArray: [],
      pageTitle: "菜单", // 页面标题
      text: "", // 新增、编辑文本
      PermissionGroupsList: [], // 权限组加载
      parentDataList: [],
      notPointDataList: [],

      columns: [
        {
          text: "标题",
          value: "title",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h("i", {
                class: "ivu-icon " + params.row.icon,
                style: {
                  marginLeft: `${20 * params.row.layer}px`,
                  marginRight: "5px",
                  fontSize: "16px",
                },
              }),
              h("i", params.row.title),
            ]);
          },
        },
        {
          text: "权限点代码",
          value: "code",
        },
      ],
    };
  },
  methods: {
    // 获取列表数据
    handleLoadData(parameters) {
      this.listLoading = true;
      list(parameters).then((data) => {
        this.dataList = data.data;
        this.listLoading = false;
        let newArray = [];
        let icon = "ivu-icon-document";
        let makeNewItem = function (layer, oldItem) {
          let icon;
          if (!oldItem.is_point) {
            //  el-icon-folder-opened文件夹  el-icon-view 眼睛  el-icon-folder文件
            if (oldItem.childs && oldItem.childs.length > 0) {
              icon = "  el-icon-folder-opened";
            } else {
              icon = "el-icon-folder";
            }
          } else {
            icon = " el-icon-view";
          }

          let newItem = {
            id: oldItem.id,
            pid: oldItem.pid,
            layer: layer,
            is_point: oldItem.is_point,
            code: oldItem.code,
            title: oldItem.title,
            icon: icon,
          };
          return newItem;
        };
        let makeLayer = function (layer, item) {
          layer++;
          changeArray(layer, item);
          layer--;
        };
        function changeArray(layer, oldArray) {
          for (var i = 0; i < oldArray.length; i++) {
            newArray.push(makeNewItem(layer, oldArray[i]));

            if (oldArray[i].childs && oldArray[i].childs.length > 0) {
              makeLayer(layer, oldArray[i].childs);
            }
            if (oldArray[i].points && oldArray[i].points.length > 0) {
              makeLayer(layer, oldArray[i].points);
            }
          }
        }

        let la = 0;
        changeArray(la, this.dataList);
        this.dataList = newArray;
      });
    },
    // 权限列表
    setupData() {
      simple().then((data) => {
        this.PermissionGroupsList = data.data;
      });
    },
    // 新增用户刷新列表
    handleLoadDataList() {
      this.getList();
    },
    // 数据删除后显示样式
    rowClassStatus(row) {
      if (row.row.is_deleted === 1) {
        return "disabled";
      } else {
        return "";
      }
    },
    // 新增用户
    handleCreate() {
      this.text = "创建";
      this.$refs.editMenu.dialogFormV();
      this.$refs.editMenu.handleResetForm();
    },
    // 窗口操作
    // 弹框关闭
    handleCloseModal() {
      this.$refs.editMenu.dialogFormH();
    },
    // 编辑
    // 表单详情数据加载
    handleUpdate(row) {
      var flag = row.is_point ? "points" : "menu";
      this.$refs.editMenu.changeType(flag);
      this.$refs.editMenu.dialogFormV();
      this.$refs.editMenu.hanldeEditForm(row.id);
    },

    // 删除
    removeUser(user) {
      this.$confirm("此操作将永久删除用户 " + ", 是否继续?", "提示", {
        type: "warning",
      })
        .then(() => {
          remove({ id: user })
            .then((response) => {
              this.$message.success("成功删除了用户" + "!");
              this.dataList.splice(user, 1);
              this.handleLoadData(this.requestParameters);
            })
            .catch((response) => {
              this.$message.error("删除失败!");
            });
        })
        .catch(() => {
          this.$message.info("已取消操作!");
        });
    },
  },
  // 挂载结束
  mounted: function () {
    this.handleLoadData();
  },
  // 创建完毕状态
  created() {},
  // 组件更新
  updated: function () {},
  beforeUpdate: function () {},
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px;
}
.pagination {
  margin-top: 10px;
  // text-align: right;
}
</style>

<style>
.el-table th {
  background-color: #fafafa;
}
.el-table th.is-leaf {
  border-bottom: 2px solid #e8e8e8;
}
.el-table__row i {
  font-style: normal;
}
</style>
