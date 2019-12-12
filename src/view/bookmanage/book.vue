<template>
  <div>
    <template>
      <Button type="primary" size="small" style="margin-bottom: 5px" @click="addBook()">添加图书</Button>
      <Modal
        v-model="addBookModal"
        title="添加书籍"
        @on-ok="handleAddSubmit()"
        @on-cancel="handleAddReset(index)">
        <template>
          <Form ref="formbookadd" :model="formbookadd"  :label-width="80">
            <FormItem label="书籍名称" prop="name">
              <Input type="text" v-model="formbookadd.name"></Input>
            </FormItem>



            <FormItem label="作者">
              <Select v-model="formbookadd.authors" multiple  @on-change="getAuthors">
                <Option v-for="item in authList" :value="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>

            <!--                <FormItem label="作者" prop="address">-->
            <!--                  <Input type="text" v-model="formbookupdate.authors"></Input>-->
            <!--                </FormItem>-->

            <FormItem label="出版社" prop="publisher">
              <Select v-model="formbookadd.publisher" @on-change="getPublisher">
                <Option  v-for = "item in publisherList" :value="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>

            <FormItem label="日期" prop="publish_date">
              <Row>
                <Col span="12">
                  <DatePicker  v-model="formbookadd.publish_date" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </template>
      </Modal>

      <Table border :columns="columns12" :data="bookinfo">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="authors">
          <strong v-for="(val, key, i) in row.authors "><Tag color="green">{{ val.name }} </Tag></strong>
        </template>
        <template slot-scope="{ row }" slot="publisher">
          <strong>{{ row.publisher.name }}</strong>
        </template>

        <template slot-scope="{ row, index }" slot="action">
          <!--          <Button type="primary"  style="margin-right: 5px" @click="show(index)">查看</Button>-->
          <Button type="primary" size="small" style="margin-right: 5px" @click="updateBook(row)">修改</Button>

          <Modal v-model="updateBookModal" title="修改书籍" @on-ok="handleupdateSubmit(index)" @on-cancel="handleReset(index)">
            <template>
              <Form ref="formbookupdate" :model="formbookupdate"  :label-width="80">

                <FormItem label="书籍名称" prop="name">
                  <Input type="text" v-model="formbookupdate.name"></Input>
                </FormItem>

                <FormItem label="作者">
                  <Select v-model="formbookupdate.authors" multiple>
                    <Option v-for="item in authList" :value="item.id"  >{{ item.name }}</Option>
                  </Select>
                </FormItem>

                <FormItem label="出版社" >
                  <Select v-model="formbookupdate.publisher" >
                    <Option  v-for = "item in publisherList" :value="item.id">{{ item.name }}</Option>
                  </Select>
                </FormItem>

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
    import { getBookInfo,addBookInfo,updateBook } from '@/api/bookmanage/book'
    import { getAuthorList } from '@/api/bookmanage/author'
    import {getPublisher} from "../../api/bookmanage/publisher";

    export default {
        data () {
            return {
                columns12: [
                    {
                        title: '书名',
                        slot: 'name'
                    },
                    {
                        title: '作者',
                        key: 'authors',
                        slot:'authors'
                    },
                    {
                        title: '出版社',
                        key: 'publisher',
                        slot: 'publisher'
                    },
                    {
                        title: '出版日期',
                        key: 'publish_date'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                bookinfo: [],
                total: 0,
                page_size: 2,
                page:1,
                updateBookModal: false,
                addBookModal:false,
                formbookupdate: {
                    name: '',
                    authors: '',
                    publisher:'',
                    publish_date:''
                },
                formbookadd: {
                    name: '',
                    authors: '',
                    publisher:'',
                    publish_date:''
                },
                authList: [],
                publisherList:[],
                updateauthors:'',
                myauthors : '',
                authors:[],

                currentValue:''
            }
        },
        methods: {
            updateBook (row) {

                this.updateBookModal = true
                this.formbookupdate = { ...row }
                // console.log(this.formbookupdate)
                this.formbookupdate['authors'] = this.formbookupdate['authors'].map(it => it.id)
                this.formbookupdate['publisher'] = this.formbookupdate['publisher'].id
                console.log(this.formbookupdate)


                getAuthorList({page_size:100}).then(res => {
                    this.authList = res.data.results
                    // console.log(this.authList)
                })

                getPublisher({page:1, page_size:100}).then(res => {
                    this.publisherList = res.data.results
                })

            },
            addBook() {
                this.addBookModal = true
                getAuthorList({page_size:100}).then(res => {
                    this.authList = res.data.results
                    console.log(this.authList)
                })
                getPublisher({page:1, page_size:100}).then(res => {
                    this.publisherList = res.data.results
                })
            },

            getAuthors(val) {
                console.log(val)
            },
            getPublisher(val) {
                console.log(val)
            },
            handleAddSubmit () {
                let info = this.formbookadd
                console.log(info)
                addBookInfo(info).then(res => {
                    console.log(info)

                    this.getTableData(this.page, this.page_size)
                })
            },


            handleupdateSubmit (index) {
                // const id = this.formpublisherupdate.id
                let info = this.formbookupdate
                delete info._index
                delete info._rowKey
                console.log(info)
                updateBook(info).then(res => {
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
                getBookInfo(page, page_size).then(res => {
                    console.log(res.data)
                    this.bookinfo = res.data.results
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
