const initState = {
    id: '',
    data: []
}


function reducer(state, action) {
    switch (action.type) {
        case "SET_ID_CURRENT_BOOK":
            return {
                ...state,
                id: action.id
            }
        default:
            throw new console.error("errror");
    }
}


export { initState }
export default reducer 