<template>

  <Tabs>

    <TabPane label="playbook" icon="ios-book">
      <div>
        <Form :model="addtaskform"  label-position="right" :label-width="100">
          <FormItem label="任务名称:" prop="name" style="width: 500px">
            <Input v-model="addtaskform.name"></Input>
          </FormItem>
          <FormItem label="上传文件:" prop="playbook">
            <input type="file" ref="files" @change="getFile($event)" />
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit($event)">添加</Button>
            <Button @click="handleReset('addtaskform')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </div>
    </TabPane>

  </Tabs>


</template>

<script>
    import { createTask } from '@/api/task/task'

    export default {
        name: "addtask",
        data() {
            return {
                addtaskform:{
                    name:'',
                    playbook:''
                },

                //  addtaskformrules: {
                //     name : [
                //         {'required':true, message:'请输入任务名', trigger: 'blur'}
                //     ],
                //     playbook:[
                //         {'required':true, message:'请上传文件', trigger: 'blur'}
                //     ]
                // }
            }
        },
        methods: {
            getFile(event) {
                console.log(this.$refs.files.files[0])
                this.addtaskform.playbook = event.target.files[0]
                console.log(this.addtaskform)
            },

            handleSubmit (name) {
                // this.$refs[name].validate((valid) => {
                //     if (valid) {
                //
                //     } else {
                //         this.$Message.error('Fail!');
                //     }
                // })
                let formData = new FormData()
                formData.append('name', this.addtaskform.name)
                formData.append('playbook',this.addtaskform.playbook)
                let config = {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                }

                createTask(formData, config).then(res => {
                    console.log(res)
                    this.$Message.success('Success!');
                    this.$router.push({path : 'tasklist'})
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>

<style scoped>
  .ivu-form-item-content{

  }
</style>
