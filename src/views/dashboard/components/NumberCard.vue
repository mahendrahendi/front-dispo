<template>
  <el-card class="card-round">
    <count-to class="number" :start-val="0" :end-val="number" :duration="1000" />
    <div class="label">{{ label }}</div>
  </el-card>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: { CountTo },
  props: {
    number: {
      type: Number
    },
    label: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.number{
  display: block;
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 42px;
  line-height: 49px;
  text-align: right;
  color: #990002;
}

.label{
  font-size: 16px;
  line-height: 22px;
  text-align: right;
  letter-spacing: 0.02em;
  margin-top: 10px;
  color: #828487;
}
</style>
