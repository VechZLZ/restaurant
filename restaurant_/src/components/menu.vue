<template>
  <div style="font-family:Franklin Gothic Medium;padding:25px 50px;">
    <div
      style="box-shadow:0 0 2px 1px #ccc;display: flex;justify-content:space-between;padding:30px 20px;border-radius: 10px;background-color:#fff;margin-bottom:25px;"
    >
      <div style="display: flex;align-items: center;">
        <div style="color:red;margin-right:5px;">*</div>
        <div style="margin-right:10px;">菜单名称</div>
        <div style="box-shadow:0px 0px 1px 0px #ccc;margin-right:20px;">
          <input  placeholder="输入菜名" v-model="searchGoods" clearable>
        </div>
        <div>
          <el-button type="success">搜索</el-button>
        </div>
      </div>

      <div style="display: flex;">
        <div style="margin-right:10px;">
          <el-button type="info" plain>使用</el-button>
        </div>
        <div style="margin-right:10px;">
          <el-button
            style="background-color: rgb(43, 144, 233);border: rgb(43, 144, 233);"
            @click="dialogAddMenu = true"
            type="primary"
          >添加类别</el-button>
        </div>
        <div style="margin-right:10px;">
          <el-button type="warning">排序</el-button>
        </div>
        <div style="margin-right:10px;">
          <el-button type="danger">删除菜单</el-button>
        </div>
      </div>
    </div>
    <div>
      <el-collapse v-model="goodsType">
        <div v-for="(i,id) in goodsTypeList" :key="id">
          <el-collapse-item :name="id+1">
            <template slot="title">
              <div
                style="color:#666;align-items:center;display:flex;flex:1;justify-content: space-between;"
              >
                <div style="display:flex;">
                  <div style="margin-left:35px;margin-right:10px;">
                    <i class="el-icon-more" style="font-size:20px;"></i>
                  </div>
                  <div style="font-size:17px;">{{i.name}}</div>
                </div>

                <div style="display:flex;">
                  <div
                    @click.stop="dialogEditMenu=true,editMenuForm.id=id,editMenuForm.name=i.name"
                  >
                    <i class="el-icon-edit" style="color: rgb(37, 130, 250);font-size:20px;"></i>
                  </div>
                  <div @click.stop="deleteMenu(id)" style="margin:0 40px 0 15px;">
                    <i
                      class="el-icon-delete-solid"
                      style="color: rgb(37, 130, 250);font-size:20px;"
                    ></i>
                  </div>
                </div>
              </div>
            </template>
            <div style="padding:20px 20px;">
              <el-row :gutter="40">
                <div
                  v-for="(g,goodsId) in i.goodsList"
                  :key="goodsId"
                  class="grid-content bg-purple"
                >
                  <el-col :span="8">
                    <div style="padding-bottom:20px;">
                      <div
                        style="box-shadow:1px 1px 5px 0px #ccc;display: flex;background-color:#fff;border-radius: 10px;border: 1px solid rgb(221, 221, 221);padding:20px 12px 20px 40px;"
                      >
                        <div>
                          <img
                            style="box-shadow:1px 1px 5px 0px #ccc;border: 1px dashed rgb(163, 163, 163);border-radius: 10px;width: 120px;height: 120px;margin-right: 30px;"
                            :src="g.img"
                            alt
                          />
                        </div>
                        <div style="flex:1;">
                          <div
                            style="display: flex;justify-content:space-between;margin-bottom:18px;"
                          >
                            <div
                              style="font-size: 16px;font-weight: 700;margin-top: 5px;"
                            >{{g.name}}</div>
                            <div style="margin-right:30px;">
                              <div
                                @click="dialogEditGoods=true,editGoodsForm.id=id,editGoodsForm.gId=goodsId,editGoodsForm.name=g.name,editGoodsForm.stock=g.stock,editGoodsForm.price=g.price,editGoodsForm.introduce=g.introduce,editGoodsForm.isSell=g.isSell,editGoodsForm.imageUrl=g.img"
                                style="margin-bottom:10px;"
                              >
                                <i
                                  class="el-icon-edit"
                                  style="color: rgb(37, 130, 250);font-size:20px;"
                                ></i>
                              </div>
                              <div @click="deleteGoods(id,goodsId)">
                                <i
                                  class="el-icon-delete-solid"
                                  style="color: rgb(37, 130, 250);font-size:20px;"
                                ></i>
                              </div>
                            </div>
                          </div>
                          <div style="color: rgb(49, 255, 100);margin-bottom:5px;">已上架</div>

                          <div style="display: flex;justify-content:space-between;">
                            <div>
                              <div style="color: rgb(87, 87, 87);">库存：{{g.stock}}</div>
                              <div style="color: rgb(87, 87, 87);">价格：{{g.price}}</div>
                            </div>
                            <div style="color: rgb(87, 87, 87);display: flex;margin:20px 20px 0 0">
                              <div style="margin-right:5px;">{{g.like}}</div>

                              <img
                                style="width: 18px;height: 18px;font-size: 15px;"
                                src="image/like.png"
                                alt
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </div>

                <el-col :span="8">
                  <div
                    @click="dialogAddGoods = true,addGoodsForm.id=id"
                    style="background-color:#eee;display:flex;flex:1;border-radius: 10px;border: 4px dashed rgb(221, 221, 221);height:182px;"
                  >
                    <div style="font-size: 25px;color: rgb(144, 144, 144);margin: auto;">
                      <i class="el-icon-plus"></i>添加新菜品
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-collapse-item>
        </div>
      </el-collapse>
      <!-- <div v-if="!goodsTypeList.Array">
        1234444444444444444444444444444444
      </div>-->
    </div>
    <el-dialog
      title="添加类别"
      style="font-weight:700;"
      width="500px"
      :before-close="cancel"
      :visible.sync="dialogAddMenu"
    >
      <el-form :model="addMenuForm">
        <el-input
          v-model="addMenuForm.name"
          placeholder="输入类别名称..."
          show-word-limit
          maxlength="6"
          autocomplete="off"
        ></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="addMenu()">添 加</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="编辑类别"
      style="font-weight:700;"
      width="500px"
      :before-close="cancel"
      :visible.sync="dialogEditMenu"
    >
      <el-form :model="editMenuForm">
        <el-input
          v-model="editMenuForm.name"
          placeholder="输入新的类别名称..."
          show-word-limit
          maxlength="6"
          autocomplete="off"
        ></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="editMenu()">修 改</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="添加菜品"
      style="font-weight:700;"
      width="600px"
      :before-close="cancel"
      :visible.sync="dialogAddGoods"
    >
      <el-form :model="addGoodsForm">
        <div style="text-align:center;padding:0 20px;">
          <el-upload
            class="avatar-uploader"
            action="http://haozheng.club:8894/admin/upload"
            :on-error="uploadError"
            :show-file-list="false"
            :headers="{token:$store.state.token}"
            :on-success="addGoodsHandleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="addGoodsForm.imageUrl" :src="addGoodsForm.imageUrl" class="avatar" />
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
              style="border: 1px dashed #d9d9d9;border-radius: 6px;"
            ></i>
          </el-upload>

          <div style="display: flex;margin-top:40px;">
            <div style="font-size:16px;padding:10px 20px;">名称</div>
            <div style="flex:1">
              <el-input
                v-model="addGoodsForm.name"
                show-word-limit
                maxlength="8"
                placeholder="输入..."
                :clearable="true"
              ></el-input>
            </div>
            <div style="font-size:16px;padding:10px 20px;margin-left:20px;">是否上架</div>
            <div>
              <el-switch
                style="padding:10px 0px;margin-right:25px;"
                v-model="addGoodsForm.isSell"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </div>
          </div>
          <div style="display: flex;margin-top:40px;">
            <div style="font-size:16px;padding:10px 20px;">价格</div>
            <div style="flex:1">
              <el-input
                v-model="addGoodsForm.price"
                maxlength="5"
                oninput="value=value.replace(/[^\d]/g, '')"
              ></el-input>
            </div>
            <div style="margin-left:20px;font-size:16px;padding:10px 20px;">库存</div>
            <div style="flex:1;margin-right:20px;">
              <el-input
                v-model="addGoodsForm.stock"
                maxlength="5"
                oninput="value=value.replace(/[^\d]/g, '')"
              ></el-input>
            </div>
          </div>
          <div style="display: flex;margin-top:40px;">
            <div style="font-size:16px;padding:10px 20px;">描述</div>
            <div style="flex:1;margin-right:20px;">
              <el-input v-model="addGoodsForm.introduce" placeholder="输入..." :clearable="true"></el-input>
            </div>
          </div>
        </div>
      </el-form>
      <div slot="footer" style="text-align:center" class="dialog-footer">
        <el-button style="width:88%" type="success" @click="addGoods()">添加</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="编辑菜品"
      style="font-weight:700;"
      width="600px"
      :before-close="cancel"
      :visible.sync="dialogEditGoods"
    >
      <el-form :model="editGoodsForm">
        <div style="text-align:center;padding:0 20px;">
          <el-upload
            class="avatar-uploader"
            action="http://haozheng.club:8894/admin/upload"
            :on-error="uploadError"
            :show-file-list="false"
            :headers="{token:$store.state.token}"
            :on-success="editGoodsHandleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="editGoodsForm.imageUrl" :src="editGoodsForm.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus"></i>
          </el-upload>

          <div style="display: flex;margin-top:40px;">
            <div style="font-size:16px;padding:10px 20px;">名称</div>
            <div style="flex:1">
              <el-input
                v-model="editGoodsForm.name"
                show-word-limit
                maxlength="8"
                placeholder="输入..."
                :clearable="true"
              ></el-input>
            </div>
            <div style="font-size:16px;padding:10px 20px;margin-left:20px;">是否上架</div>
            <div>
              <el-switch
                style="padding:10px 0px;margin-right:25px;"
                v-model="editGoodsForm.isSell"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </div>
          </div>
          <div style="display: flex;margin-top:40px;">
            <div style="font-size:16px;padding:10px 20px;">价格</div>
            <div style="flex:1">
              <el-input
                v-model="editGoodsForm.price"
                maxlength="6"
                oninput="value=value.replace(/[^\d]/g, '')"
              ></el-input>
            </div>
            <div style="margin-left:20px;font-size:16px;padding:10px 20px;">库存</div>
            <div style="flex:1;margin-right:20px;">
              <el-input
                v-model="editGoodsForm.stock"
                maxlength="6"
                oninput="value=value.replace(/[^\d]/g, '')"
              ></el-input>
            </div>
          </div>
          <div style="display: flex;margin-top:40px;">
            <div style="font-size:16px;padding:10px 20px;">描述</div>
            <div style="flex:1;margin-right:20px;">
              <el-input v-model="editGoodsForm.introduce" placeholder="输入..." :clearable="true"></el-input>
            </div>
          </div>
        </div>
      </el-form>
      <div slot="footer" style="text-align:center;" class="dialog-footer">
        <el-button style="width:43%" @click="cancel()">取 消</el-button>
        <el-button style="width:43%" type="success" @click="editGoods()">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ElementUI from "element-ui";

export default {
  data() {
    return {
      goodsTypeList: [],
      dialogAddMenu: false,
      addMenuForm: {
        name: ""
      },
      dialogEditMenu: false,
      editMenuForm: {
        name: "",
        id: ""
      },
      dialogAddGoods: false,
      addGoodsForm: {
        id: "",
        name: "",
        stock: 1,
        price: 0,
        introduce: "",
        isSell: true,
        imageUrl: ""
      },
      dialogEditGoods: false,
      editGoodsForm: {
        id: "",
        gId: "",
        name: "",
        stock: 1,
        price: 0,
        introduce: "",
        isSell: true,
        loading: "",
        imageUrl: ""
      },
      formLabelWidth: "120px",
      goodsType: 1,
      searchGoods: ""
    };
  },
  methods: {
    addGoodsHandleAvatarSuccess(res, file) {
      // this.addGoodsForm.imageUrl = URL.createObjectURL(file.raw);
      this.addGoodsForm.imageUrl = res.data;
      this.loading.close();
      console.log(res);
    },
    editGoodsHandleAvatarSuccess(res, file) {
      // this.editGoodsForm.imageUrl = URL.createObjectURL(file.raw);
      this.editGoodsForm.imageUrl = res.data;
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
    cancel() {
      this.dialogAddMenu = false;
      this.dialogEditMenu = false;
      this.dialogAddGoods = false;
      this.dialogEditGoods = false;
      this.$message({
        type: "info",
        message: "已取消操作"
      });
    },
    editMenu() {
      if (this.editMenuForm.name == "") {
        this.$message({
          type: "error",
          message: "请输入菜单名！"
        });
      } else {
        this.$axios.defaults.headers.post["Content-Type"] = "application/json";
        this.$axios
          .post(this.$store.state.httpUrl + "/editGoodsType", {
            storeId: this.$store.state.storeId,
            goodsType: this.editMenuForm.name,
            id: this.goodsTypeList[this.editMenuForm.id].goodsTypeId
          })
          .then(res => {
            console.log(res.data);
            if (res.data.code === 20000) {
              this.dialogEditMenu = false;
              this.$message({
                type: "success",
                message: "修改成功！"
              });
              this.goodsTypeList[
                this.editMenuForm.id
              ].name = this.editMenuForm.name;
              this.editMenuForm.name = "";
            } else if (res.data.code === 20001) {
              this.$message({
                type: "error",
                message: "修改失败，系统错误，请刷新后再试！"
              });
            } else if (res.data.code === 20001) {
              this.$message({
                type: "error",
                message: "修改失败，登录过期，请重新登录！"
              });
            }
          });
      }
    },
    editGoods() {
      if (this.editGoodsForm.name == "") {
        this.$message({
          type: "error",
          message: "请输入菜品名！"
        });
      } else if (this.editGoodsForm.stock == 0) {
        this.$message({
          type: "error",
          message: "库存不能为0！"
        });
      } else {
        this.$axios
          .post(this.$store.state.httpUrl + "/editGoods", {
            storeId: this.$store.state.storeId,
            id: this.goodsTypeList[this.editGoodsForm.id].goodsList[
              this.editGoodsForm.gId
            ].id,
            goodsTypeId: this.goodsTypeList[this.editGoodsForm.id].goodsTypeId,
            goodsName: this.editGoodsForm.name,
            goodsDescribe: this.editGoodsForm.introduce,
            goodsImage: this.editGoodsForm.imageUrl,
            goodsPrice: this.editGoodsForm.price,
            goodIsSell: this.editGoodsForm.isSell === false ? 0 : 1,
            goodsStock: this.editGoodsForm.stock
          })
          .then(res => {
            console.log(res.data);
            if (res.data.code === 20000) {
              this.dialogEditGoods = false;
              this.$message({
                type: "success",
                message: "修改成功！"
              });
              this.goodsTypeList[this.editGoodsForm.id].goodsList[
                this.editGoodsForm.gId
              ].name = this.editGoodsForm.name;
              this.goodsTypeList[this.editGoodsForm.id].goodsList[
                this.editGoodsForm.gId
              ].introduce = this.editGoodsForm.introduce;
              this.goodsTypeList[this.editGoodsForm.id].goodsList[
                this.editGoodsForm.gId
              ].img = this.editGoodsForm.imageUrl;
              this.goodsTypeList[this.editGoodsForm.id].goodsList[
                this.editGoodsForm.gId
              ].price = this.editGoodsForm.price;
              this.goodsTypeList[this.editGoodsForm.id].goodsList[
                this.editGoodsForm.gId
              ].stock = this.editGoodsForm.stock;
              this.goodsTypeList[this.editGoodsForm.id].goodsList[
                this.editGoodsForm.gId
              ].isSell = this.editGoodsForm.isSell;
              this.editGoodsForm.id = "";
              this.editGoodsForm.gId = "";
              this.editGoodsForm.name = "";
              this.editGoodsForm.stock = "";
              this.editGoodsForm.price = "";
              this.editGoodsForm.introduce = "";
              this.editGoodsForm.isSell = true;
              this.editGoodsForm.imageUrl = "";
            } else if (res.data.code === 20001) {
              this.$message({
                type: "error",
                message: "修改失败，系统错误，请刷新后再试！"
              });
            } else if (res.data.code === 20001) {
              this.$message({
                type: "error",
                message: "修改失败，登录过期，请重新登录！"
              });
            }
          });
      }
    },
    addMenu() {
      if (this.addMenuForm.name == "") {
        this.$message({
          type: "error",
          message: "请输入菜单名！"
        });
      } else {
        this.$axios.defaults.headers.post["Content-Type"] = "application/json";
        this.$axios
          .post(
            this.$store.state.httpUrl + "/addGoodsType",
            JSON.stringify({
              goodsType: this.addMenuForm.name
            })
          )
          .then(res => {
            console.log(res.data);
            if (res.data.code === 20000) {
              this.dialogAddMenu = false;
              this.$message({
                type: "success",
                message: "添加成功！"
              });
              this.goodsTypeList.push({
                goodsTypeId: res.data.data.id,
                name: this.addMenuForm.name,
                goodsList: []
              });
              this.addMenuForm.name = "";
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
      }
    },
    addGoods() {
      if (this.addGoodsForm.name == "") {
        this.$message({
          type: "error",
          message: "请输入菜品名！"
        });
      } else if (this.addGoodsForm.stock == 0) {
        this.$message({
          type: "error",
          message: "库存不能为0！"
        });
      } else {
        this.$axios.defaults.headers.post["Content-Type"] = "application/json";
        this.$axios
          .post(
            this.$store.state.httpUrl + "/addGoods",
            JSON.stringify({
              storeId: this.$store.state.storeId,
              goodsTypeId: this.goodsTypeList[this.addGoodsForm.id].goodsTypeId,
              goodsName: this.addGoodsForm.name,
              goodsPrice: this.addGoodsForm.price,
              goodsStock: this.addGoodsForm.stock,
              goodsSell: this.addGoodsForm.sell,
              goodIsSell: this.addGoodsForm.isSell === false ? "0" : "1",
              goodsDescribe: this.addGoodsForm.introduce,
              goodsImage: this.addGoodsForm.imageUrl
            })
          )
          .then(res => {
            console.log(res.data);
            if (res.data.code === 20000) {
              this.$message({
                type: "success",
                message: "添加成功！"
              });
              this.dialogAddGoods = false;
              this.goodsTypeList[this.addGoodsForm.id].goodsList.push({
                id: res.data.data.id,
                name: this.addGoodsForm.name,
                img: this.addGoodsForm.imageUrl,
                stock: this.addGoodsForm.stock,
                price: this.addGoodsForm.price,
                like: 0,
                isSell: this.addGoodsForm.isSell
              });
              this.addGoodsForm.id = "";
              this.addGoodsForm.gId = "";
              this.addGoodsForm.name = "";
              this.addGoodsForm.stock = "";
              this.addGoodsForm.price = "";
              this.addGoodsForm.introduce = "";
              this.addGoodsForm.isSell = true;
              this.addGoodsForm.imageUrl = "";
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
      }
    },
    deleteGoods(id, goodsId) {
      this.$confirm("是否确定删除此菜品？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get(
              this.$store.state.httpUrl +
                "/deleteGoods?goodsId=" +
                this.goodsTypeList[id].goodsList[goodsId].id
            )
            .then(res => {
              console.log(res.data);
              if (res.data.code === 20000) {
                this.dialogFormVisible = false;
                this.$message({
                  type: "success",
                  message: "删除成功！"
                });
                this.goodsTypeList[id].goodsList.splice(goodsId, 1);
              } else if (res.data.code === 20001) {
                this.$message({
                  type: "error",
                  message: "删除失败，系统错误，请刷新后再试！"
                });
              } else if (res.data.code === 20001) {
                this.$message({
                  type: "error",
                  message: "删除失败，登录过期，请重新登录！"
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
    deleteMenu(id) {
      this.$confirm("是否确定删除此菜单？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get(
              this.$store.state.httpUrl +
                "/deleteGoodsType?goodsTypeId=" +
                this.goodsTypeList[id].goodsTypeId
            )
            .then(res => {
              console.log(res.data);
              if (res.data.code === 20000) {
                this.dialogFormVisible = false;
                this.$message({
                  type: "success",
                  message: "删除成功！"
                });
                this.goodsTypeList.splice(id, 1);
              } else if (res.data.code === 20001) {
                this.$message({
                  type: "error",
                  message: "删除失败，系统错误，请刷新后再试！"
                });
              } else if (res.data.code === 20001) {
                this.$message({
                  type: "error",
                  message: "删除失败，登录过期，请重新登录！"
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
    handlePictureCardPreview(file) {
      this.img = file.url;
    },
    getMenu() {
      if (this.goodsTypeList) {
        this.goodsTypeList = [];
      }
      this.$axios
        .get(this.$store.state.httpUrl + "/getGoods")
        .then(res => {
          console.log(res.data.data);
          res.data.data.goodsType.forEach(i => {
            this.goodsTypeList.push({
              goodsTypeId: i.id,
              name: i.goodsType,
              goodsList: []
            });
          });

          res.data.data.goods.forEach(i => {
            this.goodsTypeList.forEach(e => {
              if (i.goodsTypeId === e.goodsTypeId) {
                e.goodsList.push({
                  id: i.id,
                  name: i.goodsName,
                  img: i.goodsImage,
                  stock: i.goodsStock,
                  price: i.goodsPrice,
                  like: i.goodsGood,
                  introduce: i.goodsDescribe,
                  isSell: i.goodIsSell === "0" ? false : true
                });
              }
            });
          });
        })
        .catch(function(res) {
          console.log(res);
        });
    }
  },
  mounted() {
    this.getMenu();
  }
};
</script>

<style  scoped>
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
.el-collapse-item {
  box-shadow: 0px 0px 1px 2px rgb(221, 221, 221);
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
