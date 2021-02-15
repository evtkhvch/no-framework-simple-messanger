export var ACTION;
(function (ACTION) {
    ACTION["INIT"] = "INIT";
    ACTION["GET_USER"] = "GET_USER";
    ACTION["CHANGE_USER"] = "CHANGE_USER";
    ACTION["GET_CHAT_LIST"] = "GET_CHAT_LIST";
    ACTION["SET_CURRENT_CHAT"] = "SET_CURRENT_CHAT";
})(ACTION || (ACTION = {}));
export const initialState = {
    user: null,
    chatList: [],
    chat: null
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.GET_USER:
            return Object.assign(Object.assign({}, state), { user: Object.assign(Object.assign({}, state.user), action.props) });
        case ACTION.CHANGE_USER:
            return Object.assign(Object.assign({}, state), { user: Object.assign(Object.assign({}, state.user), action.props) });
        case ACTION.GET_CHAT_LIST:
            return Object.assign(Object.assign({}, state), { chatList: action.props });
        case ACTION.SET_CURRENT_CHAT:
            return Object.assign(Object.assign({}, state), { chat: action.props });
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