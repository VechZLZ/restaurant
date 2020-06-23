<template>
  <div style="flex=1;font-family:Franklin Gothic Medium;padding:25px 50px;">
    <div
      style="box-shadow:0 0 2px 1px #ccc;background-color:#fff;padding:30px 20px;border-radius: 10px;display: flex;margin-bottom:25px;justify-content:space-between;"
    >
      <div style="display:flex;">
        <div style="box-shadow:0px 0px 1px 0px #ccc;margin-right:20px;">
          <input
            placeholder="输入桌号"
            v-model="input"
            maxlength="3"
            oninput="value=value.replace(/[^\d]/g, '')"
            clearable
          >
        </div>
        <div>
          <el-button type="primary" @click="addEweima(input)">生成二维吗</el-button>
        </div>
      </div>
      <div style="color:#777;margin-top:10px;margin-right:20px;">小贴士：点击二维码可以下载哦~</div>
    </div>
    <el-row :gutter="40">
      <div v-for="(i,id) in list" :key="id">
        <el-col :span="4">
          <div
            style="background-color:#fff;box-shadow:1px 1px 5px 0px #ccc;border-radius: 10px;border: 1px solid rgb(221, 221, 221);padding:20px;margin-bottom:35px;"
          >
            <div style="display: flex;justify-content:space-between;">
              <div style="font-size: 16px;color: rgb(90, 90, 90);margin-bottom:20px;">桌号：{{i.id}}</div>
              <div>
                <i
                  style="font-size:20px;color:rgb(63, 142, 245)"
                  class="el-icon-delete"
                  @click="deleteEweima(id)"
                ></i>
              </div>
            </div>
            <div :id="id" style="text-align:center;" @click="downLoadEweima(id)">
              <vue-qr :text="i.value" :size="120" :margin="0"></vue-qr>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      list: [],
      name: "",
      introduce: "",
      img: "",
      openTime: "",
      closeTime: "",
      state: true,
      rate: 0,
      sellCount: 0,
      storeTableNum: 0
    };
  },
  methods: {
    addEweima(id) {
      var a = true;
      if (this.input == "") {
        this.$message({
          type: "error",
          message: "请输入桌号!"
        });
      } else {
        this.list.forEach(i => {
          if (i.id == id) {
            a = false;
          }
        });
        if (a) {
          this.$axios
            .post(this.$store.state.httpUrl + "/editStore", {
              hostId: this.$store.state.hostId,
              id: this.$store.state.storeId,
              storeName: this.name,
              storeDescribe: this.introduce,
              businessHoursBegin: this.openTime,
              businessHoursEnd: this.closeTime,
              businessStatus: this.state === true ? 1 : 0,
              storeTxUrl: "http://haozheng.club/images/dian.jpg",
              storeTableNum: ++this.storeTableNum,
              rate: this.rate,
              sellCount: this.sellCount
            })
            .then(res => {
              console.log(res.data);
              if (res.data.code === 20000) {
                this.list.push({
                  id: id,
                  value:
                    "http://haozheng.club/restaurant_m/#/store/1231030773210025984/" +
                    id
                });
                this.input = "";
                this.$message({
                  type: "success",
                  message: "二维码生成成功"
                });
              } else {
                this.$message({
                  type: "error",
                  message: "生成失败，请刷新后再试！"
                });
              }
            });
        } else {
          this.$message({
            type: "error",
            message: "桌号已存在!"
          });
        }
      }
    },
    downLoadEweima(id) {
      var newWin = window.open(""); //新打开一个空窗口

      var imageToPrint = document.getElementById(id); //将要被打印的图片
      newWin.document.write(imageToPrint.outerHTML); //将图片添加进新的窗口

      newWin.document.close(); //在IE浏览器中使用必须添加这一句
      newWin.focus(); //在IE浏览器中使用必须添加这一句
      setTimeout(function() {
        newWin.print(); //打印
        newWin.close(); //关闭窗口
      }, 100);
    },
    deleteEweima(id) {
      this.$confirm("是否确定删除此二维码？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(this.$store.state.httpUrl + "/editStore", {
              hostId: this.$store.state.hostId,
              id: this.$store.state.storeId,
              storeName: this.name,
              storeDescribe: this.introduce,
              businessHoursBegin: this.openTime,
              businessHoursEnd: this.closeTime,
              businessStatus: this.state === true ? 1 : 0,
              storeTxUrl: "http://haozheng.club/images/dian.jpg",
              storeTableNum: --this.storeTableNum,
              rate: this.rate,
              sellCount: this.sellCount
            })
            .then(res => {
              console.log(res.data);
              if (res.data.code === 20000) {
                this.list.splice(id, 1);
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败，请刷新后再试！"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getStore() {
      this.$axios
        .get(this.$store.state.httpUrl + "/getStore")
        .then(res => {
          console.log(res.data);
          this.name = res.data.data.storeName;
          this.introduce = res.data.data.storeDescribe;
          this.img = res.data.data.storeTxUrl;
          this.openTime = res.data.data.businessHoursBegin;
          this.closeTime = res.data.data.businessHoursEnd;
          this.state = res.data.data.businessStatus == 1 ? true : false;
          this.rate = res.data.data.rate;
          this.sellCount = res.data.data.sellCount;
          this.storeTableNum = res.data.data.storeTableNum;
          this.$store.commit("setStoreId", res.data.data.id);
          this.$store.commit("setHostId", res.data.data.hostId);
          for (var i = 1; i <= this.storeTableNum; i++) {
            this.list.push({
              id: i,
              value:
                "http://haozheng.club/restaurant_m/#/store/1231030773210025984/" +
                i
            });
          }
        })
        .catch(function(res) {
          console.log(res);
        });
    }
  },
  mounted() {
    this.getStore();
  }
};
</script>

<style scoped>
input {
      background-color: #fdfdfd;
      border-radius: 4px;
      width: 200px;
      height: 40px;
      border: 1px solid #ccc;
      padding-left: 15px;
      color: #606266;
    }
    input::placeholder {
      color: rgb(124, 124, 124);
    }
    input:hover {
      border: 1px solid #bbb;
    }
    input:focus{
        border: 1px solid #4ca3fd;
    }
</style>