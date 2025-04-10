<template>
  <div class="flex flex-col w-full h-full">
    <!--    header-->
    <div class="text-2xl text-shadow-md justify-center flex  py-4">

      <h2>注册用户</h2>
    </div>
    <!--        main-->
    <div class="basis-full w-full ">
      <el-form ref="formRef"  :model="userRegisterParams" :rules="rules" class="flex h-full w-full  max-[800px]:flex-col">
        <!--      left-->
        <div class="px-3 border-r-1  main-lr w-1/2 max-[800px]:border-r-0 max-[800px]:w-full">
          <el-form-item class="form-item" prop="username">
            <el-input placeholder="请输入用户名" class="w-full !h-full" v-model="userRegisterParams.username"/>
          </el-form-item>
          <el-form-item class="form-item" prop="password">
            <el-input placeholder="请输入密码" class="w-full !h-full" v-model="userRegisterParams.password"/>
          </el-form-item>
          <el-form-item class="form-item" prop="email">
            <el-input placeholder="请输入邮箱" class="w-full !h-full" v-model="userRegisterParams.email"/>
          </el-form-item>
          <el-form-item class="form-item" prop="birthTime">
            <el-date-picker
                v-model="userRegisterParams.birthTime"
                placeholder="请选择出生日期"
                class="!w-full !h-full"

            />
          </el-form-item>

        </div>
        <!--      right-->
        <div class="px-3 main-le w-1/2  max-[800px]:w-full">
          <el-form-item class=" h-full overflow-hidden w-full  max-[800px]:flex-1 py-2" prop="avatar">
            <el-upload
                class=" h-full w-full
             border-dashed border-gray-600
             flex justify-center items-center rounded-xl
            " :class="{'border-2': !userRegisterParams.avatar}"
                :show-file-list="false"
                :before-upload="handleBeforeUpload"
                :on-success="handleUploadSuccess"
              action="/api/common/upload"
            >
              <img v-if="userRegisterParams.avatar" :src="userRegisterParams.avatar" class="object-cover w-2/3 h-2/3" />
              <el-icon v-else size="large" class="w-full h-full"> <Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!--    footer-->
    <div class="flex max-[800px]:flex-col flex-shrink-0">
      <div class="w-1/2 block max-[800px]:w-full h-12" to="">
        <button class="footer-btn !bg-green-500 hover:bg-green-600 " :loading="loading" :disabled="isFormValid" @click="register">注册账号</button>
      </div>
      <router-link class="w-1/2 block max-[800px]:w-full h-12" to="/auth/">
        <button class="footer-btn  bg-purple-500 hover:bg-purple-600 ">返回登录</button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Plus} from '@element-plus/icons-vue'
import {computed} from "vue";
import {ElMessage} from "element-plus";
import {reqSave} from "@/api/user";
import {useRouter} from "vue-router";
import type {User} from '@/api/user/type'
import dayjs from 'dayjs'

const router = useRouter()
const userRegisterParams = ref<User>({
  username: '',
  password: '',
  birthTime: '',
  email: '',
  avatar: '',
})
const formRef = ref()
const rules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ],
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
  ],

}

let isFormValid = computed(() => {
  return  !(userRegisterParams.value.username && userRegisterParams.value.password)
})

const register = async () => {
  formRef.value?.validate()
  userRegisterParams.value.birthTime = dayjs(userRegisterParams.value.birthTime).format('YYYY-MM-DD')
  console.log(userRegisterParams.value)
  try {
    const res: Response = await reqSave(userRegisterParams.value)
    ElMessage.success("注册成功")
    await router.push('/auth')
  } catch(e) {
    ElMessage.error(e.message)
  }
}

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
  userRegisterParams.value.avatar = response.data
}

</script>

<style scoped>
.form-item {
  @apply w-full flex-1;
}

.footer-btn {
  @apply w-full transition duration-300 cursor-pointer h-full;
}

.main-lr {
  @apply flex h-full flex-col items-center justify-around;
}
</style>