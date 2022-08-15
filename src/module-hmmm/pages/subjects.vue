<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" class="demo-form-inline" :model="value">
          <el-form-item label="学科名称">
            <el-input
              v-model="value.name"
              placeholder="请输入学科"
              @clear="list"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="clearFn">清除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search(value.name)"
              >查询</el-button
            >
          </el-form-item>
          <el-button style="float: right" type="success" @click="newClasses">
            <i class="el-icon-edit"> 添加学科 </i>
          </el-button>
        </el-form>
        <subjectAdd :showDialog="showDialog" @closeFn="closeFn" />
        <div>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              :index="pageIndex"
            ></el-table-column>
            <el-table-column
              prop="subjectName"
              label="学科名称"
            ></el-table-column>
            <el-table-column prop="username" label="创建者"></el-table-column>
            <el-table-column prop="addDate" label="创建日期"></el-table-column>
            <el-table-column
              prop="isFrontDisplay"
              label="前台是否显示"
            ></el-table-column>
            <el-table-column
              prop="twoLevelDirectory"
              label="二级目录"
            ></el-table-column>
            <el-table-column prop="totals" label="题目数量"></el-table-column>
            <el-table-column prop="tags" label="标签"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template>
                <el-button type="text" size="small">学科分类</el-button>
                <el-button type="text" size="small">学科标签</el-button>
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
import { list } from "@/api/hmmm/subjects";
import subjectAdd from "@/module-hmmm/components/subjects-add";
import PageTools from "@/module-manage/components/page-tool";
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
      showDialog: false,
      value: {
        name: "",
      },
    };
  },
  computed: {
    pageIndex() {
      return (this.pageSizeInfo.page - 1) * this.pageSizeInfo.pageSize + 1;
    },
  },
  components: {
    PageTools,
    subjectAdd,
  },
  created() {
    this.list();
  },
  methods: {
    async list() {
      const { data } = await list({
        subjectName: this.value.name, //获取输入框的内容
        pageSize: this.pageSizeInfo.pageSize,  //获取数据内容页码里面的数量
        page: this.pageSizeInfo.page,  //获取数据内容的页码数
      });
      // console.log(data);
      this.tableData = data.items;
      this.counts = data.counts;
    },
    search(val) {
      // 获取输入框的内容
      // 然后把输入框的内容传上去
      this.value.name = val;
      console.log(val);
      this.list(this.pageSizeInfo);
      // console.log('haushdlkjashdas');
    },
    clearFn() {
      this.value.name = "";
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
