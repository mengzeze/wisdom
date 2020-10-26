<template>
    <div class="project-doc-temp">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="item in activeData" :label="item.label" :name="item.name" :key="item.key" >
                <router-view></router-view>
            </el-tab-pane>
        </el-tabs>




    </div>
</template>
<script>
export default {
    name: "projectDocTemp",
    props:[

    ],
    data() {
        return {
            activeName: "first",
            projectData: [],
            workCatalogueName: '',
            workCatalogueParentId: '',
            parentId: '',
            activeData: [{
                label: '工作底稿模版',
                name: 'first',
                key: 'first'
            },{
                label: '项目模版',
                name: 'second',
                key: 'second'
            }]
        }
    },
    created() {
        this.activeName = this.$route.query.activeName;
        this.projectData = this.$route.query.projectData;
        this.workCatalogueName = this.$route.query.workCatalogueName;
        this.workCatalogueParentId = this.$route.query.workCatalogueParentId;
        this.parentId = this.$route.query.parentId;
        if(this.activeName == "first") {
            this.$router.push({
                path: '/workManuTemp',
                query: {
                    activeName: "first",
                    name: '工作底稿',
                    workCatalogueName: this.workCatalogueName,
                    workCatalogueParentId: this.workCatalogueParentId
                }
            })
        } else if(this.activeName == 'second') {
            this.$router.push({
                path: '/projectDocTemp',
                query: {
                    projectData: this.projectData,
                    parentId: this.parentId
                }
            })
        }
    },
    mounted() {

    },
    methods: {
        handleClick(tab, event) {
            if(tab.name == "first") {
                this.$router.push({
                    path: '/workManuTemp',
                    query: {
                        activeName: "first",
                        name: '工作底稿',
                        workCatalogueName: this.workCatalogueName,
                        workCatalogueParentId: this.workCatalogueParentId
                    }
                })
            } else if(tab.name == 'second') {
                this.$router.push({
                    path: '/projectDocTemp',
                    query: {
                        projectData: this.projectData
                    }
                })
            }
        }
    }

}
</script>
<style lang="scss" scoped>

</style>
