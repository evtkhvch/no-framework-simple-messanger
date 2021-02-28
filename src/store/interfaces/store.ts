import { ACTION, State } from '../reducer';

export interface Store {
    dispatch: (action: Action) => void;
    getState: () => State;
    subscribe: (handler: Function) => () => void;
}

export type Dispatch = (action: any) => void;

export interface MiddlewareData {
    dispatch: (action: Action) => void;
    getState: () => State;
}

export type Middleware = (data: MiddlewareData) => (next: Dispatch) => Dispatch;

export interface Action {
    type: ACTION;
    props?: any;
}

export type Reducer = (state: State | undefined, action: Action) => State;
