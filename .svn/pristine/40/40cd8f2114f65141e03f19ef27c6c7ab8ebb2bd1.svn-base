<template>
    <div class="creat-temp-class">
      <el-dialog title="创建模板分类" :close-on-click-modal="false" :visible.sync="creatTempCatalogIsShow" width="45%" class="choseAuditor"  @close="clickEvent">
            <div class="clearfix">
                创建模板分类：
                <el-input v-model="newTempName" placeholder="请输入内容" style="width:80%;"></el-input>                   
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="tempCreat = false">取 消</el-button>
                <el-button type="primary" @click="creatTempCatalog">创 建</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="上传到模板提示"
            :close-on-click-modal="false"
            :visible.sync="seleCatalogIsShow"
            width="45%" class="choseAuditor">
            <div class="clearfix">              
                <el-form ref="form">
                    <el-form-item label="选择目录：">
                        <el-select v-model="seleCatalog.catalog" placeholder="请选择目录">
                            <el-option v-for="(list, index) in tempCatalogList" :label="list.docName" :value="list.id" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>             
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="clickEvent">取 消</el-button>
                <el-button type="primary" @click="uploadTemp">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

export default {
    name: 'creattempclass',
    props: [
        'tempCatalogList'
    ],
    data () {
        return {
            token:"",
            userId:'',
            projectId: '',//项目ID
            creatTempCatalogIsShow: true,
            seleCatalogIsShow: false,
            newTempName: '',
            seleCatalog: {
                catalog: ''
            }   
        }
    },
    mounted(){
        this.token = this.$store.state.loginObject.userToken;
        this.userId = this.$store.state.loginObject.userId;
        this.projectId = this.$store.state.projectMsg.pro_id;
    },
    methods:{  
        
        clickEvent() {
            this.$emit("sendValueToParent", false);
        },
    },
    watch:{
        uploadDocAddIsShow: function(newV) {
            this.uploadDoc = true;
        }
    },
}
</script>

<style scoped lang="scss" type="text/css">

</style>
<style>
    

</style>
