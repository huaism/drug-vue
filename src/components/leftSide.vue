<template>
  <div class="left-side">
    <el-menu
      text-color="#fff"
      router
      :default-active="$route.path"
      class="menu-box"
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">数据中心</span>
      </el-menu-item>

      <el-submenu index="/drugstorage" v-has:DRUG_STORAGE>
        <template slot="title">
          <i class="el-icon-box"></i>
          <span>药库管理</span>
        </template>
        <el-menu-item index="/storage/list" v-has:STORAGE_LIST>药库库存</el-menu-item>
        <el-menu-item index="/storageLog/list" v-has:STORAGE_LOG_LIST>药库操作</el-menu-item>
      </el-submenu>

      <el-submenu index="/drugroom" v-has:DRUG_ROOM>
        <template slot="title">
          <i class="el-icon-s-shop"></i>
          <span>药房管理</span>
        </template>
        <el-menu-item index="/roomStorage/list" v-has:ROOM_STORAGE_LIST>药房库存</el-menu-item>
        <el-menu-item index="/roomStorageLog/list" v-has:ROOM_STORAGE_LOG_LIST>药房操作</el-menu-item>
        <el-menu-item index="/roomSend/list" v-has:ROOM_SEND_LIST>发药操作</el-menu-item>
      </el-submenu>

      <el-submenu index="/goods" v-has:GOODS>
        <template slot="title">
          <i class="el-icon-s-management"></i>
          <span>物资管理</span>
        </template>
        <el-menu-item index="/goods/list" v-has:GOODS_LIST>物资列表</el-menu-item>
        <el-menu-item index="/goodsStorage/list" v-has:GOODS_STORAGE_LIST>物资库存</el-menu-item>
        <el-menu-item index="/goodsStorageLog/list" v-has:GOODS_STORAGE_LOG_LIST>物资操作</el-menu-item>
      </el-submenu>

      <el-submenu index="/register" v-has:REGISTER>
        <template slot="title">
          <i class="el-icon-s-marketing"></i>
          <span>挂号管理</span>
        </template>
         <el-menu-item index="/register/list" v-has:REGISTER_LIST>挂号列表</el-menu-item>
      </el-submenu>

      <el-submenu index="/account" v-has:ACCOUNT>
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/account/accountList" v-has:USER_LIST
          >账号管理</el-menu-item
        >
        <el-menu-item index="/account/roleSetting" v-has:ROLE_LIST
          >角色设置</el-menu-item
        >
        <el-menu-item index="/account/addPermissions" v-has:PERMISSION_LIST
          >权限列表</el-menu-item
        >
         <el-menu-item index="/account/userLoginLog" v-has:LOGIN_LOG_LIST
          >登录日志</el-menu-item
        >
         <el-menu-item index="/account/dbBackLog" v-has:DB_BACK_LOG_LIST
          >数据库备份</el-menu-item
        >
      </el-submenu>

      <el-submenu index="/set" v-has:SETTING>
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>基础设置</span>
        </template>
         <el-menu-item index="/drug/list" v-has:DRUG_LIST>药品管理</el-menu-item>
         <el-menu-item index="/drugType/list" v-has:DRUG_TYPE_LIST>药品类型管理</el-menu-item>
         <el-menu-item index="/customerType/list" v-has:CUSTOMER_TYPE_LIST>客人类型管理</el-menu-item>
      </el-submenu>

    </el-menu>
  </div>
</template>
<script>
export default {
  name: "leftSide",
};
</script>
<style  scoped>
.collapse-btn {
  text-align: center;
  color: #fff;
  font-size: 25px;
  margin-top: 10px;
}
.left-side {
  position: absolute;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.menu-box {
  width: 200px;
  border-right: none;
  background: none;
}
.left-side >>> .el-menu {
  background: none;
}
.left-side >>> .el-menu-item:focus,
.left-side >>> .el-menu-item:hover,
.left-side >>> .el-submenu__title:hover {
  background: rgba(0, 0, 0, 0.2);
}
.left-side::-webkit-scrollbar {
  width: 0;
}
.left-side li i {
  color: #fff;
}
.el-menu-item.is-active {
  background: rgba(0, 0, 0, 0.2) !important;
}
</style>