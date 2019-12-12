<template>
  <div>
    <template>
      <Table border :columns="columns12" :data="publishinfo">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
<!--          <Button type="primary"  style="margin-right: 5px" @click="show(index)">查看</Button>-->
          <Button type="primary" size="small" style="margin-right: 5px" @click="click(row)">修改</Button>
          <Modal
            v-model="modal1"
            title="修改出版商"
            @on-ok="handleSubmit(index)"
            @on-cancel="handleReset(index)">
            <template>
              <Form ref="formpublisherupdate" :model="formpublisherupdate"  :label-width="80">
                <FormItem label="名称" prop="name">
                  <Input type="text" v-model="formpublisherupdate.name"></Input>
                </FormItem>
                <FormItem label="地址" prop="address">
                  <Input type="text" v-model="formpublisherupdate.address"></Input>
                </FormItem>

<!--                <FormItem>-->
<!--                  <Button type="primary" @click="handleSubmit('formCustom')">Submit</Button>-->
<!--                  <Button @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>-->
<!--                </FormItem>-->
              </Form>
            </template>
          </Modal>

          <Button type="error" size="small" @click="remove(index)">删除</Button>
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
    import { getPublisher,updatePublish } from '@/api/bookmanage/publisher'

    export default {
        data () {
            return {
                columns12: [
                    {
                        title: '名称',
                        slot: 'name'
                    },
                    {
                        title: '城市',
                        key: 'city'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                publishinfo: [],
                total: 0,
                page_size: 2,
                page:1,
                modal1: false,
                formpublisherupdate: {
                    name: '',
                    address: ''
                }
            }
        },
        methods: {
            click (row) {
              this.modal1 = true
              this.formpublisherupdate = row
            },
            handleSubmit (index) {
                // const id = this.formpublisherupdate.id
                let info = this.formpublisherupdate
                delete info._index
                delete info._rowKey

                updatePublish(info).then(res => {
                    this.getTableData(this.page, this.page_size)
                })
            },

            handleReset () {
                this.$Message.info('Clicked cancel');
            },
            remove (index) {
                this.publishinfo.splice(index, 1);
            },

            changepage (index) {
                console.log(index)
                this.getTableData({'page': index, 'page_size':this.page_size})
            },
            getTableData (page, page_size){
                getPublisher(page, page_size).then(res => {
                    console.log(res.data)
                    this.publishinfo = res.data.results
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
