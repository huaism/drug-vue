<template>
  <div class="role-wrap">
    <el-card>
      <!--搜索和添加区域-->
      <el-row :gutter="20" class="role-top">
        <el-col :span="8">
          <el-input
            v-model="queryinfo.keyword"
            placeholder="请输入病人姓名"
            clearable
            @clear="createParams"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="createParams"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="newObj">+新建挂号</el-button>
        </el-col>
      </el-row>
      <!--列表区域-->
      <el-table :data="tableData" class="table-box" border>
        <el-table-column label="挂号ID" prop="id" align="center">
        </el-table-column>
        <el-table-column label="病人姓名" prop="customerName" align="center">
        </el-table-column>
        <el-table-column label="身份证号" prop="customerNo" align="center">
        </el-table-column>
        <el-table-column label="病人类型" prop="customerTypeName" align="center">
        </el-table-column>
        <el-table-column label="创建人" prop="userName" align="center">
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" align="center">
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

    <!--新建弹框区域-->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      center
      width="25%"
      :close-on-click-modal="false"
      @closed="addDialogClosed"
    >
      <el-form
        :model="newForm"
        :rules="rules"
        ref="newForm"
        label-width="80px"
      >
        <el-form-item label="病人姓名" prop="name">
          <el-input
            v-model="newForm.customerName"
            placeholder="请输入病人姓名"
          ></el-input>
        </el-form-item>

        <el-form-item label="身份证号" prop="name">
          <el-input
            v-model="newForm.customerNo"
            placeholder="请输入病人身份证号"
          ></el-input>
        </el-form-item>
        
        <el-form-item label="病人类型" prop="customerType">
          <el-select v-model="newForm.customerType" placeholder="请选择病人类型">
            <el-option
              v-for="type in types"
              :value="type.id"
              :key="type.id"
              :label="type.name"
            ></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.show = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('newForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script  src="../../js/register/list.js"></script>

<style scoped>
.role-wrap {
  padding: 40px;
}
.role-top {
  margin-bottom: 20px;
}
.role-form {
  text-align: right;
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
.table-box {
  width: 100%;
}
.treeBox {
  border: 1px solid #dbe8f7;
  position: relative;
}
.treeHeader {
  background: #f5f7fa;
  display: flex;
  border-bottom: 1px solid #dbe8f7;
}
.treeHeader span {
  width: 50%;
  padding: 10px 0 10px 20px;
}

.el-tree {
  padding: 15px;
}
.treetext {
  position: relative;
  width: 100%;
}
.treetext span.treename {
  width: 50%;
}
.treetext span.treedescription {
  position: absolute;
  right: 0;
  top: 0;
  width: 320px;
}
.middleLine {
  position: absolute;
  width: 1px;
  height: 100%;
  top: 0;
  right: 50%;
  background: #dbe8f7;
}
.treeCont {
  border: 1px solid #dbe8f7;
}
.treeTitle {
  padding: 8px 10px;
  border-bottom: 1px solid #dbe8f7;
  background: #f5f7fa;
}
.treeWrap {
  border: 1px solid #dbe8f7;
  margin: 5px;
  height: 500px;
}
.save {
  margin-top: 15px;
  text-align: right;
}
</style>