<template>
  <div style="min-width:1300px;font-family:Franklin Gothic Medium;padding:25px 50px;">
    <div
      style="box-shadow:0 0 3px 1px #ccc;background-color:#fdfdfd;border-radius:10px 10px 0 0;padding-top:20px;text-align:center;"
    >
      <div style="margin-bottom:20px;margin-right:22px;margin-left:70px;">
        <el-row :gutter="10">
          <el-col :span="3" :offset="0">
            <div style="padding-left:10px;" class="grid-content bg-purple">订单号</div>
          </el-col>
          <el-col :span="4" :offset="11">
            <div style="padding-right:10px;" class="grid-content bg-purple">下单时间</div>
          </el-col>
          <el-col :span="2">
            <div style="padding-right:10px;" class="grid-content bg-purple">桌号</div>
          </el-col>
          <el-col :span="3" :offset="1">
            <div class="grid-content bg-purple">操作</div>
          </el-col>
        </el-row>
      </div>
      <el-collapse v-model="orderNumber">
        <div v-for="(i,id) in orderList" :key="id">
          <el-collapse-item :name="id+1">
            <template slot="title">
              <div style="flex:1;text-align:center;margin-left:40px;">
                <el-row :gutter="10">
                  <el-col :span="3">
                    <div style="display:flex;">
                      <div style="margin-right:10px;margin-top:3px;">
                        <i class="el-icon-more" style="font-size:20px;"></i>
                      </div>
                      <div style="font-size:16px;" class="grid-content bg-purple">{{i.orderId}}</div>
                    </div>
                  </el-col>
                  <el-col :span="4" :offset="11">
                    <div
                      style="font-size:16px;min-width:150px;"
                      class="grid-content bg-purple"
                    >{{new Date(i.time).toLocaleDateString().replace(/\//g, "-") + " " + new Date(i.time).toTimeString().substr(0, 8)}}</div>
                  </el-col>
                  <el-col :span="2">
                    <div style="font-size:16px;" class="grid-content bg-purple">{{i.table}}</div>
                  </el-col>
                  <el-col :span="3" :offset="1">
                    <div class="grid-content bg-purple">
                      <el-button
                        v-if="i.state==1"
                        v-model="i.state"
                        @click.stop="finishOrder(id)"
                        style="background-color:#fff;padding:7px 10px;font-size:17px;"
                        type="primary"
                        plain
                      >全部完成</el-button>
                      <el-button
                        v-if="i.state!=1"
                        style="padding:7px 10px;font-size:17px;"
                        type="info"
                        disabled
                        plain
                      >已全部完成</el-button>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </template>
            <div style="margin:30px 0;">
              <div v-for="(g,goodsId) in i.goodsList" :key="goodsId">
                <div style="display: flex;margin-top:20px;justify-content: space-between;">
                  <div
                    style="margin-left:100px;margin-right:5px;flex:1;color:rgb(97, 97, 97);text-align:center;padding-right:20px;"
                  >
                    <el-row :gutter="10">
                      <el-col :span="3" :offset="3">
                        <div class="grid-content bg-purple">
                          <img
                            style="width:90px;border: 1px dashed rgb(168, 168, 168) ;"
                            :src="g.img"
                            alt
                          />
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <div
                          style="margin-top:25px; font-size:16px;"
                          class="grid-content bg-purple"
                        >{{g.name}}</div>
                      </el-col>

                      <el-col :span="2">
                        <div
                          style="margin-top:25px;font-size:16px;"
                          class="grid-content bg-purple"
                        >x{{g.num}}</div>
                      </el-col>
                      <el-col :span="3">
                        <div
                          style="margin-top:25px;font-size:16px;"
                          class="grid-content bg-purple"
                          :class="{'g':g.state!=1 ,'r':g.state==1}"
                        >{{(g.state==1)?"正在制作":"已完成"}}</div>
                      </el-col>
                      <el-col :span="3" :offset="7">
                        <div class="grid-content bg-purple">
                          <div style="padding-top:20px;margin:0 auto">
                            <el-button
                              v-if="g.state==1"
                              v-model="g.state"
                              @click="finishGoods(id,goodsId)"
                              style="background-color:#fff;padding:7px 10px;font-size:17px;"
                              type="primary"
                              plain
                            >完成</el-button>
                            <el-button
                              v-if="g.state!=1"
                              style="padding:7px 10px;font-size:17px;"
                              type="info"
                              disabled
                              plain
                            >已完成</el-button>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </div>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderNumber: 1,
      orderList: []
    };
  },
  methods: {
    finishOrder(id) {
      this.$axios
        .post(this.$store.state.httpUrl + "/editOrderStatus", {
          orderStatus: ++this.orderList[id].state,
          id: this.orderList[id].orderId
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code === 20000) {
            this.orderList[id].goodsList.forEach(i => {
              i.state = 2;
            });
            this.orderList[id].state = 2;
            this.$message({
              type: "success",
              message: "该订单菜品全部完成！"
            });
          } else {
            --this.orderList[id].state;
            this.$message({
              type: "error",
              message: "修改状态失败，请刷新后重试！"
            });
          }
        });
    },
    finishGoods(id, goodsId) {
      this.$axios
        .post(this.$store.state.httpUrl + "/editOrderGoodsStatus", {
          status: ++this.orderList[id].goodsList[goodsId].state,
          orderId: this.orderList[id].orderId,
          id: this.orderList[id].goodsList[goodsId].id
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code === 20000) {
            var n = true;
            this.orderList[id].goodsList[goodsId].state = 2;
            this.orderList[id].goodsList.forEach(r => {
              if (r.state == 1) {
                n = false;
              }
            });
            if (n) {
              this.finishOrder(id);
            }
            this.$message({
              type: "success",
              message: "该订单菜品全部完成！"
            });
          } else {
            --this.orderList[id].goodsList[goodsId].state;
            this.$message({
              type: "error",
              message: "修改状态失败，请刷新后重试！"
            });
          }
        });
    },
    getOrder() {
      this.$axios
        .get(this.$store.state.httpUrl + "/getOrderAdmin")
        .then(res => {
          console.log(res.data);
          if (res.data.code == 20000) {
            var n = 0;
            res.data.data.forEach(i => {
              this.orderList.push({
                orderId: i.order.id,
                time: i.order.orderPayTime,
                table: i.order.orderTable,
                state: i.order.orderStatus,
                goodsList: []
              });

              i.orderGoodsList.forEach(g => {
                this.orderList[n].goodsList.push({
                  id: g.id,
                  goodsId: g.goodsId,
                  img: g.goodsImage,
                  name: g.goodsName,
                  num: g.goodsNum,
                  state: g.status
                });
              });
              n++;
            });
          }
        })
        .catch(function(res) {
          console.log(res);
        });
    }
  },
  mounted() {
    this.getOrder();
  }
};
</script>

<style  scoped>
.g {
  color: rgb(12, 195, 12);
}
.r {
  color: red;
}
.el-collapse-head-6883 {
  background-color: blueviolet !important;
}
.el-collapse-item__header {
  background-color: blueviolet !important;
}
</style>