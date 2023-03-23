<template>
  <div class="app-container">
    <!-- HEADER -->
    <div class="title-container">
      <el-col :span="12">
        <div class="title-container">
          <div style="display: flex;">
            <el-button
              class="button-icon primary"
              style="margin-right: 20px"
              icon="el-icon-arrow-left"
              @click="$router.go(-1)"
            />
            <h1 class="page-title">History Saldo</h1>
          </div>
        </div>
      </el-col>
    </div>

    <!-- BUTTON FOR SMALL MEDIA -->
    <div class="page-button-media">
      <el-tooltip content="Filter" placement="top">
        <el-button class="button-icon primary" @click="dialogFilter = true"><i class="fa-solid fa-filter" /></el-button>
      </el-tooltip>
    </div>

    <!-- FILTER -->
    <div class="filter-container">
      <h4 class="filter-form filter-title">Filter</h4>
    </div>
    <div class="filter-container">
      <el-form class="filter-form" style="margin-bottom: 10px">
        <el-col :span="8">
          <el-form-item class="filter-form-item input-small">
            <el-select v-model="listQuery.status" placeholder="Status" clearable @change="handleFilter">
              <el-option v-for="item, index in statusList" :key="index" :label="item"
                :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="5">
          <el-form-item class="filter-form-item input-small">
            <el-select v-model="listQuery.supplierType" placeholder="Type" clearable @change="handleFilter">
              <el-option v-for="item, index in supplierType" :key="index" :label="item"
                :value="item" />
            </el-select>
          </el-form-item>
        </el-col> -->
      </el-form>
    </div>

    <!-- FILTER DIALOG FOR SMALL MEDIA -->
    <el-dialog title="Filter" :visible.sync="dialogFilter" class="dialog-small">
      <el-form>
        <el-form-item>
          <el-select v-model="listQuery.status" placeholder="Type" clearable @change="handleFilter">
            <el-option v-for="item, index in statusList" :key="index" :label="item"
              :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item>
            <el-select v-model="listQuery.supplierType" placeholder="Type" clearable @change="handleFilter">
              <el-option v-for="item, index in supplierType" :key="index" :label="item"
                :value="item" />
            </el-select>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="button-custom small primary" @click="handleFilter">Search</el-button>
      </div>
    </el-dialog>

    <!-- TABLE -->
    <el-table :key="tableKey" v-loading="listLoading" :data="dataList" fit @sort-change="sortChange">
      <el-table-column prop="efc_nrp">
        <template slot="header" >
          <div class="table-header">
            <span>Tanggal Jatuh Tempo</span><br>
            <span style="font-weight: normal">Tanggal Pembelian</span>
          </div>
        </template>
        <template slot-scope="{row}">
          <span><b>{{ row.bill_due_date | dateFilter }}</b></span><br>
          <span>{{ row.bill_start_date | dateFilter }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Nama Jabatan" prop="name" sortable="custom">
        <template slot-scope="{row}">
          <span>{{ row.adm_usr_first_name }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="Status" prop="efc_email">
        <template slot-scope="{row}">
          <el-tag :type="row.bill_status | statusFilter">{{ row.bill_status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="efc_username">
        <template slot="header" >
          <div class="table-header">
            <span>Supplier</span><br>
            <span style="font-weight: normal">Nomor</span>
          </div>
        </template>
        <template slot-scope="{row}">
          <span><b>{{ row.supplier_name }}</b></span><br>
          <span>{{ row.bill_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Jumlah" prop="efc_phone_number">
        <template slot-scope="{row}">
          <span>Rp{{ row.bill_total | toThousandFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Action" align="center" width="150px">
        <template slot-scope="{row}">
          <!-- <el-tooltip content="Edit" placement="top">
            <el-button class="table-icon-button primary" @click="$router.push({ path: '/purchase/bills/edit', query: { id: row.bill_id, title: 'Edit Pembelian' } })"><i
                class="el-icon-edit" /></el-button>
          </el-tooltip> -->
          <el-tooltip content="Change Status Bayar" placement="top" v-show="row.bill_status != 'SUDAH DIBAYAR'">
            <el-button class="table-icon-button primary" @click="handlePaymentStatus(row.bill_id, row.supplier_name, row.bill_status)"><i
                class="el-icon-money" /></el-button>
          </el-tooltip>
          <!-- <el-tooltip content="Change Password" placement="top">
            <el-button class="table-icon-button warning" @click="handleChangePassword(row.enforcer_id)"><i
                class="el-icon-view" /></el-button>
          </el-tooltip> -->
          <el-tooltip content="Delete" placement="top">
            <el-button class="table-icon-button danger"
              @click="handleDelete(row.bill_id, row.supplier_name, row.bill_status)"><i class="el-icon-delete" />
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- Pagination -->
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagesize"
      @pagination="getList" />
  </div>
</template>

<script>
import moment from 'moment'
import Pagination from '@/components/Pagination'
import { validNumeric, validPassword, validUsername, validAlphabets } from '@/utils/validate'
import { MessageBox } from 'element-ui'
import { getEnforcerList, postEnforcer, putEnforcer, putEnforcerPassword, deleteEnforcer } from '@/api/enforcer-account'
import { getBillList, getBillHeader, changeBillStatus, deleteBill } from '@/api/bill'
import { getRoleList } from '@/api/role-management'
import CryptoJS from 'crypto-js'

export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        'SUDAH DIBAYAR': 'success',
        'MENUNGGU PEMBAYARAN': 'warning',
      }
      return statusMap[status]
    },
  },
  data() {
    return {
      // filter date
      dateBetween: { disabledDate: this.disabledOtherDate },

      // query var
      listQuery: {
        page: 1,
        pagesize: 10,
        order: 'bill_id desc',
        start: 1,
        name: '',
        email: '',
        address: '',
        status: '',
        supplierType : 'vendor',
      },

      // table var
      tableKey: 0,
      listLoading: true,
      total: 0,
      dataList: [],
      billHeader: [],

      // dropdown var
      statusList: ['MENUNGGU PEMBAYARAN', 'SUDAH DIBAYAR'],
      supplierType: ['vendor', 'customer'],

      // dialog var
      dialogFilter: false,
    }
  },
  created(){
    this.getList()
    this.getHeader()
  },
  methods: {
    // DISABLE DATE
    disabledOtherDate(time) {
      var maxDate = moment()._d
      var isAfterMaxDate = time.getTime() > maxDate
      return isAfterMaxDate
    },

    getList() {
      this.listLoading = true

      getBillList(this.listQuery).then(response => {
        this.dataList = response.data.data
        this.total = response.data.total_records
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },

    getHeader() {
      this.listLoading = true

      getBillHeader().then(response => {
        this.billHeader = response.data
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },

    handleDelete(id, name, status) {
      MessageBox.confirm(`Are you sure you want to Delete Pembelian ${name} (${status}) ? Your action can not be undone.`, 'Delete Confirmation', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deleteBill(id).then((response) => {
          this.$notify({
            title: 'Success',
            message: 'Successfully delete pembelian',
            type: 'success',
            duration: 2000
          })
          this.getList()
        }).catch((err) => {
          this.$notify({
            title: 'Error',
            message: 'Failed delete pembelian',
            type: 'error',
            duration: 2000
          })
        })
      }).catch(() => { })
    },

    handlePaymentStatus(id, name, status) {
      MessageBox.confirm(`Are you sure you want to Change Payment Status ${name} - (${status}) ? Your action can not be undone.`, 'Delete Confirmation', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        changeBillStatus(id, "paid").then((response) => {
          this.$notify({
            title: 'Success',
            message: 'Successfully change payment status',
            type: 'success',
            duration: 2000
          })
          this.getList()
          this.getHeader()
        }).catch((err) => {
          this.$notify({
            title: 'Error',
            message: 'Failed change payment status',
            type: 'error',
            duration: 2000
          })
        })
      }).catch(() => { })
    },

    cancelForm() {
      const view = this.$route.path
      this.$store
        .dispatch('tagsView/delView', view)
        .then(({ visitedViews }) => {
          const view2 = visitedViews.slice(-1)[0]
          this.$store.dispatch('tagsView/delView', view2)
          this.$router.go('admin-management/list')
        })
    },

    // functionality
    encrypt(data) {
      const key = ')H@McQfTjWnZr4u7w!z%C*F-JaNdRgUk'
      const iv = '514012241051832769327432916264923'
      const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC
      })

      return cipher.toString()
    },

    // SORT & FILTER
    handleFilter() {
      this.dialogFilter = false
      this.listQuery.page = 1
      this.getList()
    },

    sortChange(data) {
      const { prop, order } = data
      switch (order) {
        case 'ascending':
          this.listQuery.order = `${prop} asc`
          break
        case 'descending':
          this.listQuery.order = `${prop} desc`
          break
        default:
          this.listQuery.order = ''
          break
      }
      this.handleFilter()
    }

  }
}
</script>

<style scoped>
.table-column-date {
  white-space: nowrap;
}
</style>