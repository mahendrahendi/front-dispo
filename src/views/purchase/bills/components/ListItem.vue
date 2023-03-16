<template>
    <el-row style="margin-top: 30px">
        <el-col :span="4">
            <el-form-item class="filter-form-item input-small" prop="item_name">
                <el-input v-model="list.item_name" ref="item_name" placeholder="Nama Item" clearable />
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item class="filter-form-item input-small" prop="item_description">
                <el-input v-model="list.item_description" ref="item_description" placeholder="Deksripsi Item" clearable />
            </el-form-item>
        </el-col>
        <el-col :span="3">
            <el-form-item class="filter-form-item input-small" prop="item_quantity">
                <el-input v-model="list.item_quantity" ref="item_quantity" placeholder="Kuanitas Item" clearable />
            </el-form-item>
        </el-col>
        <el-col :span="3">
            <el-form-item class="filter-form-item input-small" prop="item_price">
                <el-input v-model="list.item_price" ref="item_price" placeholder="Harga Item" clearable />
            </el-form-item>
        </el-col>
        <el-col :span="5">
            <el-form-item class="filter-form-item input-small" prop="item_total">
                <el-input v-model="list.item_total" ref="item_total" placeholder="Total Item" clearable />
            </el-form-item>
        </el-col>
        <el-col :span="1">
            <el-button class="table-icon-button danger"
              @click="handleDelete()"><i class="el-icon-delete" />
            </el-button>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'FormItem',
    props: {
        item_name: {
            type: String,
            default: ''
        },
        item_description: {
            type: String,
            default: ''
        },
        item_quantity: {
            type: String,
            default: ''
        },
        item_price: {
            type: String,
            default: ''
        },
        item_total: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            list: {
                item_name: this.item_name,
                item_description: this.item_description,
                item_quantity: this.item_quantity,
                item_price: this.item_price,
                item_total: this.item_total
            }
        }
    },
}
</script>