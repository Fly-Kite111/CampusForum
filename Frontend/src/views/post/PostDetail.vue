<template>
  <div class="post-detail">
    <div v-if="loading">加载中...</div>
    <div v-if="post">
      <h2>{{ post.title }}</h2>
      <div class="content">{{ post.content }}</div>
      <div>作者：{{ post.author }}</div>
    </div>
    <div v-if="!post && !loading">帖子不存在</div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const post = ref(null)
const loading = ref(false)

// 根据帖子id请求后端接口获取帖子数据
const fetchPost = async (postId) => {
  loading.value = true
  // 这里调用后端接口 GET /api/post?postId=xxx
  // const res = await api.getPost(postId)
  // post.value = res.data

  // --------模拟接口返回数据，实际替换成真实请求------------
  post.value = {
    id: postId,
    title: `第${postId}号帖子的标题`,
    content: `这是第${postId}篇帖子正文内容......`,
    author: "用户张三"
  }
  loading.value = false
}

// ⚠️重点：路由组件会复用！从/post/1跳转到/post/2，onMounted不会再次执行！
// 所以必须监听 route.params.postId 的变化，id变了就重新拉数据
watch(() => route.params.postId, (newId) => {
  fetchPost(newId)
}, { immediate: true }) // immediate: true 页面初次进来立刻执行一次

</script>