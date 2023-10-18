export default {
    selectItems(state) {
        console.log('getter');
        // if (state.Attribute === 1)
        // 按照点击的tab传过来的Attribute值，过滤出需要展示的items
        console.log('state.Attribute:' + state.Attribute);
        console.log(state.listItem);
        sessionStorage.setItem('listItem', JSON.stringify(state.listItem))
        if (state.Attribute === 1) return state.listItem
        return state.listItem.filter(item => item.num == state.Attribute)
    },
}