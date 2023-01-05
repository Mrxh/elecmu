<template>
    <div class="my-all-box">
        <keep-alive>
           <router-view />
        </keep-alive>
        <div>1233333333</div>
    </div>
</template>

<script>
export default {
    name: 'App',
    setup: () => {
        return {
        }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
.my-tools {
    width: 100%;
    height: 40px;
    padding: 10px 16px;
    box-sizing: border-box;
    font-size: 20px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    -webkit-app-region: no-drag;
}

.my-tools .icon {
    cursor: pointer;
    -webkit-app-region: no-drag;
}

.my-tools-left {
    float: left;
}
.my-tools-right {
    float: right;
}

.my-tools-right .icon {
    margin-left: 16px;
}
</style>
