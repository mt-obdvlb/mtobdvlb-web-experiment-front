<template>
  <el-card class="max-w-full flex flex-col">
    <div class="flex justify-center items-center text-2xl">
      <h2>用户管理</h2>
    </div>
    <div class="flex mt-2">
      <el-button type="primary" @click="saveUser">新增用户</el-button>
      <div class="flex ml-2  flex-1 justify-around">
        <el-form class="flex" inline>
          <el-form-item>
            <el-date-picker
                v-model="userPageSearchParams.begin"
                placeholder="选择开始日期"
            />
          </el-form-item>
          <el-form-item>
            <el-date-picker
                v-model="userPageSearchParams.end"
                placeholder="选择结束日期"
            />
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入用户名" v-model="userPageSearchParams.username" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :icon="Search" @click="getUserList">搜索</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
    <el-table :data="userList">
      <el-table-column type="index" width="100px" label="序号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="birthTime" label="生日"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column label="操作">
        <template #="{row,$index}">
          <el-button type="primary" size="small" @click="updateUser(row.id)" :icon="Edit">编辑</el-button>
          <el-popconfirm @confirm="deleteUser(row.id)" title="确定删除吗？">
            <template #reference>
              <el-button type="primary" size="small" :icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="">
      <el-pagination
          @change="getUserList"
          v-model:current-page="userPageSearchParams.page"
          v-model:page-size="userPageSearchParams.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :total="total"
          layout="prev, pager, next, jumper, ->, sizes,total"
      >
      </el-pagination>

    </div>
    <el-dialog :title="userParams.id ? '修改用户': '新增用户'" v-model="dialogVisible" @close="reset">
      <el-form ref="formRef" :model="userParams" :rules="rules" >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userParams.username"></el-input>
        </el-form-item>
        <el-form-item v-if="!userParams.id" label="密码" prop="password">
          <el-input v-model="userParams.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userParams.email"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birthTime">
          <el-date-picker
              v-model="userParams.birthTime"
              type="date"
              placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-upload
              class=" size-50
             border-dashed border-gray-600
             flex justify-center items-center rounded-xl
            " :class="{'border-2': !userParams.avatar}"
              :show-file-list="false"
              :before-upload="handleBeforeUpload"
              :on-success="handleUploadSuccess"
              action="/api/common/upload"
          >
            <img v-if="userParams.avatar" :src="userParams.avatar" class="object-cover w-2/3 h-2/3"/>
            <el-icon v-else size="large" class="w-full h-full">
              <Plus/>
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addOrSaveUser">{{ userParams.id ? '修改用户' : '新增用户'}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import {Plus, Search} from '@element-plus/icons-vue'
import useUserStore from "@/store/modules/user";
import {onMounted} from "vue";
import {reqAddOrUpdate, reqDelete, reqGetById, reqPage} from "@/api/user";
import {Edit, Delete} from "@element-plus/icons-vue";
import dayjs from "dayjs";
import {ElMessage} from "element-plus";

const formRef = ref()
const dialogVisible = ref(false)
const userPageSearchParams = ref({
  page: 1,
  pageSize: 10,
  begin: '',
  end: '',
  username: ''
})
const userList = ref<User[]>([])
let total = ref(0)
const userParams = ref<User>({
  id: '',
  username: '',
  birthTime: '',
  email: '',
  avatar: '',
  password: '',
})
const rules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  birthTime: [
    {required: true, message: '请输入生日', trigger: 'blur'},
  ],
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
  ],
  avatar: [
    {required: true, message: '请上传头像', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ],

}

const getUserList = async () => {
  console.log()
  userPageSearchParams.value.begin = userPageSearchParams.value.begin ? dayjs(userPageSearchParams.value.begin).format('YYYY-MM-DD') : ''
  userPageSearchParams.value.end = userPageSearchParams.value.end ? dayjs(userPageSearchParams.value.end).format('YYYY-MM-DD') : ''
  console.log(userPageSearchParams.value)
  const res = await reqPage(userPageSearchParams.value)
  userList.value = res.data.records
  total.value = res.data.total
  console.log(userList.value)
}

onMounted(() => {
  getUserList()
})

const handleBeforeUpload = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt16M = file.size / 1024 / 1024 < 16;
  console.log(file)
  if (!isJpgOrPng) {
    ElMessage.error('上传头像图片只能是 JPG/PNG 格式!');
    return false;
  }
  if (!isLt16M) {
    ElMessage.error('上传头像图片大小不能超过 16MB!');
  }
  return isJpgOrPng && isLt16M;
}

const handleUploadSuccess = (response: Response<String>) => {
  userParams.value.avatar = response.data
}

const deleteUser = async (id: number) => {
  try {
    const res = await reqDelete(id)
    ElMessage.success('删除成功')
    getUserList()
  } catch (e) {
    ElMessage.error(e.message)
  }
}

const updateUser = async (id) => {
  try {
    const res = await reqGetById(id)
    userParams.value = res.data
    dialogVisible.value = true
  } catch (e) {
    ElMessage.error(e.message)
  }
}

const saveUser = async () => {
  dialogVisible.value = true
}

const addOrSaveUser = async () => {
  try {
    const res = await reqAddOrUpdate(userParams.value)
    ElMessage.success(userParams.value.id ? '修改成功' : '添加成功')
    dialogVisible.value = false
    getUserList()
  } catch (e) {
    ElMessage.error(e.message)
  }
}

const reset = () => {
  formRef.value.resetFields()
  userParams.value = {
    id: '',
    username: '',
    birthTime: '',
    email: '',
    avatar: '',
    password: '',
  }
}

</script>

<style scoped>

</style>