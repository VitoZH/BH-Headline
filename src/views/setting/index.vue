<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form :model="userForm" label-width="120px">
            <el-form-item label="编号：">{{userForm.id}}</el-form-item>
            <el-form-item label="手机：">{{userForm.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="userForm.intor" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userForm.email" type="email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updataUserInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-upload
            class="avatar-uploader"
            :http-request="myUpload"
            :show-file-list="false"
            action
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;font-size:16px">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      userForm: {
        id: null,
        mobile: null,
        photo: null,
        name: null,
        intro: null,
        email: null
      },
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('bhheadline')).token
      }
    }
  },
  created () {
    // 获取个人信息
    this.getUserInfo()
  },
  methods: {
    // 修改头像
    myUpload (data) {
      console.log(data)
      const formData = new FormData()
      formData.append('photo', data.file)
      this.$http.patch('user/photo', formData).then(res => {
        // 上传成功
        this.$message.success('修改头像成功')
        console.log(res)
        const url = res.data.data.photo
        this.userForm.photo = url
        eventBus.$emit('updatePhoto', url)
        // 更新本地
        // sessionStorage
        const userInfo = JSON.parse(window.sessionStorage.getItem('bhheadline'))
        userInfo.photo = url
        window.sessionStorage.setItem('bhheadline', JSON.stringify(userInfo))
      })
    },
    async getUserInfo () {
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      this.userForm = data
    },
    // 修改用户信息
    async updataUserInfo () {
      const {
        data: { data }
      } = await this.$http.patch('user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('修改成功')
      // 传值
      eventBus.$emit('updateName', data.name)
      // sessionStorage
      const userInfo = JSON.parse(window.sessionStorage.getItem('bhheadline'))
      userInfo.name = data.name
      window.sessionStorage.setItem('bhheadline', JSON.stringify(userInfo))
    }
  }
}
</script>

<style>
</style>
