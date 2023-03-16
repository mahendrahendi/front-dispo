<template>
  <div class="app-container">
    <h1 class="page-title">Hi Test User!</h1>
    <div class="page-subtitle">{{new Date()|dateFilter}}</div>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="6" :md="6" :lg="6" v-for="item,index in statNumbers" :key="index">
        <number-card :number="item.number" :label="item.label"/>
      </el-col>
    </el-row>
    <div class="line-chart-wrapper">
      <div class="chart-title">Genaration Performance</div>
      <el-form class="filter-form">
        <el-form-item class="filter-form-item input-small">
          <el-select placeholder="Range" clearable>
            <el-option v-for="item,index in rangeList" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <line-chart :chartData="chartData" />
    </div>
    <el-row :gutter="60">
      <el-col :sm="24" :md="8" :lg="8">
        <el-card class="card-round">
          <div class="card-title">Success rate</div>
          <div class="chart-wrapper">
            <pie-chart class="chart" :label="['Used','Remaining']" :chart-data="qrLicenseUsage" />
            <div class="chart-info">
              <div class="chart-number">{{qrPercentage}}%</div>
              <div class="chart-label">QR generated succesfully</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="16" :lg="16">
        <error-qr-log />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
import NumberCard from '../components/NumberCard'
import PieChart from '../components/PieChart'
import MostActiveSatpas from '../components/MostActiveSatpas'
import ErrorQrLog from '../components/ErrorQrLog'
import LineChart from '../components/LineChart'

export default {
  components: { NumberCard, PieChart, MostActiveSatpas, ErrorQrLog, LineChart},
  filters:{
    dateFilter: function(date) {
      if (moment(date).isValid()) {
        return moment(date).format('DD MMMM YYYY')
      } else {
        return '-'
      }
    },
    numberFormat: function(number){
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    numberColor: function(percent){
      if(percent<0.1){
        return 'danger'
      }
      else if(percent<0.5){
        return 'warning'
      }
      return 'success'
    }
  },
  data(){
    return{
      statNumbers:[
        {
          number:1038,
          label: 'Enforcer Device'
        },
        {
          number:826,
          label: 'Satpas Device'
        },
        {
          number:9607,
          label: 'Avg QR generated/day'
        },
        {
          number:8127,
          label: 'Avg User scan/day'
        },
      ],
      qrLicenseUsage:[
        {
          name:'Success',
          value:480,
        },
        {
          name:'Failed',
          value:120,
        }
      ],
      qrPercentage:0,
      chartData:{
        date:['01/10','02/10','03/10','04/10','05/10','06/10','07/10','08/10','09/10','10/10','11/10','12/10'],
        hit:['123','353','172','268','342','294','301','223','198','292','253','301'],
      },
      rangeList:['Daily','Weekly','Monthly'],
    }
  },
  created(){
    this.getPercentage()
  },
  methods:{
    getPercentage(){
      this.qrPercentage=(this.qrLicenseUsage[0].value/(this.qrLicenseUsage[0].value+this.qrLicenseUsage[1].value))*100
    }
  },
}
</script>

<style lang="scss" scoped>
.page-title{
  margin: 10px 0;
  font-family: 'Quicksand';
  font-weight: 700;
  font-size: 42px;
  line-height: 49px;
  color: #0E436B;
}

.page-subtitle{
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.02em;
  color: #92A2B1;
}

.el-card{
  position: relative;
  padding: 15px;
  margin-top: 15px;
  .card-title{
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 26px;
    line-height: 30px;
    letter-spacing: 0.02em;
    color: #D5E1E7;
    margin-left: 25px;
  }
}

.line-chart-wrapper{
  margin: 20px 0 50px;
  .chart-title{
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 26px;
    line-height: 30px;
    letter-spacing: 0.02em;
    color: #D5E1E7;
    float: left;
  }

  .filter-form{
    float: right;
    z-index: 10;
  }
}

.chart-wrapper{
  margin-top: 40px;
  .chart{
    float: left;
  }
  .chart-info{
    float:right;
    position: absolute;
    bottom: 40px;
    right: 40px;

    .chart-number{
      font-family: 'Roboto';
      font-weight: 700;
      font-size: 42px;
      line-height: 30px;
      letter-spacing: 0.02em;
      color: #D5E1E7;
      margin-bottom: 20px;
      text-align: right;

      &.warning{color: #DDAA48;}
      &.danger{color: #CA5750;}
      &.success{color: #36C591;}
    }

    .chart-label{
      text-align: right;
      margin-bottom: 40px;
    }
  }
}
</style>