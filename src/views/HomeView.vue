<template>
  <el-container>
    <el-header>
      <el-container>
        <el-aside width="200px">
          <div class="demo-image__placeholder">
            <div class="block">
              <el-image :src="src"></el-image>
            </div>

          </div>
        </el-aside>
        <el-main>
          <div class="menu-header">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1" @click="$router.push('/about')">关于我们</el-menu-item>
              <el-menu-item index="2" @click="$router.push('/menber')">人员组成</el-menu-item>
              <el-menu-item index="3" @click="$router.push('/contact')">联系我们</el-menu-item>
              <el-menu-item index="4" @click="$router.push('/blog')">博客</el-menu-item>
            </el-menu>

            <!-- 登录注册按钮区域 -->
            <div class="auth-buttons">
              <el-button type="text" @click="$router.push('/login')">登录</el-button>
              <el-button type="primary" plain round size="small" @click="$router.push('/register')">注册</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-header>


    <el-main>
      <!--走马灯展示-->
      <div class="carousel-wrapper">
        <el-carousel :interval="4000" type="card" trigger="click">
          <el-carousel-item v-for="(image,index) in imageList" :key="index">
            <img :src="image" alt="" style="width: 100%; height: 100%; object-fit: cover;">
            <h3>{{index + 1}}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>



    </el-main>


    <el-footer>Footer</el-footer>
  </el-container>
</template>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.carousel-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 比例（9 / 16 ≈ 0.5625）*/
}

.carousel-wrapper > .el-carousel {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 100%;
  margin: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}


.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.auth-buttons {
  margin-right: 20px;
  display: flex;
  gap: 12px;
}
</style>


<script>
import router from "@/router";

export default {
  methods: {
    router() {
      return router
    }
  },
  data() {
    return {
      src: require('@/../public/logo.png'),
      // 图片路径
      imageList: [
        require('@/../public/logo.png'),
        require('@/../public/合照.jpg'),
        require('@/../public/板子.jpg'),
        //require('@/../public/猫步1.jpg'),
        require('@/../public/照片1.jpg'),
        //require('@/../public//猫步全身照.jpg'),
      ]
    }

  }
}
</script>
