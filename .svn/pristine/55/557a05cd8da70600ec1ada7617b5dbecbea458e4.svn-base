import Mock from 'mockjs'

var arr = []
for (let i = 0; i < 4; i++) {
  const item = Mock.mock({
    'id|+1': 1,
    'name': '@name',
    'children|3-8': [{
      'id': '@id',
      'name': '@name',
      'type': '@sentence(3, 5)',
      'company': '@title(3, 5)',
      'date': '@date'
    }]
  })
  arr.push(item) // 将模拟的数据放到数组中
}

const add = function(option) {
  console.log(option)
}

Mock.mock('http://localhost:9528/api/classifiedManagement', 'get', { list: arr })
Mock.mock('http://localhost:9528/api/addclassifiedManagement', 'post', add)

var data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 1
  }]
})

// export default [
//   {
//     url: '/table/list',
//     type: 'get',
//     response: config => {
//       const items = data.items
//       return {
//         code: 20000,
//         data: {
//           total: items.length,
//           items: items
//         }
//       }
//     }
//   }
// ]
