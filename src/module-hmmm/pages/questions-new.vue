<template>
  <div class="container">
    <div class="title">
      试题录入 <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;李灿</span>
    </div>

    <!-- 表格 -->
    <div class="table">
      <el-form :rules="rulesForm" ref="form" :model="form" label-width="120px">
        <el-form-item label="学科：" prop="subject">
          <el-select
            style="width: 400px"
            v-model="form.subject"
            placeholder="请选择"
            @focus="getsimpleList"
            @change="subjectDirectory"
          >
            <el-option
              v-for="(item, index) in simpleList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目录：" prop="directory">
          <el-select
            style="width: 400px"
            v-model="form.directory"
            placeholder="请选择"
          >
            <el-option
              v-for="item in directoryList"
              :key="item.id"
              :label="item.directoryName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业：" prop="enterprise">
          <el-select
            @focus="getCompanyList"
            style="width: 400px"
            v-model="form.enterprise"
            placeholder="请选择"
          >
            <el-option
              v-for="item in companyList"
              :key="item.id"
              :label="item.shortName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市：" class="city" required>
          <el-form-item prop="city1">
            <el-select
              style="width: 198px"
              v-model="form.city1"
              placeholder="请选择"
              @change="oneCitys"
            >
              <el-option
                v-for="(item, index) in provinces"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="city2">
            <el-select
              ref="secondCity"
              style="width: 198px; margin-left: 4px"
              v-model="form.city2"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in subCitys"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-form-item label="方向：" prop="direction">
          <el-select
            style="width: 400px"
            v-model="form.direction"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in direction"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型：" prop="typeRadio">
          <el-radio-group v-model="form.typeRadio" @change="questionTypes">
            <el-radio
              v-for="item in questionType"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度：" prop="difficulty">
          <el-radio-group v-model="form.difficulty">
            <el-radio
              v-for="item in difficulty"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="题干：" prop="content">
          <quill-editor
            v-model="form.content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlurQuestion($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          >
          </quill-editor>
        </el-form-item>
        <el-form-item label="选项：" v-show="form.typeRadio !== 3">
          <div
            @click="getIndex(index)"
            class="select"
            v-for="(item, index) in this.form.radio1"
            :key="index"
          >
            <el-checkbox-group
              v-show="form.typeRadio === 1"
              v-model="item.isRight"
              class="radioSelect"
            >
              <el-checkbox class="checkSelect" @change="onChange(index)"
                ><span class="selectParse">{{ item.code }}：</span
                ><el-input v-model="item.title"></el-input>
                <el-upload
                  :limit="1"
                  list-type="picture-card"
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="item.img" :src="item.img" class="avatar" />
                  <i v-else class="avatar-uploader-icon">上传图片</i>
                </el-upload>
              </el-checkbox>
            </el-checkbox-group>

            <!-- 多选 -->
            <el-checkbox-group
              v-show="form.typeRadio === 2"
              v-model="item.isRight"
            >
              <el-checkbox class="checkSelect"
                ><span class="selectParse">{{ item.code }}：</span
                ><el-input v-model="item.title"></el-input>
                <el-upload
                  :limit="1"
                  list-type="picture-card"
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="item.img" :src="item.img" class="avatar" />
                  <i v-else class="avatar-uploader-icon">上传图片</i>
                </el-upload>
              </el-checkbox>
            </el-checkbox-group>
          </div>

          <el-button
            @click="addSelect"
            :disabled="form.typeRadio === 1"
            type="danger"
            >+增加选项与答案</el-button
          >
        </el-form-item>
        <el-form-item label="解析视频：">
          <el-input v-model="form.parseVideo" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="答案解析：" prop="answercontent">
          <quill-editor
            v-model="form.answercontent"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          >
          </quill-editor>
        </el-form-item>
        <el-form-item label="题目备注：">
          <el-input
            type="textarea"
            style="width: 400px"
            v-model="form.remark"
          ></el-input>
        </el-form-item>
        <el-form-item label="试题标签：" prop="tag">
          <el-select
            style="width: 400px"
            v-model="form.tag"
            multiple
            filterable
            allow-create
            placeholder="请选择"
            @focus="onTag"
          >
            <el-option
              v-for="(item, index) in tagsList"
              :key="index"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { difficulty, questionType, direction } from "@/api/hmmm/constants";
import { simple } from "@/api/hmmm/subjects";
import { list as getDirectorysApi } from "@/api/hmmm/directorys";
import { list as getCompanyListApi } from "@/api/hmmm/companys";
import { provinces, citys } from "@/api/hmmm/citys";
import { tagssimple as getTagListApi } from "@/api/hmmm/tags";
import hljs from "highlight.js";
import "highlight.js/styles/xcode.css";
import { add as addQuestionApi, detail, update } from "@/api/hmmm/questions";
export default {
  name: "question",
  components: {
    quillEditor,
  },
  data() {
    return {
      imgIndex: "",
      direction, //方向
      questionType, //题型
      difficulty, //难度
      provinces: provinces(), //城市列表
      // 选项
      questionSelect: ["A", "B", "C", "D"],
      AscillSelect: 68, // ascill码
      QuestionsType: "", // 题型
      editorOption: {
        placeholder: "",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗，斜体，下划线，删除线
            [{ list: "ordered" }, { list: "bullet" }], // 列表

            ["blockquote", "code-block"], // 引用，代码块

            ["image"], //上传图片、上传视频
            ["link"], // 清除字体样式
          ], // 语法高亮
          syntax: {
            highlight: (text) => {
              return hljs.highlightAuto(text).value; // 这里就是代码高亮需要配置的地方
            },
          },
        },
      },
      form: {
        checkboxValue: [],

        content: "",
        answercontent: "",
        difficulty: 1,
        typeRadio: 1,
        subject: "",
        directory: "",
        enterprise: "",

        city2: "",
        city1: "",

        radio1: [
          {
            isRight: false,
            title: "",
            img: "", //图片
            code: "A",
          },
          {
            isRight: false,
            title: "",
            img: "", //图片
            code: "B",
          },
          {
            isRight: false,
            title: "",
            img: "", //图片
            code: "C",
          },
          {
            isRight: false,
            title: "",
            img: "", //图片
            code: "D",
          },
        ],

        direction: "",
        type: [],
        remark: "",
        parseVideo: "",
        tag: [],
        seclctCheckList: [],
      },
      simpleList: [], // 学科列表
      directoryList: [], //目录列表
      companyList: [], //企业列表
      subCitys: [], //下级城市列表
      tagsList: [], //标签列表
      rulesForm: {
        subject: [{ required: true, message: "请选择学科", trigger: "change" }],
        directory: [
          { required: true, message: "请选择目录", trigger: "change" },
        ],
        enterprise: [
          { required: true, message: "请选择企业", trigger: "change" },
        ],
        city1: [{ required: true, message: "请选择地区", trigger: "change" }],
        city2: [{ required: true, message: "请选择地区", trigger: "change" }],
        direction: [
          { required: true, message: "请选择方向", trigger: "change" },
        ],
        typeRadio: [{ required: true, message: "请选择题型", trigger: "blur" }],
        difficulty: [
          { required: true, message: "请选择难度", trigger: "blur" },
        ],
        content: [{ required: true, message: "请输入题干", trigger: "blur" }],
        answercontent: [
          { required: true, message: "请输入解析", trigger: "blur" },
        ],
        tag: [{ required: true, message: "请选择标签", trigger: "change" }],
      },
    };
  },
  mounted() {

    this.cancelQuestion();
  },
  methods: {
    // 基础题库编辑
    async cancelQuestion() {
      if (!this.$route.query.id) return;

      const res = await getCompanyListApi();
      console.log(res);
      const { data } = await detail({
        id: this.$route.query.id,
      });
      this.getsimpleList();
      this.getCompanyList();
      
  
      this.form.answercontent = data.answer;


      this.form.city2 = data.city;

      this.form.difficulty = parseInt(data.difficulty);

      this.form.direction = data.direction;
   
      this.form.enterprise = data.enterpriseID;
      //   options: this.form.radio1,
      const option = [];
      data.options.forEach((item) => {
        console.log(item.isRight);
        item.isRight = item.isRight ? true : false;

        option.push(item);
      });
      this.form.radio1 = option;

      this.form.city1 = data.province;
  
      this.form.content = data.question;
      
      this.form.typeRadio = parseInt(data.questionType);
      
      this.form.remark = data.remarks;
      

      this.form.subject = data.subjectName;
      
      this.form.directory = data.directoryName;

      //   tags: this.form.tag.join(),
      this.form.tag = data.tags.split();
      //   videoURL: this.form.parseVideo,
      this.form.parseVideo = data.videoURL;
     
    },
    onChange(index) {
      this.form.radio1.forEach((item) => {
        item.isRight = false;
      });
      this.form.radio1[index].isRight = true;
    },
    // 标签列表
    async onTag() {},
    // 城市列表
    oneCitys() {
      this.form.city2 = "";
      this.subCitys = citys(this.form.city1);
      console.log(this.$refs.secondCity);
      this.$refs.secondCity.focus();
      // console.log(citys(this.form.city1));
    },
    // 企业列表
    async getCompanyList() {
      const { data } = await getCompanyListApi({
        pagesize: 999999,
      });
      this.companyList = data.items;
    },
    // 目录列表
    async subjectDirectory() {
      this.form.directory = "";
      const { data } = await getDirectorysApi({
        subjectID: this.form.subject,
      });
      this.directoryList = data.items;
      console.log(this.form.subject);
      const res = await getTagListApi({
        subjectID: this.form.subject,
      });
      this.tagsList = res.data;
 
    },
    // 学科简单列表
    async getsimpleList() {
      const { data } = await simple();
      this.simpleList = data;
    
    },
    // 添加选项
    addSelect() {
      console.log(11);
      this.AscillSelect++;
      const addAscillSelect = String.fromCodePoint(this.AscillSelect);
      this.questionSelect.push(addAscillSelect);
      console.log(addAscillSelect);
      this.form.radio1.push({
        isRight: false,
        title: "",
        img: "", //图片
        code: addAscillSelect,
      });
      
      console.log(this.form.radio1);
    },

    async onSubmit() {
      this.$refs.form.validate();
      if (!this.$route.query.id) {
        await addQuestionApi({
          answer: this.form.answercontent,
          catalogID: this.form.directory,
          city: this.form.city2,
          difficulty: this.form.difficulty + "",
          // difficulty: "1",
          direction: this.form.direction,
          enterpriseID: this.form.enterprise,
          options: this.form.radio1,
          province: this.form.city1,
          question: this.form.content,
          questionType: this.form.typeRadio + "",
          // questionType: "1",
          remarks: this.form.remark,
          subjectID: this.form.subject,
          tags: this.form.tag.join(),
          videoURL: this.form.parseVideo,
        });
        this.$router.push("list");
      } else {
        const { data } = await detail({
          id: this.$route.query.id,
        });
        console.log(data);
        let sub = "";
        if (typeof this.form.subject == "string") {
          const subjectID = this.simpleList.filter((item) => {
            return item.label === this.form.subject;
          });
          sub = subjectID[0].value;
        } else {
          sub = this.form.subject;
        }

        const option = [];
        this.form.radio1.forEach((item) => {
          console.log(item.isRight);
          item.isRight = item.isRight ? true : false;

          option.push(item);
        });
        let direct = "";
        if (typeof this.form.directory == "string") {
          const {
            data: { items },
          } = await getDirectorysApi({
            subjectID: sub,
          });

          const catalogID = items.filter((item) => {
            console.log(item);
            return item.directoryName === this.form.directory;
          });
          direct = catalogID[0].id;
        } else {
          direct = this.form.directory;
        }

        const res = await update({
          addDate: data.addDate,
          answer: this.form.answercontent,
          catalogID: direct,
          // chkDate: null,
          // chkRemarks: null,
          // chkState: 0,
          // chkUserID: null,
          city: this.form.city2,
          creatorID: data.creatorID,
          difficulty: this.form.difficulty + "",
          direction: this.form.direction,
          // directoryName: "416546",
          enterpriseID: this.form.enterprise,
          id: data.id,
          isChoice: 0,
          number: data.number,
          options: option,
          province: this.form.city1,
          // publishDate: "2022-08-19T11:57:23.000Z",
          // publishState: 0,
          question: this.form.content,
          questionType: this.form.typeRadio + "",
          remarks: this.form.remark,
          subjectID: sub,
          // subjectName: sub[0].value,
          tags: this.form.tag.join(),
          videoURL: this.form.parseVideo,
        });
        this.$router.push("list");
      }
    },
    questionTypes(val) {
      console.log(val);
      this.form.radio1.forEach((item) => {
        item.title = "";
        item.isRight = false;
        item.img = "";
      });
      if (val === 1) {
        this.form.radio1 = [
          {
            isRight: false,
            title: "",
            img: "", //图片
            code: "A",
          },
          {
            isRight: false,
            title: "",
            img: "", //图片
            code: "B",
          },
          {
            isRight: false,
            title: "",
            img: "", //图片
            code: "C",
          },
          {
            isRight: false,
            title: "",
            img: "", //图片
            code: "D",
          },
        ];
      }
      // this.form.selectRadio = "";
      // this.form.checkboxValue = [];
      // this.form.radioValue = [];
    },
    onEditorReady(editor) {
      console.log(editor);
      // 准备编辑器
    },
    onEditorBlur() {
      if (this.form.answercontent.trim() === "") return;
      this.$refs.form.fields.map((item) => {
        if (item.prop === "answercontent") {
          item.clearValidate();
        }
      });
    }, // 失去焦点事件
    onEditorBlurQuestion() {
      if (this.form.content.trim() === "") return;
      this.$refs.form.fields.map((item) => {
        if (item.prop === "content") {
          item.clearValidate();
        }
      });
    },
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    // 图片相关
    getIndex(index) {
      this.imgIndex = index;
      console.log(this.imgIndex);
    },
    handleAvatarSuccess(res, file, fileList) {
      console.log(URL.createObjectURL(file.raw));
      this.form.radio1[this.imgIndex].img = URL.createObjectURL(file.raw);
      if (this.form.radio1[this.imgIndex].img === "")
        return this.$message.error("上传失败");
    },
    beforeAvatarUpload(file) {
      const types = ["image/jpeg", "image/png"];
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!types.includes(file.type)) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return types && isLt2M;
    },
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
};
</script>

<style scoped lang="less">
.container {
  background-color: #fff;
  margin: 20px;
  .title {
    padding: 20px;
    border-bottom: 1px solid #ebeef5;
  }
  .table {
    padding: 20px;
  }
}
/deep/.ql-editor {
  height: 200px;
}
.select {
  margin: 40px 0;
  width: 240px;
  height: 36px;
  .el-avatar,
  .el-cascader-panel,
  .el-radio,
  .el-radio--medium.is-bordered .el-radio__label,
  .el-radio__label {
    width: 2px;
  }
  /deep/.el-input--medium .el-input__inner {
    width: 240px;
  }
}
/deep/.el-textarea__inner {
  height: 96px;
}
.selectParse {
  display: inline-block;
  width: 24px;
}

.avatar-uploader .el-upload {
  border: 1px dashed hsl(0, 17%, 95%);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader {
  background-color: red;

  .el-upload:hover {
    border-color: #409eff;
  }
}
.avatar-uploader-icon {
  float: left;
  bottom: 40px;
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-style: normal;
  font-size: 14px;
}
.avatar {
  position: absolute;
  right: 0px;
  width: 96px;
  height: 56px;

  border-radius: 6px;
}
/deep/.el-upload--picture-card {
  position: absolute;
  top: -10px;
  left: 300px;
  width: 100px;
  height: 60px;
}
.city {
  /deep/.el-form-item__content {
    display: flex;
  }
}
.radioSelect {
  /deep/.el-checkbox__inner {
    border-radius: 100% !important;
  }
}
</style>
