export default {
    name: "roomSendList",
    data() {
      return {
        queryinfo: {
          currentPage: 1,
          pageSize: 10,
          drugName: null,
          customerName: null,
          customerNo : null
        },
        tableData: [],
        total: 0,
        drugs : [],
        registers : [],
        dialog: {
          title: "",
          show: false,
        },
        newForm: {
          roomSendRequestDrugs:[],
        },
        
        rules: {
          registerId : [{ required: true, message: "请选择挂号病人", trigger: "blur" }],
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
          .post("/roomSend/list/page/", this.queryinfo)
          .then((res) => {
            if (res.data != null && res.data != "") {
              this.tableData = res.data.records;
              this.total = res.data.total;
            }
          }).catch((err) => {
            console.log("报错了" + err);
          });
      },

      //展开新建弹框
      newObj() {

        this.$axios
          .get("/drug/list/")
          .then((res) => {
            this.drugs = res.data;
          })
          .catch((err) => {
            console.log("报错了" + err);
          });

          this.$axios
          .get("/register/list/")
          .then((res) => {
            this.registers = res.data;
          })
          .catch((err) => {
            console.log("报错了" + err);
          });

          this.newForm.roomSendRequestDrugs = [];
          let newRoomSendRequestDrug = {
            drugId: '',
            num: '',
          };
          this.newForm.roomSendRequestDrugs.push(newRoomSendRequestDrug);
  
          this.dialog = {
            title: "新建发药操作",
            show: true,
          };

      },
  

      //取消弹框
      cancelForm() {
        this.dialog.show = false;
        this.newForm.roomSendRequestDrugs = [];
      },

      //保存弹框
      submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios
              .post("/roomSend/save/check", this.newForm)
              .then((res) => {
                if (res.data != null && res.data != "") {
                  if(res.data != "success") {
                    this.$message.error(res.data);
                  }else if(res.data == "success"){
                    this.$axios
                    .post("/roomSend/save/", this.newForm)
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


      //添加药品
    addDrug() {
      let newRoomSendRequestDrug = {
        drugId: '',
        num: '',
      };
      this.newForm.roomSendRequestDrugs.push(newRoomSendRequestDrug);
    },
    //删除药品
    removeDrug(index, drug) {
      this.newForm.roomSendRequestDrugs.splice(index, 1)
    },

      //关闭弹框
      addDialogClosed() {
        this.$refs.newForm.resetFields();
        //初始化数据
        this.newForm = {
          roomSendRequestDrugs:[],
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