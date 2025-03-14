<script>
export default {
  name: 'HelloWorld',
  props: {
    title: {
      type: String,
      default: 'Hello Component'
    },
    message: {
      type: String,
      default: '这是一个Vue组件'
    }
  }
}
</script>

<template>
  <div class="hello-component">
    <h3>{{ title }}</h3>
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.hello-component {
  background-color: #ecfdf5;
  border: 1px solid #a7f3d0;
  border-radius: 6px;
  padding: 15px;
  margin-top: 15px;
}
h3 {
  color: #065f46;
  margin-top: 0;
}
</style>
