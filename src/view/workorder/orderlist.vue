<template>
  <div>
    <Table border :columns="columns12" :data="orderlist" >
      <template slot-scope="{ row }" slot="title">
        <strong>{{ row.title }}</strong>
      </template>
      <template slot-scope="{ row }" slot="type">
        <Tag color="cyan">{{ row.type.name }}</Tag>
      </template>
      <template slot-scope="{ row }" slot="status">
        <strong>
          <div v-if="row.status.id == 0">
            <Tag color="green"> {{ row.status.name }} </Tag>
          </div>
          <div v-else-if="row.status.id == 1">
            <Tag color="warning">{{ row.status.name }}</Tag>
          </div>

        </strong>
      </template>
      <template slot-scope="{ row }" slot="applicant">
        <strong>{{ row.applicant.name }}</strong>
      </template>

      <template slot-scope="{ row, index }" slot="action">

        <div v-if="editIndex === index || row.status.id == 1">
          <Button type="primary" size="small" style="margin-right: 5px" @click="handleSave(row, index)">处理</Button>
          <Button type="warning" size="small" @click="handleCancel(row, index)">取消</Button>
        </div>
        <div v-else>
          <Button type="info"   size="small" style="margin-right: 5px" @click="handleEdit(row, index)">接受</Button>
          <Button type="error" size="small" @click="removeorder(row, index)">驳回</Button>
        </div>

        <Modal v-model="updateworkordermodal" title="处理工单" @on-ok="handleupdateSubmit(index)" @on-cancel="handleReset(index)">
          <template>
            <Form ref="updateworkorder" :model="updateworkorder"  :label-width="80">
              <FormItem label="工单名称" prop="title">
                <Input type="text" v-model="updateworkorder.title" readonly></Input>
              </FormItem>

              <FormItem label="工单内容" prop="order_contents">
                <Input type="textarea" v-model="updateworkorder.order_contents" readonly></Input>
              </FormItem>

              <FormItem label="处理意见"prop="result_desc">
                <Input type="textarea" v-model="updateworkorder.result_desc"></Input>
              </FormItem>
            </Form>
          </template>
        </Modal>

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
                orderlist: [],
                params:{
                    page:1,
                    page_size:10,
                    status:1
                },
                total:0,
                editIndex: -1,  // 当前聚焦的输入框的行数
                updateworkordermodal:false,
                updateworkorder:{
                    title:'',
                    order_contents:'',
                    result_desc:''
                }
            }
        },
        methods: {
            show (index) {

            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            getorderlist(params){
                getorders(params).then(res=>{
                    this.orderlist = res.data.results
                    this.total = res.data.count
                })
            },
            changepage (index) {
                console.log(index)
                this.params['page'] = index
                this.getorderlist(this.params)
            },
            handleEdit (row, index) {
                this.editIndex = index;
                console.log(row, index)

                delete row['_index']
                delete row['_rowKey']
                let info = Object
                info = {'status':1}
                updateStatus(row,info).then(res => {
                    this.getorderlist(this.params)
                })
            },
            handleCancel (row, index){
                this.editIndex = -1

                delete row['_index']
                delete row['_rowKey']
                let info = Object
                info = { 'status':0 }
                updateStatus(row,info).then(res => {
                    this.getorderlist(this.params)
                })
            },
            handleSave (row, index) {
                this.updateworkordermodal = true
                this.updateworkorder = row
            },
            handleupdateSubmit(index){
                let row = this.updateworkorder
                console.log(row)

                delete row['_index']
                delete row['_rowKey']
                let info = Object
                info = { 'status':2, 'result_desc':row['result_desc'] }
                updateStatus(row,info).then(res => {
                    this.getorderlist(this.params)
                })
            },
            removeorder(row, index){
                let info = Object
                info = { 'status':3 }
                updateStatus(row,info).then(res => {
                    this.getorderlist(this.params)
                })
            }
        },
        created() {
            this.getorderlist(this.params)
        }
    }
</script>
