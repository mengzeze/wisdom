<template>
    <div class="manuscriptindex" id="manuscriptindex">
        <div class="manuscriptindex_header">
            <p class="header_break">
                <span>底稿管理</span>
            </p>
            <div>
                <h3 class="header_clearFix">
                    底稿管理
                </h3>
            </div>
        </div>
        <div class="manuscriptindex_section">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        };
    },
    created() {
    },
    mounted(){
        // document.getElementById("main_view").style.height = (this.getViewPortHeight() - 70) + "px";

    },

    methods: {
        getViewPortHeight() {
            return document.documentElement.clientHeight || document.body.clientHeight;
        },

    }
}
</script>
<style lang="scss" scoped>
    .manuscriptindex{
        width: 100%;
        display: flex;
        flex-direction: column;
        .manuscriptindex_header{
            width: 100%;
            height: 90px;
            margin: auto;
            overflow: hidden;
            background-color:#FFFFFF;
            text-align: left;
            .header_break {
                height: 20px;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                margin-top: 1%;
                margin-left: 10px;
            }
            div{
                display: flex;
                align-items: center;
                .back_btn{
                    margin-left: 5px;
                }
                .header_clearFix {
                    font-size: 20px;
                    font-family: MicrosoftYaHei;
                    color: rgba(51, 51, 51, 1);
                    margin-top: 16px;
                    margin-bottom: 10px;
                    font-weight: 600;
                    margin-left: 10px;
                }
            }

        }
        .manuscriptindex_section{
            width: 100%;
            margin-top: 10px;
        }
    }

</style>
