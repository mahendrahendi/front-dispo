<template>
  <div class="app-container">
    <!-- HEADER -->
    <div class="title-container">
      <el-col :span="12">
        <h1 class="page-title">Supplier</h1>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <el-tooltip content="Create Supplier" placement="top">
          <el-button type="success" round icon="el-icon-plus" @click="$router.push('/purchase/supplier/create')">Supplier Baru</el-button>
        </el-tooltip>
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
        <el-col :span="5">
          <el-form-item class="filter-form-item input-small">
            <el-input v-model="listQuery.name" placeholder="Nama" clearable @change="handleFilter" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item class="filter-form-item input-small">
            <el-input v-model="listQuery.email" placeholder="Email" clearable @change="handleFilter" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item class="filter-form-item input-small">
            <el-input v-model="listQuery.address" placeholder="Alamat" clearable @change="handleFilter" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="filter-form-item input-small">
            <el-select v-model="listQuery.supplierType" placeholder="Type" clearable @change="handleFilter">
              <el-option v-for="item, index in supplierType" :key="index" :label="item"
                :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </div>

    <!-- FILTER DIALOG FOR SMALL MEDIA -->
    <el-dialog title="Filter" :visible.sync="dialogFilter" class="dialog-small">
      <el-form>
        <el-form-item>
          <el-input v-model="listQuery.nrp" placeholder="NRP" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="listQuery.email" placeholder="Email" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="listQuery.username" placeholder="Username" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="listQuery.phoneNumber" placeholder="Phone Number" clearable />
        </el-form-item>
        <el-form-item>
          <el-select v-model="listQuery.status" placeholder="Status" clearable @change="handleFilter">
            <el-option v-for="item, index in statusList" :key="index" :label="item"
              :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="listQuery.createdFrom" :picker-options="dateBetween" value-format="yyyy-MM-dd"
            type="date" clearable placeholder="Created From" />
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="listQuery.createdTo" :picker-options="dateBetween" value-format="yyyy-MM-dd"
            type="date" clearable placeholder="Created To" />
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="listQuery.lastUpdatedFrom" :picker-options="dateBetween" value-format="yyyy-MM-dd"
            type="date" clearable placeholder="Updated From" />
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="listQuery.lastUpdatedTo" :picker-options="dateBetween" value-format="yyyy-MM-dd"
            type="date" clearable placeholder="Updated To" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="button-custom small primary" @click="handleFilter">Search</el-button>
      </div>
    </el-dialog>

    <!-- TABLE -->
    <el-table :key="tableKey" v-loading="listLoading" :data="dataList" fit @sort-change="sortChange">
      <el-table-column label="Nama / NPWP" prop="efc_nrp">
        <template slot-scope="{row}">
          <span>{{ row.supplier_name }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Nama Jabatan" prop="name" sortable="custom">
        <template slot-scope="{row}">
          <span>{{ row.adm_usr_first_name }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="Email" prop="efc_email">
        <template slot-scope="{row}">
          <span>{{ row.supplier_email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Country / Mata Uang" prop="efc_username">
        <template slot-scope="{row}">
          <span>{{ row.supplier_address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="WhatsApp No." prop="efc_phone_number">
        <template slot-scope="{row}">
          <span>{{ row.supplier_whatsapp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Barang" align="center" prop="efc_phone_number">
        <template slot-scope="{row}">
          <span><el-tooltip content="Edit" placement="top">
            <el-button type="info" round @click="$router.push({ path: '/purchase/supplier/item/list', query: { supplier_id: row.supplier_id, supplier_name: row.supplier_name } })"><i class="el-icon-box" /></el-button>
          </el-tooltip></span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Action" align="center" width="150px">
        <template slot-scope="{row}">
          <el-tooltip content="Edit" placement="top">
            <el-button class="table-icon-button primary" @click="handleEdit(row)"><i
                class="el-icon-edit" /></el-button>
          </el-tooltip>
          <el-tooltip content="Delete" placement="top">
            <el-button class="table-icon-button danger"
              @click="handleDelete(row.enforcer_id, row.enforcer_nrp, row.enforcer_username)"><i class="el-icon-delete" />
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column> -->
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
import { getSupplierList } from '@/api/supplier'
import { getRoleList } from '@/api/role-management'
import CryptoJS from 'crypto-js'

export default {
  components: { Pagination },
  filters: {
    dateFilter: function (date) {
      if (moment(date).isValid()) {
        return moment(date).format('DD MMM YYYY')
      } else {
        return '-'
      }
    },
    dateTimeFilter: function (date) {
      if (moment(date).isValid()) {
        return moment(date).format('DD MMM YYYY HH:mm')
      } else {
        return '-'
      }
    }
  },
  data() {
    const validateAlphabets = (rule, value, callback) => {
      if (!validAlphabets(value)) {
        callback(new Error('Only allow alphabets'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct email'))
      } else {
        callback()
      }
    }
    const validateNumber = (rule, value, callback) => {
      if (!validNumeric(value)) {
        callback(new Error('Mobile number must be numeric'))
      } else {
        callback()
      }
    }
    const isSame = (rule, value, callback) => {
      if (value != this.enforcerListForm.enforcer_password) {
        callback(
          new Error(
            'Confirm password does not match! Make sure your password correct'
          )
        )
      } else {
        callback()
      }
    }
    const isSameChangePassword = (rule, value, callback) => {
      if (value != this.changePasswordForm.enforcer_updated_password) {
        callback(
          new Error(
            'Confirm password does not match! Make sure your password correct'
          )
        )
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      const result = validPassword(value)
      if (result == 'complex') {
        callback(
          new Error(
            'Password must be at least 8 characters contains uppercase, lowercase, number, special character (@$!%*?&)'
          )
        )
      } else if (result == 'sequence') {
        callback(
          new Error(
            'Password can not contain sequence and predictable word (abc, 123, password, etc)'
          )
        )
      } else if (result == 'repeat') {
        callback(
          new Error('Password can not contain repeated alphabet or number')
        )
      } else {
        if (
          this.enforcerListForm.adm_usr_first_name &&
          this.enforcerListForm.adm_usr_last_name &&
          this.enforcerListForm.adm_usr_email &&
          this.enforcerListForm.adm_usr_mobile
        ) {
          var regexFirstName = new RegExp(
            '^((?!' + this.enforcerListForm.adm_usr_first_name + ').)*$',
            'i'
          )
          var regexLastName = new RegExp(
            '^((?!' + this.enforcerListForm.adm_usr_last_name + ').)*$',
            'i'
          )
          var regexEmail = new RegExp(
            '^((?!' + this.enforcerListForm.adm_usr_email + ').)*$',
            'i'
          )
          var regexMobile = new RegExp(
            '^((?!' + this.enforcerListForm.adm_usr_mobile + ').)*$',
            'i'
          )
          if (
            !regexFirstName.test(value) ||
            !regexLastName.test(value) ||
            !regexEmail.test(value) ||
            !regexMobile.test(value)
          ) {
            callback(
              new Error('Password can not contain personal information')
            )
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
    }

    return {
      // filter date
      dateBetween: { disabledDate: this.disabledOtherDate },

      // query var
      listQuery: {
        page: 1,
        pagesize: 10,
        order: 'supplier_id desc',
        start: 1,
        name: '',
        email: '',
        address: '',
        supplierType : 'vendor',
      },

      // table var
      tableKey: 0,
      listLoading: true,
      total: 0,
      dataList: [],
      editList: [],

      // flag var
      isShowPassword: false,
      isShowConfirmPassword: false,

      // dropdown var
      roleList: ['Role 1', 'Role 2'],
      statusList: ['ACTIVE', 'INACTIVE'],
      supplierType: ['vendor', 'customer'],
      satpasList: ['SATPAS 1', 'SATPAS 2', 'SATPAS 3', 'SATPAS 4', 'SATPAS 5'],

      // dialog var
      dialogFilter: false,
      dialogAddEnforcer: false,
      dialogChangePassword: false,
      dialogTitle: 'Add Admin',

      // form var
      enforcerListForm: {
        edit: false,
        enforcer_id: undefined,
        enforcer_email: '',
        enforcer_jobtitle: '',
        enforcer_nrp: '',
        enforcer_phone_number: '',
        enforcer_status: '',
        enforcer_satpas: '',
        enforcer_username: '',
        enforcer_password: '',
        confirmPassword: ''
      },

      changePasswordForm: {
        enforcer_updated_password: '',
        confirmPasswordUpdated: '',
        enforcer_id: ''
      },

      changePasswordFormRules: {
        enforcer_updated_password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        confirmPasswordUpdated: [{ required: true, trigger: 'blur', validator: isSameChangePassword }]
      },

      userListRules: {
        role_id: [
          { required: true, trigger: 'blur', message: 'Please choose a role' }
        ],
        adm_usr_email: [
          { required: true, trigger: 'blur', validator: validateEmail }
        ],
        adm_usr_nrp: [
          { required: true, trigger: 'blur', message: 'Please enter the correct nrp' }
        ],
        adm_usr_username: [
          { required: true, trigger: 'blur', message: 'Please enter the username' }
        ],
        adm_usr_job_title: [
          { required: true, trigger: 'blur', message: 'Please enter the correct job title' }
        ],
        adm_usr_mobile: [
          { required: true, trigger: 'blur', validator: validateNumber }
        ],
        enforcer_phone_number: [
          { required: true, trigger: 'blur', validator: validateNumber }
        ],
        usr_pwd_hash: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        confirmPassword: [
          { required: true, trigger: 'blur', validator: isSame }
        ]
      }
    }
  },
  created(){
    this.getList()
  },
  methods: {
    navigateToRoot() {
      this.$router.push({ path: '/purchase/supplier/item/list', props: { id: 2 } });
    },
    // DISABLE DATE
    disabledOtherDate(time) {
      var maxDate = moment()._d
      var isAfterMaxDate = time.getTime() > maxDate
      return isAfterMaxDate
    },

    getList() {
      this.listLoading = true
      if (this.listQuery.page == 1) {
        this.listQuery.start = 1
      } else {
        this.listQuery.start = this.listQuery.pagesize * (this.listQuery.page-1) + 1
      }

      getSupplierList(this.listQuery).then(response => {
        this.dataList = response.data.data
        this.total = response.data.total_records
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },

    // button action
    createUser() {
      this.$refs.enforcerListForm.validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.enforcerListForm)
          // tempData.enforcer_password = this.encrypt(this.enforcerListForm.usr_pwd_hash)

          postEnforcer(tempData).then((response) => {
            this.$notify({
              title: 'Success',
              message: 'Successfully create enforcer',
              type: 'success',
              duration: 2000
            })
            this.getList()
            this.dialogAddEnforcer = false
            // this.cancelForm()
          }).catch(() => {})
        }
      })
    },

    updateUser() {
      this.$refs.enforcerListForm.validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.enforcerListForm)

          putEnforcer(tempData, this.enforcerListForm.enforcer_id).then((response) => {
            this.$notify({
              title: 'Success',
              message: 'Successfully update enforcer',
              type: 'success',
              duration: 2000
            })
            this.getList()
            this.dialogAddEnforcer = false
            // this.cancelForm()
          }).catch((err) => {
            this.$notify({
              title: 'Error',
              message: 'Failed update user',
              type: 'error',
              duration: 2000
            })
          })
        }
      })
    },

    // BUTTON ACTION
    handleEdit(row) {
      this.editList = JSON.parse(JSON.stringify(row))
      this.enforcerListForm.edit = true
      this.dialogTitle = 'Edit Enforcer'
      this.enforcerListForm.enforcer_id = row.enforcer_id
      this.enforcerListForm.enforcer_email = row.enforcer_email
      this.enforcerListForm.enforcer_jobtitle = row.enforcer_jobtitle
      this.enforcerListForm.enforcer_nrp = row.enforcer_nrp
      this.enforcerListForm.enforcer_phone_number = row.enforcer_phone_number
      this.enforcerListForm.enforcer_status = row.enforcer_status
      this.enforcerListForm.enforcer_username = row.enforcer_username
      this.dialogAddEnforcer = true
      row.edit = !row.edit
    },

    handleAdd() {
      this.enforcerListForm.edit = false
      this.dialogTitle = 'Add Enforcer'
      this.enforcerListForm.enforcer_email = ''
      this.enforcerListForm.enforcer_jobtitle = ''
      this.enforcerListForm.enforcer_nrp = ''
      this.enforcerListForm.enforcer_phone_number = ''
      this.enforcerListForm.enforcer_status = ''
      this.enforcerListForm.enforcer_username = ''
      this.enforcerListForm.enforcer_password = ''
      this.enforcerListForm.confirmPassword = ''
      this.enforcerListForm.edit = false
      this.dialogAddEnforcer = true
    },

    handleChangePassword(enforcer_id) {
      this.changePasswordForm.enforcer_id = enforcer_id
      this.dialogChangePassword = true
    },

    handleCancelChangePassword() {
      this.dialogChangePassword = false
      this.$refs.changePasswordForm.resetFields()
    },

    changePassword() {
      this.$refs.changePasswordForm.validate((valid) => {
        if (valid) {
          this.loadingChange = true
          const tempData = Object.assign({}, this.changePasswordForm)
          // tempData.enforcer_password = this.encrypt(tempData.enforcer_updated_password)
          tempData.enforcer_password = tempData.enforcer_updated_password
          console.log('tempData: ', tempData);

          putEnforcerPassword(tempData, tempData.enforcer_id).then(() => {
            this.loadingChange = false
            this.$notify({
              title: 'Success',
              message: 'Successfully change password',
              type: 'success',
              duration: 2000
            })
            this.getList()
            this.dialogChangePassword = false
          }).catch(() => {})
        }
      })
    },

    cancelEdit(row) {
      row.edit = false
      // this.getList()
    },

    handleDelete(enforcer_id, nrp, username) {
      MessageBox.confirm(`Are you sure you want to delete enforcer ${nrp} (${username}) ? Your action can not be undone.`, 'Delete Confirmation', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deleteEnforcer(enforcer_id).then((response) => {
          this.$notify({
            title: 'Success',
            message: 'Successfully delete enforcer',
            type: 'success',
            duration: 2000
          })
          this.getList()
        }).catch((err) => {
          this.$notify({
            title: 'Error',
            message: 'Failed update user',
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
