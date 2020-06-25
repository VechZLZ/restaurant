<template>
    <div>
        <el-menu :collapse="this.$store.state.isShowLeft" style="height: 100vh;" text-color="#ffffff" default-active="1-4-1"  background-color="#304156" class="el-menu-vertical-demo "  >
            <router-link to="/" class="router-link-active">
                <el-menu-item index="0">
                    <img src="../assets/logo.png"  style="height: 30px;width: 30px;">
                    <span class="transition-box" v-if="!this.$store.state.isShowLeft" style="color: #ffffff;position: relative;left: 20px;"> 未奇云餐</span>
                </el-menu-item>
            </router-link>

            <router-link to="/" class="router-link-active">
                <el-menu-item index="1">
                    <i style="color:#BFCDB9" class="el-icon-s-home"></i>
                    <span slot="title">主页</span>
                </el-menu-item>
            </router-link>

            <router-link to="/menu" class="router-link-active">
                <el-menu-item index="2">
                    <i style="color:#BFCDB9" class="el-icon-s-shop"></i>
                    <span slot="title">菜单管理</span>
                </el-menu-item>
            </router-link>


                <!-- <router-link to="/order" class="router-link-active">
                <el-menu-item index="3">
                    <i style="color:#BFCDB9" class="el-icon-s-order"></i>
                    <span slot="title">订单管理</span>
                </el-menu-item>
            </router-link> -->


            <el-submenu index="3"> 

                <template slot="title">
                    <i style="color:#BFCDB9" class="el-icon-reading"></i>
                    <span slot="title">订单管理</span>
                </template>
                <router-link to="/order" class="router-link-active">
                    <el-menu-item index="3-1">堂食订单</el-menu-item>
                </router-link>

                <router-link to="/takeOutOrder" class="router-link-active">
                    <el-menu-item index="3-2">外卖订单</el-menu-item>
                </router-link>

            </el-submenu>
            
                <router-link to="/activity" class="router-link-active">
                <el-menu-item index="4">
                    <i style="color:#BFCDB9" class="el-icon-message-solid"></i>
                    <span slot="title">活动管理</span>
                </el-menu-item>
            </router-link>
            
                <router-link to="/kitchenManagenment" class="router-link-active">
                <el-menu-item index="5">
                    <i style="color:#BFCDB9" class="el-icon-s-claim"></i>
                    <span slot="title">后厨状态</span>
                </el-menu-item>
            </router-link>
            
                <router-link to="/sell" class="router-link-active">
                <el-menu-item index="6">
                    <i style="color:#BFCDB9" class="el-icon-s-marketing"></i>
                    <span slot="title">营业数据</span>
                </el-menu-item>
            </router-link>
            
                <router-link to="/eweima" class="router-link-active">
                <el-menu-item index="7">
                    <i style="color:#BFCDB9" class="el-icon-s-grid"></i>
                    <span slot="title">二维码</span>
                </el-menu-item>
            </router-link>
            
            <!-- <el-submenu index="1">
                <template slot="title">
                    <i style="color:#BFCDB9" class="el-icon-user"></i>
                    <span slot="title">信息管理</span>
                </template>
                <router-link to="/test" class="router-link-active">
                    <el-menu-item index="1-1">主页</el-menu-item>
                </router-link>

                <router-link to="/teacherAdminTeacher" class="router-link-active">
                    <el-menu-item index="1-2">菜单</el-menu-item>
                </router-link>
            </el-submenu>

            <el-submenu index="2">
                <template slot="title">
                    <i style="color:#BFCDB9" class="el-icon-s-data"></i>
                    <span slot="title">成绩管理</span>
                </template>
                <router-link to="/inputScore" class="router-link-active">
                    <el-menu-item index="2-1">成绩录入</el-menu-item>
                </router-link>

                <router-link to="/seeScore" class="router-link-active">
                    <el-menu-item index="2-2">成绩查看</el-menu-item>
                </router-link>

                <router-link to="/" class="router-link-active">
                    <el-menu-item index="2-3">成绩分析</el-menu-item>
                </router-link>
            </el-submenu>-->



             



           <!-- <el-menu-item index="4">
                <i style="color:#BFCDB9" class="el-icon-chat-dot-square"></i>
                <span slot="title">家教互动</span>
            </el-menu-item>
            <el-menu-item index="5">
                <i style="color:#BFCDB9" class="el-icon-message-solid"></i>
                <span slot="title">通知管理</span>
            </el-menu-item>
            <el-menu-item index="6">
                <i style="color:#BFCDB9" class="el-icon-setting"></i>
                <span slot="title">个人设置</span>
            </el-menu-item> -->
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "VEleft",
        data() {
            return {
                isCollapse: false
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    span{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    i{
        color:#BFCDB9
    }

    .router-link-active {
        text-decoration: none;
    }





</style>
