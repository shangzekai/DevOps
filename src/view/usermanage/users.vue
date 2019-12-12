<template>
  <div>
    <template>
      <Button type="primary"  style="margin-right: 3px;margin-bottom: 3px" @click="addUser()">新增</Button>
      <Table border :columns="columns12" :data="userinfo" >
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>

        <template slot-scope="{ row }" slot="role">
          <strong v-for="(item) in row.role"><Tag color="green">{{ item.name }}</Tag></strong>
        </template>

        <template slot-scope="{ row, index }" slot="action" >
          <div style="width: 138px; margin-left: -10px">
            <Button type="primary" size="small" style="margin-right: 3px" @click="click(row)">修改</Button>
            <Button type="info" size="small" style="margin-right: 3px" @click="addGroup(row)">所属组</Button>
            <Button type="error" size="small"  @click="remove(index)">删除</Button>
          </div>
          <Modal
            v-model="modal1"
            title="修改用户"
            @on-ok="handleSubmit(index)"
            @on-cancel="handleReset(index)">
            <template>
              <Form ref="userupdate" :model="userupdate"  :label-width="80">
                <FormItem label="名称" prop="name">
                  <Input type="text" v-model="userupdate.name"></Input>
                </FormItem>
                <FormItem label="手机号" prop="address">
                  <Input type="text" v-model="userupdate.phone"></Input>
                </FormItem>
                <FormItem label="邮箱" prop="email">
                  <Input type="text" v-model="userupdate.email"></Input>
                </FormItem>

                <!--                <FormItem>-->
                <!--                  <Button type="primary" @click="handleSubmit('formCustom')">Submit</Button>-->
                <!--                  <Button @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>-->
                <!--                </FormItem>-->
              </Form>
            </template>
          </Modal>

          <Modal
            v-model="userAddModal"
            title="新增用户"
            @on-ok="handleAddUser()"
            @on-cancel="resetAddUser()">
            <template>
              <Form ref="useradd" :model="useradd"  :label-width="80">
                <FormItem label="名称" prop="name">
                  <Input type="text" v-model="useradd.name"></Input>
                </FormItem>
                <FormItem label="手机号" prop="address">
                  <Input type="text" v-model="useradd.phone"></Input>
                </FormItem>
                <FormItem label="邮箱" prop="email">
                  <Input type="text" v-model="useradd.email"></Input>
                </FormItem>

<!--                <FormItem>-->
<!--                  <Button type="primary" @click="handleSubmit('formCustom')">添加</Button>-->
<!--                  <Button @click="handleReset('formCustom')" style="margin-left: 8px">取消</Button>-->
<!--                </FormItem>-->
              </Form>
            </template>
          </Modal>

          <Modal
            v-model="usergroupmodal"
            title="修改用户所属组"
            @on-ok="handleaddSubmit(index)"
            @on-cancel="handleReset(index)">
            <template>
              <Form ref="usergroupupdate" :model="usergroupupdate"  :label-width="80">
                <FormItem label="名字" prop="name">
                  <Input type="text" v-model="usergroupupdate.name"></Input>
                </FormItem>
                <FormItem label="所属组" >
                  <Select v-model="usergroupupdate.role" multiple >
                    <Option v-for="item in grouplist" :value="item.id" >{{ item.name }}</Option>
                  </Select>
                </FormItem>

              </Form>
            </template>
          </Modal>


        </template>
      </Table>

    </template>



    <div style="margin-top: 10px">
      <template>
        <Page :total="total" :page-size="page_size"	  @on-change="changepage" />
      </template>
    </div>


  </div>
</template>

<script>
    import { getUsers,updateUser,updateUserGroup,createUser } from '@/api/users/users'
    import { getGroupList } from '@/api/users/group'

    export default {
        data () {
            return {
                columns12: [
                    {
                        title: '姓名',
                        slot: 'name'
                    },
                    {
                        title: '手机',
                        key: 'phone'
                    },
                    {
                        title: '邮箱',
                        key: 'email'
                    },
                    {
                        title: '用户所属组',
                        slot: 'role'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                userinfo: [],
                total: 0,
                page_size: 2,
                page:1,
                modal1: false,
                usergroupmodal:false,
                userAddModal:false,
                usergroupupdate:{
                    name :''
                },
                useradd:{
                    name: '',
                    phone: '',
                    email:''
                },
                userupdate: {
                    name: '',
                    phone: '',
                    email:''
                },
                grouplist:[]
            }
        },
        methods: {
            // click (row) {
            //     this.modal1 = true
            //     this.formpublisherupdate = row
            // },
            addUser () {
                this.userAddModal = true
            },
            handleAddUser(){
                let info = this.useradd;
                info['username'] = info['name'];
                console.log(info)
                createUser(info).then(res => {
                    console.log(res);
                })
            },
            resetAddUser(index){

            },
            addGroup (row) {
                this.usergroupmodal = true
                this.usergroupupdate = row

                getGroupList({page_size:100}).then(res => {
                    this.grouplist = res.data.results
                })
            },
            handleaddSubmit (index) {
                // const id = this.formpublisherupdate.id
                let info = this.usergroupupdate
                delete info._index
                delete info._rowKey

                console.log(info)

                updateUserGroup(info).then(res => {
                    this.getTableData(this.page, this.page_size)
                })
            },

            // handleReset () {
            //     this.$Message.info('Clicked cancel');
            // },
            // remove (index) {
            //     this.publishinfo.splice(index, 1);
            // },

            changepage (index) {
                console.log(index)
                this.getTableData({'page': index, 'page_size':this.page_size})
            },
            getTableData (page, page_size){
                getUsers(page, page_size).then(res => {
                    console.log(res.data)
                    this.userinfo = res.data.results
                    this.total = res.data.count
                })
            }
        },
        created() {
            this.getTableData(this.page, this.page_size)
        }
    }
</script>

<style scoped>

</style>
