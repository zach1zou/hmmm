<template>
  <div class="container">
    <articlesAdd
      ref="articlesAdd"
      :visible.sync="addDialogVisible"
      :articlesForm="articlesForm"
      @resetArt="resetArt"
      @onClose="onClose"
      @addUpdateArticlesFrom="addUpdateArticlesFrom"
    />
    <articlesPreview
      :visible.sync="previewDialogVisible"
      :articlesInfo="articlesInfo"
      @resetPreview="resetPreview"
    />
    <!-- 页面 -->
    <el-card class="box-card">
      <div style="font-size: 20px; color: pink; margin-bottom: 20px">
        作者：邹宗霖/钟妍榕
      </div>
      <el-row>
        <el-col :span="22"
          ><div class="box-header">
            <span>关键字</span
            ><el-input
              style="width: 250px"
              v-model="tableInfo.keyword"
              placeholder="根据文章标题搜索"
            ></el-input>
            <span>状态</span>
            <el-select
              v-model="tableInfo.state"
              placeholder="请选择"
              style="width: 250px"
            >
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div style="margin-left: 20px">
              <el-button size="small" @click="clearData">清除</el-button>
              <el-button type="primary" size="small" @click="search"
                >搜索</el-button
              >
            </div>
          </div></el-col
        >
        <el-col :span="2">
          <el-button
            type="success"
            icon="el-icon-edit"
            size="small"
            @click="addArticles"
            >新增技巧</el-button
          ></el-col
        >
      </el-row>
      <!-- 表格 -->
      <el-alert
        :title="`数据一共 ${total} 条`"
        type="info"
        show-icon
        :closable="false"
        style="margin: 20px 0"
      >
      </el-alert>
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: 'rgb(243,246,251)' }"
      >
        <el-table-column label="序号" type="index"> </el-table-column>
        <el-table-column label="文章标题">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
            <i
              class="el-icon-film"
              style="margin-left: 10px; color: blue"
              @click="dialogVideoVisible = true"
            ></i>
            <el-dialog :visible.sync="dialogVideoVisible" title="视频">
              <video width="320" height="240" controls autoplay>
                <source :src="scope.row.videoURL" type="video/ogg" />
                <source :src="scope.row.videoURL" type="video/mp4" />
                <source :src="scope.row.videoURL" type="video/webm" />
              </video>
            </el-dialog>
          </template>
        </el-table-column>

        <el-table-column label="阅读数">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.visits }}</span>
          </template>
        </el-table-column>

        <el-table-column label="录入人">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="录入时间">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.createTime | delTime
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.state | statusTypeValue
            }}</span>
          </template>
        </el-table-column>

        <template>
          <!-- question-choice -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="updateArticles(scope.row)"
                >预览</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="handleCheck(scope.row)"
                >{{ scope.row.state == 0 ? "启用" : "禁用" }}</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="EditArticle(scope.row)"
                :disabled="scope.row.state == 0 ? false : true"
                >修改</el-button
              >

              <el-button
                disabled
                type="text"
                size="small"
                @click="handleDelete(scope.row)"
                :disabled="scope.row.state == 0 ? false : true"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </template>
      </el-table>
      <PageTool
        :total="total"
        :paginationPagesize="tableInfo.pagesize"
        :paginationPage="tableInfo.page"
        @pageSizeChange="pageSizeChange"
        @pageChange="pageChange"
      ></PageTool>
    </el-card>
  </div>
</template>

<script>
import PageTool from "../../module-manage/components/page-tool.vue";
import {
  list,
  simple,
  detail,
  add,
  update,
  remove,
  changeState,
} from "@/api/hmmm/articles";
import { status } from "@/api/hmmm/constants";
import articlesAdd from "../components/articles-add.vue";
import articlesPreview from "../components/articles-preview.vue";
export default {
  components: {
    articlesAdd,
    articlesPreview,
    PageTool,
  },

  data() {
    return {
      articlesForm: {
        id: null,
        title: "",
        articleBody: "",
        videoURL: "",
      },
      articlesInfo: {
        title: "",
        createTime: "",
        username: "",
        visits: "",
        articleBody: "",
      },

      status,
      total: 0,
      tableInfo: {
        page: 1,
        pagesize: 10,
        keyword: "",
        state: null,
      },
      addDialogVisible: false,
      previewDialogVisible: false,
      tableData: [],
      dialogVideoVisible: false,
    };
  },
  methods: {
    addArticlesFrom() {},
    // 清除
    clearData() {
      this.articles = {};
    },
    // 搜索
    search() {
      this.getList();
    },
    //resetArt
    resetArt() {
      this.addDialogVisible = false;
    },
    // resetPreview
    resetPreview() {
      this.previewDialogVisible = false;
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
    async getList() {
      const { data } = await list(this.tableInfo);

      this.total = data.counts;
      this.tableData = data.items;
      console.log(this.tableData, "tableData");
    },
    // 新增技巧
    addArticles() {
      this.addDialogVisible = true;
      this.articlesForm = {};
    },
    //修改
    EditArticle(row) {
      this.articlesForm = row;
      this.addDialogVisible = true;
    },
    // 确认新增修改
    async addUpdateArticlesFrom() {
      if (this.articlesForm.id) {
        await update(this.articlesForm);
        this.$message.success("编辑成功");
      } else {
        await add(this.articlesForm);
        this.$message.success("添加成功");
      }

      this.addDialogVisible = false;
    },
    onClose() {
      this.addDialogVisible = false;
    },
    // 删除
    async handleDelete(row) {
      await this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });

      await remove(row);
      this.$message.success("删除成功!");
      this.getList();
    },

    // 预览
    updateArticles(row) {
      this.previewDialogVisible = true;

      if (row) {
        this.articlesInfo = row;
      }
    },
    // 启用禁用
    async handleCheck(row) {
      if (row.state == 0) {
        row.state = 1;
      } else {
        row.state = 0;
      }
      await changeState(row);
    },
  },
  mounted() {
    this.getList();
  },
  computed: {},
  watch: {},
  updated() {},
  beforeDestroy() {},
  filters: {
    // 发布状态
    statusTypeValue(val) {
      const findItem = status.find((item) => item.value === parseInt(val));
      return findItem ? findItem.label : "未知";
    },
    delTime(val) {
      return val.replace("T", " ").replace(".000Z", "");
    },
  },
};
</script>

<style scoped lang="less">
.box-header {
  display: flex;
  height: 30px;
  align-items: center;
  span {
    width: 95px;
    text-align: end;
    padding-right: 10px;
    font-size: 14px;
    color: #606266;
    font-weight: 700;
  }
}
</style>
