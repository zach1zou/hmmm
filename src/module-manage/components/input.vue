<template>
  <div class="input-container">
    <el-row type="flex">
      <el-col>
        <el-form
          ref="form"
          size="small"
          :inline="true"
          class="demo-form-inline"
        >
          <el-form-item
            style="width: 250px"
            v-for="(item, index) in inpText"
            :key="index"
            :label="item.label"
            :model="data"
          >
            <el-input v-model="data.usernames" :placeholder="item.placeholder">
            </el-input>
          </el-form-item>
          <el-form-item v-for="(item, index) in fnBtn" :key="index">
            <el-button :plain="item.plain" size="small" :type="item.type">{{
              item.btnText
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col>
        <el-row type="flex" justify="end">
          <el-button size="small" type="success" @click="$emit('onsave')"
            ><i class="el-icon-edit"></i>{{ btnText }}</el-button
          >
        </el-row>
      </el-col>
    </el-row>

    <el-tag
      type="info"
      style="
        width: 100%;
        color: #909399;
        background-color: #f4f4f5;
        border-radius: 4px;
      "
    >
      <i :class="downIcon">共<slot name="downtag" />条记录</i>
    </el-tag>
  </div>
</template>

<script>
export default {
  name: "PageTools",
  data() {
    return {
      data: {
        usernames: "",
      },
    };
  },
  props: {
    downIcon: {
      type: String,
      default: "el-icon-info",
    },
    inpText: {
      type: Array,
      default: [
        {
          label: "",
          placeholder: "根据用户名搜索",
        },
      ],
    },
    btnText: {
      type: String,
      default: "新增用户",
    },
    fnBtn: {
      type: Array,
      default: [
        {
          plain: 1,
          btnText: "清除",
          type: "",
        },
        {
          plain: 0,
          btnText: "搜索",
          type: "primary",
        },
      ],
    },
  },
  created() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
