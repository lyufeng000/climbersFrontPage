<template>
  <el-container>
    <el-header>
      <el-page-header @back="goBack" content="人员组成"></el-page-header>
      <el-button type="primary" @click="add" class="addButton">新增</el-button>
    </el-header>
    <el-main>
      <div>
        <el-table :data="menberTable" height="1000" border style="width: 100%" align="center"
                  @row-click="handleRowClick" ref="memberTable">

          <el-table-column type="selection" v-if="isEditing" width="100" align="center"></el-table-column>

          <el-table-column prop="id" label="ID" width="50" align="center"></el-table-column>

          <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>

          <el-table-column prop="gender" label="性别" width="50" align="center"></el-table-column>

          <el-table-column prop="office" label="职位" width="200" align="center"></el-table-column>

          <el-table-column prop="dept" label="部门" width="300" align="center"></el-table-column>

          <el-table-column prop="phone" label="电话号码" width="200" align="center"></el-table-column>

          <el-table-column prop="email" label="邮箱" width="200" align="center"></el-table-column>

          <el-table-column prop="hobby" label="爱好" align="center" width="300"></el-table-column>

          <el-table-column label="状态" align="center" width="300">
            <template #default="scope">
              <span v-if="scope.row.status == true">空闲</span>
              <span v-else>忙碌</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="150">
            <template #default="scope">
              <el-button type="text" @click="clickUpdate(scope.row)" style="margin-right: 10px">修改</el-button>
              <el-button type="text" @click="confirmDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 新增/修改弹窗 -->
      <div>
        <el-dialog title="人员信息" :visible.sync="dialogVisible" width="30%">
          <span>
            <el-form>
              <el-form-item label="ID" style="display: flex">
                <el-input v-model="currentMember.id" disabled></el-input>
              </el-form-item>

              <el-form-item label="姓名" style="display: flex">
                <el-input v-model="currentMember.name"></el-input>
              </el-form-item>

              <el-form-item label="性别">
                <el-select v-model="currentMember.gender" placeholder="请选择性别">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="职位" style="display: flex">
                <el-input v-model="currentMember.office"></el-input>
              </el-form-item>

              <el-form-item label="部门" style="display: flex">
                <el-input v-model="currentMember.dept"></el-input>
              </el-form-item>

              <el-form-item label="电话号码" style="display: flex">
                <el-input v-model="currentMember.phone"></el-input>
              </el-form-item>

              <el-form-item label="邮箱" style="display: flex">
                <el-input v-model="currentMember.email"></el-input>
              </el-form-item>

              <el-form-item label="爱好" style="display: flex">
                <el-input v-model="currentMember.hobby"></el-input>
              </el-form-item>

              <el-form-item label="状态">
                <div style="display: flex; align-items: center;">
                  <el-switch v-model="currentMember.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="true" :inactive-value="false">
                  </el-switch>
                  <span style="margin-left: 10px;" :style="{ color: currentMember.status ? '#13ce66' : '#ff4949' }">
                    {{ currentMember.status ? '空闲' : '忙碌' }}
                  </span>
                </div>
              </el-form-item>

            </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitMember">提交</el-button>
          </span>
        </el-dialog>
      </div>

      <!-- 删除确认框 -->
      <el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%">
        <span>确定要删除该成员吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="deleteMember">确定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      menberTable: [], // 初始化成员表数据
      isEditing: false, // 是否处于编辑状态
      dialogVisible: false, // 控制新增/修改弹窗显示
      deleteDialogVisible: false, // 控制删除确认框显示
      currentMember: {}, // 当前编辑的成员信息
    };
  },
  methods: {
    goBack() {
      // 返回上一页逻辑
      this.$router.go(-1);
    },
    add() {
      // 新增成员逻辑
      this.currentMember = {status:true};
      this.dialogVisible = true;
    },
    handleRowClick(row) {
      // 行点击事件逻辑
      console.log('Row clicked:', row);
    },
    clickUpdate(row) {
      // 修改成员逻辑
      this.currentMember = {...row};
      this.dialogVisible = true;
    },
    confirmDelete(id) {
      // 显示删除确认框
      this.deleteDialogVisible = true;
      this.currentMember.id = id;
    },
    deleteMember() {
      // 删除成员逻辑
      console.log('Deleting member with ID:', this.currentMember.id);
      axios.delete(`api/members/${this.currentMember.id}`).then(
          setTimeout(()=>{
            this.fetchMembers();
          }, 10)
      ).catch(error => {
        console.error('Error deleting member:', error);
      });
      this.deleteDialogVisible = false;
    },

    fetchMembers() {
      axios.get('/api/members')
          .then(response => {
            this.menberTable = response.data.data;
          })
          .catch(error => {
            console.error('Error fetching members:', error);
          });
    },

    submitMember() {
      if (this.currentMember.id) {
        // 修改成员逻辑，使用 PUT 请求
        axios.put('/api/members', this.currentMember)
            .then(response => {
              console.log('Member updated successfully:', response.data);
              this.dialogVisible = false;
              this.fetchMembers();
            })
            .catch(error => {
              console.error('Error updating member:', error);
            });
      } else {
        // 新增成员逻辑，使用 POST 请求
        axios.post('/api/members', this.currentMember)
            .then(response => {
              console.log('Member added successfully:', response.data);
              this.dialogVisible = false;
              this.fetchMembers();
            })
            .catch(error => {
              console.error('Error adding member:', error);
            });
      }
    }


  },//method

  mounted() {
    this.fetchMembers();
  }


};
</script>

<style>
  .addButton{
    float: right;
  }
</style>