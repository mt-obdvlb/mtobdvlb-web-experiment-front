<template>
  <el-card class="max-w-full flex flex-col">
    <div class="flex justify-center items-center text-2xl">
      <h2>联系人管理</h2>
    </div>
    <div class="flex mt-2 justify-between">
      <el-button type="primary" @click="saveContact">新增联系人</el-button>
      <div class="flex ml-2  ">
        <el-form class="flex" inline>

          <el-form-item>
            <el-input placeholder="请输入联系人名" v-model="contactPageSearchParams.name" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :icon="Search" @click="getContactList">搜索</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
    <el-table :data="contactList">
      <el-table-column type="index"  label="序号"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="name" label="名字"></el-table-column>
      <el-table-column prop="province" label="省份"></el-table-column>
      <el-table-column prop="city"  label="城市"></el-table-column>
      <el-table-column prop="address" show-overflow-tooltip label="地址"></el-table-column>
      <el-table-column prop="postcode" label="邮编"></el-table-column>
      <el-table-column label="操作">
        <template #="{row,$index}">
          <el-button type="primary" size="small" @click="updateContact(row.id)" :icon="Edit">编辑</el-button>
          <el-popconfirm @confirm="deleteContact(row.id)" title="确定删除吗？">
            <template #reference>
              <el-button type="primary" size="small" :icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="">
      <el-pagination
          @change="getContactList"
          v-model:current-page="contactPageSearchParams.page"
          v-model:page-size="contactPageSearchParams.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :total="total"
          layout="prev, pager, next, jumper, ->, sizes,total"
      >
      </el-pagination>

    </div>
    <el-dialog :title="contactParams.id ? '修改联系人': '新增联系人'" v-model="dialogVisible" @close="reset">
      <el-form ref="formRef" :model="contactParams" :rules="rules" >
        <el-form-item label="日期" prop="date">
          <el-date-picker
              v-model="contactParams.date"
              type="date"
              placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="联系人名" prop="name">
          <el-input v-model="contactParams.name"></el-input>
        </el-form-item>
        <el-form-item label="省份" prop="provinceId">
          <el-select v-model="provinceId" placeholder="请选择省份" @change="handleProvinceSelect" >
            <el-option
              v-for="item in provinces"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="cityId">
          <el-select :disabled="!provinceId" v-model="cityId" placeholder="请选择城市" @change="handleCitySelect">
            <el-option
                v-for="item in cities"
                :key="item.id"
                :value="item.id"
                :label="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="contactParams.address"></el-input>
        </el-form-item>
        <el-form-item label="邮编" prop="postcode">
          <el-input v-model="contactParams.postcode"></el-input>
        </el-form-item>
<!--        <el-form-item label="头像" prop="avatar">-->
<!--          <el-upload-->
<!--              class=" size-50-->
<!--             border-dashed border-gray-600-->
<!--             flex justify-center items-center rounded-xl-->
<!--            " :class="{'border-2': !contactParams.avatar}"-->
<!--              :show-file-list="false"-->
<!--              :before-upload="handleBeforeUpload"-->
<!--              :on-success="handleUploadSuccess"-->
<!--              action="/api/common/upload"-->
<!--          >-->
<!--            <img v-if="contactParams.avatar" :src="contactParams.avatar" class="object-cover w-2/3 h-2/3"/>-->
<!--            <el-icon v-else size="large" class="w-full h-full">-->
<!--              <Plus/>-->
<!--            </el-icon>-->
<!--          </el-upload>-->
<!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="addOrSaveContact">{{ contactParams.id ? '修改联系人' : '新增联系人'}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import {Plus, Search} from '@element-plus/icons-vue'
import {onMounted} from "vue";
import {
  reqContactAddOrUpdate,
  reqContactDelete,
  reqContactGetById,
  reqContactPage,
} from "@/api/contact";
import useUserStore from "@/store/modules/user/user";
import {Edit, Delete} from "@element-plus/icons-vue";
import dayjs from "dayjs";
import {ElMessage} from "element-plus";
import {Contact, ContactPageQuery} from "@/api/contact/type";
import {Province,City} from "@/api/common/type";
import {reqProvinces,reqCities} from "@/api/common";


const userStore = useUserStore()
const formRef = ref()
const dialogVisible = ref(false)
const contactPageSearchParams = ref<ContactPageQuery>({
  page: 1,
  pageSize: 10,
  userId: userStore.userInfo.id,
  name: ''
})
const contactList = ref<Contact[]>([])
let total = ref(0)
const contactParams = ref<Contact>({
  id: '',
  date: '',
  province: '',
  city: '',
  postcode: '',
  userId: userStore.userInfo.id,
  name: '',
  address: '',
})
const rules = {
  name: [
      { required: true, message: '请输入联系人名', trigger: 'blur' },
  ],
  email: [
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  date: [
  ],
  province: [
      { required: true, message: '请选择省份', trigger: 'change' }
  ],
  city: [
      { required: true, message: '请选择城市', trigger: 'change' }
  ],
  postcode: [
      { required: true, message: '请输入邮编', trigger: 'blur' },
      { min: 6, max: 6, message: '长度为6位邮编', trigger: 'blur' }
  ]
}
let provinces = ref<Array<Province>>([])
let cities = ref<Array<City>>([])
let cityId = ref('')
let provinceId = ref('')

const getContactList = async () => {
  // console.log(contactPageSearchParams.value)
  const res = await reqContactPage(contactPageSearchParams.value)
  contactList.value = res.data.records
  total.value = res.data.total

  console.log(contactList.value)
}

onMounted( async () => {
  const res = await reqProvinces()
  provinces.value = res.data
  await getContactList()
})

// const handleBeforeUpload = (file: File) => {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   const isLt16M = file.size / 1024 / 1024 < 16;
//   console.log(file)
//   if (!isJpgOrPng) {
//     ElMessage.error('上传头像图片只能是 JPG/PNG 格式!');
//     return false;
//   }
//   if (!isLt16M) {
//     ElMessage.error('上传头像图片大小不能超过 16MB!');
//   }
//   return isJpgOrPng && isLt16M;
// }
//
// const handleUploadSuccess = (response: Response<String>) => {
//   contactParams.value.avatar = response.data
// }

const deleteContact = async (id: number) => {
  try {
    const res = await reqContactDelete(id)
    ElMessage.success('删除成功')
    getContactList()
  } catch (e) {
    ElMessage.error(e.message)
  }
}

const updateContact = async (id) => {
  try {
    const res = await reqContactGetById(id)
    contactParams.value = res.data
    dialogVisible.value = true
  } catch (e) {
    ElMessage.error(e.message)
  }
}

const saveContact = async () => {
  dialogVisible.value = true
}

const addOrSaveContact = async () => {
  contactParams.value.date = dayjs(contactParams.value.date).format('YYYY-MM-DD')
  console.log(contactParams.value)
  try {
    const res = await reqContactAddOrUpdate(contactParams.value)
    ElMessage.success(contactParams.value.id ? '修改成功' : '添加成功')
    dialogVisible.value = false
    await getContactList()
  } catch (e) {
    ElMessage.error(e.message)
  }
}

const reset = () => {
  formRef.value.resetFields()
  contactParams.value = {
    id: '',
    date: '',
    province: '',
    city: '',
    postcode: '',
    userId: userStore.userInfo.id,
    name: '',
    address: '',
  }
  provinceId.value = ''
  cityId.value = ''
}

const handleProvinceSelect = async () => {
  contactParams.value.province = provinces.value.find(item => item.id === provinceId.value).name
  cityId.value = ''
  cities.value = []
  const res = await reqCities(provinceId.value)
  cities.value = res.data
}

const handleCitySelect = () => {
  contactParams.value.city = cities.value.find(item => item.id === cityId.value).name
}

</script>

<style scoped>

</style>