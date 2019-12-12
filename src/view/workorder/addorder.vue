<template>
  <div>
    <template>
      <Form ref="addorderform" :model="addorderform" :rules="ruleaddorderform" :label-width="80">
        <FormItem label="工单类型" prop="type">
          <Select v-model="addorderform.type" placeholder="请选择工单类型">
            <Option v-for="item in typelist" :value="item.id"  >{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem label="工单标题" prop="title">
          <Input type="text" v-model="addorderform.title"></Input>
        </FormItem>
        <FormItem label="工单内容" prop="order_contents">
          <Input type="textarea" v-model="addorderform.order_contents" :autosize="{minRows: 10,maxRows: 10}"></Input>
        </FormItem>
        <FormItem label="指派给" prop="assign_to">
          <Select v-model="addorderform.assign_to" placeholder="请选择工单处理人">
            <Option v-for="item in salist" :value="item.id"  >{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleApplySubmit('addorderform')">申请</Button>
<!--          <Button @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>-->
        </FormItem>
      </Form>
    </template>
  </div>
</template>

<script>
    import { getSaMembers } from '@/api/users/group'
    import { addWorkOrder } from '@/api/workorder/workorder'
    export default {
        name: "addorder",
        data () {
            return {
                addorderform: {
                    type: '',
                    title: '',
                    order_contents: '',
                    assign_to: '',
                },
                ruleaddorderform: {
                    type: [
                        // { required: true, message: '工单类型不能为空', trigger: 'change' }
                    ],
                    title: [
                        { required: true, message: '工单标题不能为空', trigger: 'blur' }
                    ],
                    order_contents: [
                        { required: true, message: '工单内容不能为空', trigger: 'blur' }
                    ],
                    assign_to: [
                        // { required: true, message: '指派人不能为空', trigger: 'change' }
                    ]
                },
                typelist:[{id:0, value:'数据库'}, {id:1, value:'WEB服务'}, {id:2, value:'计划任务'}, {id:3, value:'配置文件'},{id:4, value:'其他'}],
                salist:[],
            }
        },
        methods:{
            getSaList() {
                getSaMembers(3).then(res => {
                    this.salist =  res.data.members
                })
            },
            handleApplySubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let info = this.addorderform
                        console.log(info)
                        addWorkOrder(info).then(res=>{
                            console.log(res)
                            this.$Message.success('Success!');

                            this.$router.push({
                                name: 'handleorder'
                            })
                        })

                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        },
        created() {
          this.getSaList()
        }
    }
</script>

<style scoped>

</style>
