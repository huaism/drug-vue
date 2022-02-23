<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    const isAutnenticated = localStorage.getItem("auth-user"); //获取授权
    if (isAutnenticated) {
      //判断是否授权
      const user = JSON.parse(localStorage.getItem("auth-user")); //获取用户
      this.$store.dispatch("setIsAutnenticated", true);
      this.$store.dispatch("setUser", user);
    } else {
      console.log("请登录！");
    }
  },
};

</script>
<style>
</style>
