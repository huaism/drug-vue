
import { mapGetters } from "vuex";
export default {
  name: "login",
  data() {
    return {
      loginUser: {
        username: "admin",
        password: "123456",
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["bgColor", "themeUser"]),
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var fd = new FormData();
          fd.append("username", this.loginUser.username);
          fd.append("password", this.loginUser.password);
          this.$axios
            .post("/user/login/", fd)
            .then((res) => {
              if (res.data != null && res.data != "") {
                this.$store.dispatch("setIsAutnenticated", true); //token存储到vuex
                //请求成功后的处理函数  
                if(res.data != null && res.data != ""){
                    this.logining = false;
                    //如果返回成功则获取userInfo
                    this.$axios.post(
                        '/user/info/'
                    )
                    .then(res => {
                        const user = res.data;
                        localStorage.setItem("auth-user", JSON.stringify(user));
                        this.$store.dispatch("setUser", user); //user存储到vuex
                        
                        this.$router.push({path: '/index'});
                    }).catch(err => {//请求失败后的处理函数   
                        console.log(err);
                        this.logining = false;
                    });
                } else {
                    this.$alert('账号或密码错误', '提示', {
                    confirmButtonText: 'ok'
                })}
              }
            })
            .catch((err) => {
              this.$message({
                message: "账号或密码错误",
                type: "warning",
              });
            });
        } else {
          return false;
        }
      });
    },
  },
};