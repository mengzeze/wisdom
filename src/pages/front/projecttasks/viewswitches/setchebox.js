export default function setchebox(arr,arr2,index,response,vm,state) {
    if (index == 4) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
                if (arr[i] == arr2[j]) {
                    arr.splice(i, 1);
                    i--
                }
            }
        }
        var arrs = []
        vm.$nextTick(() => {
            response.data.list.forEach(element => {
                arr.forEach((ele) => {
                    if (ele== element.id) {
                        console.log(element)
                        arrs.push(element)
                        vm.$refs.multipleTable.toggleRowSelection(element, true)
                    }
                })
            });
        })
        switch(state){
            case 1:
            vm.rowar = arrs
            break;
            case 2:
            vm.selectsrow = arrs
            break;
            case 3:
            vm.gettask = arrs
            break;
            case 3:
            vm.selectsinfodata = arrs
            break;
        }
    }
}
