<template>
    <div class="projecttasks">
        <topnav/>
        <router-view></router-view>
    </div>
</template>
<script>
import topnav from "./topnav.vue";
export default {
    name: "index",
        data() {
            return {};
        },
        components: {
            topnav
        }
}
</script>
<style scoped>
.el-main{
    padding: 0;
}
</style>


