<template>

  <div class="login">
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="false"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>

    <div class="login-box">
      <el-card class="box-card">
        <h2>药店/房后台管理系统</h2>
        <el-form
          :model="loginUser"
          :rules="loginRules"
          ref="loginForm"
          class="loginForm"
        >
          <el-form-item prop="username">
            <el-input v-model="loginUser.username" placeholder="请输入用户名">
              <i slot="prepend" class="el-icon-user-solid"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginUser.password"
              placeholder="请输入密码"
            >
              <i slot="prepend" class="el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item style="height: 30px; margin-top: -20px">
            <el-divider></el-divider>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('loginForm')"
              class="login-btn"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script  src="../../js/login/login.js"></script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: #324157;
  position: fixed;
}

.login-box {
  width: 100%;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  bottom: 0;
  margin-top: -190px;
}

.login-box h2 {
  color: #dcdcdc;
  font-size: 35px;
  text-align: center;
  letter-spacing: 3px;
  border-radius: 10px 10px 0 0;
  padding: 15px 0;
}

.loginForm {
  padding: 25px 0px 0px 0px;
}

.loginForm >>> .el-input__inner {
  height: 52px;
  background: #29374c;
  border: none;
  color: #dcdcdc;
  font-size: 16px;
}

.loginForm >>> .el-input-group__prepend {
  height: 50px;
  background: #29374c;
  border: none;
  color: #dcdcdc;
}

.loginForm >>> .el-divider {
  background: #5c667d;
}

.login-btn {
  font-size: 16px;
  letter-spacing: 1px;
  width: 100%;
  background: #20b2aa;
}
.box-card {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 480px;
  margin: 0 auto;
}
/* 旧版CSS 最后确认用哪版后 删除无用样式*/
/* .login {
        width: 100%;
        height: 100%;
        background: #0083d3;
        position: fixed;
    }

    .login-box {
        width: 500px;
        margin: -140px auto 0;
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
    }

    .login-box h2 {
        color: #2a2929;
        font-size: 20px;
        text-align: center;
        background: #fff;
        border-radius: 10px 10px 0 0;
        padding: 15px 0;
    }

    .loginForm {
        background: #02befe;
        border-radius: 0 0 10px 10px;
        padding: 30px 60px 10px 60px;
    }

    .login-btn {
        background: #ff7fbc;
    }

    .label-width {
        width: 60px;
        background: #fff;
    } */
</style>