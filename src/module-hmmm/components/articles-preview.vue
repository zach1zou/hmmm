<template>
  <div class="container">
    <!-- 预览框 -->
    <el-dialog
      title="预览文章"
      :visible="visible"
      width="50%"
      @close="resetPreview"
    >
      <!-- 主体区域 -->
      <div class="preview-box">
        <div class="preview-title">{{ articlesInfo.title }}</div>
        <div class="preview-nav">
          <span>{{ articlesInfo.createTime | delTime }}</span>
          <span>{{ articlesInfo.username }}</span>
          <span class="el-icon-view"></span>
          <span>{{ articlesInfo.visits }}</span>
        </div>
        <div class="preview-content" v-html="articlesInfo.articleBody"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "articlePreview",
  data() {
    return {};
  },
  props: {
    articlesInfo: {
      type: Object,
      required: true,
    },
    visible: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
    resetPreview() {
      this.$emit("resetPreview");
    },
  },
  filters: {
    delTime(val) {
      return val.replace("T", " ").replace(".000Z", "");
    },
  },
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
</style>
