<template>
  <div class="container">
    <el-card>
      <!-- 面包屑区域 -->
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        v-if="subjects.id && subjects.name"
      >
        <el-breadcrumb-item>学科管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{
          subjects.id ? subjects.name : ""
        }}</el-breadcrumb-item>
        <el-breadcrumb-item>目录管理</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 搜索栏区域 -->
      <el-row>
        <el-col :span="18">
          <!-- 搜索框 -->
          <el-col :span="11">
            <el-form ref="subjectFrom" :model="queryList" label-width="80px">
              <el-form-item label="标签名称">
                <el-input
                  class="inputCol"
                  v-model="queryList.directoryName"
                ></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="queryList.state" placeholder="请选择">
                  <el-option label="已启用" :value="1"> </el-option>
                  <el-option label="已禁用" :value="0"> </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12" class="left-fot">
            <el-button size="small" class="colInput" plain @click="resetInput"
              >清除</el-button
            >
            <el-button
              size="small"
              class="colInput"
              type="primary"
              @click="getTagsList"
              >搜索</el-button
            >
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-button
            class="colright"
            size="mini"
            type="success"
            icon="el-icon-edit"
            @click="addDialogVisible = true"
            >新增学科</el-button
          >
          <el-button
            v-if="subjects.id && subjects.name"
            type="text"
            class="colright"
            icon="el-icon-back"
            @click="$router.back()"
            >返回学科</el-button
          >
        </el-col>
      </el-row>

      <!-- 消息文案 -->
      <el-alert
        :title="`数据一共 ${counts} 条`"
        :closable="false"
        type="info"
        show-icon
      >
      </el-alert>

      <!-- 表格区域 -->
      <el-table :data="tagsList" style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="subjectName" label="所属学科"> </el-table-column>
        <el-table-column prop="tagName" label="目录名称"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="addDate" label="创建日期"> </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            {{ scope.row.state === 1 ? "已启用" : "已禁用" }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editState(scope.row)">{{
              scope.row.state === 1 ? "禁用" : "启用"
            }}</el-button>
            <el-button
              type="text"
              :disabled="scope.row.state === 1"
              @click="editTags(scope.row)"
              >修改</el-button
            >
            <el-button
              type="text"
              :disabled="scope.row.state === 1"
              @click="removeTag(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <pageTool
        :page="queryList.page"
        :pagesize="queryList.pagesize"
        :total="counts"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      />
    </el-card>

    <!-- 添加标签弹框 -->
    <el-dialog
      title="新增目录"
      :visible.sync="addDialogVisible"
      width="20%"
      @close="restDir"
    >
      <!-- 主体区域 -->
      <el-row>
        <el-col>
          <el-form
            :model="tagsForm"
            :rules="tagsFormRules"
            ref="tagsFormRef"
            label-width="80px"
            class="demo-ruleForm"
          >
            <el-form-item
              v-if="!subjects.id && !subjects.name"
              class="elform"
              label="所属学科"
            >
              <el-select
                v-model="tagsForm.value"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in addFrom"
                  :key="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="elform" label="目录名称" prop="tagName">
              <el-input
                v-model="tagsForm.tagName"
                placeholder="请输入目录名称"
                style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTagsForm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改标签弹框 -->
    <el-dialog
      title="修改目录"
      :visible.sync="editDialogVisible"
      width="20%"
      @close="restDir"
    >
      <!-- 主体区域 -->
      <el-row>
        <el-col>
          <el-form
            :model="editTagList"
            :rules="tagsFormRules"
            ref="tagsFormRef"
            label-width="80px"
            class="demo-ruleForm"
          >
            <el-form-item
              v-if="!subjects.id && !subjects.name"
              class="elform"
              label="所属学科"
            >
              <el-select
                v-model="editTagList.value"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in addFrom"
                  :key="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="elform" label="目录名称" prop="tagName">
              <el-input
                v-model="editTagList.tagName"
                placeholder="请输入目录名称"
                style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editTagsForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Tag from "@/api/hmmm/tags";
import Subject from "@/api/hmmm/subjects";
import pageTool from "@/module-manage/components/page-tool";

export default {
  name: "Tags",
  data() {
    return {
      // 标签id
      infoId: "",

      // 修改的表单值
      editTagList: {
        value: "",
        tagName: "",
      },

      // 添加标签的表单值
      tagsForm: {
        tagName: "",
        value: "",
      },

      // 学科简单列表
      addFrom: [],

      // 请求标签数据参数
      queryList: {
        page: 1,
        pagesize: 10,
        directoryName: "",
        state: null,
      },
      // 标签数据列表
      tagsList: [],
      // 标签总条数
      counts: 0,
      // 添加框的显示与隐藏
      addDialogVisible: false,
      // 修改的弹框显示与隐藏
      editDialogVisible: false,
      // 添加验证
      tagsFormRules: {
        tagName: [
          { required: true, message: "请输入目录名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  components: {
    pageTool,
  },
  computed: {
    subjects() {
      return this.$route.query || null;
    },
  },
  watch: {
    "$route.query"() {
      this.getTagsList();
    },
  },
  created() {
    this.getTagsList();
    this.getAddFrom();
  },
  methods: {
    // 点击确定修改
    async editTagsForm() {
      try {
        if (this.subjects.id && this.subjects.name) {
          await Tag.update({
            id: this.infoId,
            subjectID: +this.subjects.id,
            tagName: this.editTagList.tagName,
          });
          this.$message.success("修改目录成功");
          this.editDialogVisible = false;
          this.getTagsList();
        } else {
          await Tag.update({
            id: this.infoId,
            subjectID: this.editTagList.value,
            tagName: this.editTagList.tagName,
          });
          this.$message.success("修改目录成功");
          this.editDialogVisible = false;
          this.getTagsList();
        }
      } catch (e) {
        console.log(e);
      }
    },

    // 修改
    editTags(row) {
      console.log(row);
      this.editTagList.value = row.subjectID;
      this.infoId = row.id;
      this.editTagList.tagName = row.tagName;
      this.editDialogVisible = true;
    },

    // 删除标签
    async removeTag(row) {
      console.log(row);
      const configRuselt = await this.$confirm(
        "此操作将永久删除该学科, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (configRuselt !== "confirm") {
        return this.$message("您取消了删除操作!");
      }
      try {
        const { data } = await Tag.remove(row);
        console.log(data);
        this.$message.success("删除成功!");
        this.getTagsList();
      } catch (e) {
        this.$message.error("删除失败!");
      }
    },

    // 添加操作
    async addTagsForm() {
      try {
        if (this.subjects.id && this.subjects.name) {
          await Tag.add({
            subjectID: +this.subjects.id,
            tagName: this.tagsForm.tagName,
          });
          this.$message.success("新增目录成功");
          this.addDialogVisible = false;
          this.getTagsList();
        } else {
          await Tag.add({
            subjectID: this.tagsForm.value,
            tagName: this.tagsForm.tagName,
          });
          this.$message.success("新增目录成功");
          this.addDialogVisible = false;
          this.getTagsList();
        }
      } catch (e) {
        this.$message.error("新增目录失败");
        console.log(e);
      }
    },

    // 添加重置
    restDir() {
      this.$refs.tagsFormRef.resetFields();
      this.tagsForm.value = "";
    },

    // 获取学科简单列表
    async getAddFrom() {
      try {
        const { data } = await Subject.simple();
        this.addFrom = data;
      } catch (e) {
        console.log(e);
      }
    },

    // 请求标签列表
    async getTagsList() {
      try {
        this.queryList.subjectID = this.subjects.id || null;
        const { data } = await Tag.list(this.queryList);
        this.tagsList = data.items;
        this.counts = data.counts;
      } catch (e) {
        this.$message.error("请求失败");
      }
    },

    // 清除输入框
    resetInput() {
      this.queryList.directoryName = "";
      this.queryList.state = null;
      this.getTagsList();
    },

    // 修改状态
    async editState(row) {
      console.log(row);
      try {
        await Tag.changeState({
          id: row.id,
          state: row.state === 1 ? 0 : 1,
        });
        this.$message.success("操作成功");
        row.state = row.state === 1 ? 0 : 1;
      } catch (e) {
        this.$message.error("请求错误!");
      }
    },

    // 一页多少条
    handleSizeChange(newSize) {
      this.queryList.pagesize = newSize;
      this.getTagsList();
    },

    // 多少页
    handleCurrentChange(newPage) {
      this.queryList.page = newPage;
      this.getTagsList();
    },
  },
};
</script>

<style scoped lang="scss">
.left-fot {
  margin-left: 9px;
}
.el-row {
  margin-top: 20px;
}
.colInput {
  height: 35px;
}
.colright {
  float: right;
  height: 35px;
  margin-left: 10px;
}
.el-breadcrumb {
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
.inputCol {
  width: 200px;
}
.el-form-item {
  display: inline-block;
}
.el-table {
  margin-top: 10px;
}
.el-pagination {
  float: right;
  margin-top: 20px;
}
.elform {
  width: 100%;
}

.el-form-item__content {
  margin-left: 10px;
}
</style>