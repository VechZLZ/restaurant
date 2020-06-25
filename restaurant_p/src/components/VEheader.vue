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
        style="font-size: 14px;color: #97A8BE;position: relative;font-size: 18px;top: 8px;left: 30px;"
      >{{$route.meta.name}}</span>

      <el-dropdown style="float: right; position: relative;top: 10px;right: 20px">
        <span class="el-dropdown-link">
          {{this.$store.state.admin.account}}
          <i
            class="el-icon-caret-bottom el-icon--right"
            style="font-size: 20px;"
          ></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="dialogShowMessage=true">基本资料</el-dropdown-item>
          <el-dropdown-item @click.native="dialogEditPassWord=true">修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="dialogAddKitchen=true">注册后厨</el-dropdown-item>
          <el-dropdown-item @click.native="signOut" divided>退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <img
        style="height: 34px;width: 34px;border-radius: 17px;float: right; position: relative;top: 5px;right: 60px;"
        src="../../static/images/tx.jpg"
      />
      <el-popover
        placement="bottom"
        title="消息"
        width="200"
        trigger="hover"
        content="目前没有消息哦~"
      >
        <img
          slot="reference"
          src="../../static/images/lingsheng.png"
          style="height: 25px;width: 25px;float: right; position: relative;top: 10px;right: 100px;"
        />
      </el-popover>
    </div>
    <el-dialog
      title="基本信息"
      style="font-weight:700;"
      width="350px"
      :visible.sync="dialogShowMessage"
    >
      <el-form>
        <div style="padding:0 20px;margin-bottom:-20px;">
          <div style="font-size:15px;">账号ID： {{this.$store.state.admin.id}}</div>

          <div style="font-size:15px;margin:20px 0">账号：{{this.$store.state.admin.account}}</div>

          <div style="font-size:15px;">店铺ID：{{this.$store.state.storeId}}</div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogShowMessage=false">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="修改密码"
      style="font-weight:700;"
      width="450px"
      :before-close="cancel"
      :visible.sync="dialogEditPassWord"
    >
      <el-form>
        <div style="padding:0 20px;margin-bottom:-20px;">
          <div style="font-size:15px;">输入原密码：</div>
          <el-input
            style="margin:15px 0 20px 0;"
            v-model="password"
            show-password
            placeholder="输入原密码..."
            show-word-limit
            maxlength="20"
            autocomplete="off"
          ></el-input>
          <div style="font-size:15px;">输入新密码：</div>
          <el-input
            style="margin:15px 0 20px 0;"
            v-model="password1"
            show-password
            placeholder="输入新密码..."
            show-word-limit
            maxlength="20"
            autocomplete="off"
          ></el-input>
          <div style="font-size:15px;">再次输入新密码：</div>
          <el-input
            style="margin:15px 0 20px 0;"
            v-model="password2"
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
    <el-dialog
      title="注册后厨账号"
      style="font-weight:700;"
      width="450px"
      :before-close="cancel"
      :visible.sync="dialogAddKitchen"
    >
      <el-form>
        <div style="padding:0 20px;margin-bottom:-20px;">
          <div style="font-size:15px;">输入名称：</div>
          <el-input
            style="margin:15px 0 20px 0;"
            v-model="name"
            placeholder="输入名称..."
            show-word-limit
            maxlength="6"
            oninput="value=value.replace(/[\W]/g,'')"
            autocomplete="off"
          ></el-input>
          <div style="font-size:15px;">输入账号：</div>
          <el-input
            style="margin:15px 0 20px 0;"
            v-model="account"
            placeholder="输入账号..."
            show-word-limit
            maxlength="20"
            oninput="value=value.replace(/[\W]/g,'')"
            autocomplete="off"
          ></el-input>
          <div style="font-size:15px;">输入密码：</div>
          <el-input
            style="margin:15px 0 20px 0;"
            v-model="password1"
            show-password
            placeholder="输入密码..."
            show-word-limit
            maxlength="20"
            autocomplete="off"
          ></el-input>
          <div style="font-size:15px;">再次输入密码：</div>
          <el-input
            style="margin:15px 0 20px 0;"
            v-model="password2"
            show-password
            placeholder="再次输入密码..."
            show-word-limit
            maxlength="20"
            autocomplete="off"
          ></el-input>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="addkitchen()">注 册</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "VEheader",
  data() {
    return {
      dialogShowMessage: false,
      dialogAddKitchen: false,
      dialogEditPassWord: false,

      name: "",
      account: "",
      password: "",
      password1: "",
      password2: ""
    };
  },
  methods: {
    showHeader() {
      this.$store.commit("ChangeLeft");
    },
    editPassword() {
      if (this.password1.length < 6 || this.password1.length > 20) {
        this.$message({
          type: "error",
          message: "密码长度为6-20位！"
        });
      } else if (this.password1 != this.password2) {
        this.$message({
          type: "error",
          message: "两次输入的密码不同！"
        });
      } else {
        this.$axios
          .post(this.$store.state.httpUrl + "/editAdminPassword", {
            id: this.$store.state.admin.id,
            account: this.$store.state.admin.account,
            password: this.password
          })
          .then(res => {
            console.log(res.data);
            if (res.data.code === 20000) {
              this.dialogAddMenu = false;
              this.$message({
                type: "success",
                message: "修改成功！"
              });
              this.password = "";
              this.password1 = "";
              this.password2 = "";
            }
          });
      }
    },
    addkitchen() {
      console.log(this.password1);
      if (this.name == "") {
        this.$message({
          type: "error",
          message: "请填写名称！"
        });
      } else if (this.account.length < 6 || this.account.length > 20) {
        this.$message({
          type: "error",
          message: "账户长度为6-20位！"
        });
      } else if (this.password1.length < 6 || this.password1.length > 20) {
        this.$message({
          type: "error",
          message: "密码长度为6-20位！"
        });
      } else if (this.password1 != this.password2) {
        this.$message({
          type: "error",
          message: "两次输入的密码不同！"
        });
      } else {
        console.log(this.password1);
        this.$axios
          .post(this.$store.state.httpUrl + "/kitchen/addKitchen", {
            storeId: this.$store.state.storeId,
            kitchenName: this.name,
            kitchenAccount: this.account,
            kitchenPassword: this.password1
          })
          .then(res => {
            console.log(res.data);
            if (res.data.code === 20000) {
              this.dialogAddKitchen = false;
              this.$message({
                type: "success",
                message: "后厨账号注册成功,请前往后厨端登录！"
              });
            } else {
              this.$message({
                type: "error",
                message: "后厨账号已存在，或系统错误！"
              });
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
      this.dialogAddKitchen = false;
      this.$message({
        type: "info",
        message: "已取消操作"
      });
    }
  }
};
</script>

<style scoped>
</style>
