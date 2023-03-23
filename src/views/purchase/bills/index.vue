<template>
  <div class="app-container">
    <!-- HEADER -->
    <div class="title-container">
      <el-col :span="12">
        <h1 class="page-title">Pembelian</h1>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <el-tooltip content="Create Pembelian Baru" placement="top">
          <el-button type="success" round icon="el-icon-plus" @click="$router.push({path: '/purchase/bills/create', query: { title: 'Create Pembelian' }})">Pembelian Baru</el-button>
        </el-tooltip>
      </el-col>
    </div>

    <div class="title-container" align="center">
      <el-col :span="12">
        <h1 class="page-title">Rp{{ billHeader.bill_overdue | toThousandFilter }}</h1>
        <h1 class="page-subtitle">Jatuh Tempo</h1>
      </el-col>
      <el-col :span="12">
        <h1 class="page-title">Rp{{ billHeader.bill_draft | toThousandFilter }}</h1>
        <h1 class="page-subtitle">Menunggu Pembayaran</h1>
      </el-col>
    </div>

    <el-tabs v-model="activeTab">
      <el-tab-pane
        key="bills"
        label="Bills"
        name="bills"
      >
        <keep-alive>
          <bills-type-pane 
            v-if="activeTab === 'bills'"
            :key="number_of_change"
          />
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane
        key="recurring"
        label="Recurring Templates"
        name="recurring"
      >
        <keep-alive>
          <recurring-type-pane 
            v-if="activeTab === 'recurring'"
            :key="number_of_change"
          />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
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
import BillsTabPane from './components/TabPane/BillsTabPane.vue'
import RecurringTabPane from './components/TabPane/RecurringTabPane.vue'

export default {
  components: { 
    Pagination, 
    'bills-type-pane': BillsTabPane, 
    'recurring-type-pane': RecurringTabPane 
  },
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
      activeTab: 'bills',

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
      number_of_change: 0
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