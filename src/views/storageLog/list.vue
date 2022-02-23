<template>
  <div class="role-wrap">
    <el-card>
      <!--搜索和添加区域-->
      <el-row :gutter="20" class="role-top">
         <el-col :span="3">
            <el-select v-model="queryinfo.typeId" placeholder="请选择操作类型">
              <el-option value="" key="" label="请选择"></el-option>
              <el-option
                v-for="type in types"
                :value="type.id"
                :key="type.id"
                :label="type.name"
              ></el-option>
            </el-select>
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="queryinfo.drugName"
            placeholder="请输入药品名"
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
          <el-button type="primary" @click="newObj">+新建药库操作</el-button>
        </el-col>
      </el-row>
      <!--列表区域-->
      <el-table :data="tableData" class="table-box" border>
         <el-table-column label="编号" prop="id" align="center">
        </el-table-column>
        <el-table-column label="药品名称" prop="drugName" align="center">
        </el-table-column>
        <!-- <el-table-column label="有效期结束" prop="validityEndTime" align="center">
        </el-table-column> -->
         <el-table-column label="操作类型" prop="typeName" align="center">
        </el-table-column>
        <el-table-column label="操作数量" prop="num" align="center">
        </el-table-column>
        <el-table-column label="操作后库存" prop="operatorEndNum" align="center">
        </el-table-column>
        <el-table-column label="操作时间" prop="createTime" align="center">
        </el-table-column>
        <el-table-column label="操作人" prop="userName" align="center">
        </el-table-column>
        <!-- <el-table-column label="操作" align="center">
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
        </el-table-column> -->
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

       <el-form-item label="选择药品" prop="drugId">
          <el-select v-model="newForm.drugId" placeholder="请选择药品">
            <el-option
              v-for="drug in drugs"
              :value="drug.id"
              :key="drug.id"
              :label="drug.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作类型" prop="operatorType">
          <el-select v-model="newForm.operatorType" placeholder="请选择操作类型">
            <el-option
              v-for="type in types"
              :value="type.id"
              :key="type.id"
              :label="type.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作数量" prop="num">
          <el-input
            v-model="newForm.num"
            type="number"
            min="1"
            placeholder="请输入操作数量"
          ></el-input>
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

<script  src="../../js/storageLog/list.js"></script>

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