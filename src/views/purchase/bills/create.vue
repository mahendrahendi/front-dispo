<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <!-- HEADER -->
        <div class="title-container">
          <div style="display: flex;">
            <el-button
              class="button-icon primary"
              style="margin-right: 20px"
              icon="el-icon-arrow-left"
              @click="$router.go(-1)"
            />
            <h1 class="page-title">{{ title }}</h1>
          </div>
        </div>
        <el-form ref="billingListForm" :model="billingListForm" :rules="billRules">
          <div class="summary-container">
            <div class="row">
              <h4 class="summary-form summary-title">Billing</h4>
              <p class="subtitle">
                Detail penagihan muncul di pembelian Anda. Tanggal pembelian digunakan di dasbor dan laporan. Pilih tanggal yang Anda harapkan untuk membayar sebagai Tanggal Jatuh Tempo.
              </p>
              <hr>
            </div>
          </div>
          <div class="data-container">
            <el-row>
              <el-col :span="10">
                <el-form-item label="Supplier" class="filter-form-item input-small" prop="supplier_id">
                  <el-select ref="supplier_id" v-model="supplierListSelected" placeholder="List Supplier" filterable clearable value-key="supplier_id">
                    <el-option v-for="item, index in supplierList"
                               :key="index"
                               :label="item.supplier_name"
                               :value="item"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item v-if="isSupplierListSelected" label="Pembelian dari:" class="filter-form-item input-small"><br>
                  <div class="row detail-container" style="margin-left: 20px;">
                    <p class="title"><b>{{ supplierListSelected.supplier_name }}</b></p>
                    <p>{{ supplierListSelected.supplier_address }}</p>
                    <p>NPWP: {{ supplierListSelected.supplier_npwp ? supplierListSelected.supplier_npwp : "-" }}</p>
                    <p>{{ supplierListSelected.supplier_email }}</p>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="Tanggal Pembelian" class="filter-form-item input-small" prop="bill_start_date">
                      <el-date-picker ref="bill_start_date" v-model="billingListForm.bill_start_date" value-format="yyyy-MM-dd" placeholder="YYYY-MM-DD" type="date" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Nama Bank" class="filter-form-item input-small" prop="bill_bank_name">
                      <el-select ref="bill_bank_name" v-model="billingListForm.bill_bank_code" placeholder="List Bank" filterable clearable value-key="code">
                        <el-option v-for="d, index in bankList"
                                  :key="index"
                                  :label="d.name"
                                  :value="d.code"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="Tanggal Jatuh Tempo" class="filter-form-item input-small" prop="bill_due_date">
                      <el-date-picker ref="bill_due_date" v-model="billingListForm.bill_due_date" value-format="yyyy-MM-dd" placeholder="YYYY-MM-DD" type="date" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Nomor Rekening" class="filter-form-item input-small" prop="bill_account_number">
                      <el-input ref="bill_account_number" v-model="billingListForm.bill_account_number" placeholder="Masukkan No Rekening" clearable />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="Ongkos Kirim" class="filter-form-item input-small" prop="bill_shipping_cost">
                      <el-input ref="bill_shipping_cost" v-model="billingListForm.bill_shipping_cost" placeholder="Masukkan Ongkos Kirim" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Tipe Pembelian" class="filter-form-item input-small" prop="bill_type">
                      <el-select ref="bill_type" v-model="billingListForm.bill_type" placeholder="Bill Type" filterable clearable value-key="bill_type">
                        <el-option v-for="d, index in billType"
                                  :key="index"
                                  :label="d"
                                  :value="d"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row style="margin-top: 30px; font-size: 14px;">
              <el-col :span="4">
                <span>Barang</span>
              </el-col>
              <el-col :span="5">
                <span>Deskripsi</span>
              </el-col>
              <el-col :span="2">
                <span>Satuan</span>
              </el-col>
              <el-col :span="2">
                <span>Kuantitas</span>
              </el-col>
              <el-col :span="3">
                <span>Harga Satuan</span>
              </el-col>
              <el-col :span="2">
                <span>Diskon</span>
              </el-col>
              <el-col :span="2">
                <span>PPN</span>
              </el-col>
              <el-col :span="2" style="text-align: right;">
                <span>Jumlah</span>
              </el-col>
            </el-row>
            <hr>
            <el-row v-for="(item, index) in formItemList" :key="item.id">
              <form-item
                :supplier_id="item.supplier_id"
                :item_id="item.item_id"
                :item_name="item.item_name"
                :item_description="item.item_description"
                :item_qty="item.item_qty"
                :item_price="item.item_price"
                :item_total="item.item_total"
                :item_purchase_price = "item.item_purchase_price"
                :isItemSelected="item.isItemSelected"
                :index="index"
                :item_key="item.id"
                @remove-item="removeItem(index)"
                @input="handleInput"
              />
            </el-row>
            <el-row style="margin-top: 25px; padding-bottom: 50px">
              <el-button style="width: 100%" @click="addMoreItem">Add more..</el-button>
            </el-row>
            <div class="counting">
              <el-row type="flex" style="text-align: right;" class="row-bg" justify="end">
                <el-col :span="6">Subtotal</el-col>
                <el-col :span="5">Rp{{ itemTotal | toThousandFilter }}</el-col>
              </el-row>
              <el-row type="flex" style="text-align: right;" class="row-bg" justify="end">
                <el-col :span="6">Ongkos Kirim</el-col>
                <el-col :span="5">Rp{{ billingListForm.bill_shipping_cost | toThousandFilter }}</el-col>
              </el-row>
              <!-- <el-row type="flex" align="middle" style="text-align: right;" class="row-bg" justify="end">
                <el-col :span="6">Diskon %</el-col>
                <el-col :span="5">
                  <el-form-item class="input-small-right" prop="bill_discount">
                    <el-input ref="bill_discount" v-model="billingListForm.bill_discount" placeholder="Masukkan Diskon" />
                  </el-form-item>
                </el-col>
              </el-row> -->
              <el-row type="flex" style="text-align: right;" class="row-bg" justify="end">
                <el-col :span="6">Total</el-col>
                <el-col :span="5">Rp{{ grandTotal | toThousandFilter }}</el-col>
              </el-row>
            </div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="Catatan" class="input-small" prop="bill_notes">
                  <el-input ref="bill_notes" v-model="billingListForm.bill_notes" type="textarea" :rows="3" placeholder="Masukkan Catatan" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top: 30px;">
              <el-col :span="12">
                <span style="font-size: 14px;">Lampiran</span>
                <div class="editor-container">
                  <dropzone id="myVueDropzone" url="https://httpbin.org/post" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
                </div>
              </el-col>
            </el-row>
          </div>
          <el-row style="text-align: right; margin-top: 25px; padding-bottom: 50px">
            <el-button type="info" round @click="$router.go(-1)">Cancel</el-button>
            <el-button style="margin-right: 25px" type="success" @click="createPurchase" round>Simpan</el-button>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
import { v4 as uuid } from 'uuid';
import FormItem from './components/FormItem.vue'
import Dropzone from '@/components/Dropzone'
import validationRules from './components/validationRules';
import { createUniqueString } from '@/utils'
import { MessageBox } from 'element-ui'
import { getEnforcerList, postEnforcer, putEnforcer, putEnforcerPassword, deleteEnforcer } from '@/api/enforcer-account'
import { getRoleList } from '@/api/role-management'
import { postItem } from '@/api/item'
import { postBill, getBillById } from '@/api/bill'
import { getSupplierList, getItemBySuppId } from '@/api/supplier'
import { getListBank } from '@/api/bank'
import CryptoJS from 'crypto-js'
import { toThousandFilter } from '@/filters';

export default {
  components: { FormItem, Dropzone },
  data() {
    return {
      title: this.$route.query.title,
      id: this.$route.query.id,
      // query var
      listQuery: {
        page: 1,
        pagesize: 1000,
        order: '',
        start: 1,
        name: '',
        email: '',
        address: '',
        supplierType: 'vendor'
      },
      isSupplierListSelected: false,

      // table var
      tableKey: 0,
      listLoading: true,
      total: 0,
      dataList: [],
      editList: [],

      // dropdown var
      roleList: ['Role 1', 'Role 2'],
      ppnList: [0, 11],
      currency: ['USD', 'IDR'],
      supplierListSelected: null,
      supplierList: [],
      itemList: [],
      formItemList: [],
      bankList: [],
      billType: ["raw","operational"],

      // form var
      billingListForm: {
        isEdit: false,
        supplier_id: '',
        bill_start_date: '',
        bill_number: '',
        bill_due_date: '',
        bill_order_number: '',
        bill_items: [],
        bill_notes: '',
        bill_subtotal: 0,
        bill_total: 0,
        bill_discount: 0,
        bill_shipping_cost: 0,
        bill_attachment: '',
        bill_ppn: 0,
        bill_bank_code: '',
        bill_account_number: '',
        bill_type: ''
      },
      selectedSupplier: [],

      billRules: validationRules
    }
  },
  watch: {
    // whenever supplierListSelected question changes, this function will run
    supplierListSelected() {
      if (this.supplierListSelected != '') {
        this.isSupplierListSelected = true
        this.billingListForm.supplier_id = this.supplierListSelected.supplier_id
        this.getItemList(this.supplierListSelected.supplier_id)
        this.formItemList = []
        this.billingListForm.bill_items = []
      } else {
        this.isSupplierListSelected = false
      }
    }
  },
  computed: {
      itemTotal() {
          let bill_item = this.billingListForm.bill_items
          let total = 0
          if (bill_item.length > 0) {
              total = bill_item.reduce((acc, curval) => acc + parseInt(curval.item_total_price), 0);
          }

          return total
      },

      grandTotal() {
          let disc = parseInt(this.billingListForm.bill_discount) / 100
          // let incr = this.itemTotal + parseInt(this.billingListForm.bill_shipping_cost)
          let count = this.itemTotal - (this.itemTotal * disc) + parseInt(this.billingListForm.bill_shipping_cost)
          let total = count ? count : 0
          return total
      },
  },
  created() {
    this.getSupplierList()
    this.getBillById()
    this.getBankList()

    this.billingListForm.bill_start_date = new Date()
  },
  methods: {
    dropzoneS(file) {
      console.log(file)
      this.$message({ message: 'Upload success', type: 'success' })
    },
    dropzoneR(file) {
      console.log(file)
      this.$message({ message: 'Delete success', type: 'success' })
    },
    // DISABLE DATE
    disabledOtherDate(time) {
      var maxDate = moment()._d
      var isAfterMaxDate = time.getTime() > maxDate
      return isAfterMaxDate
    },
    addMoreItem() {
      this.$refs.billingListForm.validate((valid) => {
        if (valid) {
          this.formItemList.push({
            id: uuid(),
            isItemSelected: false,
            item_name: '',
            item_description: '',
            item_qty: 0,
            item_price: '',
            item_total: '',
            supplier_id: this.supplierListSelected.supplier_id
          })
        }
      })
    },
    getSupplierList() {
      this.listQuery
      getSupplierList(this.listQuery).then(response => {
        this.supplierList = response.data.data
      }).catch(() => {
      })
    },

    getBillById() {
      if (this.id) {
        getBillById(this.id).then(response => {
          let res = response.data
  
          this.billingListForm.bill_start_date = res.bill_start_date,
          this.billingListForm.bill_number = res.bill_number,
          this.billingListForm.bill_due_date = res.bill_due_date,
          this.billingListForm.bill_order_number = res.bill_order_number,
          this.billingListForm.bill_notes = res.bill_notes,
          this.billingListForm.bill_discount = res.bill_discount
          this.billingListForm.bill_items = res.bill_items
          
          //manipulate data before in formItemList
          let temp = []
          res.bill_items.forEach((d, idx) => {
            d.id = Date.now() + idx.toString()
            d.isItemSelected = true
            let total = parseInt(d.item_qty) * parseInt(d.item_amount)
            d.item_total_price = total
            d.item_purchase_price = d.item_amount
            temp.push(d)
          });
          this.formItemList = temp

        }).catch(() => {
        })
      }
    },

    getBankList() {
      this.bankList = getListBank()
    },

    getItemList(id) {
      getItemBySuppId(id).then(response => {
        this.itemList = response.data
      }).catch(() => {})
    },
    removeItem(index) {
	    this.formItemList.splice(index, 1)
	    this.billingListForm.bill_items.splice(index, 1)
    },
    handleInput(data) {
      const billItems = this.billingListForm.bill_items

      if (billItems.length > 0) {
        billItems.map((d, i) => {
          if (data.item_key == d.item_key) {
            billItems.splice(i, 1)
          }
        })
        billItems.push(data)
      } else {
        billItems.push(data)
      }
    },
    // button action
    createPurchase() {
      this.$refs.billingListForm.validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.billingListForm)
          tempData.bill_shipping_cost = parseInt(tempData.bill_shipping_cost)
          tempData.bill_start_date = moment(tempData.bill_start_date).format('YYYY-MM-DD HH:mm:ss')
          tempData.bill_due_date = moment(tempData.bill_due_date).format('YYYY-MM-DD HH:mm:ss')
          tempData.bill_bank_name = tempData.bill_bank_code

          // return console.log('tempData', tempData);

          tempData.bill_items.map((d, i) => {
            if (d.item_status === 'new') {
              const tempItem = d
              tempItem.supplier_id = tempData.supplier_id
              console.log("tempItem: ", tempItem);
              postItem(tempItem).then((response) => {
                this.$notify({
                  title: 'Success',
                  message: 'Sukses tambah item',
                  type: 'success',
                  duration: 2000
                })
                // this.cancelForm()
              }).catch((err) => {
                console.log("err", err);
              })
            }
          })

          
          postBill(tempData).then((response) => {
            this.$notify({
              title: 'Success',
              message: 'Sukses tambah pembelian',
              type: 'success',
              duration: 2000
            })
            this.$router.go(-1)
            // this.cancelForm()
          }).catch((err) => {
            console.log("err", err);
          })
        }
      })
    },

    // SORT & FILTER
    handleFilter() {
      this.dialogFilter = false
      this.listQuery.page = 1
      this.getList()
    }

  }
}
</script>

<style lang="scss" scoped>
.counting {
  .el-col {
    margin: 8px 0px 8px 15px;
  }
}
</style>