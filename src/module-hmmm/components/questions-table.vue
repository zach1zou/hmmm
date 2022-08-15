<template>
  <div>
    <el-alert
      :title="`数据一共 ${total} 条`"
      type="info"
      show-icon
      :closable="false"
    >
    </el-alert>
    <!-- table表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="试题编号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学科">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.subject }}</span>
        </template>
      </el-table-column>
      <el-table-column label="目录">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.catalog }}</span>
        </template>
      </el-table-column>
      <el-table-column label="题型">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.questionType | formatOfquestionType
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="题干">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-html="scope.row.question"></span>
        </template>
      </el-table-column>
      <el-table-column label="录入时间">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.addDate | parseTime
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="难度">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.difficulty | formatOfdifficulty
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="录入人">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.creator }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-view"
            circle
            plain
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-edit"
            circle
            plain
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            plain
            size="small"
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-check"
            circle
            plain
            size="small"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <PageTool
      :total="total"
      :paginationPagesize="paginationPagesize"
      :paginationPage="paginationPage"
      @pageSizeChange="pageSizeChange"
      @pageChange="pageChange"
    ></PageTool>
  </div>
</template>
<script>
import { difficulty, questionType } from "@/api/hmmm/constants";
import PageTool from "../../module-manage/components/page-tool.vue";
export default {
  props: {
    total: {
      type: Number,
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    paginationPagesize: {
      type: Number,
      default: () => 10,
    },
    paginationPage: {
      type: Number,
      default: () => 1,
    },
  },
  components: { PageTool },
  data() {
    return {};
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 每页显示信息条数
    pageSizeChange(val) {
      this.$emit("pageSizeChange", val);
    },
    // 进入某一页
    pageChange(val) {
      this.$emit("pageChange", val);
    },
  },
  mounted() {},
  computed: {},
  watch: {},
  updated() {},
  beforeDestroy() {},
  filters: {
    formatOfquestionType(val) {
      const findItem = questionType.find(
        (item) => item.value === parseInt(val)
      );
      return findItem.label;
    },
    formatOfdifficulty(val) {
      const findItem = difficulty.find((item) => item.value === parseInt(val));
      return findItem.label;
    },
  },
};
</script>
<style lang="less" scoped></style>
