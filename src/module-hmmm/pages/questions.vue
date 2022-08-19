<template>
  <div>
    <div class="question-container">
      <el-card class="box-card">
        <QuestionsSelect
          :options="options"
          :tableData="tableData"
          @search="search"
        ></QuestionsSelect>
        <QuestionsTable
          :total="total"
          :tableData="tableData"
          :tableInfo="tableInfo"
          @pageSizeChange="pageSizeChange"
          @pageChange="pageChange"
          @delete="deleteFn"
          @choiceAdd="choiceAddFn"
          :paginationPagesize="tableInfo.pagesize"
          :paginationPage="tableInfo.page"
        ></QuestionsTable>
      </el-card>
    </div>
  </div>
</template>
<script>
import { list } from "@/api/hmmm/questions";
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

      tableInfo: {
        page: 1,
        pagesize: 10,
      },
      total: 0,
      tableData: [],
      ishow: false,
    };
  },
  methods: {
    async getList() {
      const { data } = await list(this.tableInfo);
      this.total = data.counts;
      this.tableData = data.items;
      console.log(this.tableData, "tableData");
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
    //搜索
    async search(val) {
      await list(this.tableInfo, { val });
    },
    // delete
    deleteFn() {
      this.getList();
    },
    //加入精选题库
    choiceAddFn() {
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
