export default {
    name: "goodsList",
    data() {
      return {
        queryinfo: {
          currentPage: 1,
          keyword: "",
          pageSize: 10,
        },
        tableData: [],
        total: 0,
        dialog: {
          title: "",
          show: false,
        },
        newForm: {
        },
        rules: {
          name: [{ required: true, message: "请输入物资名", trigger: "blur" }],
        },
        types: [],
        data: [],
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
          .post("/goods/list/page/", this.queryinfo)
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
      //展开新建弹框
      newRole() {
        this.dialog = {
          title: "新建物资",
          show: true,
        };
      },
  
      //展开编辑弹框
      edit(id) {
        this.dialog = {
          title: "编辑物资",
          show: true,
        };
        this.$axios
          .get("/goods/loadDetail/" + id + "/")
          .then((res) => {
            this.newForm = res.data.goods;
          })
          .catch((err) => {
            console.log("报错了" + err);
          });
      },
      //保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios
              .post("/goods/save/", this.newForm)
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