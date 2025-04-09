<template>
  <div class="flex flex-col w-full h-full">
    <!--    header-->
    <div class="text-2xl text-shadow-md justify-center flex  py-4">
      <h2>登录</h2>
    </div>
    <!--    main-->
    <div class="flex basis-full w-full  max-[800px]:flex-col">
      <!--      left-->

      <el-form class="px-3 border-r-1  main-lr w-1/2 max-[800px]:border-r-0 max-[800px]:w-full">
        <el-form-item class="form-item ">
          <el-button type="primary" class="w-full !h-full">微信</el-button>
        </el-form-item>
        <el-form-item class="form-item">
          <el-button type="primary" class="w-full !h-full">qq</el-button>
        </el-form-item>
        <el-form-item class="form-item">
          <el-button type="primary" class="w-full !h-full">支付宝</el-button>
        </el-form-item>
      </el-form>
      <!--      right-->
      <el-form ref="formRef"  :model="userLoginParams"
               class="main-lr px-3 w-1/2  max-[800px]:w-full" :rules="rules">
        <el-form-item class="form-item" prop="username">
          <el-input placeholder="请输入用户名" class="w-full !h-full" v-model="userLoginParams.username" />
        </el-form-item>
        <el-form-item class="form-item" prop="password">
          <el-input placeholder="请输入密码" class="w-full !h-full" v-model="userLoginParams.password" />
        </el-form-item>
        <el-form-item class="form-item">
          <el-button type="primary" class="w-full !h-full" :disabled="!isFormValid" :loading="loading" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--    footer-->
    <div class="flex max-[800px]:flex-col flex-shrink-0">
      <router-link class="w-1/2 block max-[800px]:w-full h-12" to="/auth/register">
        <button class="footer-btn bg-green-500 hover:bg-green-600 ">注册账号</button>
      </router-link>
      <router-link class="w-1/2 block max-[800px]:w-full h-12" to="/auth/forget-password">
        <button class="footer-btn  bg-purple-500 hover:bg-purple-600 ">忘记密码</button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {UserLogin} from "@/api/user/type";
import {ElMessage} from "element-plus";
import useUserStore from "@/store/modules/user";
import {reqLogin} from "@/api/user";

const userLoginParams = ref<User>({
  username: '',
  password: ''
})
const formRef = ref()
let loading = ref(false)
const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ]
})
const router = useRouter()
const userStore = useUserStore()

const login = async () => {
  formRef.value?.validate()
  loading.value = true
  try {
    const res: Response<UserLogin> = await reqLogin(userLoginParams.value)
    userStore.token = res.data.token
    userStore.userInfo.id = res.data.id
    userStore.userInfo.username = res.data.username
    userStore.userInfo.birth_time = res.data.birth_time
    ElMessage.success("登录成功")
    await router.push('/')
  } catch(e) {
    loading.value = false
    ElMessage.error(e.message)

  }
}

const isFormValid = computed(() => {
  return !loading.value && userLoginParams.value.username && userLoginParams.value.password
})

</script>
<style>
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