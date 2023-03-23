<template>
    <el-row style="margin-top: 30px">
        <el-col :span="12">
            <el-form-item label="Nama Barang" class="filter-form-item input-small" prop="item_name">
                <el-input v-model="item_name" ref="item_name" placeholder="Masukkan nama barang" @input="emitInput" clearable />
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="Deskripsi" class="filter-form-item input-small" prop="item_description">
                <el-input v-model="item_description" ref="item_description" placeholder="Masukkan deksripsi" @input="emitInput" clearable />
            </el-form-item>
        </el-col>
        <el-col :span="24" class="title-input">
            <el-row type="flex" align="middle" class="row-bg" justify="end">
                <el-col :span="4">Satuan</el-col>
                <el-col :span="20">
                    <el-form-item class="filter-form-item input-small" prop="item_unit_type">
                        <el-select v-model="item_unit_type"
                            placeholder="- Pilih satuan -"
                            filterable
                            clearable
                            value-key="item_unit_type"
                        >
                            <el-option v-for="item, index in unitList" :key="index" :label="item" :value="item" />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" align="middle" class="row-bg">
                <el-col :span="4">Harga Jual</el-col>
                <el-col :span="20">
                    <el-form-item class="filter-form-item input-small" prop="item_sell_price">
                        <el-input v-model="item_sell_price" ref="item_sell_price" placeholder="Masukkan harga jual" @input="emitInput" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" align="middle" class="row-bg">
                <el-col :span="4">Harga Beli Satuan</el-col>
                <el-col :span="20">
                    <el-form-item class="filter-form-item input-small" prop="item_unit_price">
                        <el-input v-model="item_unit_price" ref="item_unit_price" placeholder="Masukkan harga satuan" @input="emitInput" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
                <el-col :span="4">Harga Grosir</el-col>
                <el-col :span="20">
                    <el-row>
                        <el-button round @click="addWholesalerPrice" style="margin-bottom: 20px;">+ Tambah Harga Grosir</el-button>
                    </el-row>
                    <el-row v-if="isWholesalerPrice">
                        <el-col :span="12"><b>Jumlah Min.</b></el-col>
                        <el-col :span="12"><b>Harga Grosir</b></el-col>
                    </el-row>
                    <el-row v-for="(item, index) in wholesalerPrice" :key="index" type="flex" align="middle" class="row-bg">
                        <el-col :span="11">
                            <el-form-item class="filter-form-item input-small-append" prop="wholesaler_qty">
                                <el-input v-model="wholesalerPrice[index].wholesaler_qty" ref="wholesaler_qty" placeholder="" clearable ><template slot="prepend"><b>≥</b></template></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">=</el-col>
                        <el-col :span="11">
                            <el-form-item class="filter-form-item input-small-append" prop="wholesaler_price">
                                <el-input v-model="wholesalerPrice[index].wholesaler_price" ref="wholesaler_price" placeholder="" clearable ><template slot="prepend"><b>Rp</b></template></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <el-button class="table-icon-button danger" @click="removeItem(index)"><i class="el-icon-delete" /></el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-col>
        <!-- <el-col :span="12">
            <el-form-item label="Harga Beli" class="filter-form-item input-small" prop="item_purchase">
                <el-input v-model="item_purchase" ref="item_quantity" placeholder="Masukkan harga beli" @input="emitInput" clearable />
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="Harga Jual" class="filter-form-item input-small" prop="item_sale_price">
                <el-input v-model="item_sale_price" ref="item_sale_price" placeholder="Masukkan harga jual" @input="emitInput" clearable />
            </el-form-item>
        </el-col> -->
    </el-row>
</template>

<script>
import { v4 as uuid } from 'uuid';

export default {
    name: 'FormItem',
    props: {
      item_data: {
        type: Object
      }
    },
    data() {
        return {
            unitList: ['Pcs','Liter','Milliliter'],

            item_name: this.item_data.item_name,
            item_description: this.item_data.item_description,
            item_unit_type: this.item_data.item_unit,
            item_unit_price: this.item_data.item_purchase_price,
            item_sell_price: this.item_data.item_sell_price,

            wholesalerPrice: this.item_data.item_wholesalers ? this.item_data.item_wholesalers : []
        }
    },
    created() {
        console.log('item_datassss', this.item_data);
    },
    computed: {
        isWholesalerPrice() {
            if (this.wholesalerPrice.length > 0) {
                return true
            }

            return false
        }
    },
    methods: {
        emitInput() {
            console.log('item_unit_type: ', this.item_unit_type);
            this.$emit('input', {
                item_name: this.item_name,
                item_description: this.item_description,
                item_unit: this.item_unit_type,
                item_purchase_price: parseInt(this.item_unit_price),
                item_sell_price: parseInt(this.item_sell_price),
                item_wholesalers: this.wholesalerPrice
            });
        },

        addWholesalerPrice() {
            this.wholesalerPrice.push({
                id: uuid(), 
                wholesaler_qty: 1, 
                wholesaler_price: 0
            })
        },

        removeItem(index) {
            this.wholesalerPrice.splice(index, 1)
        },
    }
}
</script>

<style lang="scss" scoped>
.title-input {
    font-size: 14px;
    color: #6b93b0;
}

.title-input .row-bg {
    margin-top: 15px;
    margin-bottom: 15px;
}

</style>