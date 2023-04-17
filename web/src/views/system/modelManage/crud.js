import { request } from '@/api/service'

export const crudOptions = (vm) => {
  return {
    pageOptions: {
      compact: true
    },
    options: {
      tableType: 'vxe-table',
      rowKey: false,
      width: '100%',
      height: '100%' // 表格高度100%, 使用toolbar必须设置
    },
    rowHandle: {
      width: 180,
      edit: {
        thin: true,
        text: '编辑'
      },
      remove: {
        thin: true,
        text: '删除'
      }
    },
    indexRow: { // 或者直接传true,不显示title，不居中
      title: '序号',
      align: 'center',
      width: 100
    },
    viewOptions: {
      disabled: true,
      componentType: 'form'
    },
    formOptions: {
      defaultSpan: 24 // 默认的表单 span
    },
    columns: [
      // {
      //   title: '模型名称',
      //   key: 'description1',
      //   search: {
      //     disabled: true
      //   },
      //   type: 'input',
      //   form: {
      //     component: {
      //       placeholder: '请输入模型名称',
      //       showWordLimit: true,
      //       props: {
      //         type: 'textarea'
      //       }
      //     }
      //   }
      // },
      {
        title: '模型名称',
        key: 'label',
        search: {
          disabled: true
        },
        type: 'input',
        form: {
          disabled: false,
          rules: [ // 表单校验规则
            { required: true, message: '模型名称必填项' }
          ],
          itemProps: {
            class: { yxtInput: true }
          },
          component: {
            placeholder: '请输入模型名称'
          }
        }
      },
      {
        title: 'ID',
        key: 'id',
        show: false,
        width: 90,
        form: {
          disabled: true
        }
      },
      {
        title: '请求方式',
        key: 'method',
        sortable: true,
        search: {
          disabled: false
        },
        type: 'select',
        dict: {
          data: [
            {
              label: 'GET',
              value: 0
            },
            {
              label: 'POST',
              value: 1
            },
            {
              label: 'PUT',
              value: 2
            },
            {
              label: 'DELETE',
              value: 3
            }
          ]
        },
        form: {
          rules: [ // 表单校验规则
            {
              required: true,
              message: '必填项'
            }
          ],
          component: {
            span: 12
          },
          itemProps: {
            class: { yxtInput: true }
          }
        }
      },
      {
        title: '接口类型',
        key: 'inter_type',
        sortable: true,
        search: {
          disabled: false
        },
        type: 'select',
        dict: {
          data: [
            {
              label: 'state',
              value: 0
            },
            {
              label: 'predict',
              value: 1
            },
            {
              label: 'params',
              value: 2
            }
          ]
        },
        form: {
          rules: [ // 表单校验规则
            {
              required: true,
              message: '必填项'
            }
          ],
          component: {
            span: 12
          },
          itemProps: {
            class: { yxtInput: true }
          }
        }
      },
      {
        title: '接口状态',
        key: 'state',
        sortable: true,
        search: {
          disabled: false
        },
        type: 'select',
        dict: {
          data: [
            {
              label: '可用',
              value: 0
            },
            {
              label: '忙碌',
              value: 1
            },
            {
              label: '不可用',
              value: 2
            }
          ]
        },
        form: {
          rules: [ // 表单校验规则
            {
              required: true,
              message: '必填项'
            }
          ],
          component: {
            span: 12
          },
          itemProps: {
            class: { yxtInput: true }
          }
        }
      },
      {
        title: '模型类型',
        key: 'model_type',
        sortable: true,
        search: {
          disabled: false
        },
        type: 'select',
        dict: {
          data: [
            {
              label: 'Tree',
              value: 0
            },
            {
              label: 'DAG',
              value: 1
            },
            {
              label: 'Encoder',
              value: 2
            },
            {
              label: 'Matching Model',
              value: 3
            }
          ]
        },
        form: {
          rules: [ // 表单校验规则
            {
              required: true,
              message: '必填项'
            }
          ],
          component: {
            span: 12
          },
          itemProps: {
            class: { yxtInput: true }
          }
        }
      },
      {
        title: '接口地址',
        key: 'url',
        search: {
          disabled: true
        },
        type: 'input',
        form: {
          disabled: false,
          rules: [ // 表单校验规则
            { required: true, message: '模型接口地址必填项' }
          ],
          itemProps: {
            class: { yxtInput: true }
          },
          component: {
            placeholder: '请输入模型接口地址'
          }
        }
      },
      {
        title: '数据权限认证',
        key: 'enable_datasource',
        search: {
          disabled: false
        },
        width: 150,
        type: 'radio',
        dict: {
          data: vm.dictionary('button_status_bool')
        },
        form: {
          value: true,
          component: {
            span: 12
          }
        }
      },
      {
        title: '项目',
        key: 'project',
        search: {
          disabled: true
        },
        minWidth: 140,
        type: 'table-selector',
        dict: {
          cache: true,
          isTree: true,
          url: '/api/system/modelsIn/get/',
          value: 'id', // 数据字典中value字段的属性名
          label: 'label' // 数据字典中label字段的属性名
        },
        form: {
          rules: [ // 表单校验规则
            {
              required: true,
              message: '必填项'
            }
          ],
          itemProps: {
            class: { yxtInput: true }
          },
          component: {
            span: 12,
            pagination: true,
            props: { multiple: false }
          }
        },
        component: {
          name: 'foreignKey',
          valueBinding: 'dept_name'
        }
      },
      {
        title: '授权项目',
        key: 'multi666',
        sortable: true,
        show: true,
        search: {
          disabled: false
        },
        type: 'table-select',
        dict: {
          data: [
            {
              label: '项目1',
              value: 0
            },
            {
              label: '项目2',
              value: 1
            },
            {
              label: '项目3',
              value: 2
            },
            {
              label: '项目4',
              value: 3
            }
          ]
        },
        form: {
          component: {
            name: 'dict-select',
            props: {
              separator: ',', // 多选时，value的分隔符
              elProps: { // el-select的配置项，https://element.eleme.cn/#/zh-CN/component/select
                filterable: true,
                multiple: true,
                clearable: true
              }
            }
          }
        },
        component: {
          name: 'values-format',
          props: {
            multiple: true, // 默认支持多选
            separator: ',' // 多选时，value的分隔符
          }
        }
      },
      {
        title: '备注',
        key: 'remark',
        search: {
          disabled: true
        },
        type: 'textarea',
        form: {
          component: {
            placeholder: '请输入内容',
            showWordLimit: true,
            maxlength: '200',
            props: {
              type: 'textarea'
            }
          }
        }
      }
    ]
  }
}
