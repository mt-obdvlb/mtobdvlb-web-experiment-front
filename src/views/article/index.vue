<template>
  <div class=" w-full flex  px-2">
<!--    left-->
    <el-card class="mr-2 ">
      <div class="flex flex-col h-full w-full ">
        <div class="flex justify-center items-center w-full h-20  border-b-1 text-2xl font-bold">
          <h2>作者列表</h2>
        </div>
        <el-table :data="articleList">
          <el-table-column type="index"  label="序号"></el-table-column>
          <el-table-column prop="username" label="作者名字"></el-table-column>
          <el-table-column prop="articleNumber" label="文章数量"></el-table-column>
          <el-table-column label="操作">
            <template #="{row,$index}">
              <el-button type="primary" size="small" @click="goAbout(row.userId)" >进入文章管理</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="">
          <el-pagination
              @change="getArticleList"
              v-model:current-page="articlePageSearchParams.page"
              v-model:page-size="articlePageSearchParams.pageSize"
              :page-sizes="[10, 20, 30, 40]"
              :total="total"
              layout="prev, pager, next, jumper, ->, sizes,total"
          >
          </el-pagination>

        </div>
      </div>
    </el-card>
<!--    right-->
    <el-card>
      <div class="flex flex-col h-full w-full">
        <div class="flex justify-center items-center w-full h-20  border-b-1 text-2xl font-bold">
          <h2>作者发表文章统计</h2>
        </div>
        <div class="w-full h-full">
          <v-chart autoresize  :option="option" style="width: 100%; height: 400px;" />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {Delete, Edit} from "@element-plus/icons-vue";
import {ref, onMounted} from "vue";
import {Article, ArticlePageQuery, ArticlePageQueryResponse} from "@/api/article/type";
import useUserStore from "@/store/modules/user";
import {reqArticlePage} from "@/api/article";
import VChart from 'vue-echarts'
import * as echarts from 'echarts'
import { CanvasRenderer } from 'echarts/renderers'
import {use} from 'echarts/core'

// 按需引入你要用到的图表和组件
import { BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components'

// 注册渲染器和组件
use([
  CanvasRenderer,  // 一定要有
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent
])

const router = useRouter()
const articleList = ref<ArticlePageQueryResponse>([])
const articlePageSearchParams = ref<ArticlePageQuery>({
  page: 1,
  pageSize: 10
})
let total = ref(0)
const option = ref({
  xAxis: {
    type: 'category',
    data: articleList.value.map(item => item.username)
  },
  yAxis: {
    type: 'value',
    minInterval: 1
  },
  series: [
    {
      data: articleList.value.map(item => item.articleNumber),
      type: 'bar'
    }
  ]
})

const getArticleList = async () => {

  const res = await reqArticlePage(articlePageSearchParams.value)
  articleList.value = res.data.records
  total.value = res.data.total
  console.log(articleList.value)
  option.value = {
    xAxis: {
      type: 'category',
      data: articleList.value.map(item => item.username)
    },
    yAxis: {
      type: 'value',
      minInterval: 1
    },
    series: [
      {
        data: articleList.value.map(item => item.articleNumber),
        type: 'bar'
      }
    ]
  }
}

onMounted(() => {
  getArticleList()
})

const goAbout = (userId: number) => {
  router.push(`/about/${userId}`)
}

</script>

<style scoped>
.el-card{
  @apply  flex-1 ;
}
</style>