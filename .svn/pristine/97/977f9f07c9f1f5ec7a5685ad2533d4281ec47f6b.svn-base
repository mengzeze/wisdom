<template>
    <div class="rightmenu" v-if="rightmenuIsShow">
        <div class="right_menu">
            <ul>
                <li @click="rightMenuView" v-if="seleDocIsSingle"> <i></i><span>预览</span></li>
                <li @click="rightMenuDow"> <i></i><span>下载</span></li>
                <li @click="rightMenuUpload"  v-if="seleDocIsSingle"> <i></i><span>上传新版本</span></li>
                <li @click="rightMenuDelete"> <i></i><span>删除</span></li>
                <li @click="rightMenuRename" v-if="seleDocIsSingle"> <i></i><span>重命名</span></li>
                <li @click="rightMenuCopy"> <i></i><span>复制</span></li>
                <li @click="rightMenuPaste" v-if="isPaste"> <i></i><span>粘贴</span></li>
                <li @click="rightMenuCut"> <i></i><span>剪切</span></li>
                <li @click="rightMenuLock" v-if="seleDocIsSingle"> <i></i><span>锁定</span></li>
                <li @click="rightMenuRelation" v-if="seleDocIsSingle"><i></i><span>文件关联</span></li>
                <li @click="rightMenuPower" v-if="seleDocIsSingle"> <i></i><span>文件权限</span></li>
                <li @click="rightMenuNature" v-if="seleDocIsSingle"> <i></i><span>文件属性</span></li>
            </ul>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'rightmenu',
        props: ['rightmenuIsShow','seleDocIsSingle','isPaste'],
        data () {
            return {

            }
        },
        created() {
        },
        mounted(){

        },
        methods:{
            rightMenuView() {
                this.$emit('rightMenuView');
            },
            rightMenuDow() {
                this.$emit('rightMenuDow');
            },
            rightMenuUpload() {
                this.$emit('rightMenuUpload');
            },
            rightMenuDelete() {
                this.$emit('rightMenuDelete');
            },
            rightMenuRename() {
                this.$emit('docReName');
            },
            rightMenuCopy() {
                this.$emit('docCopy');
            },
            rightMenuCut() {
                this.$emit('docCut');
            },
            rightMenuPaste() {
                this.$emit('docPaste');
            },
            rightMenuLock() {
                this.$emit('docLock');
            },
            rightMenuPower() {
                this.$emit('rightMenuPower');
            },
            rightMenuNature() {
                this.$emit('rightMenuNature');
            },
            rightMenuRelation(){
                this.$emit('rightMenuRelation');
            }

        }
    }
</script>

<style scoped lang="scss" type="text/css">
    .right_menu{
        width:100px;
        background: #fff;
        box-shadow:  0 0 3px 3px #ccc;
        position: absolute;
        left: 0;
        top: 0;
        ul{
            width:100%;
            padding:10px;
            box-sizing: border-box;
            li{
                font-size: 12px;
                text-align: left;
                line-height: 20px;
                cursor:pointer;
                &:hover{
                    background: #66b1ff;
                 }
            }
        }
    }
</style>
<style>

</style>
