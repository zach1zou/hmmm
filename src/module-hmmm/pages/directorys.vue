<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="目录名称">
            <el-input placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select placeholder="活动区域" v-model="value">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
          <el-button style="float: right" type="success" @click="newClasses">
            <i class="el-icon-edit"> 添加目录 </i>
          </el-button>
          <directorysAdd :showDialog="showDialog" @closeFn="closeFn" />
        </el-form>
        <div>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column
              prop="subjectName"
              label="所属学科"
            ></el-table-column>
            <el-table-column
              prop="directoryName"
              label="目录名称"
            ></el-table-column>
            <el-table-column prop="creatorID" label="创建者"></el-table-column>
            <el-table-column prop="addDate" label="创建日期"></el-table-column>
            <el-table-column prop="totals" label="面试题数量"></el-table-column>
            <el-table-column prop="state" label="状态"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template>
                <el-button type="text" size="small">禁用</el-button>
                <el-button type="text" size="small">修改</el-button>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <PageTools
        @pageChange="nextPage"
        :paginationPagesize="pageSizeInfo.pageSize"
        :paginationPage="pageSizeInfo.page"
        :total="counts"
      />
    </el-card>
  </div>
</template>

<script>
import { list } from "@/api/hmmm/directorys";
import PageTools from "@/module-manage/components/page-tool";
import directorysAdd from "@/module-hmmm/components/directorys-add";
export default {
  data() {
    return {
      input: "",
      tableData: [],
      counts: 0,
      pageSizeInfo: {
        page: 1,
        pageSize: 10,
      },
      value: "",
      showDialog: false
    };
  },
  components: {
    PageTools,
    directorysAdd,
  },
  computed: {
    pageIndex() {
      return (this.pageSizeInfo.page - 1) * this.pageSizeInfo.pageSize + 1;
    },
  },
  created() {
    this.list();
  },
  methods: {
    async list() {
      const { data } = await list(this.pageSizeInfo);
      console.log(data);
      this.tableData = data.items;
      this.counts = data.counts;
    },
    nextPage(val) {
      this.pageSizeInfo.page = val;
      this.list();
    },
    newClasses() {
      this.showDialog = true;
      console.log(1283);
    },
    closeFn() {
      console.log(1);
      this.showDialog = false;
    },
  },
};
</script>

<style scoped lang="less">
.container {
  padding: 0 10px;
  margin: 10px 0;
}
</style>
