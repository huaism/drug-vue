<template>
  <div>
    <header class="header-nav">
      <el-row>
        <el-col :span="6" class="head-logo">
          <span class="head-title">药品后台管理系统</span>
        </el-col>
        <el-col :span="6" class="head-user" :offset="12">
          <el-dropdown @command="setInfor">
            <span class="el-dropdown-link">
              {{ user.username }}
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logOut">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="theme-box">
            <span class="icon"
              ><img src="../assets/theme-icon.png" alt=""
            /></span>
            <el-color-picker
              v-model="color"
              class="picColor"
              show-alpha
              size="small"
              :predefine="predefineColors"
              @change="changeTheme(color)"
            >
            </el-color-picker>
          </div>
        </el-col>
      </el-row>
    </header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "headerNav",
  data() {
    var validateOldPass = (rule, value, callback) => {
      this.$axios
        .post("/index/validateOldPassword/", {
          id: this.user.id,
          old: this.changePasswordForm.old,
        })
        .then((res) => {
          if (value === "") {
            return callback(new Error("请输入密码"));
          } else {
            if (res.data != 1) {
              return callback(new Error("当前输入密码不是当前用户密码!"));
            } else {
              callback();
            }
          }
        })
        .catch((err) => {
          //请求失败后的处理函数
         console.log("报错了" + err);
        });
    };
    var validateNewPass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入新密码"));
      } else if (value === this.changePasswordForm.old) {
        return callback(new Error("新密码不能与旧密码一致!"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入确认密码"));
      } else if (value !== this.changePasswordForm.newPassword) {
        return callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      changePasswordVisible: false,
      color: "",
      predefineColors: [
        "#29374c",
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
      ],
      changePasswordForm: {
        id: this.$store.state.user.id,
        old: "",
        newPassword: "",
        confirm: "",
      },
      passwordRules: {
        old: [{ required: true, validator: validateOldPass, trigger: "blur" }],
        newPassword: [
          { required: true, validator: validateNewPass, trigger: "blur" },
        ],
        confirm: [{ required: true, validator: validatePass, trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    this.createParams();
  },
  methods: {
    //初始化主题数据
    createParams() {
      // const id = this.$store.state.user.id;
      const id = JSON.parse(localStorage.getItem("auth-user")).id;
      this.$axios
        .get("/user/get/")
        .then((res) => {
          if (res.data != null && res.data != "") {
            if (res.data.theme == null || res.data.theme == "") {
              this.color = "#29374c";
            } else {
              this.color = res.data.theme;
            }
          }
        })
        .catch((err) => {
          console.log("报错了" + err);
        });
    },
    //切换主题颜色
    changeTheme(color) {
      this.$emit("changColor", color);
    },
    //下拉框跳转
    setInfor(cmdItem) {
      switch (cmdItem) {
        case "changePassword":
          this.changePassword();
          break;
        case "logOut":
          this.logOut();
          break;
      }
    },
    //展开修改密码弹框
    changePassword() {
      this.changePasswordVisible = true;
    },
    //关闭修改密码弹框
    cancelDialog() {
      this.$refs.changePasswordForm.resetFields();
    },
    //保存修改密码
    updatePasswordSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //console.log(this.changePasswordForm);
          this.$axios
            .post("/index/updateUserPassword", this.changePasswordForm)
            .then((res) => {
              console.log(this.changePasswordForm);
              if (res.data != null && res.data != "") {
                this.$message({
                  type: "success",
                  message: "修改成功！",
                });
                this.changePasswordVisible = false;
              }
            })
            .catch((err) => {
              console.log("报错了" + err);
            });
        } else {
          this.$alert("submit error!");
        }
      });
    },
    //退出
    logOut() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.header-nav {
  width: 100%;
}
.head-logo span.head-title {
  display: inline-block;
  margin-left: 10px;
  color: #fff;
  font-size: 20px;
  line-height: 70px;
  vertical-align: top;
  font-weight: bold;
  margin-left: 20px;
}
.head-logo img {
  width: 129px;
  height: 40px;
  margin-left: 20px;
  margin-top: 15px;
  display: inline-block;
  vertical-align: top;
}
.head-user {
  text-align: right;
}
.head-user span {
  color: #fff;
  font-size: 14px;
  line-height: 69px;
  display: inline-block;
  margin-right: 20px;
}
.picColor {
  top: 10px;
}
.picColor >>> .el-color-picker__trigger {
  border: 0;
}
.theme-box {
  display: inline-block;
  color: #fff;
  font-size: 14px;
  vertical-align: middle;
  margin-right: 20px;
}
.theme-box span {
  display: inline-block;
  margin-right: 5px;
}
.theme-box span.icon {
  position: relative;
  top: 9px;
}
.theme-box span.icon img {
  width: 28px;
  height: 28px;
}
</style>