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
        text: null
      },
      remove: {
        thin: true,
        text: null
      },
      custom: [
        {
          thin: true, // 瘦模式，thin=true 且 text=null 可以设置方形按钮节省位置
          text: null, // 按钮文字， null= 取消文字
          //     // text(scope){return 'xx'}, //也可传入一个方法
          //     title: undefined, // 鼠标停留的提示文字
          //     type: 'warning', // 按钮类型  可选值【primary / success / warning / danger / info / text】
          //     icon: 'icon-edit', // 按钮图标
          //     // icon(scope){return 'xx'}  //也可传入一个方法
          size: 'small', // 按钮大小
          circle: false, // 圆形按钮 ，需要thin=true,且text=null
          //     show: false, // 是否显示按钮
          //     // show(index,row){return true}// 支持按条件显隐
          //     disabled: true, // 是否禁用
          //     // disabled(index,row){return true} //支持按条件禁用启用
          //     order: 1 // 排序号，数字小，排前面，默认顺序：查看=1、编辑=2、删除=3、自定义=4
          icon: 'el-icon-download'
        }
      ]
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
        title: '项目名称',
        key: 'label',
        show: true,
        disabled: false,
        search: {
          disabled: false
        },
        form: {
          // disabled: true,
          component: {
            placeholder: '请输入项目名称'
          }
        },
        view: { // 查看对话框组件的单独配置
          disabled: true
        }
      },
      // {
      //   title: 'ID',
      //   key: 'id',
      //   show: false,
      //   width: 90,
      //   form: {
      //     disabled: true
      //   }
      // },
      // {
      //   title: 'Taxonomy',
      //   key: 'taxo',
      //   show: true,
      //   disabled: false,
      //   search: {
      //     disabled: true
      //   },
      //   form: {
      //     // disabled: true,
      //     component: {
      //       placeholder: '请输入Taxonomy名称'
      //     }
      //   },
      //   view: { // 查看对话框组件的单独配置
      //     disabled: true
      //   }
      // },
      // {
      //   title: '数据权限认证',
      //   key: 'enable_datasource',
      //   search: {
      //     disabled: false
      //   },
      //   width: 150,
      //   type: 'radio',
      //   dict: {
      //     data: vm.dictionary('button_status_bool')
      //   },
      //   form: {
      //     value: true,
      //     component: {
      //       span: 12
      //     }
      //   }
      // },
      // {
      //   title: '授权团队',
      //   key: 'project',
      //   sortable: true,
      //   show: true,
      //   search: {
      //     disabled: false
      //   },
      //   type: 'table-select',
      //   dict: {
      //     data: [
      //       {
      //         label: '团队1',
      //         value: 0
      //       },
      //       {
      //         label: '团队2',
      //         value: 1
      //       },
      //       {
      //         label: '团队3',
      //         value: 2
      //       },
      //       {
      //         label: '团队4',
      //         value: 3
      //       }
      //     ]
      //   },
      //   form: {
      //     component: {
      //       name: 'dict-select',
      //       props: {
      //         separator: ',', // 多选时，value的分隔符
      //         elProps: { // el-select的配置项，https://element.eleme.cn/#/zh-CN/component/select
      //           filterable: true,
      //           multiple: true,
      //           clearable: true
      //         }
      //       }
      //     }
      //   },
      //   component: {
      //     name: 'values-format',
      //     props: {
      //       multiple: true, // 默认支持多选
      //       separator: ',' // 多选时，value的分隔符
      //     }
      //   }
      // },
      // {
      //   title: '授权团队',
      //   key: 'dept',
      //   search: {
      //     disabled: true
      //   },
      //   minWidth: 140,
      //   type: 'table-selector',
      //   dict: {
      //     cache: true,
      //     isTree: true,
      //     url: '/api/system/dept/all_dept/',
      //     value: 'id', // 数据字典中value字段的属性名
      //     label: 'name' // 数据字典中label字段的属性名
      //   },
      //   form: {
      //     itemProps: {
      //       class: { yxtInput: true }
      //     },
      //     component: {
      //       span: 12,
      //       pagination: true,
      //       props: { multiple: false }
      //     }
      //   },
      //   component: {
      //     name: 'foreignKey',
      //     valueBinding: 'dept_name'
      //   }
      // },
      // {
      //   title: '授权团队',
      //   key: 'multi666',
      //   sortable: true,
      //   show: true,
      //   search: {
      //     disabled: false
      //   },
      //   type: 'table-select',
      //   dict: {
      //     data: [
      //       {
      //         label: '团队-测试',
      //         value: '0'
      //       },
      //       {
      //         label: '团队1',
      //         value: '1'
      //       },
      //       {
      //         label: '团队2',
      //         value: '2'
      //       }
      //     ]
      //   },
      //   form: {
      //     component: {
      //       name: 'dict-select',
      //       props: {
      //         separator: ',', // 多选时，value的分隔符
      //         elProps: { // el-select的配置项，https://element.eleme.cn/#/zh-CN/component/select
      //           filterable: true,
      //           multiple: true,
      //           clearable: true
      //         }
      //       }
      //     }
      //   },
      //   component: {
      //     name: 'values-format',
      //     props: {
      //       multiple: true, // 默认支持多选
      //       separator: ',' // 多选时，value的分隔符
      //     }
      //   }
      // },
      // {
      //   title: '创建人',
      //   key: 'creator',
      //   show: true,
      //   disabled: true,
      //   search: {
      //     disabled: true
      //   },
      //   form: {
      //     // disabled: true,
      //     component: {
      //       placeholder: '创建人'
      //     }
      //   },
      //   view: { // 查看对话框组件的单独配置
      //     disabled: true
      //   }
      // },
      // {
      //   title: '创建人',
      //   key: 'creater_team',
      //   show: true,
      //   disabled: true,
      //   search: {
      //     disabled: true
      //   },
      //   form: {
      //     // disabled: true,
      //     component: {
      //       placeholder: '创建人团队'
      //     }
      //   },
      //   view: { // 查看对话框组件的单独配置
      //     disabled: true
      //   }
      // },
      // {
      //   title: '创建人团队',
      //   key: 'creater_team',
      //   sortable: true,
      //   show: true,
      //   search: {
      //     disabled: false
      //   },
      //   type: 'select',
      //   dict: {
      //     data: ['团队1','团队2']
      //   },
      //   form: {
      //     component: {
      //       name: 'dict-select',
      //       props: {
      //         separator: ',', // 多选时，value的分隔符
      //         elProps: { // el-select的配置项，https://element.eleme.cn/#/zh-CN/component/select
      //           filterable: true,
      //           multiple: true,
      //           clearable: true
      //         }
      //       }
      //     }
      //   },
      //   component: {
      //     name: 'values-format',
      //     props: {
      //       multiple: true, // 默认支持多选
      //       separator: ',' // 多选时，value的分隔符
      //     }
      //   }
      // },
      // {
      //   title: '备注',
      //   key: 'description',
      //   search: {
      //     disabled: true
      //   },
      //   type: 'textarea',
      //   form: {
      //     component: {
      //       placeholder: '请输入内容',
      //       showWordLimit: true,
      //       maxlength: '200',
      //       props: {
      //         type: 'textarea'
      //       }
      //     }
      //   }
      // }
    ]
  }
}
