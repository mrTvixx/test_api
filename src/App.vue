<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style>
* {
  outline: unset;
}
body {
  display: flex;
  margin: 0px;
}
.main {
  width: 100%;
}
</style>
