/**
 * 图谱数据源源
 */
export const data = [
  {
    id: 1,
    name: '测试节点1',
    categary: '1',
    symbolSize: 60
  },
  {
    id: 2,
    name: '测试节点2',
    categary: '1',
    symbolSize: 40
  },
  {
    id: 3,
    name: '测试节点3',
    categary: '2'
  },
  {
    id: 4,
    name: '测试节点4',
    categary: ''
  },
  {
    id: 5,
    name: '测试节点测试节点5',
    categary: ''
  },
  {
    id: 6,
    name: '测试节点6',
    categary: '2'
  },
  {
    id: 7,
    name: '测试节点7',
    categary: ''
  },
  {
    id: 8,
    name: '测试节点8',
    categary: ''
  },
  {
    id: 9,
    name: '测试节点9',
    categary: ''
  },
  {
    id: 10,
    name: '测试节点10',
    categary: ''
  }
]
// 节点连线
const linkData = [
  { source: '2', target: '3', name: '' },
  { source: '3', target: '4', name: '' },
  { source: '3', target: '5', name: '' },
  { source: '5', target: '6', name: '' },
  { source: '5', target: '7', name: '' },
  { source: '5', target: '8', name: '' },
  { source: '9', target: '10', name: '' },
  { source: '10', target: '9', name: '' },
  { source: '1', target: '2', name: '' },
  { source: '1', target: '10', name: '' }

]

/**
 * 模糊查询大类
 * @param {*} name
 */
export const search = (name) => {
  return new Promise((resolve, reject) => {
    const result = {
      seriesData: [],
      linksData: []
    }
    const list = data.filter(item => item.name.indexOf(name) >= 0)
    if (list && list.length > 0) {
      result.seriesData = list || []
    } else {
      result.seriesData = data || []
    }
    result.linksData = linkData || []
    if (list.length > 0) {
      resolve(result)
    } else {
      reject()
    }
  })
}

export const getAllData = () => {
  return new Promise((resolve, reject) => {
    const result = {
      seriesData: [],
      linksData: []
    }
    result.seriesData = data || []
    result.linksData = linkData || []
    if (data.length > 0) {
      console.log('resolve')
      resolve(result)
    } else {
      console.log('reject')
      reject()
    }
  })
}

/**
 * 分类2
 */
export const categarys = ['建设用地']
