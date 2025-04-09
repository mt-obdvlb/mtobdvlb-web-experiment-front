<template>
  <div class="flex  h-screen w-screen">
<!--    左边-->
    <el-aside class="w-200 max-[800px]:absolute  max-[800px]:w-0 max-[800px]:-translate-x-full max-[800px]:opacity-0  transition-all duration-500 ease-in-out">
      <el-menu
          default-active="/home"
          class="min-h-screen"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
      >
        <el-menu-item index="/home" class="menu-router-item">
          <span class="">首页</span>
        </el-menu-item>
        <el-menu-item index="/user-management" class="menu-router-item">
          <span>用户管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
<!--    right-->
    <div class="w-full flex-1 flex flex-col  transition duration-500 ease-in-out max-[800px]:w-screen">
      <el-header class="w-full flex items-center justify-end min-h-20 bg-[var(--primary-darken-color)]">
        <div class="mr-10">
          <el-popover
              placement="bottom-end"
              trigger="hover"
              class="mr-10"
          >
            <template #default>
              <el-form>
                <el-form-item label="主题色">
                  <el-color-picker
                      :teleported="false"
                      show-alpha
                      v-model="color"
                      @change="setColor"
                      :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d']"
                  />
                </el-form-item>
                <el-form-item label="暗黑模式">
                  <el-switch @change="changeDark" v-model="dark"  :inactive-icon="MoonNight" :active-icon="Sunny" inline-prompt />
                </el-form-item>
              </el-form>
            </template>
            <template #reference>
              <el-icon class="text-gray-700 !text-3xl shadow border border-gray-300 rounded-full hover:bg-gray-100 cursor-pointer transition p-1" >
                <Setting/>
              </el-icon>
            </template>
          </el-popover>
        </div>
        <div>
          <el-dropdown
              @mouseenter="isHover = true"
              @mouseleave="isHover = false"
          >
            <template #default>
              <div class="flex items-center cursor-pointer flex-col">
                <img src="https://mtobdvlb-web.oss-cn-beijing.aliyuncs.com/2.png" alt="avatar" class="rounded-full size-10"/>
                <span>username</span>
                <el-icon>
                  <component :is="isHover ? ArrowUp : ArrowDown"/>
                </el-icon>

              </div>
            </template>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="router.push('/user-management/profile')">
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <el-popconfirm title="确定退出登录吗" @confirm="logout">
                    <template #reference>
                      <button>退出登录</button>
                    </template>
                  </el-popconfirm>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

      </el-header>
      <el-main class="w-full bg-[var(--primary-color)]">
        <router-view/>
      </el-main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ArrowDown, ArrowUp, Setting, MoonNight, Sunny} from "@element-plus/icons-vue";
import useUserStore from "@/store/modules/user";
import tinycolor from 'tinycolor2'

let isHover = ref(false)
const router = useRouter()
const userStore = useUserStore()
let color = ref(getComputedStyle(document.documentElement).getPropertyValue('--primary-color'))
let dark = ref(false)

const handleSelect = (index: string) => {
  router.push(index)
}

const setColor = (color: string) => {
  const activeColor = tinycolor(color).lighten(10).toHexString()
  const darkenColor = tinycolor(color).darken(10).toHexString()
  document.documentElement.style.setProperty('--primary-color', color)
  document.documentElement.style.setProperty('--primary-active-color', activeColor)
  document.documentElement.style.setProperty('--primary-darken-color', darkenColor)
}

const changeDark = (dark: boolean) => {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const logout = () => {
  userStore.token = ''
  userStore.userInfo = {}
  router.push('/auth')
}

</script>

<style scoped>
.menu-router-item {
  @apply flex justify-center block w-full bg-[var(--primary-color)] hover:bg-[var(--primary-active-color)];
}

</style>