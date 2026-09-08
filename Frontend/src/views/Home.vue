<template>
  <!-- 1. 最外层容器：垂直布局 -->
  <el-container class="home-container">
     <!-- 2. 顶部 Header：包含 Logo 和 搜索框 -->
    <el-header class="site-header" height="80px">
      <div class="header-inner">
        <!-- 左侧 Logo -->
        <div class="logo">
          <span>千山の论坛</span>
        </div>
        <!--中间 logo旁的简介-->
        <div class="logo-text">
          <span>欢迎来到千山の论坛</span>
        </div>

        <!-- 右侧 搜索框 -->
        <div class="search-box">
          <el-input
            v-model="searchText"
            placeholder="输入您想了解的内容吧..."
            size="large"
            class="custom-input"
          >
            <template #append>
              <el-button @click="handleSearch">搜索</el-button>
            </template>
          </el-input>
        </div>
      </div>
    </el-header>
    <!-- 3. 主体 Main：包含索引、轮播、卡片 -->
    <el-main class="site-main">
      <!-- A. 索引区域 -->
      <div class="index-section">
        <!-- 一级索引 (Tabs) -->
        <el-tabs v-model="activeTab" class="demo-tabs">
          <el-tab-pane label="全部课程" name="courses"></el-tab-pane>
          <el-tab-pane label="名师风采" name="teachers"></el-tab-pane>
          <el-tab-pane label="社团活动" name="clubs"></el-tab-pane>
        </el-tabs>
         <!-- 二级索引 (模拟文字链) -->
        <div class="sub-index">
           <span v-for="link in currentSubLinks" :key="link">{{ link }}</span>
        </div>
      </div>
      
         <!-- B. 热门帖子轮播 -->
      <div class="carousel-section">
        <el-carousel type = "card" height="300px" indicator-position="outside">
          <!-- 遍历真实帖子数组 hotPostList，每个对象携带帖子id -->
            <el-carousel-item v-for="post in hotPostList" :key="post.id">
              <!-- 绑定点击事件，传入帖子id -->
              <div class="carousel-placeholder" @click="goPostDetail(post.id)">
                <h3>热门帖子 Banner {{ post.title }}</h3>
                <p>这里是置顶的热门讨论内容...</p>
              </div>
            </el-carousel-item>
        </el-carousel>
      </div>

    </el-main>

    <!-- 4. 底部 Footer -->
    <el-footer class="site-footer" height="60px">
      <div class="footer-content">
        <p>&copy; 2026 CampusForum 校园论坛 | 联系我们 | 隐私政策</p>
      </div>
    </el-footer>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const searchText = ref('')
const router = useRouter()
const activeTab = ref('courses')
// 模拟二级索引数据
const subLinksMap = {
  courses: ['高等数学', '大学英语', '数据结构', '线性代数'],
  teachers: ['张教授', '李老师', '王辅导员', '外教Smith'],
  clubs: ['摄影社', '篮球社', '动漫社', '志愿者协会']
}
// 模拟后端返回的热门帖子数据
const hotPostList = [
  { id: 1, title: "帖子标题1" },
  { id: 2, title: "帖子标题2" },
  { id: 3, title: "帖子标题3" },
  { id: 4, title: "帖子标题4" },
  { id: 5, title: "帖子标题5" }
]
// 跳转帖子详情，路由配置例如 /post/:postId
const goPostDetail = (postId) => {
  router.push({
    path: `/post/${postId}`
  })
}
// ✅ 关键：用 computed 而非 @tab-click 手动赋值
const currentSubLinks = computed(() => subLinksMap[activeTab.value] || [])

const handleSearch = () =>{
  // .value 获取ref的值；trim() 去除全空格，防止用户只输入一堆空格
  if(searchText.value.trim()){
    ElMessage.success('搜索成功！')
    router.push('/success') 
  }else{
    // 为空的情况提示
    ElMessage.warning('请输入搜索内容！')
  }
}
</script>

<style>
/* 全局容器设置 */
.home-container {
  height: 100vh; /* 占满全屏高度 */
  display: flex;
  flex-direction: column;
}
/* Header 样式 */
.site-header {
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  padding: 0 40px; /* 左右留白 */
  display: flex;
  align-items: center;
}

.header-inner {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo span {
  font-size: 30px;
  font-weight: bold;
  color: #409eff;
}

.logo-text span{
  font-size: 20px;
  font-weight: 400;
  color:#73444460;
}
/* Main 区域样式 */
.site-main {
  background-color: #f5f7fa; /* 浅灰背景，突出卡片 */
  padding: 20px 0;
}
/* 限制主要内容宽度，居中显示（类似图二的布局） */
.index-section, .carousel-section, .content-cards {
  max-width: 1200px;
  margin: 0 auto 20px auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}
/* 二级索引样式 */
.sub-index {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 14px;
  color: #606266;
}
.sub-link:hover {
  color: #409eff;
  cursor: pointer;
  text-decoration: underline;
}

/* 轮播图占位样式 */
.carousel-placeholder {
  height: 100%;
  background-color: #b3c0d1;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* Footer 样式 */
.site-footer {
  background-color: #333;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer-content p {
  margin: 0;
  font-size: 12px;
}
</style>