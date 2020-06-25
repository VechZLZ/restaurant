<template>
  <div style="text-align:center;font-family:Franklin Gothic Medium;">
    <div
      style="display:flex;align-items:center;justify-content:space-between;padding:25px 100px;box-shadow: 0px 5px 9px 3px #ddd"
    >
      <div>
        <img src alt />
        <span style="font-size:20px;color:#555;">欢迎注册</span>
      </div>
      <div>
        <span style="color:#888">已有账号？</span>
        <span style="color:#409eff;" @click="toLogin">请登录></span>
      </div>
    </div>
    <div style="width:750px;margin: 100px auto;padding-bottom:30px;">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="填写账号信息"></el-step>
        <el-step title="填写店铺信息"></el-step>
        <el-step title="付款"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <div v-if="active==0">
      <div style="display:flex;width:380px;margin:20px auto;padding-right:30px;">
        <span style="width:130px;margin-top:8px">名称:</span>
        <el-input v-model="name" placeholder="请输入名称"></el-input>
      </div>
      <div style="display:flex;width:380px;margin:20px auto;padding-right:30px;">
        <span style="width:130px;margin-top:8px">账号:</span>
        <el-input v-model="account" placeholder="请输入账号"></el-input>
      </div>
      <div style="display:flex;width:380px;margin:20px auto;padding-right:30px;">
        <span style="width:130px;margin-top:8px">密码:</span>
        <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
      </div>
      <div style="display:flex;width:380px;margin:20px auto;padding-right:30px;">
        <span style="width:130px;margin-top:8px">再次密码:</span>
        <el-input v-model="password2" placeholder="请再次输入密码" show-password></el-input>
      </div>
      <el-button style="width:380px;margin-top:50px;" type="primary" @click="next">下一步</el-button>
    </div>
    <div v-if="active==1">
      <div style="display:flex;width:380px;margin:20px auto;padding-right:30px;">
        <span style="width:130px;margin-top:8px">店铺名称:</span>
        <el-input v-model="storeName" placeholder="请输入店铺名称"></el-input>
      </div>
      <div style="display:flex;width:380px;margin:20px auto;padding-right:30px;">
        <span style="width:130px;margin-top:8px">店铺简介:</span>
        <el-input v-model="storeDescribe" placeholder="请输入店铺简介"></el-input>
      </div>
      <div style="display:flex;width:380px;margin:20px auto;padding-right:30px;">
        <span style="width:130px;margin-top:8px">营业时间:</span>
        <div style="flex:1;display:flex;">
          <el-time-select
            style="width:120px;"
            placeholder="起始时间"
            v-model="businessHoursBegin"
            :picker-options="{start: '06:00',step: '00:15',end: '24:00'}"
          ></el-time-select>
          <div style="font-size:16px;padding:10px 14px;">到</div>
          <el-time-select
            style="width:120px;"
            placeholder="结束时间"
            v-model="businessHoursEnd"
            :picker-options="{start: '06:00',step: '00:15',end: '24:00',minTime: businessHoursBegin}"
          ></el-time-select>
        </div>
      </div>
      <el-button style="width:380px;margin-top:50px;" type="primary" @click="addAccount()">下一步</el-button>
    </div>
    <div v-if="active==2">
      <div style="margin-top:-80px;">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          style="width:380px;margin: 0 auto"
          @select="handleSelect"
        >
          <el-menu-item style="width:190px;" index="1">支付宝</el-menu-item>
          <el-menu-item style="width:190px;" index="2">微信</el-menu-item>
        </el-menu>
      </div>
      <div
        v-if="activeIndex==1"
        style="background-color:#fdfdfd;width:380px;height:300px;margin:0px auto;padding:20px 0"
      >
        <div
          style="width:230px;background-color:#fff;border-radius: 15px;box-shadow:1px 1px 5px 0px #ccc;margin:10px auto;padding:10px 0px;"
        >
          <img style="width:200px;" src="image/zfb.png" alt />
        </div>
      </div>
      <div
        v-if="activeIndex==2"
        style="background-color:#fdfdfd;width:380px;height:300px;margin:0px auto;padding:20px 0"
      >
        <div
          style="width:230px;background-color:#fff;border-radius: 15px;box-shadow:1px 1px 5px 0px #ccc;margin:10px auto;padding:10px 0px;"
        >
          <img style="width:200px;" src="image/wx.png" alt />
        </div>
      </div>
      <el-button
        style="width:380px;margin-top:50px;"
        type="primary"
        @click="openFullScreen1"
        v-loading.fullscreen.lock="fullscreenLoading"
      >已付款</el-button>
    </div>
    <div v-if="active==3">
      <div style="display:flex;width:190px;margin:20px auto;text-align:center">
        <img src="image/success.png" alt />
      </div>
      <div
        style="margin-left:50px;margin-top:30px;color:#3e9dd5;font-size:31px;letter-spacing:10px;"
      >注册成功！</div>
      <div
        style="margin-left:50px;margin-top:10px;color:#3e9dd5;font-size:34px;letter-spacing:10px;"
      >欢迎您加入！</div>
      <el-button style="width:380px;margin-top:50px;" type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      name: "",
      account: "",
      password: "",
      password2: "",
      storeName: "",
      storeTxUrl: "http://haozheng.club/images/dian.jpg",
      businessHoursBegin: "",
      businessHoursEnd: "",
      storeDescribe: "",
      rate: 5,
      sellCount: 0,
      businessStatus: 1,
      activeIndex: "1",
      fullscreenLoading: false
    };
  },
  methods: {
    openFullScreen1() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
        this.active++;
      }, 2000);
    },
    handleSelect(key, keyPath) {
      this.activeIndex = key;
    },
    toLogin() {
      this.$router.push("/login");
    },
    login() {
      if (this.active++ > 2) this.active = 0;
      this.$router.push("/");
    },
    next() {
      if (this.name == "" || this.password == "") {
        this.$elementUI.Message.error("请正确填写消息!");
      } else if (this.password != this.password2) {
        this.$elementUI.Message.error("两次密码不一致!");
      } else {
        if (this.active++ > 2) this.active = 0;
      }
    },
    addAccount() {
      this.$axios.defaults.headers.post["Content-Type"] = "application/json";
      this.$axios
        .post(
          this.$store.state.httpUrl + "/addHost",
          JSON.stringify({
            account: this.account,
            name: this.name,
            password: this.password
          })
        )
        .then(res => {
          console.log(res.data);

          if (res.data.code === 20000) {
            this.$message({
              type: "success",
              message: "账号注册成功！"
            });
            this.$axios
              .post(
                this.$store.state.httpUrl + "/loginAdmin",
                JSON.stringify({
                  account: this.account,
                  password: this.password
                })
              )
              .then(r => {
                console.log(r.data);
                console.log(r.data.data.token);
                if (r.data.code === 20000) {
                  this.$store.commit("setToken", r.data.data.token);
                  this.$store.commit("login", r.data.data.admin);
                  this.$store.commit("setHostId", r.data.data.admin.id);
                  localStorage.setItem("token", r.data.data.token);
                  this.addStore();
                } else if (r.data.code === 20001) {
                  this.$message({
                    type: "error",
                    message: "出现错误，请重试！"
                  });
                } else if (r.data.code === 20004) {
                  this.$message({
                    type: "error",
                    message: "出现错误，请重试"
                  });
                }
              });
          } else if (res.data.code === 20001) {
            this.$message({
              type: "error",
              message: "请正确填写信息,或账号已存在！"
            });
          }
        });
    },
    addStore() {
      if (this.storeName == "") {
        this.$message({
          type: "error",
          message: "请填写店铺名称！"
        });
      } else {
        this.$axios
          .post(
            this.$store.state.httpUrl + "/addStore",
            JSON.stringify({
              storeName: this.storeName,
              storeTxUrl: this.storeTxUrl,
              businessHoursBegin: this.businessHoursBegin,
              businessHoursEnd: this.businessHoursEnd,
              storeDescribe:
                this.storeDescribe == ""
                  ? "店家很懒什么都没有写~"
                  : this.storeDescribe,
              hostId: this.$router.hostId,
              businessStatus: this.businessStatus,
              rate: this.rate,
              sellCount: this.sellCount
            })
          )
          .then(res => {
            console.log(res.data);
            if (res.data.code === 20000) {
              this.$message({
                type: "success",
                message: "店铺注册成功！"
              });
              if (this.active++ > 2) this.active = 0;
            } else if (res.data.code === 20001) {
              this.$message({
                type: "error",
                message: "店铺注册出现错误！"
              });
            }
          });
      }
    }
  }
};
</script>

<style scoped>
</style>