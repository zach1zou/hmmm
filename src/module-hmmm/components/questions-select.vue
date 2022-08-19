<template>
  <div>
    <!-- 题头 -->
    <div class="container-title">
      <span style="font-size: 20px; color: pink">作者：邹宗霖</span>
      <el-button
        type="success"
        icon="el-icon-edit"
        size="small"
        @click="$router.push('/questions/new')"
        >新增试题</el-button
      >
    </div>
    <!-- 筛选 -->
    <div class="form-group-container">
      <el-row>
        <el-col :span="6"
          ><div class="grid-content">
            <span>学科</span
            ><el-select
              v-model="question.subjectID"
              placeholder="请选择"
              style="width: 100%"
              @change="changeSubjectValue"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content">
            <span>二级目录</span
            ><el-select
              v-model="question.catalogID"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in directorysList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content">
            <span>标签</span
            ><el-select
              v-model="question.tags"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in tagsList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content">
            <span>关键字</span
            ><el-input
              v-model="question.keyword"
              placeholder="请输入内容"
            ></el-input></div
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="6"
          ><div class="grid-content">
            <span>试题类型</span
            ><el-select
              v-model="question.questionType"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in questionTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content">
            <span>难度</span
            ><el-select
              v-model="question.difficulty"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in difficultyList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content">
            <span>方向</span
            ><el-select
              v-model="question.direction"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in directionList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content">
            <span>录入人</span
            ><el-select
              v-model="question.creatorID"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in userList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select></div
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="6"
          ><div class="grid-content">
            <span>题目备注</span
            ><el-input
              v-model="question.remarks"
              placeholder="请输入内容"
            ></el-input></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content">
            <span>企业简称</span
            ><el-input
              v-model="question.shortName"
              placeholder="请输入内容"
            ></el-input></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content">
            <span>城市</span
            ><el-select
              @change="changeProvince(question.province)"
              v-model="question.province"
              placeholder="请选择"
              style="width: 48%; margin-right: 2%"
            >
              <el-option
                v-for="item in provincesData"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="question.city"
              placeholder="请选择"
              style="width: 50%"
            >
              <el-option
                v-for="item in citysData"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content">
            <div style="width: 80%"></div>
            <el-button size="small" @click="clearData">清除</el-button>
            <el-button type="primary" size="small" @click="search"
              >搜索</el-button
            >
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
import { provinces, citys, datas } from "@/api/hmmm/citys.js";
import { difficulty, direction, questionType } from "@/api/hmmm/constants";
import { directoryssimple } from "@/api/hmmm/directorys";
import { tagssimple } from "@/api/hmmm/tags";
import { list } from "@/api/hmmm/questions";

export default {
  name: "QuestionsSelect",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      question: {
        // 学科
        subjectID: "",
        // 二级目录
        catalogID: "",
        // 标签
        tags: "",
        //难度
        difficulty: "",
        //方向
        direction: "",
        //试题类型
        questionType: "",
        //录入人
        creatorID: "",
        // 城市
        province: "",
        city: "",
        //关键字
        keyword: "",
        //题目备注
        remarks: "",
        //企业简称
        shortName: "",
      },
      // 市
      provincesData: provinces(datas),
      // 区
      citysData: [],
      directorysList: [],
      tagsList: [],
      userList: [],

      difficultyList: difficulty,
      directionList: direction,
      questionTypeList: questionType,
    };
  },
  methods: {
    async changeSubjectValue() {
      const { data: directorysList } = await directoryssimple({
        subjectID: this.Subjectvalue,
      });
      this.directorysList = directorysList;

      const { data: tagsList } = await tagssimple({
        subjectID: this.Subjectvalue,
      });

      this.tagsList = tagsList;
    },
    // 获取录入人列表
    async getUserList() {
      const { data } = await list();
      console.log(data);
      this.userList = [...new Set(data.items.map((val) => val.creator))];
    },
    // 改变城市的时候
    changeProvince(val) {
      this.citysData = citys(val);
    },
    // 清除
    clearData() {
      this.question = {};
      this.directorysList = [];
      this.tagsList = [];
    },
    // 搜索
    search() {
      this.$emit("search", this.question);
    },
  },
  mounted() {
    this.getUserList();
  },
  computed: {},
  watch: {},
  updated() {},
  beforeDestroy() {},
  filters: {},
};
</script>

<style scoped lang="less">
.container-title {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form-group-container {
  .el-row {
    height: 50px;
    .grid-content {
      display: flex;
      align-items: center;
      span {
        width: 80px;
        text-align: end;
        padding-right: 10px;
        font-size: 14px;
        color: #606266;
        font-weight: 700;
      }
    }
  }
}
</style>
