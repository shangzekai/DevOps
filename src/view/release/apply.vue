<template>
  <div class="apply">

    <Form :model="form" :rules="rules" ref="form" >

      <FormItem label="选择项目："  prop="name">
        <Select v-model="form.name"  style="width: 60%;" @change="getTag($event)" >
          <Option v-for="item in project_list" :value="item.name"  >{{ item.name }}</Option>
        </Select>
      </FormItem>

      <FormItem label="项目版本：" prop="version">
        <Input v-model="form.version" style="width: 60%;"></Input>
      </FormItem>

      <FormItem label="版本信息：" prop="info">
        <Input v-model="form.info" style="width: 60%;"></Input>
      </FormItem>


      <FormItem label="指派给：" prop="reviewer">
        <Select v-model="form.reviewer" filterable placeholder="请选择工单处理人" style="width: 60%;">
          <Option v-for="item in sa_list" :value="item.id"  >{{ item.name }}</Option>
        </Select>
      </FormItem>

<!--      <FormItem label="上线详情：" prop="detail">-->
<!--        <Input v-model="form.detail" type="textarea" rows="8"  style="width: 60%;"></Input>-->
<!--      </FormItem>-->
      <FormItem>
        <Button type="primary" @click="onSubmit" style="margin-right: 5px">创建</Button>
        <Button @click="onCancel">取消</Button>
      </FormItem>

    </Form>
  </div>
</template>

<script>
import { getSaMembers } from '@/api/users/group'
import { getProjectList, getProjectTag } from '@/api/project/project'
import { createDeploy } from '@/api/release/release'
export default {
  data() {
    return {
      form: {
	      name: '',
        version: '',
        info: '',
        detail: 'aaaaaa',
        reviewer:''
      },
      rules: {
        name: [
          // { required: true, message: '请输入工单类型', trigger: 'blur' }
        ],
        version: [
          { required: true, message: '请输人工单标题', trigger: 'blur' }
        ],
        info: [
          { required: true, message: '请输人工单内容', trigger: 'blur' }
        ],
        reviewer: [
          // { required: true, message: '请输人工单指派人', trigger: 'blur' }
        ],
      },
      sa_list: [],
      project_list: [],
      tag_list: [],
      state: 0
    }
  },

  methods: {
    getSaList() {
        getSaMembers(3).then(res => {
            this.sa_list =  res.data.members
        })
    },
    getProjects(){
        getProjectList().then(res => {
            console.log(res)
            this.project_list = res.data
            console.log(this.project_list)
        })
    },
    getTag(event){
      console.log(event)
      const data = {'project_id':event}
      getProjectTag(data).then(res => {
        this.tag_list = res
        console.log(this.tag_list)
      })

    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        const params = Object.assign({}, this.form)
        console.log(params)
        createDeploy(params).then(res => {
          console.log(res)
          this.$Message.success('创建成功')
          this.$router.push({ path: '/releaselist' })
        })
      })
    },
    onCancel() {
      this.$Message.warning('取消')
    }
  },

  created() {
    this.state = 1
    this.getSaList()
    this.getProjects()
  }

}
</script>

<style scoped>
.line{
  text-align: center;
}
.apply{
    margin-top:2cm;
    margin-left: 50px;
}
</style>

