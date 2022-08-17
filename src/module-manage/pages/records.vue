<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-alert title="共100条记录" type="info" show-icon> </el-alert>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column label="操作类型" width="250" />
        <el-table-column label="操作人" width="200" />
        <el-table-column label="执行结果" width="250" />
        <el-table-column label="操作时间" width="250" />
        <el-table-column label="描述" />
      </el-table>
      <pageTool />
    </el-card>
  </div>
</template>

<script>
import pageTool from "../components/page-tool.vue";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  components: {
    pageTool,
  },
  created() {},

  methods: {},
};
</script>

<style scoped lang="less"></style>
