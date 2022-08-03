/*
 * @Description: tsx demo
 * @Autor: Alfred
 * @Date: 2022-07-05 09:26:00
 * @FilePath: /main-project/src/views/basic-grammar/composition-api/component/text.tsx
 */
export default defineComponent({
  setup() {
    const size = ref<'large' | 'medium' | 'small'>('small')
    const children = [1, 2, 3, 4]
    const childoption = children.map((item) => {
      return <span style='margin-left: 10px;display: inline-block;'>{item}</span>
    })
    const inputVal = ref('')
    const condition = ref<boolean>(false)
    const changeCondition = (e: PointerEvent) => {
      console.log('输出e', e)
      condition.value = !condition.value
    }
    return () => {
      return (
        <>
          <div>
            测试Props
            {childoption}
          </div>
          <div v-show={false}>chess</div>
          <el-button type={'primary'} size={size.value} onClick={changeCondition}>
            element 点击事件
          </el-button>
          <el-input v-model={inputVal.value}></el-input>
          {condition.value ? <span>A</span> : <span>B</span>}
          <span>{inputVal.value}</span>
        </>
      )
    }
  }
})
