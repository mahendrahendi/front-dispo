<template>
  <div class="app-container">
    <el-row>
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
            <h1 class="page-title">{{ title }}</h1>
          </div>
        </div>
        <el-tooltip content="Riwayat Saldo" placement="top">
          <el-button type="warning" round icon="el-icon-finished" @click="$router.push({path: '/purchase/operational/history-saldo', query: { title: 'History Saldo' }})">Riwayat</el-button>
        </el-tooltip>
        <el-form ref="balanceListForm" :model="balanceListForm" :rules="balanceRules">
          <div class="summary-container">
            <div class="row">
              <h4 class="summary-form summary-title">Umum</h4>
              <p class="subtitle">
                Transfer uang antar akun dengan mata uang yang berbeda dan patok mata uang ke nilai tukar mana pun yang Anda inginkan.
              </p>
              <hr>
            </div>
          </div>
          <div class="data-container">
            <el-row>
              <el-col :span="24">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="Tanggal" class="filter-form-item input-small" prop="balance_date_added">
                      <el-date-picker ref="balance_date_added" v-model="balanceListForm.balance_date_added" value-format="yyyy-MM-dd" placeholder="YYYY-MM-DD" type="date" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Jumlah" class="filter-form-item input-small" prop="balance_amount">
                      <el-input ref="balance_amount" v-model="balanceListForm.balance_amount" clearable placeholder="Masukkan Jumlah"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="Catatan" class="input-small" prop="balance_notes">
                  <el-input ref="balance_notes" v-model="balanceListForm.balance_notes" type="textarea" :rows="3" placeholder="Masukkan Catatan" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top: 30px;">
              <el-col :span="24">
                <span style="font-size: 14px;">Lampiran</span>
                <div class="editor-container">
                  <dropzone id="myVueDropzone" url="https://httpbin.org/post" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
                </div>
              </el-col>
            </el-row>
          </div>
          <el-row style="text-align: right; margin-top: 25px; padding-bottom: 50px">
            <el-button type="info" round @click="$router.go(-1)">Cancel</el-button>
            <el-button style="margin-right: 25px" type="success" @click="createBalance" round>Simpan</el-button>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="6">
            <img src="@/assets/bank-feeds.png" alt="" style="position: absolute">
            <div class="row" style="text-align: right;">
                <h4 class="filter-title">Connect Your Bank</h4>
                <h6>Import transactions securely to automate your bookkeeping and reports by connecting your bank accounts.</h6>
            </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
import MaskedInput from 'vue-masked-input'
import Dropzone from '@/components/Dropzone'
import validationRules from './components/validationRules';
import { MessageBox } from 'element-ui'
import { postBalance } from '@/api/balance'

export default {
  components: { Dropzone, MaskedInput },
  data() {
    return {
      title: this.$route.query.title,
      id: this.$route.query.id,
      
      // table var
      tableKey: 0,
      listLoading: true,

      // form var
      balanceListForm: {
        balance_amount: '',
        balance_attachment: [],
        balance_date_added: '',
        balance_notes: '',
      },

      balanceRules: validationRules
    }
  },

  created() {
    this.balanceListForm.balance_date_added = new Date()
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
    
    // button action
    createBalance() {
      MessageBox.confirm(`Saldo yang telah dimasukkan tidak dapat ditarik kembali. Saldo akan ditambah sebesar Rp${this.balanceListForm.balance_amount}`, 'Apakah kamu yakin ?', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$refs.balanceListForm.validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.balanceListForm)
            tempData.balance_date_added = moment(tempData.balance_date_added).format('YYYY-MM-DD HH:mm:ss')
            tempData.balance_amount = parseInt(tempData.balance_amount)
            
            postBalance(tempData).then((response) => {
              this.$notify({
                title: 'Success',
                message: 'Sukses tambah saldo',
                type: 'success',
                duration: 2000
              })
              // this.$router.go(-1)
            }).catch((err) => {
              this.$notify({
                title: 'Failed',
                message: err,
                type: 'error',
                duration: 2000
              })
            })
          }
        })
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