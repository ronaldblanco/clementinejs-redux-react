function deldata (state, actionIndex){
    let newState = [];
    state.map((obj, index) => {
          if (index !== actionIndex) {
            newState.push(obj);
          }
      });
    return newState;
}

export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_DATA':
      return [
        ...state,
        {
          name: action.name
        }
      ];
    case 'DEL_DATA':
      return deldata(state, action.index);
    case 'SET_DATAS':
      return action.datas;
    default:
      return state;
  }
};