<template>
  <el-card>
    <div slot="header" class="clearfix">
      <my-bread>评论管理</my-bread>
    </div>
    <el-table :data="comments">
      <el-table-column label="标题" width="400px" prop="title"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
      </el-table-column>
      <el-table-column label="操作" width="120px">
        <template slot-scope="scope">
          <el-button
            @click="toggleStatus(scope.row)"
            v-if="!scope.row.comment_status"
            type="success"
            size="mini"
          >打开评论</el-button>
          <el-button @click="toggleStatus(scope.row)" v-else type="danger" size="mini">关闭评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:20px"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="reqParams.per_page"
      :current-page="reqParams.page"
      @current-change="pager"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      comments: [],
      total: 0
    }
  },
  created () {
    // 获取评论信息
    this.getComments()
  },
  methods: {
    // 改变评论状态
    toggleStatus (row) {
      const text1 = '确认打开该文章评论功能吗？'
      const text2 = '确认关闭该文章评论功能吗？'
      this.$confirm(row.comment_status ? text2 : text1, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const {
            data: { data }
          } = await this.$http.put('comments/status?article_id=' + row.id, {
            allow_comment: !row.comment_status
          })
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          row.comment_status = data.allow_comment
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          })
        })
    },
    // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    },
    async getComments () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style>
</style>
