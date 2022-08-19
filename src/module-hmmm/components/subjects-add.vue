<template>
  <div class="container">
    <!-- 添加的弹框 -->
    <el-dialog
      title="新增学科"
      :visible="addDialogVisible"
      width="20%"
      @close="resetSub"
    >
      <!-- 主体区域 -->
      <el-row>
        <el-col>
          <el-form
            :model="addSubjectsFrom"
            :rules="addSubjectsFromRules"
            ref="addSubjectsFromRef"
            label-width="80px"
            class="demo-ruleForm"
          >
            <el-form-item label="学科名称" prop="subjectName">
              <el-input
                v-model="addSubjectsFrom.subjectName"
                placeholder="请输入学科名称"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <span class="subspan">是否显示</span>
        <el-switch
          v-model="SubSwitchValue"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-row>
      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubFrom">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addDialogVisible: false,
      // 添加学科是否显示的开关
      SubSwitchValue: true,
      // 添加的验证
      addSubjectsFromRules: {
        subjectName: [
          { required: true, message: "请输入学科名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
      },
      // 添加的输入框数据
      addSubjectsFrom: {
        subjectName: "",
      },
    };
  },
  methods: {
    resetSub() {
      this.$emit("resetSub");
    },
    addSubFrom() {
      this.addDialogVisible = false;
      this.$emit("addSubFrom");
    },
  },
};
</script>

<style scoped lang="less">
.elform {
  width: 100%;
}

.el-form-item__content {
  margin-left: 10px;
}
</style>
