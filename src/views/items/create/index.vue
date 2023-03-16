<template>
  <div class="app-container">
    <el-row :gutter="50">
        <el-col :span="18">
            <!-- HEADER -->
            <div class="title-container">
              <div style="display: flex;">
                  <el-button
                  class="button-icon primary"
                  style="margin-right: 20px"
                  icon="el-icon-arrow-left"
                  @click="$router.go(-1)"
                  />
                  <h1 class="page-title">{{ this.$route.meta.title }}</h1>
              </div>
            </div>
            <el-form ref="inputForm" :model="inputForm" :rules="itemListRules">
              <div class="summary-container">
                <div class="row">
                  <h4 class="summary-form summary-title">Umum</h4>
                  <p class="subtitle">
                    Select a category to make your reports more detailed. The description will be populated when the item is selected in an invoice or bill.
                  </p>
                  <hr>
                </div>
              </div>
              <div class="data-container">
                <!-- <el-row>
                  <el-col :span="12">
                    <el-form-item label="Supplier" class="filter-form-item input-small" prop="supplier_name">
                      <el-select v-model="supplierListSelected" placeholder="List Supplier" filterable clearable value-key="supplier_id">
                        <el-option v-for="item, index in supplierList" :key="index" :label="item.supplier_name"
                          :value="item" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Detail Supplier:" v-if="isSupplierListSelected" class="filter-form-item input-small"><br>
                      <div class="row detail-container">
                        <p class="title"><b>{{ supplierListSelected.supplier_name }}</b></p>
                        <p>{{ supplierListSelected.supplier_address ? supplierListSelected.supplier_address : "-" }}</p>
                        <p>{{ supplierListSelected.supplier_email ? supplierListSelected.supplier_email : "-" }}</p>
                        <p>NPWP: {{ supplierListSelected.supplier_npwp ? supplierListSelected.supplier_npwp : "-" }}</p>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row> -->
                <el-row v-if="isSupplierListSelected">
                  <form-item @input="handleInput"/>
                </el-row>
              </div>
              <el-row style="text-align: right; margin-top: 25px; padding-bottom: 50px">
                <el-button @click="$router.go(-1)" type="info" round>Batal</el-button>
                <el-button style="margin-right: 25px" type="success" round @click="createItem">Simpan</el-button>
              </el-row>
            </el-form>
        </el-col>
        <el-col :span="6">
            <img src="@/assets/inventory.png" alt="" style="position: absolute">
            <div class="row" style="text-align: right;">
                <h4 class="filter-title">Inventory</h4>
                <h6>Stock management, SKU, item groups and variants, transfer orders, adjustments, warehouses, histories, and more.</h6>
            </div>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  import moment from 'moment'
  import FormItem from './components/FormItem.vue'
  import { validNumeric, validPassword, validUsername, validAlphabets } from '@/utils/validate'
  import { MessageBox } from 'element-ui'
  import { postItem } from '@/api/item'
  import CryptoJS from 'crypto-js'
  
  export default {
    components: { FormItem },
    props: {
      item_data: {
        type: Object
      }
    },
    data() {
      return {
        
        dataList: [],
        editList: [],
        supplierListSelected: "",
        isSupplierListSelected: true,
  
        selectedSupplier: [],

        supplierList: [],
  
        itemListRules: {
          supplier_id: [
            { required: true, trigger: 'blur', message: 'Please choose supplier' }
          ],
          item_name: [
            { required: true, trigger: 'blur', message: 'Please enter nama barang' }
          ],
        },

        inputForm: {
          supplier_id: parseInt(this.$route.query.supplier_id),
          item_name: "",
          item_description: "",
          item_purchase_price: "",
          item_sale_price: 0,
          item_unit: "",
          item_wholesalers: [],
        }
      }
    },
    
    watch: {
      // whenever supplierListSelected question changes, this function will run
      supplierListSelected() {
        if (this.supplierListSelected != "") {
          this.isSupplierListSelected = true
          this.inputForm.supplier_id = this.supplierListSelected.supplier_id
        } else {
          this.isSupplierListSelected = false
        }
      }
    },

    created(){
      this.editData()
    },

    methods: {
      handleInput(data) {
        this.inputForm.item_name = data.item_name;
        this.inputForm.item_description = data.item_description;
        this.inputForm.item_purchase_price = data.item_purchase_price;
        this.inputForm.item_sell_price = data.item_sell_price;
        this.inputForm.item_unit = data.item_unit;
        this.inputForm.item_wholesalers = data.item_wholesalers;
      },

      editData(){
        const item = this.item_data
        this.inputForm.item_name = item.item_name
        console.log('item_data: ', this.item_data);
      },
  
      // button action
      createItem() {
        // return console.log('inputForm: ', Object.assign({}, this.inputForm));
        this.$refs.inputForm.validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.inputForm)

            let map_wholesalers_item = []
            tempData.item_wholesalers.map((d, i) => {
              map_wholesalers_item.push({
                wholesaler_price: parseInt(d.wholesaler_price),
                wholesaler_qty: parseInt(d.wholesaler_qty)
              })
            })

            tempData.item_wholesalers = map_wholesalers_item
            
            postItem(tempData).then((response) => {
              this.$notify({
                title: 'Success',
                message: 'Berhasil tambah barang..',
                type: 'success',
                duration: 2000
              })
              this.$router.go(-1)
            }).catch((err) => {
              this.$notify({
                title: 'Error',
                message: 'Gagal tambah barang..',
                type: 'error',
                duration: 2000
              })
            })
          }
        })
      }
    }
  }
  </script>
  