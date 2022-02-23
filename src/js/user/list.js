export default {
  name: "accountList",
  data() {
    var checkName = (rule, value, callback) => {
      this.$axios
        .post("/user/checkName/", {
          id: this.userId,
          name: this.userForm.userName,
        })
        .then((res) => {
          if (res.data) {
            var index = res.data.code;
            if (value === "") {
              callback(new Error("请输入用户名"));
            } else if (index === 0) {
              callback(new Error("用户名重复"));
            } else {
              callback();
            }
          }
        })
        .catch((err) => {
          //请求失败后的处理函数
          console.log(err);
        });
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passwordForm.npsd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 获取用户列表的参数对象
      queryinfo: {
        currentPage: 1, //初始页
        pageSize: 10, //每页的数据
        keyword: "",
      },
      userId: "",
      tableData: [],
      total: 0,
      dialog: {
        title: "",
        show: false,
        option: "",
      },
      userForm: {
        id: "",
        userName: "",
        password: "",
        confirmPassword: "",
        empName: "",
        isEnable: "true",
        roleId: "",
        roleIds: [],
        departmentId: [],
      },
      departments: [],
      addDepartment: true,
      editDepartment: false,
      roles: [],
      userRules: {
        // userName: [{ required: true, validator: checkName, trigger: "blur" }],
        userName: [{ required: true, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "请输入6-20位字母和数字",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        empName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        roleId: [{ required: true, message: "请选择角色", trigger: "change" }],
      },
      changePasswordDialog: false,
      passwordForm: {
        id: "",
        npsd: "",
        nconfirmPsd: "",
      },
      passwordRules: {
        npsd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
        nconfirmPsd: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.createParams();
  },
  methods: {
    //初始化数据
    createParams() {
      this.$axios
        .post("/user/list/", this.queryinfo) //获取用户参数
        .then((res) => {
          //请求成功后的处理函数
          if (res.data != null && res.data != "") {
            this.tableData = res.data.records;

            this.tableData.forEach((item) => {
              let roleNameStr = "";
              item.roles.forEach((role) => {
                roleNameStr += role.name + " "; 
              })
              item.roleName = roleNameStr;
            })

            this.total = res.data.total;
          } else {
            this.$message.error("获取用户列表失败！");
          }
        })
        .catch((err) => {
          //请求失败后的处理函数
          console.log("报错了" + err);
        });
    },
    //搜索
    searchSubmit() {
      this.createParams();
    },
    //展示新建用户对话框
    handleAdd() {
      this.dialog = {
        title: "新建用户",
        show: true,
        option: "add",
      };
      //请求后台获取所有角色进行展示
      this.$axios
        .get("/role/list/")
        .then((res) => {
          //复制给前台
          this.roles = res.data;
        })
        .catch((err) => {
          //请求失败后的处理函数
          console.log("报错了" + err);
        });
    },
   
    //展示编辑用户对话框
    handleEdit(id) {
      this.userId = id;
      this.dialog = {
        title: "编辑用户",
        show: true,
        option: "edit",
      };
      this.$axios
        .get("/user/detail/" + id + "/")
        .then((res) => {
          //console.log(res.data);
          this.roles = res.data.roles;
          this.userForm = res.data.user;
        })
        .catch((err) => {
          console.log("报错了" + err);
        });
    },
    //是否启用账户
    userStateChanged(row) {
      if (row.isEnable) {
        this.$axios
          .get("/user/open/" + row.id + "/")
          .then((res) => {
            this.$message({
              type: "success",
              message: "账号已开启!",
            });
            this.createParams();
          })
          .catch((err) => {});
      } else {
        this.$axios
          .get("/user/close/" + row.id + "/")
          .then((res) => {
            this.$message({
              type: "success",
              message: "账号已停用!",
            });
            this.createParams();
          })
          .catch((err) => {});
      }
    },
    //保存账户
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.userForm.id = this.userId;
          this.userForm.roleIds = [];
          this.userForm.roleIds.push(this.userForm.roleId);
          this.$axios
            .post("/user/save/", this.userForm)
            .then((res) => {
              //console.log(this.userForm);
              this.$message({
                type: "success",
                message: "保存成功!",
              });
              this.dialog.show = false;
              this.createParams();
            })
            .catch((err) => {
              //请求失败后的处理函数
              console.log("报错了" + err);
            });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    //重置密码弹框
    cancelModal() {
      this.$refs.passwordForm.resetFields();
    },
    //新加部门
    newDepartment() {
      this.addDepartment = false;
      this.editDepartment = true;
    },
    //修改密码
    updatePasswordSubmit(formName) {
      this.changePasswordDialog = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.passwordForm.id = this.userId;
          this.$axios
            .post("/user/updatePassword/", this.passwordForm)
            .then((res) => {
              this.$message({
                type: "success",
                message: "修改成功!请使用新密码登录账号",
              });
              this.changePasswordDialog = false; //隐藏页面
              this.passwordForm.npsd = "";
              this.passwordForm.nconfirmPsd = "";
            })
            .catch((err) => {
              //请求失败后的处理函数
              console.log("报错了" + err);
            });
        }
      });
    },
    //新建、编辑对话框初始化数据
    addDialogClosed() {
      this.$refs.userForm.resetFields();
      this.userForm = {
        id: "",
        userName: "",
        password: "",
        confirmPassword: "",
        empName: "",
        isEnable: "true",
        roleId: "",
        roleIds: [],
        departmentId: [],
      };
      this.userId = "";
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