<template>
  <div class="container">
    <el-dialog
      title="添加目录"
      :visible="showDialog"
      @click.native="$emit('newClass')"
      @close="closeFn"
    >
      <el-form :form='sizeForm'>
        <el-form-item label="活动名称" label-width="120px" style="width: 300px">
          <el-input autocomplete="off" v-model="sizeForm.name"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="是否显示">
          <el-switch v-model="sizeForm.desc"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sizeForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeFn() {
      this.$emit("closeFn");
    },
  },
};
</script>

<style scoped lang="less"></style>
