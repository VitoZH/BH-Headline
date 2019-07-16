<template>
  <el-select :v-value="value">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    // 获取频道数据
    async getChannelOptions () {
      // 解构
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
      console.log(this.reqParams)
    }
  }
}
</script>

<style>
</style>
