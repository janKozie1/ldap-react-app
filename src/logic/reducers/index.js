const RootReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TOKEN':
            return { ...state, token: action.payload }
        default:
            return { ...state }
    }
}

export default RootReducer
