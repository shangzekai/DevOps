<template>
  <div>
    <Table border :columns="columns12" :data="releasehistory" >

      <template slot-scope="{ row }" slot="applicant">
        <strong>{{ row.applicant[0].name }}</strong>
      </template>
      <template slot-scope="{ row }" slot="reviewer">
        <strong>{{ row.reviewer[0].name }}</strong>
      </template>
      <template slot-scope="{ row }" slot="status">
        <Tag color="red">已上线</Tag>
      </template>

      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="showDetail(row)">详情</Button>
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
    import { getDeployList, createDeploy, updateDeploy, deleteDeploy } from '@/api/release/release'
    export default {
        name: "history",
        data(){
            return {
                columns12: [
                    {
                        title: '项目名称',
                        key: 'name'
                    },
                    {
                        title: '项目版本',
                        key: 'version',
                        width: 110,
                    },
                    {
                        title: '版本描述',
                        key: 'info',
                        width:110
                    },
                    {
                        title: '发布信息',
                        key: 'detail',
                        // width:100
                    },
                    {
                        title: '申请人',
                        slot: 'applicant',
                        width:105
                    },
                    {
                        title: '审核人',
                        slot: 'reviewer',
                        // width:105
                    },
                    {
                        title: '状态',
                        slot: 'status',
                        // width:105
                    },
                    {
                        title: '申请时间',
                        key: 'apply_time'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                currentValue: {},
                releasehistory: [],
                total: 0,
                params: {
                    page: 1,
                    status: 3,
                    pagesize: 10,
                },
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                getDeployList(this.params).then(res => {
                    console.log('dsadsa',res)
                    this.releasehistory = res.data.results
                    console.log(this.releasehistory)
                    this.total = res.data.count
                })
            },
            changepage (index) {
                console.log(index)
                this.params['page'] = index
                this.fetchData(this.params)
            },
            showDetail(row){
                console.log(row)
                this.$Modal.success({
                    width: '800px',
                    title: '执行的结果',
                    content: '<pre style="overflow: auto;">'+row.console_output+'</pre>'
                });
            }
        }
    }
</script>

<style scoped>

</style>
