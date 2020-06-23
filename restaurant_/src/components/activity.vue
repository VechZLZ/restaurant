<template>
  <div style="font-family:Franklin Gothic Medium;padding:25px 50px;">
    <div
      style="box-shadow:0px 0px 1px 0px #ccc;font-weight: 700;background-color:#fff;padding:20px 20px;margin-bottom:30px;border: 1px solid rgb(221, 221, 221);"
    >
      <img style="width: 19px;" src="image/y.png" alt />
      进行中
    </div>
    <div style="margin:0 30px;">
      <el-row :gutter="40">
        <div v-for="(i,id) in activeList" :key="id" class="grid-content bg-purple">
          <el-col :span="6">
            <div
              v-if="i.isActive===true"
              style="box-shadow:1px 1px 5px 0px #ccc; background-color:#fff;margin-bottom:20px;border-radius: 10px;border: 1px solid rgb(221, 221, 221);padding:20px 30px;"
            >
              <div style="display: flex;justify-content:space-between;margin-bottom:20px;">
                <div v-if="i.type===1" style="margin-top:10px;font-weight: 700;font-size: 19px;">
                  满
                  <span style="margin:0 5px">{{i.price}}</span>减
                  <span style="margin:0 5px">{{i.content}}</span>元
                </div>
                <div v-if="i.type===2" style="margin-top:10px;font-weight: 700;font-size: 19px;">
                  满
                  <span style="margin:0 5px">{{i.price}}</span>打
                  <span style="margin:0 5px">{{i.content}}</span>折
                </div>

                <div>
                  <div style="margin-bottom:10px;">
                    <i
                      class="el-icon-edit"
                      style="color: rgb(37, 130, 250);font-size:20px;"
                      @click="dialogEditActive=true,activeForm.id=id,activeForm.type=i.type,activeForm.price=i.price,activeForm.content=i.content,activeForm.startTime=i.startTime,activeForm.endTime=i.endTime,activeForm.isActive=i.isActive"
                    ></i>
                  </div>

                  <div>
                    <i
                      class="el-icon-delete-solid"
                      style="color: rgb(37, 130, 250);font-size:20px;"
                      @click="deleteActive(id)"
                    ></i>
                  </div>
                </div>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <div style="color: rgb(93, 93, 93);margin-bottom:5px;">类型：{{i.type===1?"满减":"满折"}}</div>
                <div style="margin-top:0px;">
                  <el-switch
                    v-model="i.isActive"
                    active-color="rgb(60, 192, 89)"
                    inactive-color="#ff4949"
                  ></el-switch>
                </div>
              </div>
              <div
                style="color: rgb(93, 93, 93);display:flex;display: flex;justify-content:space-between;"
              >
                <div style="margin-right:15px;">
                  <div>起始时间：</div>
                  <div>
                    {{new Date(i.startTime)
                    .toLocaleDateString()
                    .replace(/\//g, "-") }}
                  </div>
                </div>
                <div style="min-width:80px;">
                  <div>终止时间：</div>
                  <div>
                    {{new Date(i.endTime)
                    .toLocaleDateString()
                    .replace(/\//g, "-") }}
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </div>
        <el-col :span="6">
          <div
            @click="dialogAddActive = true"
            style="margin-bottom:20px;background-color:#eee;display:flex;flex:1;border-radius: 10px;border: 4px dashed rgb(221, 221, 221);height:172px;"
          >
            <div style="font-size: 25px;color: rgb(144, 144, 144);margin: auto;">
              <i class="el-icon-plus"></i>添加新任务
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div
      style="box-shadow:0px 0px 1px 0px #ccc;background-color:#fff;font-weight: 700;padding:20px 20px;margin:20px 0;border: 1px solid rgb(221, 221, 221);margin-bottom:30px;"
    >
      <img style="width: 19px;" src="image/n.png" alt />
      已过期/未开始
    </div>
    <div style="margin:0 30px;">
      <el-row :gutter="40">
        <div v-for="(i,id) in activeList" :key="id" class="grid-content bg-purple">
          <el-col :span="6">
            <div
              v-if="i.isActive===false"
              style="box-shadow:1px 1px 5px 0px #ccc; background-color:#fff;margin-bottom:20px;border-radius: 10px;border: 1px solid rgb(221, 221, 221);padding:20px 30px;"
            >
              <div style="display: flex;justify-content:space-between;margin-bottom:20px;">
                <div v-if="i.type===1" style="margin-top:10px;font-weight: 700;font-size: 19px;">
                  满
                  <span style="margin:0 5px">{{i.price}}</span>减
                  <span style="margin:0 5px">{{i.content}}</span>元
                </div>
                <div v-if="i.type===2" style="margin-top:10px;font-weight: 700;font-size: 19px;">
                  满
                  <span style="margin:0 5px">{{i.price}}</span>打
                  <span style="margin:0 5px">{{i.content}}</span>折
                </div>

                <div>
                  <div style="margin-bottom:10px;">
                    <i
                      class="el-icon-edit"
                      style="color: rgb(37, 130, 250);font-size:20px;"
                      @click="dialogEditActive=true,activeForm.id=id,activeForm.type=i.type,activeForm.price=i.price,activeForm.content=i.content,activeForm.startTime=i.startTime,activeForm.endTime=i.endTime,activeForm.isActive=i.isActive"
                    ></i>
                  </div>
                  <div>
                    <i
                      class="el-icon-delete-solid"
                      style="color: rgb(37, 130, 250);font-size:20px;"
                      @click="deleteActive(id)"
                    ></i>
                  </div>
                </div>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <div style="color: rgb(93, 93, 93);margin-bottom:5px;">类型：{{i.type===1?"满减":"满折"}}</div>
                <div style="margin-top:0px;">
                  <el-switch
                    v-model="i.isActive"
                    active-color="rgb(60, 192, 89)"
                    inactive-color="#ff4949"
                  ></el-switch>
                </div>
              </div>
              <div
                style="color: rgb(93, 93, 93);display:flex;display: flex;justify-content:space-between;"
              >
                <div style="margin-right:15px;">
                  <div>起始时间：</div>
                  <div>
                    {{new Date(i.startTime)
                    .toLocaleDateString()
                    .replace(/\//g, "-") }}
                  </div>
                </div>
                <div style="min-width:80px;">
                  <div>终止时间：</div>
                  <div>
                    {{new Date(i.endTime)
                    .toLocaleDateString()
                    .replace(/\//g, "-") }}
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </div>
      </el-row>
    </div>
    <el-dialog
      width="550px"
      style="font-weight:700;"
      title="添加活动"
      :before-close="cancel"
      :visible.sync="dialogAddActive"
    >
      <el-form :v-model="activeForm">
        <div style="padding:0 15px;text-align:center;">
          <div style="display: flex;margin-top:40px;">
            <div style="font-size:16px;padding:10px 20px;">活动时间</div>
            <div style>
              <div class="block">
                <el-date-picker
                  v-model="activeForm.data"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </div>
            </div>
          </div>
          <div style="display: flex;margin-top:40px;">
            <div style="font-size:16px;padding:10px 20px;">活动类型</div>
            <div style="margin-top:13px;">
              <el-radio v-model="activeForm.type" :label="1">满减</el-radio>
              <el-radio v-model="activeForm.type" :label="2">满折</el-radio>
            </div>

            <div style="font-size:16px;padding:10px 20px;margin-left:70px;">是否上架</div>
            <div>
              <el-switch
                style="padding:10px 0px;"
                v-model="activeForm.isActive"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </div>
          </div>
          <div style="margin-top:40px;">
            <div v-if="activeForm.type===1" style="display: flex;padding:0 95px;">
              <span style="font-size:16px;padding:10px 10px;">满</span>
              <el-input style="width:180px;" v-model="activeForm.price" :clearable="true"></el-input>
              <span style="font-size:16px;padding:10px 10px;">减</span>
              <el-input style="width:180px;" v-model="activeForm.content" :clearable="true"></el-input>
              <span style="font-size:16px;padding:10px 10px;">(元)</span>
            </div>
            <div v-if="activeForm.type===2" style="display: flex;padding:0 95px;">
              <span style="font-size:16px;padding:10px 10px;">满</span>
              <el-input style="width:180px;" v-model="activeForm.price" :clearable="true"></el-input>
              <span style="font-size:16px;padding:10px 10px;">打</span>
              <el-input style="width:180px;" v-model="activeForm.content" :clearable="true"></el-input>
              <span style="font-size:16px;padding:10px 10px;">(折)</span>
            </div>
          </div>
        </div>
      </el-form>
      <div slot="footer" style="text-align:center;" class="dialog-footer">
        <el-button style="width:88%" type="success" @click="addActive()">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="550px"
      style="font-weight:700;"
      title="编辑活动"
      :before-close="cancel"
      :visible.sync="dialogEditActive"
    >
      <el-form :v-model="activeForm">
        <div style="padding:0 15px;text-align:center;">
          <div style="display: flex;margin-top:40px;">
            <div style="font-size:16px;padding:10px 20px;">活动时间</div>
            <div class="block">
              <el-date-picker
                v-model="activeForm.data"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </div>
          <div style="display: flex;margin-top:40px;">
            <div style="font-size:16px;padding:10px 20px;">活动类型</div>
            <div style="margin-top:13px;">
              <el-radio v-model="activeForm.type" :label="1">满减</el-radio>
              <el-radio v-model="activeForm.type" :label="2">满折</el-radio>
            </div>

            <div style="font-size:16px;padding:10px 20px;margin-left:70px;">是否上架</div>
            <div>
              <el-switch
                style="padding:10px 0px;"
                v-model="activeForm.isActive"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </div>
          </div>
          <div style="margin-top:40px;">
            <div v-if="activeForm.type===1" style="display: flex;padding:0 95px;">
              <span style="font-size:16px;padding:10px 10px;">满</span>
              <el-input style="width:180px;" v-model="activeForm.price" :clearable="true"></el-input>
              <span style="font-size:16px;padding:10px 10px;">减</span>
              <el-input style="width:180px;" v-model="activeForm.content" :clearable="true"></el-input>
              <span style="font-size:16px;padding:10px 10px;">(元)</span>
            </div>
            <div v-if="activeForm.type===2" style="display: flex;padding:0 95px;">
              <span style="font-size:16px;padding:10px 10px;">满</span>
              <el-input style="width:180px;" v-model="activeForm.price" :clearable="true"></el-input>
              <span style="font-size:16px;padding:10px 10px;">打</span>
              <el-input style="width:180px;" v-model="activeForm.content" :clearable="true"></el-input>
              <span style="font-size:16px;padding:10px 10px;">(折)</span>
            </div>
          </div>
        </div>
      </el-form>
      <div slot="footer" style="text-align:center;" class="dialog-footer">
        <el-button style="width:88%" type="success" @click="editActive()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogAddActive: false,
      dialogEditActive: false,
      activeForm: {
        id: "",
        type: 1,
        price: 0,
        content: 0,
        startTime: "",
        endTime: "",
        data: "",
        isActive: true
      },
      activeList: []
    };
  },
  methods: {
    cancel() {
      this.dialogAddActive = false;
      this.dialogEditActive = false;
      this.$message({
        type: "info",
        message: "已取消操作"
      });
    },
    getActive() {
      this.activeList = [];
      this.$axios.get(this.$store.state.httpUrl + "/getActive").then(res => {
        console.log(res.data);
        res.data.data.forEach(i => {
          this.activeList.push({
            id: i.id,
            type: i.activeType,
            price: i.activePrice,
            content: i.activeContent,
            startTime: i.activeTimeBegin,
            endTime: i.activeTimeEnd,
            isActive: i.activeIsActive === "1" ? true : false
          });
        });
      });
    },
    addActive() {
      this.$axios.defaults.headers.post["Content-Type"] = "application/json";
      this.$axios
        .post(this.$store.state.httpUrl + "/addActive", {
          storeId: this.$store.state.storeId,
          activeType: this.activeForm.type,
          activePrice: this.activeForm.price,
          activeContent: this.activeForm.content,
          activeTimeBegin: this.activeForm.data[0],
          activeTimeEnd: this.activeForm.data[1],
          activeIsActive: this.activeForm.isActive === false ? 0 : 1
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code === 20000) {
            this.$message({
              type: "success",
              message: "添加成功！"
            });
            this.dialogAddActive = false;
            this.activeList.push({
              type: this.activeForm.type,
              price: this.activeForm.price,
              content: this.activeForm.content,
              startTime: this.activeForm.data[0],
              endTime: this.activeForm.data[1],
              isActive: this.activeForm.isActive
            });
            this.activeForm.type = 1;
            this.activeForm.price = 0;
            this.activeForm.content = 0;
            this.activeForm.startTime = "";
            this.activeForm.endTime = "";
            this.activeForm.isActive = true;
          } else if (res.data.code === 20001) {
            this.$message({
              type: "error",
              message: "添加失败，系统错误，请刷新后再试！"
            });
          } else if (res.data.code === 20001) {
            this.$message({
              type: "error",
              message: "添加失败，登录过期，请重新登录！"
            });
          }
        });
    },
    editActive() {
      this.$axios
        .post(this.$store.state.httpUrl + "/editActive", {
          storeId: this.$store.state.storeId,
          id: this.activeList[this.activeForm.id].id,
          activeType: this.activeForm.type,
          activePrice: this.activeForm.price,
          activeContent: this.activeForm.content,
          activeTimeBegin: this.activeForm.data[0],
          activeTimeEnd: this.activeForm.data[1],
          activeIsActive: this.activeForm.isActive === true ? 1 : 0
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code === 20000) {
            this.$message({
              type: "success",
              message: "修改成功！"
            });
            this.dialogEditActive = false;
            this.activeList[this.activeForm.id].type = this.activeForm.type;
            this.activeList[this.activeForm.id].price = this.activeForm.price;
            this.activeList[
              this.activeForm.id
            ].content = this.activeForm.content;
            this.activeList[
              this.activeForm.id
            ].startTime = this.activeForm.startTime;

            this.activeList[
              this.activeForm.id
            ].endTime = this.activeForm.endTime;
            this.activeList[
              this.activeForm.id
            ].isActive = this.activeForm.isActive;

            this.activeForm.type = 1;
            this.activeForm.price = 0;
            this.activeForm.content = 0;
            this.activeForm.startTime = "";
            this.activeForm.endTime = "";
            this.activeForm.isActive = true;
            this.activeForm.data = "";
          } else if (res.data.code === 20001) {
            this.$message({
              type: "error",
              message: "修改失败，请刷新后再试！"
            });
          } else if (res.data.code === 20001) {
            this.$message({
              type: "error",
              message: "修改失败，请重新登录！"
            });
          }
        });
    },
    deleteActive(id) {
      this.$confirm("是否确定删除此活动？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(this.activeList[id].id);
          this.$axios
            .get(
              this.$store.state.httpUrl +
                "/deleteActive?activeId=" +
                this.activeList[id].id
            )
            .then(res => {
              console.log(res.data);
              if (res.data.code === 20000) {
                this.dialogFormVisible = false;
                this.$message({
                  type: "success",
                  message: "删除成功！"
                });
                this.activeList.splice(id, 1);
              } else if (res.data.code === 20001) {
                this.$message({
                  type: "error",
                  message: "删除失败，请刷新后再试！"
                });
              } else if (res.data.code === 20001) {
                this.$message({
                  type: "error",
                  message: "删除失败，请重新登录！"
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
    }
  },
  mounted() {
    this.getActive();
  }
};
</script>

<style  scoped>
</style>