<template>
  <div class="container">
    <el-dialog
      title="添加学科"
      :visible="showDialog"
      @click.native="$emit('newClass')"
      @close="closeFn"
    >
      <el-form :form="sizeForm" :rules="sizeFormRuler">
        <el-form-item
          label="活动名称"
          label-width="120px"
          style="width: 300px"
          prop="names"
        >
          <el-input autocomplete="off" v-model="sizeForm.name"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="是否显示">
          <el-switch></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="showDialog = false">确 定</el-button>
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
      },
      sizeFormRuler: {
        names: [
          { required: true, message: "请输入学科名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
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
