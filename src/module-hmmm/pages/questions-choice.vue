<template>
  <div>
    <div class="question-container">
      <el-card class="box-card">
        <QuestionsSelect :options="options"></QuestionsSelect>
      </el-card>
    </div>
  </div>
</template>
<script>
import QuestionsSelect from "../components/questions-select.vue";
export default {
  props: {},
  components: { QuestionsSelect },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
  },
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
  updated() {},
  beforeDestroy() {},
  filters: {},
};
</script>
<style lang="less" scoped>
.question-container {
  padding: 0 10px;
  margin: 10px 0;
}
</style>
