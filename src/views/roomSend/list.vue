<template>
  <div class="role-wrap">
    <el-card>
      <!--搜索和添加区域-->
      <el-row :gutter="20" class="role-top">
        <el-col :span="6">
          <el-input
            v-model="queryinfo.drugName"
            placeholder="请输入药品名"
            clearable
            @clear="createParams"
          >
          </el-input>
        </el-col>
        <el-col :span="6">
           <el-input
            v-model="queryinfo.customerName"
            placeholder="请输入病人姓名"
            clearable
            @clear="createParams"
          >
          </el-input>
        </el-col>
        <el-col :span="6">
           <el-input
            v-model="queryinfo.customerNo"
            placeholder="请输入病人身份证号"
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
          <el-button type="primary" @click="newObj">+新建发药操作</el-button>
        </el-col>
      </el-row>
      <!--列表区域-->
      <el-table :data="tableData" class="table-box" border>
         <el-table-column label="编号" prop="id" align="center">
        </el-table-column>
        <el-table-column label="病人姓名" prop="customerName" align="center">
        </el-table-column>
         <el-table-column label="病人身份证" prop="customerNo" align="center">
        </el-table-column>
        <el-table-column label="药品名称" prop="drugName" align="center">
        </el-table-column>
        <el-table-column label="操作数量" prop="num" align="center">
        </el-table-column>
        <el-table-column label="操作后库存" prop="operatorEndNum" align="center">
        </el-table-column>
        <el-table-column label="操作时间" prop="createTime" align="center">
        </el-table-column>
        <el-table-column label="操作人" prop="userName" align="center">
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
      width="35%"
      :close-on-click-modal="false"
      @closed="addDialogClosed"
    >
      <el-form
        :model="newForm"
        :rules="rules"
        ref="newForm"
        label-width="150px"
      >
        <div class="defaultRoom">
          <el-form-item label="挂号病人" prop="registerId" label-width="150px">
            <el-select v-model="newForm.registerId" placeholder="请选择挂号病人">
              <el-option
                v-for="register in registers"
                :value="register.id"
                :key="register.id"
                :label="'姓名 : (' + register.customerName + ')   身份证 : ( '+ register.customerNo+' )'"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="addRemoveCon">
            <el-button @click="addDrug"><i class="el-icon-plus"></i>添加药品</el-button>
          </div>
          <br/>
          <el-row>
            <el-col :span="13">
              <el-form-item label="选择药品" v-for="(roomSendRequestDrug, index) in newForm.roomSendRequestDrugs" :key="index" :prop="'roomSendRequestDrugs.'+ index +'.drugId'" 
                :rules="[{required: true, message: '请选择药品'}]">
                    <el-select v-model="roomSendRequestDrug.drugId" placeholder="请选择药品">
                        <el-option
                          v-for="drug in drugs"
                          :value="drug.id"
                          :key="drug.id"
                          :label="drug.name"
                        ></el-option>
                      </el-select>
              </el-form-item>
             </el-col>
            <el-col :span="10">
              <div>
                <el-form-item label="选择数量" v-for="(roomSendRequestDrug, index) in newForm.roomSendRequestDrugs" :key="index" :prop="'roomSendRequestDrugs.'+ index +'.num'" 
                  :rules="[{required: true, message: '请输入数量'}]">
                        <el-input
                          v-model="roomSendRequestDrug.num"
                          type="number"
                          min="1"
                          placeholder="操作数量"
                        >
                        </el-input>
                    <i class="el-icon-delete-solid" v-if="index > 0" @click="removeDrug(index,roomSendRequestDrug)"></i>
                  </el-form-item>
                </div>
              </el-col>
             </el-row>
         </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm()">取 消</el-button>
        <el-button type="primary" @click="submitForm('newForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script  src="../../js/roomSend/list.js"></script>

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
.addRemoveCon{ text-align: right;}
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
.defaultRoom .el-icon-delete-solid{ position: absolute; right: -20px; top: 12px; font-size: 16px; cursor: pointer;}
</style>