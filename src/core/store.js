export var ACTION;
(function (ACTION) {
    ACTION["INIT"] = "INIT";
    ACTION["SET_USER"] = "SET_USER";
    ACTION["SET_CHAT_LIST"] = "SET_CHAT_LIST";
})(ACTION || (ACTION = {}));
export const initialState = {
    user: null,
    chatList: [],
    chat: null
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.SET_USER:
            return Object.assign(Object.assign({}, state), { user: Object.assign(Object.assign({}, state.user), action.props) });
        case ACTION.SET_CHAT_LIST:
            return Object.assign(Object.assign({}, state), { chatList: action.props });
        default:
            return state;
    }
};
const createStore = (yourReducer) => {
    let listeners = [];
    let currentState = yourReducer(undefined, { type: ACTION.INIT });
    return {
        getState: () => currentState,
        dispatch: (action) => {
            currentState = yourReducer(currentState, action);
            listeners.forEach((listener) => {
                listener();
            });
        },
        subscribe: (newListener) => {
            listeners.push(newListener);
            return () => {
                listeners = listeners.filter((l) => l !== newListener);
            };
        }
    };
};
export const store = createStore(reducer);
//# sourceMappingURL=store.js.map