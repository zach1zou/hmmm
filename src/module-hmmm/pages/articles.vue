<template>
  <div class="container">
    <articlesAdd
      :addDialogVisible="addDialogVisible"
      @addArticlesFrom="addArticlesFrom"
    />
    <articlesPreview :previewDialogVisible="previewDialogVisible" />
  </div>
</template>

<script>
import articlesAdd from "../components/articles-add.vue";
import articlesPreview from "../components/articles-preview.vue";
export default {
  components: {
    articlesAdd,
    articlesPreview,
  },
  methods: {
    addArticlesFrom() {},
  },
};
</script>

<style scoped lang="less"></style>
