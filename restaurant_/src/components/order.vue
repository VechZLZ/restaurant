<template>
  <div style="font-family:Franklin Gothic Medium;padding:25px 40px;">
    <div
      style="box-shadow:0 0 3px 1px #ccc;background-color:#fff;padding:20px 0px;border-radius: 10px;"
    >
      <div
        style="padding:0px 20px;display:flex;align-items:center;margin-top: 5px;margin-bottom:30px;"
      >
        <div style="margin-right:5px;">
          <i style="font-size:20px;" class="el-icon-s-custom"></i>
        </div>
        <div style="font-size: 16px;font-weight: 700;">查看订单</div>
      </div>
      <hr
        style="width:100%;color: rgb(236, 236, 236);border:none;border-top:2px solid;margin-bottom:25px;"
      />
      <div style="margin-bottom:30px;padding:0px 20px;">
        <el-input style="width:250px;" placeholder="请输入订单号" v-model="order" clearable></el-input>
      </div>
      <div style="padding:0px 20px;">
        <el-table row-key="orderId" stripe :data="orderTable" border style="width: 100%;">
          <el-table-column prop="time" label="时间" align="center"></el-table-column>
          <el-table-column prop="order" label="订单号" align="center" min-width="90px"></el-table-column>
          <el-table-column prop="customer" label="顾客" align="center"></el-table-column>
          <el-table-column prop="table" label="桌号" align="center" width="80px"></el-table-column>
          <el-table-column prop="count" label="总价（元）" align="center"></el-table-column>
          <el-table-column prop="discount" label="折后（元）" align="center"></el-table-column>
          <el-table-column prop="state" label="状态" align="center" width="130px">
            <template slot-scope="scope1">
              <div
                v-if="orderTable[scope1.$index].state==1"
                style="color:#f56c6c;padding-right:20px;"
              >正在制作...</div>
              <el-cascader
                v-if="orderTable[scope1.$index].state!=1"
                @change="editState(scope1.$index)"
                v-model="orderTable[scope1.$index].state"
                :options="state"
              ></el-cascader>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="90px">
            <template slot-scope="scope">
              <el-button
                @click.prevent="deleteOrder(scope.$index, orderTable)"
                type="danger"
                size="mini"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: [
        {
          value: 2,
          label: "等待上菜"
        },
        {
          value: 3,
          label: "已完成"
        }
      ],
      order: "",
      orderTable: []
    };
  },
  methods: {
    editState(id) {
      this.$axios.defaults.headers.post["Content-Type"] = "application/json";
      this.$axios
        .post(this.$store.state.httpUrl + "/editOrderStatus", {
          orderStatus: parseInt(this.orderTable[id].state),
          id: this.orderTable[id].orderId
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code === 20000) {
            this.$message({
              type: "success",
              message: "修改状态成功！"
            });
          } else if (res.data.code === 20001) {
            this.$message({
              type: "error",
              message: "修改状态失败，系统错误！"
            });
            this.getMenu();
          } else if (res.data.code === 20001) {
            this.$message({
              type: "error",
              message: "修改状态失败，登录过期，请重新登录！"
            });
            this.getMenu();
          }
        });
    },
    deleteOrder(id, rows) {
      this.$confirm("是否确定删除此订单？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get(
              this.$store.state.httpUrl +
                "/deleteOrder?id=" +
                this.orderTable[id].orderId
            )
            .then(res => {
              console.log(res.data);
              if (res.data.code === 20000) {
                this.dialogFormVisible = false;
                this.$message({
                  type: "success",
                  message: "删除成功！"
                });
                rows.splice(id, 1);
              } else if (res.data.code === 20001) {
                this.$message({
                  type: "error",
                  message: "删除失败，系统错误！"
                });
                this.getOrder();
              } else if (res.data.code === 20001) {
                this.$message({
                  type: "error",
                  message: "删除失败，登录过期，请重新登录！"
                });
                this.getOrder();
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
    getOrder() {
      if (this.orderTable) {
        this.orderTable = [];
      }
      this.$axios
        .get(this.$store.state.httpUrl + "/getOrderAdmin")
        .then(res => {
          console.log(res.data);
          res.data.data.forEach(i => {
            if (i.order.orderType == 1) {
              this.orderTable.push({
                id: 1,
                orderId: i.order.id,
                time:
                  new Date(i.order.orderPayTime)
                    .toLocaleDateString()
                    .replace(/\//g, "-") +
                  " " +
                  new Date(i.order.orderPayTime).toTimeString().substr(0, 8),
                table: i.order.orderTable,
                state: i.order.orderStatus,
                order: i.order.id,
                customer: i.order.userName,
                count: i.order.orderCountOriginal,
                discount: i.order.orderCountActual
              });
            }
          });
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

<style scoped>
</style>