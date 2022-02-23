<template>
      <el-row :span="18"> 
          <el-col :span="6"> <ve-pie :data="storageChartData" :settings="chartSettings"></ve-pie><span style="text-align:center; display:block;font-weight:bold;">  药库库存 </span> </el-col>
          
          <el-col :span="6">  <ve-pie :data="roomStorageChartData" :settings="chartSettings"></ve-pie><span style="text-align:center; display:block;font-weight:bold;">  药房库存 </span></el-col>
          
          <el-col :span="6">  <ve-pie :data="goodsStorageChartData" :settings="chartSettings"></ve-pie><span style="text-align:center; display:block;font-weight:bold;">  物资库存 </span></el-col>
      </el-row>
</template>



<script>

  export default {
    data () {
      this.chartSettings = {
        dataType: 'normal',
      }
      return {
        storageChartData: {
          columns: ['drugName', 'stockNum'],
          rows: [
          ]
        },
        roomStorageChartData: {
          columns: ['drugName', 'stockNum'],
          rows: [
          ]
        },
        goodsStorageChartData: {
          columns: ['goodsName', 'stockNum'],
          rows: [
          ]
        }
      }
    },
    created() {
      this.createParams();
    },
    methods: {
      //初始化数据
      createParams() {
        //加载药库列表
        this.$axios
          .get("/storage/list/charts/")
          .then((res) => {
            if (res.data != null && res.data != "") {
              res.data.forEach((item) => {
                   let storageChartDetail = {drugName:'', stockNum:''};
                   storageChartDetail.drugName = item.drugName;
                   storageChartDetail.stockNum = item.stockNum;
                  this.storageChartData.rows.push(storageChartDetail);
              })
            } else {
              this.$message.error("获取列表失败！");
            }
          })
          .catch((err) => {
            console.log("报错了" + err);
          });

        //加载药房列表
        this.$axios
          .get("/roomStorage/list/charts/")
          .then((res) => {
            if (res.data != null && res.data != "") {
              res.data.forEach((item) => {
                   let detail = {drugName:'', stockNum:''};
                   detail.drugName = item.drugName;
                   detail.stockNum = item.stockNum;
                  this.roomStorageChartData.rows.push(detail);
              })
            } else {
              this.$message.error("获取列表失败！");
            }
          })
          .catch((err) => {
            console.log("报错了" + err);
          });

        //加载物资列表
        this.$axios
          .get("/goodsStorage/list/charts/")
          .then((res) => {
            if (res.data != null && res.data != "") {
              res.data.forEach((item) => {
                   let detail = {goodsName:'', stockNum:''};
                   detail.goodsName = item.goodsName;
                   detail.stockNum = item.stockNum;
                  this.goodsStorageChartData.rows.push(detail);
              })
            } else {
              this.$message.error("获取列表失败！");
            }
          })
          .catch((err) => {
            console.log("报错了" + err);
          });
      },
    }
  }
</script>