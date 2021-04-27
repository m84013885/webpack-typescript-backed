import * as _React from "react"
import * as _ReactDOM from "react-dom"

declare global {
    const React: typeof _React;
    const ReactDOM: typeof _ReactDOM;
    const useState: typeof _React.useState;
    const useEffect: typeof _React.useEffect;
    const useCallback: typeof _React.useCallback;
    const useMemo: typeof _React.useMemo;
    const useReducer: typeof _React.useReducer;
    const useRef: typeof _React.useRef;
    const useContext: typeof _React.useContext;
}