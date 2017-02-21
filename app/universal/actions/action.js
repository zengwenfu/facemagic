/**
 *  action 类型
 */
export const ADD_ITEM = 'ADD_ITEM';


/**
 *  action 创建函数
 */
export  function addItem(name) {
    return {
        type: ADD_ITEM,
        name: name
    }
}