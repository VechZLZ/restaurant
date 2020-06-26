<template>
  <div
    style="background: -webkit-gradient(linear,50% 50%,0 100%,from(rgb(102, 177, 255)),to(rgb(198, 226, 255));text-align:center;position: fixed;height: 100%;width: 100%;"
  >
    <div class="k">
      <div style="display:flex;align-items:center;margin:40px 0 20px 30px;">
        <div style="width:70px;">用户名：</div>
        <div>
          <el-input v-model="userName" style="width: 270px;" placeholder="请输入用户名"></el-input>
        </div>
      </div>
      <div style="display:flex;align-items:center;margin-left:30px;margin-bottom:30px;">
        <div style="width:70px;">密码：</div>
        <div>
          <el-input v-model="userPassword" style="width: 270px;" placeholder="请输入密码" show-password></el-input>
        </div>
      </div>
      <div style="margin:15px auto;">
        <el-button @click="login()" style="width:340px;" type="primary" round>登录</el-button>
      </div>
    </div>
    <div class="z">未奇科技</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      userPassword: ""
    };
  },
  methods: {
    login() {
      if (!this.ckName(this.userName)) {
        this.$elementUI.Message.error("账号格式错误");
      } else if (
        this.userPassword.length < 6 ||
        this.userPassword.length > 20
      ) {
        this.$elementUI.Message.error("密码格式错误");
      } else if (this.$store.state.isLogin) {
        this.$elementUI.Message.error("请不要重复登陆");
      } else {
        this.$axios.defaults.headers.post["Content-Type"] = "application/json";
        this.$axios
          .post(
            this.$store.state.httpUrl + "/kitchen/loginKitchenAdmin",
            JSON.stringify({
              kitchenAccount: this.userName,
              kitchenPassword: this.userPassword,
            })
          )
          .then(res => {
            console.log(res.data);
            if (res.data.flag) {
              this.$store.state.token=res.data.data.token;
              this.$store.commit("login", res.data.data.kitchen);
              localStorage.setItem("token", res.data.data.token);
              this.$router.push("/");
              this.$elementUI.Message.success(
                "登录成功,欢迎您" + res.data.data.kitchen.kitchenName
              );
            } else if (res.data.code === 20001) {
              this.$message({
                type: "error",
                message: "账号不存在！"
              });
            } else if (res.data.code === 20004) {
              this.$message({
                type: "error",
                message: "密码错误！"
              });
            }
          });
      }
    },
    ckName(str) {
      let patten = /^[a-zA-Z]\w{4,15}$/gi;
      if (!patten.test(str)) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style scope>
.el-input__inner {
  background-color: rgb(235, 255, 248);
  border-radius: 30px;
}

.k {
  background-color: rgb(194, 228, 255);
  border: 5px solid rgb(219, 253, 246);
  border-radius: 35px;
  height: 260px;
  width: 400px;
  top: 60px;
  margin: 50px auto 30px;
  opacity: 0;

  animation-name: k;
  animation-delay: 2s;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}
@keyframes k {
  50% {
    margin: 250px auto 30px;
    opacity: 0;
  }
  to {
    opacity: 1; /*不透明度*/
    margin: 250px auto 30px;
  }
}

.z {
  font-size: 100px;
  letter-spacing: 40px;
  color: rgb(134, 134, 134);

  animation-name: z;
  animation-delay: 1s;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
}
@keyframes z {
  to {
    font-size: 25px;
    letter-spacing: 3px;
    margin-top: 30px;
  }
}
</style>
