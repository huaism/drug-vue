<template>
  <div class="accout-wrap">
    <el-card>
      <!--搜索和添加区域-->
      <el-row :gutter="20" class="alist-top">
        <el-col :span="8">
          <el-input
            placeholder="请输入账号ID/登录邮箱/姓名"
            v-model="queryinfo.keyword"
            @change="searchSubmit"
            clearable
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="handleAdd()">+新建账号</el-button>
        </el-col>
      </el-row>

      <!--用户列表区域-->
      <el-table :data="tableData" class="table-box" border>
        <el-table-column label="账号ID" align="center" prop="id">
        </el-table-column>
        <el-table-column label="用户名" align="center" prop="username">
        </el-table-column>
        <el-table-column label="昵称" align="center" prop="empName">
        </el-table-column>
        <el-table-column label="角色" align="center" prop="roleName">
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createDate">
        </el-table-column>
        <el-table-column label="是否启用" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isEnable"
              @change="userStateChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip placement="bottom">
              <el-button
                type="primary"
                size="mini"
                class="el-icon-edit"
                @click="handleEdit(scope.row.id)"
              ></el-button>
              <div slot="content">编辑</div>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!--分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryinfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="pagination"
      >
      </el-pagination>
    </el-card>

    <!-- 添加和修改用户对话框 -->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      center
      width="40%"
      @closed="addDialogClosed"
    >
      <el-form
        :model="userForm"
        :rules="userRules"
        ref="userForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="userForm.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          v-if="dialog.option == 'add'"
        >
          <el-input
            v-model="userForm.password"
            placeholder="请输入密码(6-20位字母和数字)"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="confirmPassword"
          v-if="dialog.option == 'add'"
        >
          <el-input
            v-model="userForm.confirmPassword"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="dialog.option == 'edit'">
          <el-button @click="changePasswordDialog = true">修改密码</el-button>
        </el-form-item>
        <el-form-item label="昵称" prop="empName">
          <el-input
            v-model="userForm.empName"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="isEnable">
          <el-radio-group v-model="userForm.isEnable" class="isEnable">
            <el-radio label="true" key="1">是</el-radio>
            <el-radio label="false" key="-1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色" prop="roleId" class="role">
          <el-radio-group v-model="userForm.roleId">
            <el-radio
              v-for="role in roles"
              :label="role.id"
              :key="role.id"
              class="role-box"
              >{{ role.name }} <span>{{ role.description }}</span></el-radio
            ><br />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.show = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('userForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 修改密码对话框 -->
    <el-dialog
      title="修改密码"
      :visible.sync="changePasswordDialog"
      :close-on-click-modal="false"
      center
      width="30%"
      @closed="cancelModal"
    >
      <el-form
        :model="passwordForm"
        :rules="passwordRules"
        ref="passwordForm"
        label-width="100px"
      >
        <el-form-item label="新密码" prop="npsd">
          <el-input
            v-model="passwordForm.npsd"
            placeholder="请输入新密码(6-20位字母和数字)"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="nconfirmPsd">
          <el-input
            v-model="passwordForm.nconfirmPsd"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changePasswordDialog = false">取 消</el-button>
        <el-button type="primary" @click="updatePasswordSubmit('passwordForm')"
          >确认修改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script  src="../../js/user/list.js"></script>

<style  scoped>
.accout-wrap {
  padding: 40px;
}
.alist-top {
  margin-bottom: 20px;
}
.department-list {
  margin: 0 10px 10px 0 !important;
}
.table-box {
  width: 100%;
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
.role-box {
  margin-bottom: 10px;
}
</style>