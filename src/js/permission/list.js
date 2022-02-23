export default {
  name: "addPermissions",
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
      limitForm: {
        description: "",
        id: "",
        name: "",
        parentId: "",
        typeId: "",
        url: "",
      },
      rules: {
        name: [{ required: true, message: "请输入权限名", trigger: "blur" }],
        typeId: [
          { required: true, message: "请输入权限类型", trigger: "change" },
        ],
      },
      parents: [],
      permissionId: "",
    };
  },
  created() {
    this.createParams();
  },
  methods: {
    //初始化数据
    createParams() {
      this.$axios
        .post("/permission/list/", this.queryinfo)
        .then((res) => {
          if (res.data != null && res.data != "") {
            this.tableData = res.data.records;
            this.total = res.data.total;
          } else {
            this.$message.error("获取模块权限列表失败！");
          }
        })
        .catch((err) => {
          console.log("报错了" + err);
        });
    },
    //展开新增权限弹框
    newPermission() {
      this.dialog = {
        title: "新增权限",
        show: true,
      };
      this.$axios
        .get("/permission/detail/")
        .then((res) => {
          console.log(res.data);
          this.parents = res.data;
        })
        .catch((err) => {
          console.log("报错了" + err);
        });
    },

    //展开编辑权限弹框
    edit(id) {
      this.dialog = {
        title: "编辑权限",
        show: true,
      };
      this.$axios
        .get("/permission/detail/" + id + "/")
        .then((res) => {
          this.limitForm = res.data.permission;
          this.parents = res.data.permissions;
        })
        .catch((err) => {
          console.log("报错了" + err);
        });
    },

    //保存权限弹框
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/permission/save/", this.limitForm)
            .then((res) => {
              if (res.data != null && res.data != "") {
                this.$message({
                  type: "success",
                  message: "权限保存成功！",
                });
                this.dialog.show = false;
                this.createParams();
              } else {
                this.$message.error("权限保存失败！");
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
    //取消权限弹框
    addDialogClosed() {
      this.$refs.limitForm.resetFields();
      //初始化数据
      this.limitForm = {
        description: "",
        id: "",
        name: "",
        parentId: "",
        typeId: "",
        url: "",
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