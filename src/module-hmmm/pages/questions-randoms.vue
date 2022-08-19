<template>
  <div class="container">
    <!-- 关键字搜索 -->
    <div class="keywords">
      <div>
        <span class="keywords-left">关键字</span>
        <el-input v-model="pages.keyword" placeholder="根据编号搜索"></el-input>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;李灿</span>
      </div>

      <!-- 右侧按钮 -->
      <div class="keywords-right">
        <el-button @click="onClear">清除</el-button>
        <el-button type="primary" @click="onSave">搜索</el-button>
      </div>
    </div>
    <!-- 提示 -->
    <el-alert
      :title="`数据一共${total}条`"
      :closable="false"
      type="info"
      show-icon
    >
    </el-alert>
    <!-- 表格 -->
    <el-table :data="RandomsList" style="width: 100%">
      <el-table-column prop="id" label="编号" width="220"> </el-table-column>
      <el-table-column
        width="80"
        :formatter="questionTypeMent"
        prop="questionType"
        label="题型"
      >
      </el-table-column>
      <el-table-column prop="" label="题目编号" width="220">
        <template slot-scope="{ row }">
          <div v-for="(item, index) in row.questionNum" :key="index">
            <a @click="showPreview(item)" style="color: #0099ff">{{
              item.num
            }}</a>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="addTime" label="录入时间"> </el-table-column>
      <el-table-column prop="totalSeconds" label="答题时间(s)">
      </el-table-column>
      <el-table-column prop="accuracyRate" label="正确率(%)"> </el-table-column>
      <el-table-column prop="userName" label="录入人"> </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="{ row }">
          <el-button
            @click="onRemove(row)"
            type="danger"
            icon="el-icon-delete"
            plain
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <page-tool
      :paginationPagesize="pages.pagesize"
      :total="total"
      class="page"
      @pageChange="pageChange"
      @pageSizeChange="pageSizeChange"
    ></page-tool>
    <!-- 预览 -->
    <questions-preview
      ref="preview"
      :visible.sync="showQuestionsPreview"
    ></questions-preview>
  </div>
</template>

<script>
import PageTool from "@/module-manage/components/page-tool.vue";
import {
  randoms,
  removeRandoms,
  detail,
  list,
  choice,
} from "@/api/hmmm/questions";
import { questionType } from "../../api/hmmm/constants";
import QuestionsPreview from "@/module-hmmm/components/questionsPreview.vue";
export default {
  components: {
    PageTool,
    QuestionsPreview,
  },
  data() {
    return {
      showQuestionsPreview: false,
      RandomsList: [], // 得到的数据
      total: 0, // 总数据
      pages: {
        page: 1,
        pagesize: 20,
        keyword: "",
      },
      id: "", //题组id
      arr: [],
      num: 0,
    };
  },
  created() {
    this.getRandomsList();
  },
  methods: {
    async getRandomsList() {
      const { data } = await randoms(this.pages);
      console.log(data);

      this.total = data.counts;
      this.RandomsList = data.items;
    },
    // 题型判断
    questionTypeMent(row, column, cellValue, index) {
      const questionTypeItem = questionType.find((item) => {
        return item.value == cellValue;
      });
      return questionTypeItem ? questionTypeItem.label : "未知";
    },
    // 页数触发改变
    pageChange(val) {
      this.pages.page = val;
      this.getRandomsList();
    },
    // 每页显示数
    pageSizeChange(val) {
      this.pages.pagesize = val;
      this.getRandomsList();
    },
    // 点击搜索
    onSave() {
      if (this.pages.keyword.trim().length === 0) return;
      this.pages.keyword = this.pages.keyword;
      // this.this.pages.keyword = "";
      this.getRandomsList();
      // console.log(this.pages.keyword);
    },
    // 点击清除
    onClear() {
      if (this.pages.keyword.trim().length === 0) return;
      this.pages.keyword = "";
      this.getRandomsList();
    },
    // 点击删除确定
    onRemove(row) {
      this.$confirm("此操作将永久删除该题组, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await removeRandoms(row);
        this.getRandomsList();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    // 点击显示
    async showPreview(num) {
      try {
        console.log(num);
        const { data } = await choice();
        // const rows = data.items.filter((item) => {
        //   return item.questionType === row.questionType;
        // });
        // console.log(data);

        this.arr.push({
          id: data.items[Math.floor(Math.random() * data.items.length)].id,
          num: num.num,
        });
        const a = this.arr.filter((item) => {
          return item.num === num.num;
        });
        console.log(a);
        const res = await detail({
          id: a[0].id,
        });
        // console.log(res);

        this.$refs.preview.DetailList = res.data;
        this.showQuestionsPreview = true;
      } catch (error) {
        this.$message.error('请刷新重试')
      }
    },
  },
};
</script>

<style scoped lang="less">
.el-alert--info.is-light {
  margin: 15px 0;
}
.keywords-right {
  display: flex;
  margin-left: auto;
  justify-content: flex-end;
  align-items: center;
}
.keywords {
  display: flex;
}
.keywords-left {
  margin-right: 12px;
}
.container {
  background-color: #fff;
  padding: 20px;
  margin: 10px 10px;
}
/deep/.el-input__inner {
  width: unset;
}
.el-input {
  width: unset;
}
// .el-button--medium.is-circle {
//   color: #f56c6c;
//   background: #fef0f0;
//   border-color: #fbc4c4;
// }
.page {
  margin-top: 20px;
  text-align: right;
}
</style>
