<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" class="demo-form-inline" :model="value">
          <el-form-item label="标签名称">
            <el-input
              placeholder="请输入标签名"
              v-model="value.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select placeholder="活动区域" v-model="value.region">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="clearFn">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search(value.name, value.region)">查询</el-button>
          </el-form-item>
          <el-button style="float: right" type="success" @click="newClasses">
            <i class="el-icon-edit"> 添加标签 </i>
          </el-button>
          <tagsAdd :showDialog="showDialog" @closeFn="closeFn" />
        </el-form>
        <div>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column
              prop="subjectName"
              label="所属学科"
            ></el-table-column>
            <el-table-column prop="tagName" label="标签名称"></el-table-column>
            <el-table-column prop="creatorID" label="创建者"></el-table-column>
            <el-table-column prop="addDate" label="创建日期"></el-table-column>
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
        <PageTools
          @pageChange="nextPage"
          :paginationPagesize="pageSizeInfo.pageSize"
          :paginationPage="pageSizeInfo.page"
          :total="counts"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { list } from "@/api/hmmm/tags";
import PageTools from "@/module-manage/components/page-tool";
import tagsAdd from "@/module-hmmm/components/tags-add";
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
      value: {
        name: "",
        region: "",
      },
      showDialog: false,
    };
  },
  computed: {
    pageIndex() {
      return (this.pageSizeInfo.page - 1) * this.pageSizeInfo.pageSize + 1;
    },
  },
  created() {
    this.list();
  },
  components: {
    PageTools,
    tagsAdd,
  },
  methods: {
    async list() {
      const { data } = await list({
        tagName: this.value.name,
        state: this.value.region,
        pageSize: this.pageSizeInfo.pageSize,
        page: this.pageSizeInfo.page,
      });
      console.log(data);
      this.tableData = data.items;
      this.counts = data.counts;
    },
    search(val, region) {
      this.value.name = val;
      this.value.state = region;
      this.list()
    },
    clearFn() {
      this.value.name = "";
      this.value.region = "";
      this.list();
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
