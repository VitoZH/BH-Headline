<template>
  <el-container class="home-container">
    <el-aside class="my-aside" :width="collapse?'5%':'230px'">
      <div class="logo" :class="{close:collapse}">
      </div>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="collapse"
        :collapse-transition="false"
        style="border-right:none"
      >
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-s-order"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-s-comment"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-s-tools"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="my-header">
        <span class="el-icon-s-fold" @click="toggleManu"></span>
        <span class="text">江苏传智播客教育有限公司</span>
        <el-dropdown style="float:right">
          <span class="el-dropdown-link">
            <img style="vertical-align:middle" width="30" height="30" src="../../assets/images/avatar.jpg" alt="">
            <b style="vertical-align:middle">黑马小妹</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i class="el-icon-user-solid"></i>个人设置
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="el-icon-switch-button"></i>退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      collapse: false
    }
  },
  methods: {
    toggleManu () {
      this.collapse = !this.collapse
    }
  }
}
</script>

<style lang="less">
.home-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .my-aside {
    background: #002033;
    .logo {
      height: 60px;
      text-align: center;
      background: #002840 url('../../assets/images/logo_admin.png') no-repeat center;
    }
    .close{
      background: url('../../assets/images/logo_admin_01.png') no-repeat center;
      background-size: 36px auto;
    }
  }
  .my-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    font-size: 18px;
    .el-icon-s-fold {
      font-size: 26px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
    }
  }
}
</style>
