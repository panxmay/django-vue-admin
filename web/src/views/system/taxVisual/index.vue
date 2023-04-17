<template>
<d2-container>
    <div slot="header">
        <crud-search
          ref="search"
          :options="crud.searchOptions"
          @submit="handleSearch"
        />
      </div>
      <!-- <d2-crud-x ref="d2Crud" v-bind="_crudProps" v-on="_crudListeners">
      <div slot="header">
        <crud-search
          ref="search"
          :options="crud.searchOptions"
          @submit="handleSearch"
        />
      </div>
    </d2-crud-x> -->
  <div id='showorders1' style='width: 900px; height: 900px'></div>
</d2-container>
</template>

<script>
// import { expendNodes } from "./mock";
import * as api from './api'
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { getAllData, search } from './searchList'
import * as echarts from 'echarts'
export default {
  name: 'taxVisual',
  // props: {
  //   chartList: {
  //     type: Object,
  //     required: true
  //   }
  // },
  // watch: {
  //   chartList: {
  //     handler (val) {
  //       this.formatData(val || [], true)
  //     }
  //   }
  // },
  mixins: [d2CrudPlus.crud],
  mounted () {
    // console.log('user')
    this.showorders()
    const that = this
    getAllData().then((data111) => {
      that.formatData(data111)
    })
  },
  data () {
    return {
      input: '',
      myChart: '',
      seriesData: [],
      seriesLinks: [],
      categories: [],
      lastClickId: '',
      colors: ['#a3d2ca', '#056676', '#ea2c62', '#16a596', '#03c4a1', '#f5a25d',
        '#8CD282', '#32e0c4', '#00FAE1', '#f05454']
    }
  },
  methods: {
    onSubmit () {
      // const that = this
      // // search(this.input).then((data111) => {
      // //   that.formatData(data111)
      // })
    },
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      query.lazy = true
      return api.GetList(query)
    },
    addRequest (row) {
      d2CrudPlus.util.dict.clear()
      this.$store.dispatch('d2admin/dept/load')
      return api.createObj(row)
    },
    updateRequest (row) {
      d2CrudPlus.util.dict.clear()
      this.$store.dispatch('d2admin/dept/load')
      return api.UpdateObj(row)
    },
    delRequest (row) {
      d2CrudPlus.util.dict.clear()
      this.$store.dispatch('d2admin/dept/load')
      return api.DelObj(row.id)
    },
    // 授权
    createPermission (scope) {
      this.$router.push({
        name: 'menuButton',
        params: { id: scope.row.id },
        query: { name: scope.row.name }
      })
    },
    showorders () {
      var chartDom = document.getElementById('showorders1')
      var myChart = echarts.init(chartDom)
      var option
      console.log('log test')
      var graph = require('../../../static/js/les-miserables.json')
      console.log(graph)
      graph.nodes.forEach(function (node) {
        node.label = {
          show: node.symbolSize > 30
        }
      })
      option = {
        title: {
          text: 'Les Miserables',
          subtext: 'Default layout',
          top: 'bottom',
          left: 'right'
        },
        tooltip: {},
        legend: [
          {
            data: graph.categories.map(function (a) {
              return a.name
            })
          }
        ],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'none',
            data: graph.nodes,
            links: graph.links,
            categories: graph.categories,
            roam: true,
            draggable: true,
            label: {
              position: 'right',
              formatter: '{b}'
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            },
            emphasis: {
              focus: 'adjacency',
              lineStyle: {
                width: 10
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    /**
     * 节点点击事件
     */
    async nodeClick (params) {
      const index = this.seriesData.findIndex(
        (item) => item.id === params.data.id
      )
      const name = this.seriesData[index].name
      console.log('点了节点:' + index + 1, name, 'clicked')
      const that = this
      search(name).then((data111) => {
        that.formatData(data111)
      })
    },
    /**
     * 设置echarts配置项,重绘画布
     */
    initCharts () {
      // const that = this
      if (!this.myChart) {
        this.myChart = echarts.init(document.getElementById('chart'))
        this.myChart.on('click', (params) => {
          if (params.dataType === 'node') {
            // 判断点击的是图表的节点部分
            this.nodeClick(params)
          }
        })
      }
      // 指定图表的配置项和数据
      const option = {
        // 动画更新变化时间
        animationDurationUpdate: 500,
        animationEasingUpdate: 'quinticInOut',
        tooltip: {
          show: false
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            legendHoverLink: true, // 是否启用图例 hover(悬停) 时的联动高亮。
            hoverAnimation: true, // 是否开启鼠标悬停节点的显示动画
            focusNodeAdjacency: true,
            edgeLabel: {
              position: 'middle', // 边上的文字样式
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12
                },
                position: 'middle',
                formatter: function (x) {
                  return x.data.name
                }
              }
            },
            edgeSymbol: ['', 'arrow'],
            force: {
              edgeLength: 15,
              repulsion: 200
            },
            roam: true,
            draggable: true, // 每个节点的拖拉
            itemStyle: {
              normal: {
                color: '#00FAE1',
                cursor: 'pointer',
                // color:Math.floor(Math.random()*16777215).toString(16),
                // color: ['#fc853e','#28cad8','#9564bf','#bd407e','#28cad8','#fc853e','#e5a214'],
                label: {
                  show: true,
                  position: [-10, -15],
                  textStyle: {
                    // 标签的字体样式
                    color: '#fff', // 字体颜色
                    fontStyle: 'normal', // 文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                    fontWeight: 'bold', // 'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                    fontFamily: 'sans-serif', // 文字的字体系列
                    fontSize: 12 // 字体大小
                  }

                },
                nodeStyle: {
                  brushType: 'both',
                  borderColor: 'rgba(255,215,0,0.4)',
                  borderWidth: 1
                }
              },
              // 鼠标放上去有阴影效果
              emphasis: {
                shadowColor: '#00FAE1',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 40

              }
            },
            lineStyle: {
              width: 2

            },
            label: {
              fontSize: 18
            },
            symbolSize: 24, // 节点大小
            links: this.seriesLinks,
            data: this.seriesData,
            categories: this.categories,
            cursor: 'pointer'
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option)
    },
    /**
     * 格式化数据到表格需要的数据
     */
    formatData (list, reset = false) {
      const that = this
      const nodes = list.seriesData
      this.seriesData = []
      this.seriesLinks = []
      let colorIndex = 0
      const data = []
      const loadedCat = []
      nodes.forEach((item, index) => {
        if (item.categary && loadedCat.indexOf(item.categary) === -1) {
          colorIndex = Math.floor((Math.random() * that.colors.length))
          loadedCat.push(item.categary)
          this.categories.push({ name: item.categary })
        }
        item.itemStyle = {
          color: that.colors[colorIndex],
          borderColor: '#ffffff'
        }
        data.push(item)
      })
      this.seriesData.push(...data)
      this.seriesLinks.push(...list.linksData)
      this.initCharts()
    }
  }
  // beforeDestroy() {},
}
</script>

<style lang="scss">
.yxtInput {
  .el-form-item__label {
    color: #49a1ff;
  }
}
</style>
