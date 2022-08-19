<template>
  <el-dialog title="题目预览" :visible="visible" width="60%" @close="onClose">
    <div>
      <div class="preview_top">
        <div class="preview_top_indiv">【题型】：{{ types }}</div>
        <div class="preview_top_indiv">【编号】：{{ DetailList.id }}</div>
        <div class="preview_top_indiv">【难度】：{{ difficulty }}</div>
        <div class="preview_top_indiv">【标签】：{{ DetailList.tags }}</div>
      </div>
      <div class="preview_top">
        <div class="preview_top_indiv">
          【学科】：{{ DetailList.subjectName }}
        </div>
        <div class="preview_top_indiv">【目录】：{{ directory }}</div>
        <div class="preview_top_indiv">
          【方向】：{{ DetailList.direction }}
        </div>
        <div class="preview_top_indiv"></div>
      </div>
    </div>
    <hr />
    <div>
      <div>【题干】：</div>
      <div style="margin: 14px 0">
        <a style="color: blue" v-html="DetailList.question"></a>
      </div>
      <div style="padding: 0 0 5px 0">
        {{ types }}题 选项：（以下选中的选项为正确答案）
      </div>
      <div style="padding: 8px 0" v-for="item in DetailList.options">
        <el-radio :value="radio" :label="item.isRight">{{
          item.title
        }}</el-radio>
      </div>
    </div>
    <hr />
    <div>
      【参考答案】：
      <el-button type="danger" @click="showVideo = !showVideo"
        >视频答案预览</el-button
      >
      <!-- src="https://v-cdn.zjol.com.cn/277004.mp4" -->
      <video
        v-if="showVideo"
        :src="DetailList.videoURL"
        :controls="videoOptions.controls"
        class="video-js vjs-big-play-centered vjs-fluid"
        webkit-playsinline="true"
        playsinline="true"
        x-webkit-airplay="allow"
        x5-playsinline
        style="width: 100%"
        @play="onPlayerPlay"
        @pause="onPlayerPause"
        @seeking="seeking"
        autoplay="autoplay"
        ref="video"
      ></video>
    </div>
    <hr />
    <div>【答案解析】： {{ answer }}</div>
    <hr />
    <div>【题目备注】：{{ DetailList.remarks }}</div>
    <hr />
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onClose">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { questionType, difficulty } from "@/api/hmmm/constants";
import { directoryssimple as directoryListApi } from "@/api/hmmm/directorys";
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      radio: 1,
      checked: false,
      DetailList: [], // 预览题库详情
      videoOptions: {
        controls: true,
        src: "https://v-cdn.zjol.com.cn/277004.mp4", // url地址
      },
      player: null,
      playTime: "",
      seekTime: "",
      current: "",
      seeking: "",
      showVideo: false,
      directoryList: [],
    };
  },
  beforeRouteLeave() {
    //
  },
  created() {
    this.getDirectoryList();
  },

  computed: {
    directory() {
      const directoryItem = this.directoryList.find((item) => {
        return item.value == this.DetailList.catalogID;
      });
      return directoryItem ? directoryItem.label : "未知";
    },
    types() {
      const questionTypeItem = questionType.find((item) => {
        return item.value == this.DetailList.questionType;
      });
      return questionTypeItem ? questionTypeItem.label : "未知";
    },
    difficulty() {
      const questionTypeItem = questionType.find((item) => {
        return item.value == this.DetailList.difficulty;
      });
      return questionTypeItem ? questionTypeItem.label : "未知";
    },
    answer() {
      if (!this.DetailList.length) {
        return false;
      } else {
        return this.DetailList.answer
          .replace(/<[^>]+>/g, "")
          .replace(/&nbsp;/gi, "");
      }
    },
  },
  methods: {
    // 目录列表
    async getDirectoryList() {
      const { data } = await directoryListApi();
      this.directoryList = data;
    },
    onClose() {
      this.$emit("update:visible", false);
      this.showVideo = false;
    },
    initVideo() {
      //原生初始化视频方法
      let myVideo = this.$refs.video;
      //ontimeupdate
      myVideo.ontimeupdate = function () {
        myFunction();
      };
      let _this = this;

      function myFunction() {
        let playTime = myVideo.currentTime;
        setTimeout(function () {
          localStorage.setItem("cacheTime", playTime);
        }, 500);
        let time = localStorage.getItem("cacheTime");
        // 当前播放位置发生变化时触发。
        if (playTime - Number(time) > 2) {
          myVideo.currentTime = Number(time);
        } else {
        }
      }
    },
    // 播放回调
    onPlayerPlay(player) {
      // this.globalSetting = true
      // console.log("player play!", player);
      // document.getElementsByClassName("vjs-control-bar").style.display = "block";
      // document.getElementsByClassName("vjs-control-bar").style.display = "block";
    },

    // 暂停回调
    onPlayerPause(player) {
      // this.globalSetting.controls = false;
      // console.log("player pause!", player);
      // var video = document.getElementById("video");
      // video.controls=false;
      // document.getElementsByClassName("vjs-control-bar").style.display = "none";
    },
  },

  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style lang="less" scoped>
.preview_top {
  display: flex;
  .preview_top_indiv {
    flex: 1;
    padding: 10px 0;
  }
}
</style>
