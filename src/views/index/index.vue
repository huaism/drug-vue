<template>
  <div
    class="index-box"
    :style="{
      background: themeColor,
    }"
  >
    <headNav @changColor="updateColor" />
    <leftSide />
    <div class="mainbox">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in $route.meta.breadList" :key="index">
          <router-link v-if="item.url" :to="item.url">
            <b>{{ item.name }}</b>
          </router-link>
          <span v-else> <b>{{ item.name }}</b></span>
        </el-breadcrumb-item>
      </el-breadcrumb>

      <router-view />
    </div>
  </div>
</template>

<script  src="../../js/index/index.js"></script>

<style  scoped>
.index-box {
  width: 100%;
  height: 100%;
}
.mainbox {
  position: absolute;
  left: 200px;
  right: 0;
  top: 70px;
  bottom: 0;
  overflow-y: auto;
  background: #fff;
}
.breadcrumb{padding:20px 40px; font-size: 14px; background: #f6f6f6;}
</style>