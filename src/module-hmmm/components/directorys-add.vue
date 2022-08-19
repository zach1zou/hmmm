<template>
  <div class="container">
    <!-- 添加目录弹框 -->
    <el-dialog
      title="新增目录"
      :visible="addDialogVisible"
      width="20%"
      @close="restDir"
    >
      <!-- 主体区域 -->
      <el-row>
        <el-col>
          <el-form
            :model="directorysForm"
            :rules="directorysFormRules"
            ref="directorysFormRef"
            label-width="80px"
            class="demo-ruleForm"
          >
            <el-form-item
              v-if="!subjects.id && !subjects.name"
              class="elform"
              label="所属学科"
            >
              <el-select
                v-model="directorysForm.value"
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
            <el-form-item class="elform" label="目录名称" prop="directoryName">
              <el-input
                v-model="directorysForm.directoryName"
                placeholder="请输入目录名称"
                style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDirForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addDialogVisible: false,
      // 验证
      directorysFormRules: {
        directoryName: [
          { required: true, message: "请输入目录名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
      },
      // 添加目录的数据
      directorysForm: {
        directoryName: "",
        // 下拉框的值
        value: "",
      },
    };
  },
  props: {
    subjects: {
      type: Object,
      required: true,
    },
  },
  methods: {
    restDir() {
      this.$emit("restDir");
    },
    addDirForm() {
      this.addDialogVisible = false;
      this.$emit("addDirForm");
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
