<template>
  <div>
    <Table border :columns="columns12" :data="orderhistory">
      <template slot-scope="{ row }" slot="title">
        <strong>{{ row.title }}</strong>
      </template>
      <template slot-scope="{ row }" slot="type">
        <Tag color="cyan">{{ row.type.name }}</Tag>
      </template>
      <template slot-scope="{ row }" slot="status">
        <strong>
          <div v-if="row.status.id == 3">
            <Tag color="red">{{ row.status.name }}</Tag>
          </div>
          <div v-else="row.status.id == 2">
            <Tag color="success">{{ row.status.name}}</Tag>
          </div>

        </strong>
      </template>
      <template slot-scope="{ row }" slot="applicant">
        <strong>{{ row.applicant.name }}</strong>
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
    import { getorders,updateStatus } from '@/api/workorder/workorder'
    export default {
        data () {
            return {
                columns12: [
                    {
                        title: '工单标题',
                        slot: 'title'
                    },
                    {
                        title: '工单内容',
                        key: 'order_contents',
                        width: 300,
                    },
                    {
                        title: '工单类型',
                        slot: 'type',
                        width:110
                    },
                    {
                        title: '工单状态',
                        slot: 'status',
                        width:100
                    },
                    {
                        title: '申请人',
                        slot: 'applicant',
                        width:105
                    },
                    {
                        title: '处理意见',
                        key: 'result_desc',
                        width:105
                    },
                    {
                        title: '完成时间',
                        key: 'complete_time'
                    }
                ],
                orderhistory: [],
                params:{
                    page:1,
                    page_size:10,
                    status:2
                },
                total:0

            }
        },
        methods: {

            getorderlist(params){
                getorders(params).then(res=>{
                    this.orderhistory = res.data.results
                    this.total = res.data.count
                })
            },
            changepage (index) {
                this.params['page'] = index
                this.getorderlist(this.params)
            }
        },
        created() {
            this.getorderlist(this.params)
        }
    }
</script>
