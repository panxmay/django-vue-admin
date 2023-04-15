export const crudOptions = (vm) => {
  return {

    pageOptions: {
      compact: true
    },
    options: {
      tableType: 'vxe-table',
      rowKey: true, // 必须设置，true or false
      rowId: 'id',
      height: '100%', // 表格高度100%, 使用toolbar必须设置
      highlightCurrentRow: false,
      treeConfig: { // 树形数据配置
        children: 'children',
        hasChild: 'hasChildren',
        expandAll: true
      }
    },
    rowHandle: {
      width: 230,
      view: {
        thin: true,
        text: '',
        disabled () {
          return !vm.hasPermissions('Retrieve')
        }
      },
      edit: {
        thin: true,
        text: '',
        disabled () {
          return !vm.hasPermissions('Update')
        }
      },
      remove: {
        thin: true,
        text: '',
        disabled () {
          return !vm.hasPermissions('Delete')
        }
      },
      custom: [{
        text: ' 字典配置',
        type: 'success',
        size: 'small',
        emit: 'dictionaryConfigure'
      }]
    },
    indexRow: { // 或者直接传true,不显示title，不居中
      title: '序号',
      align: 'center',
      width: 80
    },
    viewOptions: {
      componentType: 'form'
    },
    formOptions: {
      defaultSpan: 24, // 默认的表单 span
      width: '35%'
    },
    columns: [{
      title: '关键词',
      key: 'search',
      show: false,
      disabled: true,
      search: {
        disabled: false
      },
      form: {
        disabled: true,
        component: {
          props: {
            clearable: true
          },
          placeholder: '请输入关键词'
        }
      },
      view: { // 查看对话框组件的单独配置
        disabled: true
      }
    },
    {
      title: 'ID',
      key: 'id',
      show: false,
      disabled: true,
      width: 90,
      form: {
        disabled: true
      }
    },
    {
      title: '字典名称',
      key: 'label',

      search: {
        disabled: false,
        component: {
          props: {
            clearable: true
          }
        }
      },

      type: 'input',
      form: {
        rules: [ // 表单校验规则
          { required: true, message: '字典名称必填项' }
        ],
        component: {
          props: {
            clearable: true
          },
          placeholder: '请输入字典名称'
        },
        itemProps: {
          class: { yxtInput: true }
        }
      }
    },
    {
      title: '字典编号',
      key: 'value',
      search: {
        disabled: true,
        component: {
          props: {
            clearable: true
          }
        }
      },
      type: 'input',
      form: {
        rules: [ // 表单校验规则
          { required: true, message: '字典编号必填项' }
        ],
        component: {
          props: {
            clearable: true
          },
          placeholder: '请输入字典编号'
        },
        itemProps: {
          class: { yxtInput: true }
        },
        helper: {
          render (h) {
            return (< el-alert title="使用方法：vm.dictionary('字典编号')" type="warning"/>
            )
          }
        }
      }
    },

    {
      title: '状态',
      key: 'status',
      width: 90,
      search: {
        disabled: false
      },
      type: 'radio',
      dict: {
        data: vm.dictionary('button_status_bool')
      },
      component: {
        props: {
          options: []
        }
      },
      form: {
        rules: [ // 表单校验规则
          { required: true, message: '状态必填项' }
        ],
        value: true,
        component: {
          placeholder: '请选择状态'
        },
        itemProps: {
          class: { yxtInput: true }
        }
      }
    },
    {
      title: '多选,本地,自动染色',
      key: 'multi666',
      sortable: true,
      width: 180,
      search: {
        disabled: false,
        title: '多选',
        itemProps: { // 单独设置labelWidth
          labelWidth: '50px'
        },
        component: {
          props: {
            elProps: {
              // filterable: false
            }
          },
          events: {
            clear: () => {
              console.log('test111')
            },
            blur: () => {
              console.log('test22')
            }
          }
        }
      },
      type: 'select',
      form: {
        title: '多选本地',
        component: {
          props: {
            filterable: true,
            multiple: true,
            clearable: true
          }
        }
      },
      dict: {
        data: [
          { value: 'item_key1', label: '深圳', color: 'success' },
          { value: 'item_key2', label: '广州' },
          { value: 'item_key3', label: '武汉' },
          { value: 'item_key4', label: '上海' },
          { value: 'item_key5', label: '北京', color: 'danger' }]
      },
      component: { props: { color: 'auto' } } // 自动染色
    },
    {
      title: '排序',
      key: 'sort',
      width: 90,
      type: 'number',
      form: {
        value: 1,
        component: {
        },
        itemProps: {
          class: { yxtInput: true }
        }
      }
    }
    ].concat(vm.commonEndColumns({
      description: {
        showForm: true,
        showTable: true
      }
    }))
  }
}
