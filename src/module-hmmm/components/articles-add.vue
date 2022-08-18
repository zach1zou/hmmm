<template>
  <div class="container">
    <el-dialog
      :title="articlesForm.id ? '修改文章' : '新增文章'"
      :visible="visible"
      width="50%"
      @close="resetArt"
    >
      <!-- 表单区域 -->
      <el-form
        :model="articlesForm"
        :rules="articlesFormRules"
        ref="articlesFormRef"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="文章标题" prop="title" class="elform">
          <el-input
            v-model="articlesForm.title"
            placeholder="请输入文章标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章内容" prop="articleBody" class="elform">
          <quill-editor
            style="margin-left: 0px"
            v-model="articlesForm.articleBody"
            ref="myQuillEditor"
            :options="editorOption"
          >
          </quill-editor>
        </el-form-item>
        <el-form-item label="视频地址" class="elform">
          <el-input
            v-model="articlesForm.videoURL"
            placeholder="请输入视频地址"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('onClose')">取 消</el-button>
        <el-button type="primary" @click="onTrue">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; // 调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "articles-add",
  data() {
    return {
      // 富文本选项
      editorOption: {
        placeholder: "请输入文章内容",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗，斜体，下划线，删除线
            [{ list: "ordered" }, { list: "bullet" }], // 列表
            ["blockquote"], // 引用
            ["code-block", "image", "link"], // 代码块，上传图片、链接
          ],
        },
      },
      // 添加验证
      articlesFormRules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        articleBody: [
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
        videoURL: [
          { required: true, message: "请输入视频地址", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    // 添加框数据
    articlesForm: {
      type: Object,
      default: () => {},
    },
    visible: {
      type: Boolean,
      default: () => false,
    },
  },
  components: {
    quillEditor,
  },
  methods: {
    resetArt() {
      this.$emit("resetArt");
    },
    async onTrue() {
      await this.$refs.articlesFormRef.validate();

      this.$emit("addUpdateArticlesFrom");
    },
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.preview-box {
  .preview-title {
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .preview-nav {
    span {
      margin-right: 10px;
    }
  }
  .preview-content {
    margin-top: 10px;
    padding: 10px;
    background-color: #f5f5f5;
    border-top: 1px dashed #ccc;
  }
}

.elform {
  width: 100%;
}

.el-form-item__content {
  margin-left: 10px;
}
/deep/.ql-container {
  height: 200px;
}
</style>
