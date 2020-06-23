<template>
  <div style="flex:1;font-family:Franklin Gothic Medium;padding:25px;">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div>
            <div style="border-radius: 15px;background-color: #fff;padding:30px;">
              <div style="display: flex;margin:20px 0;">
                <div>
                  <img style="height: 85px;width: 85px;" :src="img" alt />
                </div>
                <div style="padding-left:55px;">
                  <div style="color: rgb(47, 130, 224);font-size: 35px;margin-bottom: 5px;">{{name}}</div>
                  <div style="color: rgb(93, 93, 93);font-size: 17px;">{{introduce}}</div>
                </div>
              </div>
              <hr style="color: rgb(209, 209, 209);" />
              <div style="display: flex;justify-content:space-between;">
                <div>
                  <div style="display: flex;color: rgb(107, 107, 107);size: 20px;">
                    <div style="margin-right:70px;margin-bottom:10px;">营业时间:</div>
                    <div>{{openTime}}-{{closeTime}}</div>
                  </div>
                  <div style="display: flex;color: rgb(107, 107, 107);size: 20px;">
                    <div style="margin-right:70px;">当前状态:</div>
                    <div
                      :style="(state===true)?'color:rgb(69, 185, 40)':'color:red'"
                    >{{(state===true)?"营业中":"已打样"}}</div>
                  </div>
                </div>
                <i
                  @click="dialogEditShop = true,homeForm.name=name,homeForm.closeTime=closeTime,homeForm.state=state,homeForm.introduce=introduce,homeForm.openTime=openTime,homeForm.img=img"
                  style="margin-top:32px;color:rgb(47, 130, 224); "
                  class="el-icon-edit"
                ></i>
              </div>
            </div>
            <div style="border-radius: 15px;background-color: #fff;margin-top:20px;height:335px;">
              <div style="display: flex;justify-content:space-between;">
                <div style="font-weight: 700;padding: 15px 20px;font-size: 16px;">待办事项</div>

                <div>
                  <i
                    style="margin:17px 30px;color:rgb(47, 130, 224);"
                    @click="dialogAddItem=true"
                    class="el-icon-plus"
                  ></i>
                </div>
              </div>
              <hr style="color:#eee; margin:0;" />

              <div style="padding:20px ;height:240px;">
                <vue-scroll :ops="ops">
                  <div
                    v-for="(i,id) in this.$store.state.scheduleList"
                    :key="id"
                    class="infinite-list-item"
                  >
                    <el-checkbox v-model="i.cleck" :checked="i.cleck" style="margin:10px 20px;"></el-checkbox>
                    <span :class="{'a':i.cleck}">{{i.name}}</span>
                  </div>
                </vue-scroll>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div style="display: flex;">
                  <div
                    style="background-color: rgb(63, 142, 245);height: 110px;width: 75px;text-align: center;"
                  >
                    <img style="width:50px;height:50px;margin:25px 0;" src="image/s1.png" alt />
                  </div>
                  <div style="background-color: #fff;flex:1;padding:15px 0 15px 30px;">
                    <div
                      style="color:rgb(63, 142, 245);font-size:40px;margin-bottom:5px;"
                    >{{customerNum}}</div>
                    <div style="font-size:14px;color: rgb(107, 107, 107);size: 20px;">今日顾客数</div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div style="display: flex;">
                  <div
                    style="background-color: rgb(95, 209, 110);height: 110px;width: 75px;text-align: center;"
                  >
                    <img style="width:50px;height:50px;margin:25px 0;" src="image/s2.png" alt />
                  </div>
                  <div style="background-color: #fff;flex:1;padding:15px 0 15px 30px;">
                    <div
                      style="color:rgb(95, 209, 110);font-size:40px;margin-bottom:5px;"
                    >{{NewCustomerNum}}</div>
                    <div style="font-size:14px;color: rgb(107, 107, 107);size: 20px;">今日新客数</div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div style="display: flex;">
                  <div
                    style="background-color: rgb(255, 222, 112);height: 110px;width: 75px;text-align: center;"
                  >
                    <img style="width:50px;height:50px;margin:25px 0;" src="image/s3.png" alt />
                  </div>
                  <div style="background-color: #fff;flex:1;padding:15px 0 15px 30px;">
                    <div
                      style="color:rgb(255, 222, 112);font-size:40px;margin-bottom:5px;"
                    >{{count}}</div>
                    <div style="font-size:14px;color: rgb(107, 107, 107);size: 20px;">今日总营业额</div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div style="display: flex;">
                  <div
                    style="background-color: rgb(255, 79, 79);height: 110px;width: 75px;text-align: center;"
                  >
                    <img style="width:50px;height:50px;margin:25px 0;" src="image/s4.png" alt />
                  </div>
                  <div style="background-color: #fff;flex:1;padding:15px 0 15px 30px;">
                    <div
                      style="color:rgb(255, 79, 79);font-size:40px;margin-bottom:5px;"
                    >{{sellNum}}</div>
                    <div
                      style="min-width:100px;font-size:14px;color: rgb(107, 107, 107);size: 20px;"
                    >今日售出菜品数</div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <div style="border-radius: 15px;background-color: #fff;margin-top:20px;height:475px;">
            <div style="font-weight: 700;padding: 15px 20px;font-size: 16px;">点赞/销量排行</div>
            <hr style="color:#eee; margin:0;" />
            <div style="margin-top:10px;display: flex;justify-content: space-around;">
              <div style="box-shadow:0 0 1px 1px #eee;margin:10px;width: 45%">
                <el-table
                  height="380"
                  :data="like"
                  :default-sort="{prop: 'like', order: 'descending'}"
                >
                  <el-table-column prop="food" label="菜品" style="width: 100%"></el-table-column>
                  <el-table-column prop="like" sortable label="点赞数" style="width: 100%"></el-table-column>
                </el-table>
              </div>
              <div style="box-shadow:0 0 1px 1px #eee;margin:10px;width: 45%">
                <el-table
                  height="380"
                  :data="sell"
                  :default-sort="{prop: 'sell', order: 'descending'}"
                  style="width: 100%"
                >
                  <el-table-column prop="food" label="菜品" style="width: 100%"></el-table-column>
                  <el-table-column prop="sell" sortable label="销量" style="width: 100%"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div
          class="grid-content bg-purple"
          style="border-radius: 15px;background-color: #fff;margin-top:20px;"
        >
          <div style="font-weight: 700;padding: 15px 20px;font-size: 16px;">周平均订单量统计</div>
          <hr style="color:#eee; margin:0;margin-bottom:20px;" />
          <div style="display: flex;justify-content: center;">
            <ve-bar style="width:400px;height:400px;" :data="weeklyAverageOrder"></ve-bar>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div
          class="grid-content bg-purple"
          style="border-radius: 15px;background-color: #fff;margin-top:20px;"
        >
          <div style="font-weight: 700;padding: 15px 20px;font-size: 16px;">支付方式统计</div>
          <hr style="color:#eee; margin:0;margin-bottom:20px;" />
          <div style="display: flex;justify-content: center;">
            <ve-pie style="width:400px;height:400px;" :data="methodOfPayment"></ve-pie>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div
          class="grid-content bg-purple"
          style="border-radius: 15px;background-color: #fff;margin-top:20px;"
        >
          <div style="font-weight: 700;padding: 15px 20px;font-size: 16px;">完成时间统计</div>
          <hr style="color:#eee; margin:0;margin-bottom:20px;" />

          <div style="display: flex;justify-content: center;">
            <ve-gauge style="width:400px;height:400px;" :data="completionTime"></ve-gauge>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <div
          class="grid-content bg-purple"
          style="border-radius: 15px;background-color: #fff;margin-top:20px;"
        >
          <div style="font-weight: 700;padding: 15px 20px;font-size: 16px;">营业额</div>
          <hr style="color:#eee; margin:0;" />
          <div>
            <ve-line :data="turnover"></ve-line>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      width="560px"
      style="font-weight:700"
      title="编辑店铺"
      :visible.sync="dialogEditShop"
      :before-close="cancel"
    >
      <el-form :v-model="homeForm">
        <div style="text-align:center;padding:0 20px;">
          <el-upload
            class="avatar-uploader"
            action="http://haozheng.club:8894/admin/upload"
            :on-error="uploadError"
            :show-file-list="false"
            :headers="{token:$store.state.token}"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="homeForm.img" :src="homeForm.img" class="avatar" />
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
              style="border: 1px dashed #d9d9d9;border-radius: 6px;"
            ></i>
          </el-upload>
          <div style="display: flex;margin-top:40px;">
            <div style="font-size:16px;padding:10px 20px ;">名称</div>
            <div style="flex:1;padding-right:19px;">
              <el-input v-model="homeForm.name" clearable></el-input>
            </div>
            <div style="font-size:16px;padding:10px 20px;margin-left:10px;">是否营业</div>
            <div>
              <el-switch
                style="padding:10px 0px;margin-right:25px;"
                v-model="homeForm.state"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </div>
          </div>
          <div style="display: flex;margin-top:40px;">
            <div style="font-size:16px;padding:10px 20px;">营业时间</div>
            <div style="flex:1;display:flex;">
              <el-time-select
                style="width:120px;"
                placeholder="起始时间"
                v-model="homeForm.openTime"
                :picker-options="{start: '06:00',step: '00:15',end: '24:00'}"
              ></el-time-select>
              <div style="font-size:16px;padding:10px 20px;">到</div>
              <el-time-select
                style="width:120px;"
                placeholder="结束时间"
                v-model="homeForm.closeTime"
                :picker-options="{start: '06:00',step: '00:15',end: '24:00',minTime: homeForm.openTime}"
              ></el-time-select>
            </div>
          </div>
          <div style="display: flex;margin-top:40px;">
            <div style="font-size:16px;padding:10px 20px;">描述</div>
            <div style="flex:1;padding-right:19px;">
              <el-input v-model="homeForm.introduce" maxlength="25" clearable></el-input>
            </div>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div style="text-align:center;">
          <el-button style="width:88%;" type="success" @click="editShop">保存</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      width="380px"
      style="font-weight:700"
      title="添加代办事项"
      :visible.sync="dialogAddItem"
      :before-close="cancel"
    >
      <el-form>
        <div style="text-align:center;padding:0 20px;">
          <el-input v-model="item" placeholder="请输入代办事项..." clearable></el-input>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import vueScroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";
import ElementUI from "element-ui";

export default {
  name: "home",
  data() {
    return {
      ops: {
        // 在这里设置配置
        vuescroll: {},
        scrollPanel: {},
        rail: {},
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: true, //是否只有滚动的时候才显示滚动条
          background: "#bbb" //颜色
        }
      },
      dialogAddImg: false,
      dialogEditShop: false,
      homeForm: {
        name: "",
        introduce: "",
        img: "",
        openTime: "",
        closeTime: "",
        state: true,
        storeTableNum: 0
      },
      name: "",
      introduce: "",
      img: "",
      openTime: "",
      closeTime: "",
      state: true,
      rate: 0,
      sellCount: 0,
      storeTableNum: 0,
      customerNum: 132,
      NewCustomerNum: 8,
      count: 356,
      sellNum: 105,
      dialogAddItem: false,
      item: "",
      scheduleList: [
        { name: "去超市进货", cleck: false },
        { name: "清点冰箱食材存量", cleck: true },
        { name: "开会", cleck: false },
        { name: "结算收入", cleck: false },
        { name: "更改菜单", cleck: true },
        { name: "添加活动", cleck: false },
        { name: "店内打扫", cleck: false },
        { name: "打印资料", cleck: true },
        { name: "装饰店铺", cleck: false }
      ],
      like: [
        {
          food: "咖喱猪扒饭",
          like: "236"
        },
        {
          food: "菠萝咕噜肉",
          like: "133"
        },
        {
          food: "烤鱼",
          like: "211"
        },
        {
          food: "面包的诱惑",
          like: "236"
        },
        {
          food: "酸辣虾",
          like: "156"
        },
        {
          food: "小龙虾",
          like: "199"
        }
      ],
      sell: [
        {
          food: "咖喱猪扒饭",
          sell: "400"
        },
        {
          food: "菠萝咕噜肉",
          sell: "324"
        },
        {
          food: "烤鱼",
          sell: "311"
        },
        {
          food: "面包的诱惑",
          sell: "249"
        },
        {
          food: "酸辣虾",
          sell: "212"
        },
        {
          food: "小龙虾",
          sell: "322"
        }
      ],
      weeklyAverageOrder: {
        columns: ["日期", "下单用户"],
        rows: [
          { 日期: "周一", 下单用户: 1093 },
          { 日期: "周二", 下单用户: 2230 },
          { 日期: "周三", 下单用户: 1623 },
          { 日期: "周四", 下单用户: 1423 },
          { 日期: "周五", 下单用户: 2230 },
          { 日期: "周六", 下单用户: 2723 },
          { 日期: "周日", 下单用户: 2823 }
        ]
      },
      methodOfPayment: {
        columns: ["日期", "访问用户"],
        rows: [
          { 日期: "微信", 访问用户: 2393 },
          { 日期: "支付宝", 访问用户: 3430 },
          { 日期: "银行卡", 访问用户: 1123 },
          { 日期: "现金", 访问用户: 1023 }
        ]
      },
      completionTime: {
        columns: ["type", "value"],
        rows: [{ type: "速度", value: 70 }]
      },
      turnover: {
        columns: ["日期", "访问用户", "下单用户"],
        rows: [
          { 日期: "8天前", 访问用户: 2393, 下单用户: 1093 },
          { 日期: "7天前", 访问用户: 2830, 下单用户: 2630 },
          { 日期: "6天前", 访问用户: 2623, 下单用户: 2323 },
          { 日期: "5天前", 访问用户: 1393, 下单用户: 1093 },
          { 日期: "4天前", 访问用户: 1530, 下单用户: 1230 },
          { 日期: "3天前", 访问用户: 2423, 下单用户: 2223 },
          { 日期: "前天", 访问用户: 1723, 下单用户: 1423 },
          { 日期: "昨天", 访问用户: 3492, 下单用户: 3192 },
          { 日期: "今天", 访问用户: 3593, 下单用户: 3293 }
        ]
      }
    };
  },
  components: {
    vueScroll
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // this.editGoodsForm.imageUrl = URL.createObjectURL(file.raw);
      this.homeForm.img = res.data;
      this.loading.close();
      console.log(res);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      // const isJPG =  true ;
      const isLt2M = file.size / 1024 / 1024 < 5;
      // const isLt2M = true;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 与 png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }

      this.loading = ElementUI.Loading.service({
        lock: true,
        text: "加载中……",
        background: "rgba(0, 0, 0, 0.7)"
      });

      return isJPG && isLt2M;
    },
    uploadError(err) {
      console.log(err);
      this.loading.close();
    },
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePictureCardPreview(file) {
    //   this.homeForm.img = file.url;
    //   this.dialogAddImg = true;
    // },
    cancel() {
      this.dialogAddItem = false;
      this.dialogEditShop = false;
      this.$message({
        type: "info",
        message: "已取消操作"
      });
    },
    editShop() {
      if (this.homeForm.name == "") {
        this.$message({
          type: "error",
          message: "请输入店铺名！"
        });
      } else {
        this.$axios
          .post(this.$store.state.httpUrl + "/editStore", {
            hostId: this.$store.state.hostId,
            id: this.$store.state.storeId,
            storeName: this.homeForm.name,
            storeDescribe: this.homeForm.introduce,
            businessHoursBegin: this.homeForm.openTime,
            businessHoursEnd: this.homeForm.closeTime,
            businessStatus: this.homeForm.state === true ? 1 : 0,
            storeTxUrl: this.homeForm.img,
            storeTableNum: this.storeTableNum,
            rate: this.rate,
            sellCount: this.sellCount
          })
          .then(res => {
            console.log(res.data);
            if (res.data.code === 20000) {
              this.$message({
                type: "success",
                message: "修改成功！"
              });
              this.name = this.homeForm.name;
              this.introduce = this.homeForm.introduce;
              this.img = this.homeForm.img;
              this.openTime = this.homeForm.openTime;
              this.closeTime = this.homeForm.closeTime;
              this.state = this.homeForm.state;

              this.homeForm.name = "";
              this.homeForm.introduce = "";
              this.homeForm.img = "";
              this.homeForm.openTime = "";
              this.homeForm.closeTime = "";
              this.homeForm.state = true;
              this.dialogEditShop = false;
            } else {
              this.$message({
                type: "error",
                message: "修改失败，请刷新后再试！"
              });
            }
          });
      }
    },
    addItem() {
      if (this.item == "") {
        this.$message({
          type: "error",
          message: "请输入代办事项！"
        });
      } else {
        this.$store.state.scheduleList.push({
          name: this.item,
          cleck: false
        });
        this.item = "";
        this.dialogAddItem = false;
        this.$message({
          type: "success",
          message: "添加成功！"
        });
      }
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
        })
        .catch(function(res) {
          console.log(res);
        });
    }
  },
  mounted() {
    this.getStore();
    if (this.$store.state.scheduleList == "") {
      this.$store.state.scheduleList = this.scheduleList;
    }
  }
};
</script>

<style scoped>
.a {
  text-decoration: line-through;
  color: rgb(165, 165, 165);
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
