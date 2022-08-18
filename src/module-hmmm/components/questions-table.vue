<template>
  <div>
    <el-alert
      :title="`数据一共 ${total} 条`"
      type="info"
      show-icon
      :closable="false"
      style="margin-bottom: 20px"
    >
    </el-alert>
    <!-- table表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: 'rgb(243,246,251)' }"
    >
      <el-table-column label="试题编号" width="120">
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
      <el-table-column label="题干" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-html="scope.row.question"></span>
        </template>
      </el-table-column>
      <el-table-column label="录入时间" width="180">
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
      <el-table-column label="录入人" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.creator }}</span>
        </template>
      </el-table-column>
      <template v-if="isShow">
        <el-table-column label="审核状态" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.chkState | chkTypeValue
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核意见" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.chkRemarks }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核人" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.chkUser }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布状态" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.publishState | publishTypeValue
            }}</span>
          </template>
        </el-table-column>
      </template>
      <template>
        <!-- question -->
        <el-table-column label="操作" width="180" v-if="showQuestion">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-view"
              circle
              plain
              size="small"
              @click="handleEdit(scope.row)"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-edit"
              circle
              plain
              size="small"
              @click="
                $router.push({
                  name: 'questions-new',
                  query: {
                    id: scope.row.id,
                  },
                })
              "
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              size="small"
              @click="handleDelete(scope.row)"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-check"
              circle
              plain
              size="small"
              @click="handleJoin(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
        <!-- question-choice -->
        <el-table-column label="操作" width="200" v-else fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)"
              >预览</el-button
            >
            <el-button
              type="text"
              size="small"
              :disabled="scope.row.chkState == 0 ? false : true"
              @click="handleCheck(scope.row)"
              >审核</el-button
            >
            <el-button
              type="text"
              size="small"
              :disabled="scope.row.publishState == 2 ? true : false"
              @click="
                $router.push({
                  name: 'questions-new',
                  query: {
                    id: scope.row.id,
                  },
                })
              "
              >修改</el-button
            >
            <el-button type="text" size="small" @click="PublishFn(scope.row)">{{
              scope.row.publishState == 2 ? "下架" : "上架"
            }}</el-button>
            <el-button
              disabled
              type="text"
              size="small"
              :disabled="scope.row.publishState == 1 ? true : false"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </template>
    </el-table>
    <PageTool
      :total="total"
      :paginationPagesize="paginationPagesize"
      :paginationPage="paginationPage"
      @pageSizeChange="pageSizeChange"
      @pageChange="pageChange"
    ></PageTool>
    <!-- 查看详细弹层 -->
    <el-dialog title="题目预览" :visible.sync="questionInfoDialog">
      <el-row style="height: 36px">
        <el-col :span="6"
          ><div>
            【题型】：{{ dialogInfo.questionType | formatOfquestionType }}
          </div></el-col
        >
        <el-col :span="6"
          ><div>【编号】：{{ dialogInfo.id }}</div>
        </el-col>
        <el-col :span="6"
          ><div>【难度】：{{ dialogInfo.difficulty | formatOfdifficulty }}</div>
        </el-col>
        <el-col :span="6"
          ><div>【标签】：{{ dialogInfo.tags }}</div>
        </el-col>
      </el-row>
      <el-row style="height: 36px">
        <el-col :span="6"
          ><div>【学科】：{{ dialogInfo.subjectName }}</div></el-col
        >
        <el-col :span="6"
          ><div>【目录】：{{ dialogInfo.directoryName }}</div></el-col
        >
        <el-col :span="6"
          ><div>【方向】：{{ dialogInfo.direction }}</div></el-col
        >
        <el-col :span="6"><div></div></el-col>
      </el-row>
      <hr />
      <div>
        <h4>【题干】：</h4>
        <p style="color: blue" v-html="dialogInfo.question"></p>
        <template>
          <!-- 单选 -->
          <div v-if="dialogInfo.questionType == 1 ? true : false">
            <p>单选题 选项：（以下选中的选项为正确答案）</p>
            <div
              style="height: 33px"
              v-for="item in dialogInfo.options"
              :key="item.id"
            >
              <el-radio v-model="radio" :label="item.isRight">{{
                item.title
              }}</el-radio>
            </div>

            <hr />
          </div>
          <!-- 多选 -->
          <div v-else>
            <p>多选题 选项：（以下选中的选项为正确答案）</p>
            <el-checkbox-group v-model="checkList">
              <div style="height: 33px" v-for="item in dialogInfo.options">
                <el-checkbox :label="item.isRight">{{
                  item.title
                }}</el-checkbox>
              </div>
            </el-checkbox-group>
            <hr />
          </div>
        </template>
        <!-- 参考答案 -->
        <div>
          <span>【参考答案】：</span>
          <el-button
            type="danger"
            size="small"
            @click="showVideo = true"
            style="display: block"
            >视频答案预览</el-button
          >
          <video v-show="showVideo" width="320" height="240" controls autoplay>
            <source :src="dialogInfo.videoURL" type="video/ogg" />
            <source :src="dialogInfo.videoURL" type="video/mp4" />
            <source :src="dialogInfo.videoURL" type="video/webm" />
          </video>
        </div>
        <hr />
        <!-- 答案解析 -->
        <div style="height: 33px">
          <span>【答案解析】：</span>
          <span v-html="dialogInfo.answer" style="display: inline-block"></span>
        </div>
        <hr />
        <!-- 题目备注 -->
        <div style="height: 33px">
          <span>【题目备注】：</span>
          <span>{{ dialogInfo.remarks }}</span>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="questionInfoDialog = false" type="primary"
          >关闭</el-button
        >
      </div>
    </el-dialog>
    <!-- 审核 -->
    <el-dialog title="题目审核" :visible.sync="checkInfoDialog">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item>
          <el-radio v-model="form.chkState" :label="1">通过</el-radio>
          <el-radio v-model="form.chkState" :label="2">拒绝</el-radio>
        </el-form-item>
        <el-form-item>
          <el-input
            style="margin-top: 20px"
            type="textarea"
            :rows="2"
            placeholder="请输入审核意见"
            v-model="form.chkRemarks"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="checkInfoDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  difficulty,
  questionType,
  chkType,
  publishType,
} from "@/api/hmmm/constants";
import PageTool from "../../module-manage/components/page-tool.vue";
import {
  remove,
  choiceAdd,
  detail,
  choiceCheck,
  choicePublish,
} from "@/api/hmmm/questions";

export default {
  name: "questions-table",
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
    isShow: {
      type: Boolean,
      default: () => false,
    },
    showQuestion: {
      type: Boolean,
      default: () => true,
    },
  },
  components: { PageTool },
  data() {
    return {
      questionInfoDialog: false,
      checkInfoDialog: false,
      dialogInfo: {
        questionType: 1,
        id: 1,
        difficulty: 1,
        tags: "",
        subjectName: "",
        directoryName: "",
        direction: "",
        question: "",
        answer: "",
        remarks: "",
        options: [],
        videoURL: "",
      },
      showVideo: false,

      // 单选
      radio: 1,
      // 多选
      checkList: [1],
      // 审核状态
      chkType,
      // 发布状态
      publishType,
      // 审核弹框

      form: {
        id: 1,
        chkState: 1,
        chkRemarks: "",
      },
    };
  },
  methods: {
    async handleEdit(row) {
      this.questionInfoDialog = true;
      const { data } = await detail(row);
      this.dialogInfo = data;
      console.log(data, "题目");
    },
    // 删除
    async handleDelete(row) {
      await this.$confirm("此操作将永久删除该题目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });

      await remove(row);
      this.$emit("delete");
      this.$message.success("删除成功!");
    },
    //加入精选
    async handleJoin(row) {
      await this.$confirm("此操作将该题目加入精选, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      });
      row.choiceState = 1;

      await choiceAdd(row);
      this.$emit("choiceAdd");
      this.$message.success("加入精选列表成功");
    },
    // 每页显示信息条数
    pageSizeChange(val) {
      this.$emit("pageSizeChange", val);
    },
    // 进入某一页
    pageChange(val) {
      this.$emit("pageChange", val);
    },
    //审核
    handleCheck(row) {
      this.checkInfoDialog = true;
      this.form.chkRemarks = row.chkRemarks;
      this.form.id = row.id;
    },
    // 审核确认
    async onSubmit() {
      try {
        await choiceCheck(this.form);
        this.$message.success("审核成功");
        this.checkInfoDialog = false;
        this.$emit("submitSuccess");
      } catch (error) {
        this.$message.error("审核失败,请把数据填写完整");
      }
    },
    // 上下架
    async PublishFn(row) {
      console.log(row, "上下架");
      if (row.publishState == 1) {
        await this.$confirm("您确认下架这道题目吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        this.$message.success("下架成功");
      } else {
        await this.$confirm("您确认上架这道题目吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        this.$message.success("上架成功");
      }
      this.$emit("PublishSuccess");
      await choicePublish(row);
    },
  },
  mounted() {},
  computed: {},
  watch: {},
  updated() {},
  beforeDestroy() {},
  filters: {
    // 题型
    formatOfquestionType(val) {
      const findItem = questionType.find(
        (item) => item.value === parseInt(val)
      );
      return findItem.label;
    },
    // 难度
    formatOfdifficulty(val) {
      const findItem = difficulty.find((item) => item.value === parseInt(val));
      return findItem.label;
    },
    // 审核状态
    chkTypeValue(val) {
      const findItem = chkType.find((item) => item.value === parseInt(val));
      return findItem ? findItem.label : "未知";
    },

    // 发布状态
    publishTypeValue(val) {
      const findItem = publishType.find((item) => item.value === parseInt(val));
      return findItem ? findItem.label : "未知";
    },
  },
};
</script>
<style lang="less" scoped></style>
