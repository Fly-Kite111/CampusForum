<template>
    <div class = "login-container">
        <!-- 2. 登录卡片：核心视觉区域 -->
         <div class = "login-card">
             <div class="card-header">
        <h1 class="title">CampusForum</h1>
        <p class="subtitle">连接每一位校友，分享校园生活</p>
            </div>

            <!-- 登录表单 -->
            <el-form :model="loginForm" :rules="rules" ref="loginFormRef" class = "login-form" label-width="auto" style="max-width: 500px">
                <!-- 输入账号 -->
    <el-form-item label="账号" prop = "username">
      <el-input v-model="loginForm.username" placeholder="请输入账号" />
    </el-form-item>
        <!-- 输入密码 -->
         <el-form-item label="密码"  prop = "password">
      <el-input v-model="loginForm.password" type = "password" placeholder="请输入密码" show-password />
    </el-form-item>
      <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" @click = "handleLogin">登 录</el-button>
        </el-form-item>
      <!--注册-->
        <el-button type="text" @click = "handleRegister">没有账号？请注册</el-button>
    </el-form>
         </div>
    </div>
</template>    

<script setup>
import { reactive,ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
// 定义表单数据对象
const loginForm = reactive({
  username: '',
  password: ''
})

// 2. 定义表单的 DOM 引用（用于调用校验方法）
const loginFormRef = ref(null)

// 3. 定义校验规则
const rules = reactive({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

// 4. 初始化路由
const router = useRouter()
// 5. 登录处理函数
const handleLogin = () => {
  // 调用表单校验方法
  loginFormRef.value.validate((valid) => {
    if (valid) {
      // 【硬编码校验逻辑】模拟后端接口
      if (loginForm.username === 'admin' && loginForm.password === '123456') {
        // 登录成功
        ElMessage.success('登录成功！')
        // 跳转到 home 页面
        router.push('/home') 
      } else {
        // 登录失败
        ElMessage.error('账号或密码错误，请校验')
      }
    } else {
      console.log('表单校验失败')
      return false
    }
  })
}
const handleRegister =() =>{
  ElMessage.success('注册模块待补充！')
}
</script>

<style scoped>
/* 
  注意：建议使用 scoped 防止样式污染全局 
  这里使用 flex 布局实现垂直水平居中
*/

.login-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  height: 100vh;           /* 占满全屏高度 */
  background-color: #f0f2f5; /* 浅灰色背景 */
}

.login-card {
  width: 500px;            /* 卡片宽度 */
  padding: 40px;           /* 内边距 */
  background: #ffffff;     /* 白色背景 */
  border-radius: 8px;      /* 圆角 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.card-header {
  text-align: center;      /* 标题居中 */
  margin-bottom: 40px;
}

.title {
  margin: 0;
  font-size: 30px;
  color: #333;
}

.subtitle {
  margin-top: 15px;
  font-size: 20px;
  color: #999;
}

.login-form {
  text-align: center;
}

.login-form ::v-deep(.el-form-item__label) {
  font-size: 18px; /* 修改字体大小 */
  color: #333;     /* 顺便可以修改颜色 */
}

/* 修改输入框的宽度和高度 */
.login-form ::v-deep(.el-input) {
  width: 400px; /* 控制输入框整体宽度 */
}

.login-form ::v-deep(.el-input__inner) {
  height: 30px; /* 控制输入框高度 */
  font-size: 16px; /* 控制输入框内文字大小 */
}
.login-form ::v-deep(.el-button){
  width: 200px;
  height:40px;
  font-size: 16px;
    /* 核心代码：左右自动边距实现居中 */
  margin-left: auto;
  margin-right: auto;
}
</style>