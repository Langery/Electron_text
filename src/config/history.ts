import { createBrowerHistory } from 'history'

const history = createBrowerHistory({
  basename: '', // 基链接
  forceRefresh: true // 强制刷新
})

export default history
