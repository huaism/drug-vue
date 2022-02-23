export default {
  name: "dbBackLog",
  data() {
    return {
      queryinfo: {
        currentPage: 1,
        keyword: "",
        pageSize: 10,
      },
      tableData: [],
      total: 0,
      data: []
    };
  },
  created() {
    this.createParams();
  },
  methods: {
    //初始化数据
    createParams() {
      //加载列表
      this.$axios
        .post("/db/list/page/", this.queryinfo)
        .then((res) => {
          if (res.data != null && res.data != "") {
            this.tableData = res.data.records;
            this.total = res.data.total;
          } else {
            this.$message.error("获取列表失败！");
          }
        })
        .catch((err) => {
          console.log("报错了" + err);
        });
    }, 
    createDBBack() {
      this.$axios
        .get("/db/create/")
        .then((res) => {
          this.$message({
            type: "success",
            message: "数据库备份成功！目录为默认 C:/drug..",
          }); 
          this.createParams();
        })
        .catch((err) => {
          console.log("报错了" + err);
        });
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryinfo.pageSize = newSize;
      this.createParams();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      //console.log(newPage)
      this.queryinfo.currentPage = newPage;
      this.createParams();
    },
  },
};