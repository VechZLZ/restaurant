<template>
  <div id="app" style="margin: -8px;">
    <div v-if="!isLogin">
      <el-container>
        <el-aside :width="this.$store.state.LeftWidth" :class="this.$store.state.LeftCalss">
          <VEleft style="z-index:9997;position: fixed;"></VEleft>
        </el-aside>
        <el-container>
          <el-header style="padding: 0;" height="53px">
            <VEheader></VEheader>
          </el-header>
          <el-main
            style="min-height:95vh;padding:0 ;background-color: rgb(241, 241, 241);min-width:1300px;"
          >
            <transition name="el-zoom-in-center">
              <router-view></router-view>
            </transition>
          </el-main>
          <el-footer
            style="text-align:center;color:#a1a1a1;background-color: rgb(241, 241, 241)"
          >未奇科技</el-footer>
        </el-container>
      </el-container>
    </div>
    <div v-if="isLogin">
      <transition name="el-zoom-in-center">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import VEheader from "./components/VEheader";
import VEleft from "./components/VEleft";
export default {
  name: "app",
  components: {
    VEheader,
    VEleft
  },
  data() {
    return {
      isLogin: false,
   
    };
  },
  mounted() {
    this.$store.commit("beginLeft");
  },
  
  watch: {
    $route() {
      if (this.$route.name === "login" || this.$route.name === "register") {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    }
  }
};
</script>

<style>
.beginFlexLeft {
  width: 56px !important;
}
.beginFlexRight {
  width: 200px !important;
}
.flexLeft {
  width: 56px !important;
  animation: left 1s;
}

.flexRight {
  width: 200px !important;
  animation: right 0.5s;
}

@keyframes left {
  from {
    width: 200px;
  }
  to {
    width: 56px;
  }
}

@keyframes right {
  from {
    width: 56px;
  }
  to {
    width: 200px;
  }
}
</style>
