import _forEach from 'lodash.foreach'

export default {
  props: {
    /**
     * @description dialog配置
     */
    formOptions: {
      type: Object,
      default: null
    },
    /**
     * @description 表单模板
     */
    formTemplate: {
      type: Object,
      default: null
    },
    /**
     * @description 表单校验规则
     */
    formRules: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      /**
       * @description dialog显示与隐藏
       */
      showDialog: false,
      /**
       * @description 表单数据
       */
      formData: {},
      /**
       * @description 表单模式
       */
      formMode: 'edit'
    }
  },
  methods: {
    /**
     * @description 保存行数据
     */
    handleDialogSave () {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false
        }
        const rowData = {}
        if (this.formMode === 'edit') {
          _forEach(this.formData, (value, key) => {
            rowData[key] = value
          })
          this.$emit('row-edit', {
            index: this.editIndex,
            row: rowData
          }, () => {
            this.handleDialogSaveDone(rowData)
          })
        } else if (this.formMode === 'add') {
          _forEach(this.formData, (value, key) => {
            rowData[key] = value
          })
          this.$emit('row-add', rowData, () => {
            this.handleDialogSaveDone(rowData)
          })
        }
      })
    },
    /**
     * @description 取消保存行数据
     */
    handleDialogCancel (done) {
      this.$emit('dialog-cancel', done)
    },
    /**
     * @description 保存完成
     */
    handleDialogSaveDone (rowData) {
      if (this.formMode === 'edit') {
        this.updateRow(this.editIndex, rowData)
      } else if (this.formMode === 'add') {
        this.addRow(rowData)
      }
      this.closeDialog()
    },
    /**
     * @description 关闭模态框
     */
    closeDialog () {
      this.showDialog = false
    }
  }
}
