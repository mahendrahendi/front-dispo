<template>
    <el-row v-if="!isItemListSelected">
      <el-col :span="24">
        <el-form-item class="input-small">
          <el-select v-model="itemListSelectedTemp"
                     placeholder="- Pilih Barang -"
                     filterable
                     clearable
                     value-key="supplier_id"
          >
            <el-option v-for="item, index in itemList" :key="index" :label="item.item_name" :value="item" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-button style="width: 100%" round type="primary" @click="addNewItem">Tambah Barang Baru</el-button>
      </el-col>
    </el-row>
    <el-row v-else-if="isItemListSelected" style="margin-top: 30px">
      <el-col :span="4">
        <el-form-item class="filter-form-item input-small" prop="item_name">
          <el-input ref="item_name" v-model="list.item_name" :disabled="isDisabled" placeholder="Nama Item" clearable @input="emitInput" />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item class="filter-form-item input-small" prop="item_description">
          <el-input ref="item_description" v-model="list.item_description" placeholder="Deksripsi Item" clearable @input="emitInput" />
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item class="filter-form-item input-small" prop="item_unit">
          <el-select ref="item_unit" v-model="list.item_unit" value-key="item_unit">
            <el-option v-for="item, index in unitList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item class="filter-form-item input-small" prop="item_qty">
          <el-input ref="item_qty" v-model="list.item_qty" type="number" placeholder="Kuantitas Item" clearable @input="emitInput" />
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item class="filter-form-item input-small" prop="item_purchase_price">
          <el-input 
            ref="item_purchase_price" 
            v-model="list.item_purchase_price"
            placeholder="Harga Beli"
            @input="emitInput" 
          />
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item class="filter-form-item input-small" prop="item_discount">
          <el-input ref="item_discount" v-model="list.item_discount" placeholder="%" @input="emitInput" />
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item class="filter-form-item input-small" prop="item_ppn">
          <el-select ref="item_ppn" v-model="list.item_ppn" placeholder="%" @input="emitInput" value-key="item_ppn">
            <el-option v-for="item, index in ppnList"
              :key="index"
              :label="item != 0 ? `${item}%` : 'Non-PPN'"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <p class="item-total">Rp{{ list.item_total_price | toThousandFilter }}</p>
      </el-col>
      <el-col :span="2">
        <p class="item-total">
          <el-button class="table-icon-button danger" @click="removeItem(item_key)"><i class="el-icon-delete" />
          </el-button>
        </p>
      </el-col>
    </el-row>
  </template>
  
<script>
  import { getItemBySuppId } from '@/api/supplier'
  import { toThousandFilter} from '@/filters'

  export default {
    name: 'FormItem',
    props: {
      item_id: {
        type: Number
      },
      item_name: {
        type: String,
        default: ''
      },
      item_description: {
        type: String,
        default: ''
      },
      item_qty: {
        type: Number,
        default: 0
      },
      item_purchase_price: {
        type: Number
      },
      item_total: {
        type: String,
      },
      isSupplierListSelected: {
        type: Boolean,
        default: false
      },
      item_key: {
        type: String
      },
      item_discount: {
        type: Number,
        default: 0
      },
      supplier_id: {
        type: Number,
        default: 0
      },
      item_ppn: {
        type: Number,
        default: 0
      },
      item_unit: {
        type: String,
      },
      isItemSelected: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        unitList: ['Pcs','Liter','Milliliter'],
        ppnList: [0, 11],
        itemList: [],
        isItemListSelected: this.isItemSelected,
        list: {
          item_id: this.id,
          item_name: this.item_name,
          item_description: this.item_description,
          item_qty: this.item_qty,
          item_discount: this.item_discount,
          item_ppn: this.item_ppn,
          item_purchase_price: this.item_purchase_price,
          item_total_price: 0,
          item_status: '',
          item_unit: this.item_unit,
          item_wholesalers: []
        },
        itemListSelectedTemp: '',
        isDisabled: false
      }
    },
    watch: {
      // whenever supplierListSelected question changes, this function will run
      itemListSelectedTemp() {
        if (this.itemListSelectedTemp != '') {
          this.list.item_id = this.itemListSelectedTemp.item_id
          this.list.item_name = this.itemListSelectedTemp.item_name
          this.list.item_description = this.itemListSelectedTemp.item_description
          this.list.item_qty = 1
          this.list.item_unit = this.itemListSelectedTemp.item_unit
          this.list.item_wholesalers = this.itemListSelectedTemp.wholesalers
          this.list.item_purchase_price = this.itemListSelectedTemp.item_purchase_price
          this.list.item_discount = this.itemListSelectedTemp.item_discount ? this.itemListSelectedTemp.item_discount : 0
          this.list.item_ppn = this.itemListSelectedTemp.item_ppn ? this.itemListSelectedTemp.item_ppn : 0

          let count_qty = parseInt(this.itemListSelectedTemp.item_purchase_price) * 1
          let count_discount = count_qty - (count_qty * (parseInt(this.itemListSelectedTemp.item_discount) / 100))
          let total = count_discount + (count_discount * (parseInt(this.itemListSelectedTemp.item_ppn) / 100))

          this.list.item_total_price = total
          this.list.item_status = 'ready'
          this.isDisabled = true
          this.isItemListSelected = true

          console.log('this.itemListSelectedTemp: ', this.itemListSelectedTemp);
          console.log('this.list: ', this.list);

          this.emitInput()
        } else {
          this.isItemListSelected = false
        }
      },
      supplier_id() {
        if (this.supplier_id != 0) {
          this.getItemList(this.supplier_id)
        }
      },

      'list.item_qty'() {
        let wholePrice = this.list.item_wholesalers
        
        if (wholePrice != null) {
          wholePrice.sort((a, b) => {
            if (a.wholesaler_qty < b.wholesaler_qty) {
              return -1;
            }
            if (a.wholesaler_qty > b.wholesaler_qty) {
              return 1;
            }
            return 0;
          });

          console.log('wholePrice: ', wholePrice);
          wholePrice.map((d, i) => {
            console.log("d.wholesaler_qty: ", d.wholesaler_qty);
            console.log("this.list.item_qty: ", this.list.item_qty);
            console.log("d: ", d);
            if (this.list.item_qty >= d.wholesaler_qty) {
              this.list.item_purchase_price = d.wholesaler_price
            } else if (i == 0 && this.list.item_qty < d.wholesaler_qty) {
              this.list.item_purchase_price = this.itemListSelectedTemp.item_purchase_price
            }
            
          })
        }
      },
    },

    created() {
      this.getItemList(this.supplier_id)
    },

    methods: {
      getItemList(id) {
        getItemBySuppId(id).then(response => {
          this.itemList = response.data
        }).catch(() => {})
      },

      addNewItem() {
        this.isItemListSelected = true
        this.list.item_status = 'new'
      },

      removeItem(index) {
        this.$emit('remove-item', index)
        this.itemList.splice(index, 1)
      },

      emitInput() {
        let disc = this.list.item_discount != '' ? parseInt(this.list.item_discount) : 0
        let count_qty = parseInt(this.list.item_purchase_price) * this.list.item_qty
        let count_discount = count_qty - (count_qty * (disc / 100))
        let count_ppn = count_discount + (count_discount * (parseInt(this.list.item_ppn) / 100))
        let total = count_ppn
        this.list.item_total_price = total || 0
        console.log('this.list: ', this.list);

        this.$emit('input', {
          item_id: this.list.item_id,
          item_key: this.item_key,
          item_name: this.list.item_name,
          item_description: this.list.item_description,
          item_qty: parseInt(this.list.item_qty),
          item_discount: parseInt(this.list.item_discount),
          item_ppn: this.list.item_ppn,
          item_purchase_price: parseInt(this.list.item_purchase_price),
          item_total_price: this.list.item_total_price,
          item_status: this.list.item_status,
          item_unit: this.list.item_unit
        })
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .item-total {
      text-align: right;
  }

  .filter-form-item {
    margin-right: 8px;
  }
  </style>