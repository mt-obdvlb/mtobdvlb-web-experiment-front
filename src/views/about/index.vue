<template>
  <div class="flex flex-col w-full h-full">
    <!--    top-->
    <div class="flex mb-1">

      <el-image class="size-100 shadow-lg mr-2" :src="user.avatar" alt="头像"></el-image>
      <el-card class="flex-1 h-full">
        <div class="h-full w-full flex flex-col">
          <div class="w-full h-30 flex justify-center items-center ">
            <h2>作者信息</h2>
          </div>
          <el-descriptions
              class="mt-1"
              :column="1"
              border
              label-class-name="w-32 font-medium"
          >
            <el-descriptions-item label="用户名">{{ user.username }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ user.email }}</el-descriptions-item>
            <el-descriptions-item label="生日">{{ user.birthTime }}</el-descriptions-item>
          </el-descriptions>
          <el-button type="primary" class="mt-10" @click="router.back()">返回</el-button>
        </div>
      </el-card>
    </div>
    <!--bottom-->
    <el-card class="flex-1 w-full">
      <div class="flex flex-col">
        <div class="flex justify-between">
          <el-button type="primary" @click="saveArticle">新增文章</el-button>
          <div class="flex ml-2  ">
            <el-form class="flex" inline>

              <el-form-item>
                <el-input placeholder="请输入文章名" v-model="articleSearchParams.title"  clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :icon="Search"  @click="getArticleList">搜索</el-button>
              </el-form-item>

            </el-form>
          </div>
        </div>
        <el-table :data="articleList">
          <el-table-column type="index"  label="序号"></el-table-column>
          <el-table-column prop="title" show-overflow-tooltip  label="文章标题"></el-table-column>
          <el-table-column prop="content"  show-overflow-tooltip label="文章内容"></el-table-column>
          <el-table-column label="操作">
            <template #="{row,$index}">
              <el-button type="primary" size="small" @click="updateArticle(row.id)" :icon="Edit">编辑</el-button>
              <el-popconfirm @confirm="deleteArticle(row.id)" title="确定删除吗？">
                <template #reference>
                  <el-button type="primary" size="small" :icon="Delete">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
  <el-dialog :title="articleParams.id ? '修改文章': '新增文章'" v-model="dialogVisible" @close="reset">
    <el-form ref="formRef" :model="articleParams" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="articleParams.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="articleParams.content"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addOrSaveArticle">{{ articleParams.id ? '修改文章' : '新增文章' }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import type {User} from '@/api/user/type'
import {onMounted} from "vue";
import {reqGetById} from "@/api/user";
import {useRoute, useRouter} from "vue-router";
import {Delete, Edit, Search} from "@element-plus/icons-vue";
import {reqArticleList} from "@/api/article";
import {Article} from "@/api/article/type";
import {reqArticleAddOrUpdate, reqArticleDelete, reqArticleGetById} from "@/api/article";
import {ElMessage} from "element-plus";
import dayjs from "dayjs";

const router = useRouter()
const route = useRoute()
const user = ref<User>({
  id: '',
  username: '',
  birthTime: '',
  email: '',
  avatar: '',
})
const articleSearchParams = ref({
  userId: route.params.userId,
  title: '',
})
const articleList = ref<Array<Article>>([])
const articleParams = ref<Article>({
  id: '',
  title: '',
  content: '',
  userId: route.params.userId,
})
const dialogVisible = ref(false)
const rules = {
  title: [
    {required: true, message: '请输入标题', trigger: 'blur'},
  ],
  content: [
    {required: true, message: '请输入内容', trigger: 'blur'},
  ]
}
const formRef = ref()

const getArticleList = async () => {
  const res = await reqArticleList(articleSearchParams.value)
  articleList.value = res.data
}

const getUserInfo = async () => {
  const res = await reqGetById(route.params.userId)
  user.value = res.data
}

onMounted(() => {
  getUserInfo()
  getArticleList()
})

const deleteArticle = async (id: number) => {
  try {
    const res = await reqArticleDelete(id)
    ElMessage.success('删除成功')
    getArticleList()
  } catch (e) {
    ElMessage.error(e.message)
  }
}

const updateArticle = async (id) => {
  try {
    const res = await reqArticleGetById(id)
    articleParams.value = res.data
    dialogVisible.value = true
  } catch (e) {
    ElMessage.error(e.message)
  }
}

const saveArticle = async () => {
  dialogVisible.value = true
}

const addOrSaveArticle = async () => {
  console.log(articleParams.value)
  try {
    const res = await reqArticleAddOrUpdate(articleParams.value)
    ElMessage.success(articleParams.value.id ? '修改成功' : '添加成功')
    dialogVisible.value = false
    await getArticleList()
  } catch (e) {
    ElMessage.error(e.message)
  }
}

const reset = () => {
  formRef.value.resetFields()
  articleParams.value = {
    id: '',
    title: '',
    content: '',
    userId: route.params.userId,
  }
}


</script>

<style scoped>

</style>