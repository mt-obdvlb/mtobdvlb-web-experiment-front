<template>
  <div class="flex flex-col w-full h-full">
    <!--    header-->
    <div class="text-2xl text-shadow-md justify-center flex  py-4">

      <h2>注册用户</h2>
    </div>
    <!--        main-->
    <div class="basis-full w-full ">
      <el-form ref="formRef" :model="userForgetPasswordParams" :rules="rules"
               class="flex h-full w-full  max-[800px]:flex-col">
        <!--      left-->
        <div class="px-3 border-r-1  main-lr w-1/2 max-[800px]:border-r-0 max-[800px]:w-full">
          <el-form-item class="form-item" prop="username">
            <el-input placeholder="请输入用户名" class="w-full !h-full" v-model="userForgetPasswordParams.username"/>
          </el-form-item>
          <el-form-item class="form-item" prop="email">
            <el-input placeholder="请输入邮箱" class="w-full !h-full" v-model="userForgetPasswordParams.email"/>
          </el-form-item>

        </div>
        <!--      right-->
        <div class="px-3 main-lr w-1/2 max-[800px]:w-full">
          <el-form-item class="form-item bg-red" prop="password">
            <el-input placeholder="请输入密码" class="w-full !h-full" v-model="userForgetPasswordParams.password"/>
          </el-form-item>
          <el-form-item class="form-item" prop="passwordConfirmation">
            <el-input placeholder="请再一遍输入密码" class="w-full !h-full"
                      v-model="userForgetPasswordParams.passwordConfirmation"/>
          </el-form-item>

        </div>
      </el-form>
    </div>
    <!--    footer-->
    <div class="flex max-[800px]:flex-col flex-shrink-0">
      <div class="w-1/2 block max-[800px]:w-full h-12" to="">
        <button class="footer-btn !bg-green-500 hover:bg-green-600 "  :disabled="!isFormValid"
                @click="forgetPassword">忘记密码
        </button>
      </div>
      <router-link class="w-1/2 block max-[800px]:w-full h-12" to="/auth/">
        <button class="footer-btn  bg-purple-500 hover:bg-purple-600 ">返回登录</button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {UserForgetPassword} from "@/api/user/type";
import {ElMessage} from "element-plus";
import {reqForgetPassword} from "@/api/user";

const userForgetPasswordParams = ref<UserForgetPassword>({
  username: '',
  password: '',
  passwordConfirmation: '',
  email: '',
})
const formRef = ref()
const rules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ],
  passwordConfirmation: [
    {required: true, message: '请输入确认密码', trigger: 'blur'},
    {
      validator(rule, value, callback) {
        if (value !== userForgetPasswordParams.value.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
  ],
}
const router = useRouter()

const isFormValid = computed(() => {
  return userForgetPasswordParams.value.username && userForgetPasswordParams.value.password
      &&  userForgetPasswordParams.value.email && userForgetPasswordParams.value.passwordConfirmation
})

const forgetPassword = async () => {
  console.log(userForgetPasswordParams.value)
  try {
    const res = await reqForgetPassword(userForgetPasswordParams.value)
    ElMessage.success("找回密码成功!")
    await router.push('/auth')
  }catch (e) {
    ElMessage.error(e.message)
  }
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