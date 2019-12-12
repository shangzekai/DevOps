<template>
  <div>
    <template>
      <Table border :columns="columns12" :data="groupinfo">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="number">
          <strong ><Tag color="green">成员列表 {{ row.number }} 人</Tag></strong>
        </template>
        <template slot-scope="{ row, index }" slot="action" >
          <div style="width: 138px; margin-left: -10px">
            <Button type="primary" size="small" style="margin-right: 5px" @click="click(row)">修改</Button>
            <Button type="info" size="small" style="margin-right: 5px" @click="addPower(row)">权限</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
          </div>


          <Modal
            v-model="addPowerModal"
            title="更改用户权限"
            @on-ok="handleaddSubmit(index)"
            @on-cancel="handleReset(index)">
            <template>
              <Form ref="updategrouppower" :model="updategrouppower"  :label-width="80">

                <FormItem label="组名" prop="name">
                  <Input type="text" v-model="updategrouppower.name"></Input>
                </FormItem>

                <FormItem label="权限" prop="power" style="width:1000px" >
                  <Transfer v-model='updategrouppower.power' :data="powerInfo" :target-keys="targetKeys1"
                            :render-format="render1" :titles="['权限列表', '角色权限']"
                            @on-change="handleChange1" >
                  </Transfer>
                </FormItem>

              </Form>
            </template>
          </Modal>

        </template>

      </Table>

<!--      <Modal-->
<!--        v-model="modal1"-->
<!--        title="修改出版商"-->
<!--        @on-ok="handleSubmit(index)"-->
<!--        @on-cancel="handleReset(index)">-->
<!--        <template>-->
<!--          <Form ref="formpublisherupdate" :model="formpublisherupdate"  :label-width="80">-->
<!--            <FormItem label="名称" prop="name">-->
<!--              <Input type="text" v-model="formpublisherupdate.name"></Input>-->
<!--            </FormItem>-->
<!--            <FormItem label="地址" prop="address">-->
<!--              <Input type="text" v-model="formpublisherupdate.address"></Input>-->
<!--            </FormItem>-->
<!--          </Form>-->
<!--        </template>-->
<!--      </Modal>-->

    </template>



    <div style="margin-top: 10px">
      <template>
        <Page :total="total" :page-size="page_size"	  @on-change="changepage" />
      </template>
    </div>


  </div>
</template>

<script>
    import { getGroupList, updateGroupPower,getCurGroupPerm } from '@/api/users/group'
    import { getPermInfo } from '@/api/users/permission'

    export default {
        data () {
            return {
                columns12: [
                    {
                        title: 'ID',
                        key: 'id'
                    },
                    {
                        title: '组名',
                        slot: 'name'
                    },
                    {
                        title: '成员',
                        slot: 'number'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                groupinfo: [],
                total: 0,
                page_size: 2,
                page:1,
                addPowerModal:false,
                powerInfo: [],
                targetKeys1: [],
                resinfo: [],
                updategrouppower : {
                    name:'',
                    power:[]
                }
                // modal1: false,
                // formpublisherupdate: {
                //     name: '',
                //     address: ''
                // }
            }
        },
        methods: {
            //  click (row) {
            //     this.modal1 = true
            //     this.formpublisherupdate = row
            // },

            addPower(row) {
                this.addPowerModal = true
                this.updategrouppower = row
                getPermInfo().then(res => {
                    let mockData = [];
                    for (let i = 0; i < res.data.results.length ; i++) {
                        // console.log(res.data.results[i])
                        mockData.push({
                            key: res.data.results[i].id,
                            label: res.data.results[i].name,
                        });
                    }
                    // console.log(mockData);
                    this.powerInfo =  mockData;
                })
                this.getTargetKeys(row.id)
            },
            getTargetKeys (index) {
                getCurGroupPerm(index).then(res => {
                    console.log(res.data)
                    this.targetKeys1 = res.data
                })
            },
            render1 (item) {
                return item.label;
            },
            handleChange1 (newTargetKeys, direction, moveKeys) {
                console.log(moveKeys);
                this.targetKeys1 = newTargetKeys;
                this.updategrouppower.power = newTargetKeys
            },

            handleaddSubmit (index) {
                let info = this.updategrouppower
                delete info._index
                delete info._rowKey
                console.log(info)

                updateGroupPower(info).then(res => {
                    this.getTableData(this.page, this.page_size)
                })
            },

            handleReset () {
                this.$Message.info('Clicked cancel');
            },
            // remove (index) {
            //     this.publishinfo.splice(index, 1);
            // },

            changepage (index) {
                // console.log(index)
                this.getTableData({'page': index, 'page_size':this.page_size})
            },
            getTableData (page, page_size){
                getGroupList(page, page_size).then(res => {
                    // console.log(res.data)
                    this.groupinfo = res.data.results
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
