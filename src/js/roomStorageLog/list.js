export default {
    name: "roomStorageLogList",
    data() {
      return {
        queryinfo: {
          currentPage: 1,
          drugName: "",
          typeId: "",
          pageSize: 10,
        },
        tableData: [],
        total: 0,
        drugs : [],
        types : [],
        dialog: {
          title: "",
          show: false,
        },
        newForm: {
        },
        rules: {
          drugId: [{ required: true, message: "请选择药品", trigger: "blur" }],
          operatorType: [{ required: true, message: "请选择操作类型", trigger: "blur" }],
          num: [{ required: true, message: "请输入数量", trigger: "blur" }],
        },
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
          .post("/roomStorageLog/list/page/", this.queryinfo)
          .then((res) => {
            if (res.data != null && res.data != "") {
              this.tableData = res.data.records;
              this.total = res.data.total;

              // 获取type
              this.$axios
              .get("/roomStorageLog/typeList/")
              .then((res) => {
                if (res.data != null && res.data != "") {
                  this.types = res.data;
                } else {
                  this.$message.error("获取列表失败！");
                }
              })
              .catch((err) => {
                console.log("报错了" + err);
              });

            } else {
              this.$message.error("获取列表失败！");
            }
          })
          .catch((err) => {
            console.log("报错了" + err);
          });
      },

      //展开新建弹框
      newObj() {
        this.dialog = {
          title: "新建药库操作",
          show: true,
        };
        this.$axios
          .get("/drug/list/")
          .then((res) => {
            this.drugs = res.data;
          })
          .catch((err) => {
            console.log("报错了" + err);
          });

          this.$axios
          .get("/roomStorageLog/typeList/")
          .then((res) => {
            this.types = res.data;
          })
          .catch((err) => {
            console.log("报错了" + err);
          });
      },
  
      //保存弹框
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios
              .post("/roomStorageLog/save/check", this.newForm)
              .then((res) => {
                if (res.data != null && res.data != "") {
                  if(res.data != "success") {
                    this.$message.error(res.data);
                  }else if(res.data == "success"){
                    this.$axios
                    .post("/roomStorageLog/save/", this.newForm)
                    .then((res) => {
                      if (res.data != null && res.data != "") {
                        this.$message({
                          type: "success",
                          message: "保存成功！",
                        });
                        this.dialog.show = false;
                        this.createParams();
                      } else {
                        this.$message.error("保存失败！");
                      }
                    })
                    .catch((err) => {
                      console.log("报错了" + err);
                    });
                  }
                } else {
                  this.$message.error("保存失败！");
                }
              })
              .catch((err) => {
                console.log("报错了" + err);
              });
          } else {
            console.log("error submit!");
            return false;
          }
        });
      },
      //关闭弹框
      addDialogClosed() {
        this.$refs.newForm.resetFields();
        //初始化数据
        this.newForm = {
        };
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