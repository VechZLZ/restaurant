<template>
  <div style>
    <div style="height: 50px;box-shadow:1px 0 7px 1px #bbb;border-bottom: 1px solid #CDCDB4;">
      <router-link to="#">
        <i
          class="el-icon-s-grid"
          @click="showHeader"
          style="font-size: 20px;position: relative;left: 20px;top: 10px;"
        ></i>
      </router-link>
      <span
        style="font-size: 14px;color: #97A8BE;position: relative;font-size: 18px;top: 8px;left: 24px;"
      >首页</span>

      <el-dropdown style="float: right; position: relative;top: 10px;right: 20px">
        <span class="el-dropdown-link">
          {{this.$store.state.kitchen.kitchenName}}
          <i
            class="el-icon-caret-bottom el-icon--right"
            style="font-size: 20px;"
          ></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="dialogEditPassWord=true">修改密码</el-dropdown-item>
          <el-dropdown-item>基本资料</el-dropdown-item>
          <el-dropdown-item @click.native="signOut" divided>退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <img
        style="height: 34px;width: 34px;border-radius: 17px;float: right; position: relative;top: 5px;right: 60px;"
        src="../../static/images/tx.jpg"
      />

      <img
        src="../../static/images/lingsheng.png"
        style="height: 25px;width: 25px;float: right; position: relative;top: 10px;right: 100px;"
      />
    </div>
    <el-dialog
      title="修改密码"
      style="font-weight:700;"
      width="450px"
      :before-close="cancel"
      :visible.sync="dialogEditPassWord"
    >
      <el-form :model="adminForm">
        <div style="padding:0 20px;margin-bottom:-20px;">
          <div style="font-size:15px;">输入原密码：</div>
          <el-input
            style="margin:15px 0 20px 0;"
            v-model="adminForm.password"
            show-password
            placeholder="输入原密码..."
            show-word-limit
            maxlength="20"
            autocomplete="off"
          ></el-input>
          <div style="font-size:15px;">输入新密码：</div>
          <el-input
            style="margin:15px 0 20px 0;"
            v-model="adminForm.password1"
            show-password
            placeholder="输入新密码..."
            show-word-limit
            maxlength="20"
            autocomplete="off"
          ></el-input>
          <div style="font-size:15px;">再次输入新密码：</div>
          <el-input
            style="margin:15px 0 20px 0;"
            v-model="adminForm.password2"
            show-password
            placeholder="再次输入新密码..."
            show-word-limit
            maxlength="20"
            autocomplete="off"
          ></el-input>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="editPassword()">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "VEheader",
  data() {
    return {
      dialogEditPassWord: false,
      adminForm: {
        name: "",
        password: "",
        password1: "",
        password2: ""
      }
    };
  },
  methods: {
    showHeader() {
      this.$store.commit("ChangeLeft");
    },
    editPassword() {
      console.log(this.$store.state.admin.id);

      if (
        this.adminForm.password1.length < 6 ||
        this.adminForm.password1.length > 20
      ) {
        this.$message({
          type: "error",
          message: "密码长度为6-20位！"
        });
      } else if (this.adminForm.password1 != this.adminForm.password2) {
        this.$message({
          type: "error",
          message: "两次输入的密码不同！"
        });
      } else {
        this.$axios
          .post(this.$store.state.httpUrl + "/editAdminPassword", {
            id: this.$store.state.admin.id,
            account: this.$store.state.admin.account,
            password: this.adminForm.password
          })
          .then(res => {
            console.log(res.data);
            if (res.data.code === 20000) {
              this.dialogAddMenu = false;
              this.$message({
                type: "success",
                message: "修改成功！"
              });
              this.adminForm.password = "";
              this.adminForm.password1 = "";
              this.adminForm.password2 = "";
            }
          });
      }
    },
    signOut() {
      this.$confirm("是否确定退出登录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
            
          });
          localStorage.setItem("token", "");
          this.$store.commit("signOut");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消登出"
          });
        });
    },
    cancel() {
      this.dialogEditPassWord = false;
      this.$message({
        type: "info",
        message: "已取消修改"
      });
    }
  }
};
</script>

<style scoped>
</style>
