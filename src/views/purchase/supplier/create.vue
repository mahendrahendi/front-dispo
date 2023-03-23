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
                  <h1 class="page-title">Create Supplier</h1>
              </div>
            </div>
            <el-form ref="supplierListForm" :model="supplierListForm" :rules="supplierListRules">
              <div class="summary-container">
                <div class="row">
                  <h4 class="summary-form summary-title">Umum</h4>
                  <p class="subtitle">
                    Informasi kontak penyedia Anda akan muncul di pembelian dan profil mereka. Anda dapat menambahkan informasi kontak dan logo mereka untuk digunakan dalam pembelian.
                  </p>
                  <hr>
                </div>
              </div>
              <div class="data-container">
                <el-row>
                  <el-col>
                    <el-form-item label="Nama" class="filter-form-item input-small" prop="supplier_name">
                      <el-input v-model="supplierListForm.supplier_name" ref="supplier_name" placeholder="Masukkan Nama" clearable @change="handleFilter" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="Email" class="filter-form-item input-small" prop="supplier_email">
                      <el-input v-model="supplierListForm.supplier_email" ref="supplier_email" placeholder="Masukkan Email" clearable @change="handleFilter" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="Telepon" class="filter-form-item input-small" prop="supplier_telephone">
                      <el-input v-model="supplierListForm.supplier_telephone" ref="supplier_telephone" placeholder="Masukkan Telepon" clearable @change="handleFilter" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="Whatsapp" class="filter-form-item input-small" prop="supplier_whatsapp">
                      <el-input v-model="supplierListForm.supplier_whatsapp" ref="supplier_whatsapp" placeholder="Masukkan No Whatsapp" clearable @change="handleFilter" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="Deskripsi" class="filter-form-item input-small" prop="supplier_description">
                      <el-input v-model="supplierListForm.supplier_description" placeholder="Masukkan Deskripsi" ref="supplier_description" type="textarea" :rows="5" clearable />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div class="summary-container">
                <div class="row">
                  <h4 class="summary-form summary-title">Billing</h4>
                  <p class="subtitle">
                    Nomor pajak muncul di setiap pembelian yang diterbitkan untuk Anda. Mata uang yang dipilih menjadi mata uang bawaan untuk penyedia ini.
                  </p>
                  <hr>
                </div>
              </div>
              <div class="data-container">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="NPWP" class="filter-form-item input-small" prop="supplier_npwp">
                      <el-input v-model="supplierListForm.supplier_npwp" ref="supplier_npwp" placeholder="Masukkan NPWP" clearable />
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="12">
                    <el-form-item label="Mata Uang" class="filter-form-item input-small" prop="supplier_currency">
                      <el-select v-model="supplierListForm.supplier_currency" placeholder="Status" clearable >
                        <el-option v-for="item, index in currency" :key="index" :label="item"
                          :value="item" />
                      </el-select>
                    </el-form-item>
                  </el-col> -->
                </el-row>
              </div>
              <div class="summary-container">
                <div class="row">
                  <h4 class="summary-form summary-title">Alamat</h4>
                  <p class="subtitle">
                    Alamat diperlukan untuk pembelian, jadi Anda perlu menambahkan detail alamat penagihan untuk penyedia Anda.
                  </p>
                  <hr>
                </div>
              </div>
              <div class="data-container">
                <el-row>
                  <el-col>
                    <el-form-item label="Alamat" class="filter-form-item input-small" prop="supplier_address">
                      <el-input ref="supplier_address" v-model="supplierListForm.supplier_address" placeholder="Masukkan Alamat" clearable @change="handleFilter" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="Town / City" class="filter-form-item input-small" prop="supplier_city">
                      <el-input v-model="supplierListForm.supplier_city" ref="supplier_city" placeholder="Masukkan Town / City" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Postal / Zip Code" class="filter-form-item input-small" prop="supplier_zip_code">
                      <el-input v-model="supplierListForm.supplier_zip_code" ref="supplier_zip_code" placeholder="Masukkan Postal / Zip Code" clearable />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="Province / State" class="filter-form-item input-small" prop="supplier_province">
                      <el-input v-model="supplierListForm.supplier_province" ref="supplier_province" placeholder="Masukkan Province / State" clearable/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Country" class="filter-form-item input-small" prop="supplier_country">
                      <el-select v-model="supplierListForm.supplier_country" placeholder="Country" clearable>
                        <el-option v-for="item, index in country" :key="index" :label="item"
                          :value="item" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <el-row style="text-align: right; margin-top: 25px; padding-bottom: 50px">
                <el-button @click="$router.go(-1)" type="info" round>Cancel</el-button>
                <el-button style="margin-right: 25px" type="success" round @click="createSupplier">Simpan</el-button>
              </el-row>
            </el-form>
        </el-col>
        <el-col :span="6">
            <img src="@/assets/payroll.png" alt="" style="position: absolute">
            <div class="row" style="text-align: right;">
                <h4 class="filter-title">Umum</h4>
                <h6>Create multiple pay calendars,<br>run payrolls, print payslips,<br> add benefits and deductions,<br>and make bulk payments.</h6>
            </div>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  import moment from 'moment'
  import { validNumeric, validPassword, validUsername, validAlphabets } from '@/utils/validate'
  import { MessageBox } from 'element-ui'
  import { getEnforcerList, postEnforcer, putEnforcer, putEnforcerPassword, deleteEnforcer } from '@/api/enforcer-account'
  import { getRoleList } from '@/api/role-management'
  import { postSupplier } from '@/api/supplier'
  import CryptoJS from 'crypto-js'
  
  export default {
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
  
        // table var
        tableKey: 0,
        listLoading: true,
        total: 0,
        dataList: [],
        editList: [],
  
        // dropdown var
        roleList: ['Role 1', 'Role 2'],
        statusList: ['ACTIVE', 'INACTIVE'],
        currency: ['USD', 'IDR'],
        country: ['Indonesia', 'Singapore'],
  
        // form var
        supplierListForm: {
          isEdit: false,
          supplier_address: "scbd",
          supplier_email: "hendi@gmail.com",
          supplier_name: "Hendi",
          supplier_npwp: "1233456",
          supplier_telephone: "091283213",
          supplier_type: "vendor",
          supplier_whatsapp: "918923891231",
          supplier_description: "",
          supplier_status: "",
          supplier_currency: "",
          supplier_founder_address: "",
          supplier_city: "",
          supplier_zip_code: "",
          supplier_province: "",
          supplier_country: ""
        },
  
        supplierListRules: {
          supplier_name: [
            { required: true, trigger: 'blur', message: 'Please enter the name' }
          ],
        }
      }
    },
    created() {
    },
    methods: {
      // DISABLE DATE
      disabledOtherDate(time) {
        var maxDate = moment()._d
        var isAfterMaxDate = time.getTime() > maxDate
        return isAfterMaxDate
      },
  
      // button action
      createSupplier() {
        this.$refs.supplierListForm.validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.supplierListForm)
            
            postSupplier(tempData).then((response) => {
              this.$notify({
                title: 'Success',
                message: 'Successfully create supplier',
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
  
      // SORT & FILTER
      handleFilter() {
        this.dialogFilter = false
        this.listQuery.page = 1
        this.getList()
      },
  
    }
  }
  </script>
  