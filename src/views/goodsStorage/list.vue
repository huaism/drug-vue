<template>
  <div class="role-wrap">
    <el-card>
      <!--搜索和添加区域-->
      <el-row :gutter="20" class="role-top">
        <el-col :span="8">
          <el-input
            v-model="queryinfo.goodsName"
            placeholder="请输入物资名称"
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
      </el-row>
      <!--列表区域--> 
      <el-table :data="tableData" class="table-box" border>
        <el-table-column label="物资编号" prop="id" align="center">
        </el-table-column>
        <el-table-column label="物资名称" prop="goodsName" align="center">
        </el-table-column>
        <el-table-column label="库存量" prop="stockNum" align="center">
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
  </div>
</template>

<script  src="../../js/goodsStorage/list.js"></script>

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