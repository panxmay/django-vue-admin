import * as api from './api'
export const crudOptions = (vm) => {
  return {
    pageOptions: {
      compact: true
    },
    pagination: false,
    options: {
      tableType: 'vxe-table',
      stripe: false,
      rowKey: true, // 必须设置，true or false
      rowId: 'id',
      height: '100%', // 表格高度100%, 使用toolbar必须设置
      highlightCurrentRow: false,
      // defaultExpandAll: true,
      treeConfig: {
        transform: true,
        rowField: 'id',
        parentField: 'parent',
        hasChild: 'hasChild',
        lazy: true,
        loadMethod: ({ row }) => {
          return api.GetList({ parent: row.id }).then(ret => {
            return ret.data.data
          })
        },
        iconLoaded: 'el-icon-loading' // 美化loading图标
      }
    },

    rowHandle: {
      width: 140,
      custom: [
        // {
        // update:
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
          icon: 'el-icon-check'
        },
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
          icon: 'el-icon-close'
        }
        //   // emit: 'custom-emit'
        // },
      ],
      view: {
        thin: true,
        text: ''
        // disabled () {
        //   return !vm.hasPermissions('Retrieve')
        // }
      },
      edit: false,
      // {
      //     thin: true,
      //     text: '',
      //     disabled () {
      //       return !vm.hasPermissions('Update')
      //     }
      //   },
      remove: false
    //  {
    //     thin: true,
    //     text: '',
    //     disabled () {
    //       return !vm.hasPermissions('Delete')
    //     }
    //   }
    },
    indexRow: {
      // 或者直接传true,不显示title，不居中
      title: '序号',
      align: 'center',
      width: 100
    },

    viewOptions: {
      componentType: 'form'
    },
    formOptions: {
      defaultSpan: 12 // 默认的表单 span
    },
    columns: [
      {
        title: '新实体',
        key: 'entity',
        show: true,
        search: {
          disabled: false
        },
        form: {
          disabled: true,
          component: {
            props: {
              clearable: true
            },
            placeholder: '请输入新实体'
          }
        },
        view: {
          // 查看对话框组件的单独配置
          disabled: true
        }
      },
      {
        title: '实体上下文',
        key: 'context',
        search: {
          disabled: true
        },
        type: 'textarea',
        form: {
          component: {
            placeholder: '请输入内容',
            showWordLimit: true,
            maxlength: '512',
            props: {
              type: 'textarea'
            }
          }
        }
      },
      {
        title: 'Taxonomy',
        key: 'taxo',
        sortable: true,
        search: {
          disabled: false
        },
        type: 'select',
        dict: {
          data: [
            {
              label: 'MILITARY1',
              value: 0
            },
            {
              label: 'MILITARY2',
              value: 1
            },
            {
              label: 'MILITARY3',
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
            span: 12,
            placeholder: '请选择Taxonomy'
          },
          itemProps: {
            class: { yxtInput: true }
          }
        }
      },
      {
        title: '团队',
        key: 'dept',
        search: {
          disabled: true
        },
        minWidth: 140,
        type: 'tree-selector',
        dict: {
          cache: true,
          isTree: true,
          url: '/api/system/dept/all_dept/',
          value: 'id', // 数据字典中value字段的属性名
          label: 'name' // 数据字典中label字段的属性名
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
        title: '团队',
        key: 'dept',
        search: {
          disabled: true
        },
        minWidth: 140,
        type: 'tree-selector',
        dict: {
          cache: true,
          isTree: true,
          url: '/api/system/dept/all_dept/',
          value: 'id', // 数据字典中value字段的属性名
          label: 'name' // 数据字典中label字段的属性名
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
        title: '编码器',
        key: 'encoder1',
        sortable: true,
        search: {
          disabled: false
        },
        type: 'select',
        dict: {
          data: [
            {
              label: 'Word2Vec',
              value: 0
            },
            {
              label: 'Bert',
              value: 1
            },
            {
              label: 'Graph',
              value: 2
            },
            {
              label: '混合编码器',
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
            span: 12,
            placeholder: '请选择编码器'
          },
          itemProps: {
            class: { yxtInput: true }
          }
        }
      },
      {
        title: '位置匹配模型',
        key: 'model1',
        sortable: true,
        search: {
          disabled: false
        },
        type: 'select',
        dict: {
          data: [
            {
              label: 'Bilinear',
              value: 0
            },
            {
              label: 'TMN',
              value: 1
            },
            {
              label: 'TaxoEnrich',
              value: 2
            },
            {
              label: 'TC-SMG',
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
            span: 12,
            placeholder: '请选择位置匹配模型'
          },
          itemProps: {
            class: { yxtInput: true }
          }
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
        show: false,
        title: '上级团队',
        key: 'parent',
        type: 'tree-selector',
        dict: {
          isTree: true,
          label: 'name',
          value: 'id',
          cache: false,
          getData: (url, dict, { form, component }) => { // 配置此参数会覆盖全局的getRemoteDictFunc
            return api.DeptLazy().then(ret => { return ret })
          }
        },
        form: {
          helper: '默认留空为创建者的部门',
          component: {
            span: 12,
            props: {
              multiple: false
            }
          }
        }
      },
      {
        title: '候选上位词',
        key: 'hyper',
        sortable: true,
        form: {
          component: {
            props: {
              clearable: true
            }
          },
          itemProps: {
            class: { yxtInput: true }
          }
        }
      },
      {
        title: '候选下位词',
        key: 'hypo',
        sortable: true,
        form: {
          component: {
            span: 12,
            props: {
              clearable: true
            }
          }
        }
      },
      {
        title: '候选上位词置信度',
        key: 'score1',
        sortable: true,
        form: {
          component: {
            span: 12,
            props: {
              clearable: true
            }
          }
        }
      },
      {
        title: '候选位置置信度',
        key: 'score2',
        sortable: true,
        form: {
          component: {
            span: 12,
            props: {
              clearable: true
            }
          }
        }
      },
      {
        title: '排序',
        key: 'sort',
        show: false,
        sortable: true,
        width: 80,
        type: 'number',
        form: {
          value: 1,
          component: {
            span: 12,
            placeholder: '请选择序号'
          }
        }
      }
    // ]
    ].concat(vm.commonEndColumns())
  }
}
