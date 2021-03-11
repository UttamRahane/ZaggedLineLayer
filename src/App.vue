<template>
  <div id="app">
    <example />
  </div>
</template>

<script>
import Example from "./components/Example";

export default {
  name: "App",
  components: {
    Example,
  },
};
</script>

<style lang="css">
#app {
  width: 100%;
  height: 100%;
}
</style>
