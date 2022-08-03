/*
 * @Description: 动态表单
 * @Autor: Alfred
 * @Date: 2022-06-21 14:45:01
 * @FilePath: /main-project/src/components/form-list/index.tsx
 */

interface baseIn {
  key: number | string | undefined
  type: 'input' | 'select'
  label: string
  prop: string
}

interface inputIn extends baseIn {
  type: 'input'
  value: string | number
}

interface selectIn extends baseIn {
  type: 'select'
  value: string | Array<string | number>
  placeholder: string
  itemList: Array<any>
  changeFun: Function
}

export default defineComponent({
  setup() {
    const compList = reactive([
      {
        key: 1,
        label: '姓名：',
        prop: 'name',
        type: 'input',
        value: '121'
      } as inputIn,
      {
        key: 2,
        label: '选择类型：',
        prop: 'type',
        type: 'select',
        value: 'type1',
        placeholder: '请选择类型',
        itemList: [
          {
            label: '类型1',
            value: 'type1'
          },
          {
            label: '类型2',
            value: 'type2'
          },
          {
            label: '类型3',
            value: 'type3'
          }
        ],
        changeFun: changeSelectVal
      } as selectIn
    ])
    function changeSelectVal(val: any) {
      console.log('目前选中的值', val)
      compList[0].value = val
    }
    const formModel = reactive({
      name: ''
    })
    watch(compList, (newVal, oldVal) => {
      console.log('测试', newVal)
    })
    const components = compList.map((item) => {
      console.log(item)
      if (item.type === 'input') {
        return (
          <el-form-item prop={item.prop} label={item.label}>
            <el-input v-model={item.value}></el-input>
            <span>{item.value}</span>
          </el-form-item>
        )
      } else if (item.type === 'select') {
        const itemList = item.itemList.map((citem) => (
          <el-option key={citem.value} value={citem.value} label={citem.label}></el-option>
        ))
        return (
          <el-form-item prop={item.prop} label={item.label}>
            <el-select
              v-model={item.value}
              placeholder={item.placeholder}
              onChange={item.changeFun}>
              {itemList}
            </el-select>
          </el-form-item>
        )
      }
    })
    return () => (
      <>
        <div class='form-list border-2 border-cyan-500'>
          <el-form model={formModel} label-width={'120px'}>
            {components}
          </el-form>
        </div>
      </>
    )
  }
})
