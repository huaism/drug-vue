export default {
  name: "roleSetting",
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
      newRoleForm: {
        id: "",
        name: "",
        description: "",
      },
      rules: {
        name: [{ required: true, message: "请输入角色名", trigger: "blur" }],
      },
      moduleVisible: false,
      roleId: "",
      serachVisible: false,
      defaultProps: {
        children: "children",
        label: "name",
      },
      data: [],
      defaultCheckedKeys: [], // 保存节点的数组, 控制节点是否被选中, 并保存权限ID, 后台传输数据
      treeData: [],
      searchData: [],
      viewData: [],
      permissionId: "",
    };
  },
  created() {
    this.createParams();
  },
  methods: {
    //初始化数据
    createParams() {
      //加载角色列表
      this.$axios
        .post("/role/list/page/", this.queryinfo)
        .then((res) => {
          if (res.data != null && res.data != "") {
            this.tableData = res.data.records;
            this.total = res.data.totalElements;
          } else {
            this.$message.error("获取角色列表失败！");
          }
        })
        .catch((err) => {
          console.log("报错了" + err);
        });
    },
    //展开新建角色弹框
    newRole() {
      this.dialog = {
        title: "新建角色",
        show: true,
      };
    },

    //展开编辑角色弹框
    edit(id) {
      this.dialog = {
        title: "编辑角色",
        show: true,
      };
      this.$axios
        .get("/role/loadDetail/" + id + "/")
        .then((res) => {
          this.newRoleForm = res.data;
        })
        .catch((err) => {
          console.log("报错了" + err);
        });
    },
    //保存角色弹框
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/role/save/", this.newRoleForm)
            .then((res) => {
              if (res.data != null && res.data != "") {
                this.$message({
                  type: "success",
                  message: "角色保存成功！",
                });
                this.dialog.show = false;
                this.createParams();
              } else {
                this.$message.error("角色保存失败！");
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
    //关闭角色弹框
    addDialogClosed() {
      this.$refs.newRoleForm.resetFields();
      //初始化数据
      this.newRoleForm = {
        id: "",
        name: "",
        description: "",
      };
    },
    //展开权限管理弹框
    handleModule(role) {
      this.moduleVisible = true;
      this.roleId = role.id;
      this.data = [];
      this.firstNode();
    },
    //获取父节点
    firstNode() {
      this.$axios
        .post("/role/loadPermission/", {
          roleId: this.roleId,
        })
        .then((res) => {
          this.data = res.data.permissions;
          this.defaultCheckedKeys = res.data.entityIds;
        })
        .catch((err) => {
          console.log("报错了" + err);
        });
    },
    //获取子节点
    childNode(node, resolve) {
      this.$axios
        .post("/role/loadPermission/", {
          roleId: this.roleId,
          permissionId: node.data.id,
        })
        .then((res) => {
          //console.log(res.data);
          this.defaultCheckedKeys = res.data.entityIds;
          node.data.children = res.data.permissions;
          resolve(res.data.permissions);
        })
        .catch((err) => {
          console.log("报错了" + err);
        });
    },
    //加载权限管理树数据
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve(this.data);
      } else {
        this.childNode(node, resolve);
      }
    },
    //选中父节点展开子节点
    checkDefaultCheckedKeys() {
      var keys = this.$refs.tree.getCheckedKeys();
      this.defaultCheckedKeys = keys;
    },
    //保存权限管理数据
    submitPermissionForm() {
      this.defaultCheckedKeys = this.$refs.tree.getCheckedKeys();
      this.$axios
        .post("/role/saveRolePermission/", {
          roleId: this.roleId,
          permissionIds: this.defaultCheckedKeys,
        })
        .then((res) => {
          //请求成功后的处理函数;
          this.$message({
            type: "success",
            message: "保存成功!",
          });
          this.createParams();
          this.moduleVisible = false;
        })
        .catch((err) => {
          this.$message.error("保存失败！");
        });
    },
    //关闭权限管理对话框
    premissionDialogClosed() {
      this.defaultCheckedKeys = [];
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