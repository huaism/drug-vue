import headNav from "@/components/headNav";
import leftSide from "@/components/leftSide";
export default {
  name: "index",
  components: {
    headNav,
    leftSide,
  },
  data() {
    return {
      themeColor: "",
      breadList: null,
    };
  },
  created() {
    this.createParams();
  },

  methods: {
    //初始化主题数据
    createParams() {
      const id = JSON.parse(localStorage.getItem("auth-user")).id;
      this.$axios
        .get("/user/get/")
        .then((res) => {
          if (res.data != null && res.data != "") {
            if (res.data.theme == null || res.data.theme == "") {
              this.themeColor = "#29374c";
            } else {
              this.themeColor = res.data.theme;
            }
          }
        })
        .catch((err) => {
          console.log("报错了" + err);
        });
    },
    //修改主题颜色
    updateColor(updateColor) {
      this.$axios
        .post("/user/updateTheme/", {
          id: JSON.parse(localStorage.getItem("auth-user")).id,
          theme: updateColor,
        })
        .then((res) => {
          if (res.data != null && res.data != "") {
            this.$message({
              type: "success",
              message: "主题修改成功！",
            });
            this.themeColor = updateColor;
            this.createParams();
          }
        })
        .catch((err) => {
          console.log("报错了" + err);
        });
    },
  },
};