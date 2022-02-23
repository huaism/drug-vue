<template>
  <div class="permission-wrap">
    <el-card>
      <!--搜索和添加区域-->
      <div class="permission-top">
        <el-button type="primary" @click="newPermission">+新增权限</el-button>
      </div>

      <!--权限列表区域-->
      <el-table :data="tableData" class="table-box" border>
        <el-table-column label="权限ID" prop="id" align="center">
        </el-table-column>
        <el-table-column label="权限名称" prop="name" align="center">
        </el-table-column>
        <el-table-column label="父权限" prop="parentName" align="center">
        </el-table-column>
        <el-table-column label="权限URL" prop="url" align="center">
        </el-table-column>
        <el-table-column label="权限描述" prop="description" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip placement="bottom">
              <el-button
                class="el-icon-edit"
                type="primary"
                size="mini"
                @click="edit(scope.row.id)"
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

    <!--新增和编辑权限弹框-->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      center
      width="30%"
      :close-on-click-modal="false"
      @closed="addDialogClosed"
    >
      <el-form
        :model="limitForm"
        :rules="rules"
        ref="limitForm"
        label-width="80px"
      >
        <el-form-item label="权限名" prop="name">
          <el-input
            v-model="limitForm.name"
            placeholder="请输入角权限名"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限URL" prop="url">
          <el-input
            v-model="limitForm.url"
            placeholder="请输入权限URL"
          ></el-input>
          <el-tooltip placement="bottom-end" class="tips">
            <div slot="content">
              （1）? 匹配一个字符（除操作系统默认的文件分隔符）<br />
              （2）* 匹配0个或多个字符<br />
              （3）**匹配0个或多个目录<br />
              （4）多个链接请使用 <b style="color: yellow">###</b> 分割<br />
            </div>
            <i class="el-icon-question"></i>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input
            v-model="limitForm.description"
            placeholder="请输入权限描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限父级" prop="parentId">
          <el-select v-model="limitForm.parentId" placeholder="请选择权限父级">
            <el-option value="" key="" label="请选择"></el-option>
            <el-option
              v-for="permission in parents"
              :value="permission.id"
              :key="permission.id"
              :label="permission.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.show = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('limitForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script  src="../../js/permission/list.js"></script>

<style scoped>
.permission-wrap {
  padding: 40px;
}

.permission-top {
  text-align: right;
  margin-bottom: 20px;
}
.table-box {
  width: 100%;
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
.tips {
  position: absolute;
  top: 13px;
  right: 10px;
}
</style>