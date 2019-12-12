<template>
  <div>
    <Table border :columns="columns12" :data="projects" >
      <template slot-scope="{ row }" slot="web_url">
        <a>{{ row.web_url }}</a>
      </template>
      <template slot-scope="{ row, index }" slot="action">
<!--        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">处理</Button>-->
      </template>
    </Table>

    <div style="margin-top: 10px">
      <template>
        <Page :total="total"   @on-change="changepage" />
      </template>
    </div>
  </div>
</template>

<script>
    import { getProjectList } from '@/api/project/project'
    export default {
        name: "index",
        data() {
            return {
                columns12: [
                    {
                        title: '项目名称',
                        key: 'path_with_namespace'
                    },
                    {
                        title: '项目描述',
                        key: 'description',
                    },
                    {
                        title: '项目地址',
                        slot: 'web_url',
                    },

                ],
                projects: [],
                params:{
                    page:1,
                    page_size:10,
                    status:1
                },
                total:0,
            }
        },

        created() {
            this.fetchData()
        },

        methods: {
            fetchData() {
                getProjectList().then(res => {

                    console.log(res)
                    this.projects = res.data
                    console.log(this.projects)
                })
            },
            changepage (index) {
                console.log(index)
                this.params['page'] = index
                this.fetchData(this.params)
            },

        }
    }
</script>

<style scoped>

</style>
