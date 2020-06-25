<template>
  <div style="font-family:Franklin Gothic Medium;padding:25px 50px;">
    <div style="box-shadow:0 0 3px 1px #ccc;background-color:#fff;padding:20px 0px;border-radius: 10px;">
      <div
        style="padding:0px 20px;display:flex;align-items:center;margin-top: 5px;margin-bottom:30px;"
      >
        <div style="margin-right:5px;">
          <i style="font-size:20px;" class="el-icon-s-custom"></i>
        </div>
        <div style="font-size: 16px;font-weight: 700;">查看营业数据</div>
      </div>
      <hr
        style="width:100%;color: rgb(236, 236, 236);border:none;border-top:2px solid;margin-bottom: 25px "
      />

      <div style="padding:0px 20px;margin-bottom:30px;" class="block">
        <el-date-picker
          v-model="data"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>

      <div style="padding:0px 20px;">
        <el-table stripe :data="sellTable" border style="width: 100%" >
          <el-table-column prop="data" label="日期" align="center"></el-table-column>
          <el-table-column prop="discountTurnover" label="优惠营业额" align="center"></el-table-column>
          <el-table-column prop="countTurnover" label="总营业额" align="center"></el-table-column>
          <el-table-column prop="orderNum" label="订单数" align="center"></el-table-column>
          <el-table-column prop="foodNum" label="菜品数" align="center"></el-table-column>
          <el-table-column prop="orderTime" label="平均订单完成时间" align="center"></el-table-column>
          <el-table-column prop="foodTime" label="平均菜品完成时间" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: "",
      data: "",
      sellTable: [
        {
          id: 1,
          data: "2016-05-02",
          discountTurnover: "793",
          countTurnover: "832",
          orderNum: "12",
          foodNum: "30",
          orderTime: "40.5",
          foodTime: "12.4"
        },
        {
          id: 1,
          data: "2016-05-02",
          discountTurnover: "793",
          countTurnover: "832",
          orderNum: "12",
          foodNum: "30",
          orderTime: "40.5",
          foodTime: "12.4"
        },
        {
          id: 1,
          data: "2016-05-02",
          discountTurnover: "793",
          countTurnover: "832",
          orderNum: "12",
          foodNum: "30",
          orderTime: "40.5",
          foodTime: "12.4"
        },
        {
          id: 1,
          data: "2016-05-02",
          discountTurnover: "793",
          countTurnover: "832",
          orderNum: "12",
          foodNum: "30",
          orderTime: "40.5",
          foodTime: "12.4"
        },
        {
          id: 1,
          data: "2016-05-02",
          discountTurnover: "793",
          countTurnover: "832",
          orderNum: "12",
          foodNum: "30",
          orderTime: "40.5",
          foodTime: "12.4"
        },
        {
          id: 1,
          data: "2016-05-02",
          discountTurnover: "793",
          countTurnover: "832",
          orderNum: "12",
          foodNum: "30",
          orderTime: "40.5",
          foodTime: "12.4"
        },
        {
          id: 1,
          data: "2016-05-02",
          discountTurnover: "793",
          countTurnover: "832",
          orderNum: "12",
          foodNum: "30",
          orderTime: "40.5",
          foodTime: "12.4"
        },
        {
          id: 1,
          data: "2016-05-02",
          discountTurnover: "793",
          countTurnover: "832",
          orderNum: "12",
          foodNum: "30",
          orderTime: "40.5",
          foodTime: "12.4"
        },
        {
          id: 1,
          data: "2016-05-02",
          discountTurnover: "793",
          countTurnover: "832",
          orderNum: "12",
          foodNum: "30",
          orderTime: "40.5",
          foodTime: "12.4"
        },
        {
          id: 1,
          data: "2016-05-02",
          discountTurnover: "793",
          countTurnover: "832",
          orderNum: "12",
          foodNum: "30",
          orderTime: "40.5",
          foodTime: "12.4"
        },
        {
          id: 1,
          data: "2016-05-02",
          discountTurnover: "793",
          countTurnover: "832",
          orderNum: "12",
          foodNum: "30",
          orderTime: "40.5",
          foodTime: "12.4"
        },
        {
          id: 1,
          data: "2016-05-02",
          discountTurnover: "793",
          countTurnover: "832",
          orderNum: "12",
          foodNum: "30",
          orderTime: "40.5",
          foodTime: "12.4"
        },
        {
          id: 1,
          data: "2016-05-02",
          discountTurnover: "793",
          countTurnover: "832",
          orderNum: "12",
          foodNum: "30",
          orderTime: "40.5",
          foodTime: "12.4"
        },
        {
          id: 1,
          data: "2016-05-02",
          discountTurnover: "793",
          countTurnover: "832",
          orderNum: "12",
          foodNum: "30",
          orderTime: "40.5",
          foodTime: "12.4"
        },
        {
          id: 3,
          data: "2016-05-02",
          discountTurnover: "793",
          countTurnover: "832",
          orderNum: "12",
          foodNum: "30",
          orderTime: "40.5",
          foodTime: "12.4"
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>