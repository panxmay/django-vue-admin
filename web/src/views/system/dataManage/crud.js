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
      {
        title: 'Taxonmy名称',
        key: 'projectname',
        show: true,
        disabled: false,
        search: {
          disabled: false
        },
        form: {
          disabled: true,
          component: {
            placeholder: '请输入Taxonomy名称'
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
        width: 90,
        form: {
          disabled: true
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
        title: '授权项目',
        key: 'project',
        sortable: true,
        show: true,
        search: {
          disabled: false
        },
        type: 'select',
        dict: {
          data: [
            {
              label: '团队1',
              value: 0
            },
            {
              label: '团队2',
              value: 1
            },
            {
              label: '团队3',
              value: 2
            },
            {
              label: '团队4',
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
        title: '创建人',
        key: 'name',
        show: true,
        disabled: false,
        search: {
          disabled: false
        },
        form: {
          disabled: true,
          component: {
            placeholder: '请输入创建人'
          }
        },
        view: { // 查看对话框组件的单独配置
          disabled: true
        }
      },
      {
        title: '创建人团队',
        key: 'team',
        show: true,
        disabled: false,
        search: {
          disabled: true
        },
        form: {
          disabled: true,
          component: {
            placeholder: '请输入创建人团队'
          }
        },
        view: { // 查看对话框组件的单独配置
          disabled: true
        }
      },
      {
        title: '备注',
        key: 'description',
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
