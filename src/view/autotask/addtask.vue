<template>

  <Tabs>
    <TabPane label="ad-hoc" icon="logo-angular">
      <div>
        <Form :model="addtaskcommand"  label-position="right" :label-width="100" style="margin-left: -25px">

          <FormItem label="目标主机组:" prop="servers" style="width: 500px">
            <Input v-model="addtaskcommand.servers"></Input>
          </FormItem>

          <FormItem label="使用模块名:" prop="moudle" style="width: 500px">
            <Input v-model="addtaskcommand.moudle"></Input>
          </FormItem>

          <FormItem label="使用的动作:" prop="action" style="width: 500px">
            <Input v-model="addtaskcommand.action"></Input>
          </FormItem>

          <!--          <FormItem label="输入执行命令" prop="command">-->
          <!--            <Input v-model="addtaskcommand.command" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入ad-hoc命令..."></Input>-->
          <!--          </FormItem>-->

          <FormItem>
            <Button type="primary" @click="handleSubmitCommand()">执行</Button>
            <Button @click="handleReset('addtaskcommand')" style="margin-left: 8px">重置</Button>
          </FormItem>

<!--          <FormItem label="" prop="result" style="margin-left: -75px;">-->
<!--            <Input v-model="addtaskcommand.result" type="textarea" :autosize="{minRows: 22,maxRows: 25}"   placeholder="执行的结果..."></Input>-->
<!--          </FormItem>-->
          <textarea name="" id="result" cols="150" rows="30" placeholder="执行的结果..." style="padding-left:105px;margin-left: -75px;background-color:black; color: white;font-size: 18px;">

          </textarea>
        </Form>
      </div>
    </TabPane>
    <TabPane label="历史记录" icon="ios-timer">
      <div>

        <Table border :columns="columns12" :data="taskadhoclist">
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
        </Table>

      </div>
    </TabPane>

  </Tabs>


</template>

<script>
    import { gettasks,createTask } from '@/api/task/task'

    export default {
        name: "addadhoctask",
        data() {
            return {
                columns12: [
                    {
                        title: '执行的模块',
                        slot: 'moudle',
                        width: 180,
                    },
                    {
                        title: '执行的主机组',
                        slot: 'servers',
                    },
                    {
                        title: '执行的动作',
                        slot: 'servers',
                        width:100
                    },
                    {
                        title: '执行时间',
                        slot: 'exec_time',
                        width:160
                    }
                ],
                addtaskcommand:{
                    moudle: '',
                    action: '',
                    servers: '',
                    result: ''
                },
                taskadhoclist: [],
                params:{
                    page:1,
                    page_size:10
                },
                total:0,
                // detailres:false,

            }
        },
        methods: {
            handleSubmitCommand(){
                console.log(this.addtaskcommand);
                this.addtaskcommand.status=0
                createTask(this.addtaskcommand).then(res => {
                    console.log(res)
                    if (res.status == 200){
                        // this.$Modal.success({
                        //     width: '800px',
                        //     title: '执行的结果',
                        //     content: '<pre style="overflow: auto;">'+res.data.success.devops.stdout_lines+'</pre>'
                        // });
                        // this.addtaskcommand.result = res.data
                        // console.log(JSON.parse(res.data), typeof JSON.parse(res.data))
                        if (this.addtaskcommand.moudle == 'shell') {
                            var info = JSON.parse(res.data)
                            var ret = info['success'][this.addtaskcommand.servers]['stdout_lines'];
                            var mytext = ret.join('\n');
                            document.getElementById('result').innerText = mytext;
                        }else{
                            document.getElementById('result').innerText = res.data;
                        }

                    }else{
                        document.getElementById('result').innerText = res.data;
                    }

                });
            },

            getadhoclist(params){
                params.status = 'adhoc'
                gettasks(params).then(res=>{
                    console.log(res);
                    // this.taskadhoclist = res.data.results
                    // this.total = res.data.count
                })
            },
            changepage (index) {
                this.params['page'] = index
                this.gettasklist(this.params)
            }

        },
        created() {
            this.getadhoclist(this.params)
        }
    }
</script>

<style scoped>
  .ivu-form-item-content{

  }
</style>
