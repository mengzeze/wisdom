import data from '@/pages/common/js/reportData'
console.log(data.reportData.projectType,'_______.projectType')

export const reportSelect = [
  {type:'input',key:'itemName',label:'项目名称'},
  {type:'select',key:'itemStage',label:'项目阶段'},
  {type:'groupSelect',key:'itemType',label:'项目类型'},
  {type:'select',key:'reportType',label:'报送内容'},
  {type:'dialog',key:'createBy',label:'报送人'},
  {type:'date',key:'time',label:'报送日期'},
]
export const selectOptions = {
  itemStage:[
    {label:'其他阶段',id:3},
    {label:'申报阶段',id:1},
    {label:'发行/终止阶段',id:2},
  ],
  itemType:data.reportData.projectType || [],
  reportType:[
    {label:'信息',id:0},
    {label:'文件',id:1}
  ]
}
export const listHeader = [
  {prop:'itemName',label:'项目名称',min:'140'},
  {prop:'itemStageName',label:'项目阶段',min:'140'},
  {prop:'itemType',label:'项目类型',redirect:(x)=>{
    const res = data.reportData.projectType.map(y=>y.option.find(z=>Number(z.id)===x)).find(x=>x)
    return res ? res.label : ''
  }},
  {prop:'reportTypeName',label:'报送内容',min:'80'},
  {prop:'createTime',label:'报送时间',min:'150'},
  {prop:'createByName',label:'报送人'},
  {prop:'operate',label:'操作',min:'80',slot:true},
]