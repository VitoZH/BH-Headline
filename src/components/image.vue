<template>
  <div class="image-container">
    <div class="img-btn" @click="openDialog">
      <img :src="value||defaultImage" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <span>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="素材库" name="image">
            <!-- 单选框 -->
            <div style="margin-bottom:10px">
              <el-radio-group size="small" @change="search()" v-model="reqParams.collect">
                <el-radio-button :label="false">全部</el-radio-button>
                <el-radio-button :label="true">收藏</el-radio-button>
              </el-radio-group>
            </div>
            <!-- 图片列表 -->
            <div class="img-item" :class="{selected:selectedImageUrl===item.url}" @click="selectedImage(item.url)" v-for="item in images" :key="item.id">
              <img :src="item.url" alt />
            </div>
            <!-- 分页 -->
        <el-pagination
          v-if="total>reqParams.per_page"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="pager"
        ></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="上传图片" name="upload">
            <el-upload
              class="avatar-uploader"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              :show-file-list="false"
              :headers="headers"
              :on-success="handleSuccess"
              name="image"
            >
              <img v-if="uploadimageUrl" :src="uploadimageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-tab-pane>
        </el-tabs>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  data () {
    return {
      // 对话框显示
      dialogVisible: false,
      headers: {
        Authorization:
              'Bearer ' +
              JSON.parse(window.sessionStorage.getItem('bhheadline')).token
      },
      // 选中标签
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 图片预览路径
      uploadimageUrl: null,
      // 素材列表数据
      images: [],
      // 分页总条数
      total: 0,
      // 选中素材地址
      selectedImageUrl: null,
      defaultImage
    }
  },
  props: ['value'],
  methods: {
    // 确认图片
    confirmImage () {
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) return this.$message.warning('请选择素材')
        // this.value = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else {
        if (!this.uploadimageUrl) return this.$message.warning('请上传素材 ')
        // this.value = this.uploadimageUrl
        this.$emit('input', this.uploadimageUrl)
      }
      this.dialogVisible = false
    },
    // 上传成功
    handleSuccess (res) {
      this.uploadimageUrl = res.data.url
    },
    // 选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    openDialog () {
      this.dialogVisible = true
      this.selectedImageUrl = null
      this.uploadimageUrl = null
      // 渲染素材列表
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    }
  }
}
</script>

<style lang="less" scoped>
.image-container{
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
}
.img-item {
  position: relative;
  width: 150px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 10px;
  &.selected {
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2) url("../assets/images/selected.png")
        no-repeat center/50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    // 图片填充显示完整
    object-fit: contain;
  }
}
.img-btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
