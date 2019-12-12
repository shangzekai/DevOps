<template>
  <div>
    <Table border :columns="columns12" :data="releaselist" >
      <!--      <template slot-scope="{ row }" slot="status">-->
      <!--        <strong>-->
      <!--          <div v-if="row.status.id == 0">-->
      <!--            <Tag color="green"> {{ row.status.name }} </Tag>-->
      <!--          </div>-->
      <!--          <div v-else-if="row.status.id == 1">-->
      <!--            <Tag color="warning">{{ row.status.name }}</Tag>-->
      <!--          </div>-->
      <!--        </strong>-->
      <!--      </template>-->
            <template slot-scope="{ row }" slot="applicant">
              <strong>{{ row.applicant[0].name }}</strong>
            </template>
            <template slot-scope="{ row }" slot="reviewer">
              <strong>{{ row.reviewer[0].name }}</strong>
            </template>
            <template slot-scope="{ row }" slot="status">
              <Tag color="green">{{ row.status.name }}</Tag>
            </template>

            <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="handleEdit(row)">处理</Button>
              <Button type="error" size="small" style="margin-right: 5px" @click="show(index)">取消</Button>

            </template>
    </Table>
    <div style="margin-top: 10px">
      <template>
        <Page :total="total"   @on-change="changepage" />
      </template>
    </div>
    <Modal v-model="stepmodal" title="上线流程"  footer-hide=true>
      <template >
        <Steps :current="active">
          <Step title="申请"></Step>
          <Step title="审核"></Step>
          <Step title="测试"></Step>
          <Step title="灰度"></Step>
          <Step title="上线"></Step>
        </Steps>
        <Form :model="form"  class="demo-form">

          <FormItem label="项目名称" prop="name">
            <Input v-model="form.name" readonly></Input>
          </FormItem>

          <FormItem label="项目版本" prop="version">
            <Input v-model="form.version" readonly></Input>
          </FormItem>

          <FormItem label="项目描述" prop="info">
            <Input v-model="form.info" readonly></Input>
          </FormItem>

          <FormItem label="项目详情" prop="detail">
            <Input v-model="form.detail" type="textarea"  readonly></Input>
          </FormItem>


          <FormItem>
            <div class="btn-wrapper" style="float: right">
              <Button size="small" type="primary" @click="submitForm(form)">下一步</Button>
            </div>
          </FormItem>

        </Form>
      </template>

    </Modal>
  </div>
</template>

<script>
    import { getDeployList, createDeploy, updateDeploy, deleteDeploy } from '@/api/release/release'

    export default {
        name: "list",
        data() {
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
                releaselist: [],
                totalNum: 0,
                stepmodal: false,
                active: 0,
                total: 0,
                params: {
                    page: 1,
                    // search: '',
                    status: 0,
                    pagesize: 10,
                },
                form: {
                    name: '',
                    info: '',
                    version: '',
                    detail: '',
                    status: ''
                }
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
              fetchData() {
                  getDeployList(this.params).then(res => {
                      console.log(res)
                      this.releaselist = res.data.results
                      console.log(this.releaselist)
                      this.total = res.data.count
                  })
              },
              changepage (index) {
                  console.log(index)
                  this.params['page'] = index
                  this.fetchData(this.params)
              },
              /*  处理上线申请，弹出模态窗、提交数据、取消 */
              handleEdit(value) {
                this.currentValue = { ...value }
                this.stepmodal = true
                this.params.status = this.currentValue.status.id
                this.form = this.currentValue
                this.active = this.params.status+1
              },
              // 提交更改申请状态
              submitForm(value) {
                  this.currentValue = { ...value }
                  console.log(this.currentValue.id)
                  console.log(this.active)
                  updateDeploy(this.currentValue.id, this.active, this.currentValue.name).then(res => {
                      console.log(res)
                      this.$Message.success('更新成功');
                      window.location.href = '/releaselist'
                      // this.$router.push({ path: '/releaselist' })
                  })
              },
          }
    }
</script>

<style scoped>
  .ivu-modal-footer{
    display: none;
  }
</style>
