export default {
    supplier_id: [
        { required: true, trigger: 'blur', message: 'Please choose Supplier ID' }
    ],
    bill_start_date: [
        { required: true, trigger: 'blur', message: 'Please enter Tanggal pembelian' }
    ],
    bill_number: [
        { required: true, trigger: 'blur', message: 'Please enter Nomor Pembelian' }
    ],
    bill_due_date: [
        { required: true, trigger: 'blur', message: 'Please enter Tanggal jatuh tempo' }
    ],
    bill_order_number: [
        { required: true, trigger: 'blur', message: 'Please enter Nomor Pembelian' }
    ],
    bill_type: [
        { required: true, trigger: 'blur', message: 'Please choose Bill Type' }
    ],
}