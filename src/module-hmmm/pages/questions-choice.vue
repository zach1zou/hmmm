<template>
  <div>
    <div class="question-container">
      <el-card class="box-card">
        <QuestionsSelect
          :options="options"
          :tableData="tableData"
        ></QuestionsSelect>

        <!-- 标签页 -->
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
          <el-tab-pane label="全部" name="first">
            <QuestionsTable
              :isShow="isshow"
              :total="total"
              :tableData="tableData"
              :tableInfo="tableInfo"
              @delete="deleteFn"
              @pageSizeChange="pageSizeChange"
              @pageChange="pageChange"
              :paginationPagesize="tableInfo.pagesize"
              :paginationPage="tableInfo.page"
              :showQuestion="showQuestion"
              @submitSuccess="submitSuccess"
            >
            </QuestionsTable>
          </el-tab-pane>
          <el-tab-pane label="待审核" name="second">
            <QuestionsTable
              :isShow="isshow"
              :total="total"
              :tableData="tableData"
              :tableInfo="tableInfo"
              @delete="deleteFn"
              @pageSizeChange="pageSizeChange"
              @pageChange="pageChange"
              :paginationPagesize="tableInfo.pagesize"
              :paginationPage="tableInfo.page"
              :showQuestion="showQuestion"
              @submitSuccess="submitSuccess"
            >
            </QuestionsTable
          ></el-tab-pane>
          <el-tab-pane label="已审核" name="third">
            <QuestionsTable
              :isShow="isshow"
              :total="total"
              :tableData="tableData"
              :tableInfo="tableInfo"
              @delete="deleteFn"
              @pageSizeChange="pageSizeChange"
              @pageChange="pageChange"
              :paginationPagesize="tableInfo.pagesize"
              :paginationPage="tableInfo.page"
              :showQuestion="showQuestion"
              @submitSuccess="submitSuccess"
            >
            </QuestionsTable
          ></el-tab-pane>
          <el-tab-pane label="已拒绝" name="fourth">
            <QuestionsTable
              :isShow="isshow"
              :total="total"
              :tableData="tableData"
              :tableInfo="tableInfo"
              @delete="deleteFn"
              @pageSizeChange="pageSizeChange"
              @pageChange="pageChange"
              :paginationPagesize="tableInfo.pagesize"
              :paginationPage="tableInfo.page"
              :showQuestion="showQuestion"
              @submitSuccess="submitSuccess"
              @PublishSuccess="PublishSuccess"
            >
            </QuestionsTable
          ></el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import { choice } from "@/api/hmmm/questions";
import { simple } from "@/api/hmmm/subjects";

import QuestionsSelect from "../components/questions-select.vue";
import QuestionsTable from "../components/questions-table.vue";
export default {
  props: {},
  components: { QuestionsSelect, QuestionsTable },
  data() {
    return {
      // 学科
      options: [],
      // 标签页
      activeName: localStorage.getItem("TabActiveName") || "first",
      tableInfo: {
        page: 1,
        pagesize: 10,
        chkState: null,
      },
      total: 0,
      tableData: [],
      isshow: true,
      showQuestion: false,
    };
  },
  methods: {
    async getList() {
      const { data } = await choice(this.tableInfo);
      this.total = data.counts;
      this.tableData = data.items;
      console.log(this.tableData, "tableData");
    },

    // 切换标签
    handleClick({ index }) {
      if (index == 0) {
        this.tableInfo.chkState = null;
      } else {
        this.tableInfo.chkState = index - 1;
      }
      localStorage.setItem("TabActiveName", this.activeName);
      this.getList();
    },

    // 目录简单列表
    async getSubject() {
      const { data } = await simple();

      this.options = data;
    },
    // 每页显示信息条数
    pageSizeChange(val) {
      this.tableInfo.pagesize = val;
      this.getList();
    },
    // 进入某一页
    pageChange(val) {
      this.tableInfo.page = val;
      this.getList();
    },
    // delete
    deleteFn() {
      this.getList();
    },
    // 审核成功
    submitSuccess() {
      this.getList();
    },
    // 上架成功
    PublishSuccess() {
      this.getList();
    },
  },
  mounted() {
    this.getList();
    this.getSubject();
  },
  computed: {},
  watch: {},
  updated() {},
  beforeDestroy() {},
  filters: {},
};
</script>
<style lang="less" scoped>
.question-container {
  padding: 0 10px;
  margin: 10px 0;
}
</style>
