import { ACTION, State } from '../reducer';

export interface Store {
    dispatch: (action: Action) => void;
    getState: () => State;
    // eslint-disable-next-line @typescript-eslint/ban-types
    subscribe: (handler: Function) => () => void;
}
// eslint-disable-next-line
export type Dispatch = (action: any) => void;

export interface MiddlewareData {
    dispatch: (action: Action) => void;
    getState: () => State;
}

export type Middleware = (data: MiddlewareData) => (next: Dispatch) => Dispatch;

export interface Action {
    type: ACTION;
    props?: unknown;
}

export type Reducer = (state: State | undefined, action: Action) => State;
