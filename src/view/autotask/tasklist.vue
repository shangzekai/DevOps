<template>
  <div>
    <Table border :columns="columns12" :data="tasklist">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row }" slot="playbook">
            {{ row.playbook }}
      </template>
      <template slot-scope="{ row }" slot="status">
        <strong>
          <div v-if="row.status == 'N'">
            <Tag color="red">未执行</Tag>
          </div>
          <div v-else="row.status == 'Y'">
            <Tag color="success">已执行</Tag>
          </div>
        </strong>
      </template>
      <template slot-scope="{ row }" slot="exec_time">
        <strong>{{ row.exec_time }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="execTask(row)">执行</Button>
        <Button type="error" size="small" @click="detail(row)">详情</Button>
        <Modal
          v-model="detailres"
          width="80%"
          cancel-text=""
          title="最终执行返回的结果">
              <span>
                  <pre>{{ mydetail }}</pre>
              </span>
        </Modal>
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
    import { gettasks,exectask,getresult } from '@/api/task/task'

    export default {
        data () {
            return {
                columns12: [
                    {
                        title: '任务名称',
                        slot: 'name',
                        width: 180,
                    },
                    {
                        title: 'PlayBook',
                        slot: 'playbook',
                    },
                    {
                        title: '执行状态',
                        slot: 'status',
                        width:100
                    },
                    {
                        title: '执行时间',
                        slot: 'exec_time',
                        width:160
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                tasklist: [],
                params:{
                    page:1,
                    page_size:10
                },
                total:0,
                detailres:false,
                mydetail: ''

            }
        },
        methods: {
            execTask (row) {
                console.log(row)
                delete row._index
                delete row._rowKey
                exectask(row).then(res => {
                    console.log(res)
                    this.gettasklist(this.params)
                })
            },
            detail (row) {
                let id = row.id
                // console.log(id)
                getresult(id).then(res => {
                    // console.log(res.data.detail_result)
                    // this.$Modal.info({
                    //     title: '最终执行返回结果',
                    //     content: '<pre>' + res.data.detail_result + '</pre>',
                    //     width:'80%',
                    //     height:500,
                    // });
                    this.detailres = true
                    this.mydetail = res.data.detail_result
                    // console.log(this.mydetail.detail_result)
                })
            },
            gettasklist(params){
                gettasks(params).then(res=>{
                    this.tasklist = res.data.results
                    this.total = res.data.count
                })
            },
            changepage (index) {
                this.params['page'] = index
                this.gettasklist(this.params)
            }
        },
        created() {
            this.gettasklist(this.params)
        }
    }
</script>

<style scoped>

  pre{
    font-weight: bold;
    color: white;
    font-size: 16px;
    background-color: black;
    overflow: auto;
  }

</style>
