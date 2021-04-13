module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ], // 使用推荐的React代码检测规范
  plugins: [
    '@typescript-eslint',
    "react-hooks"
  ],
  env: {
    browser: true,
    es6: true,
    node: true
  },
  settings: { // 自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  parserOptions: { // 指定ESLint可以解析JSX语法
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    document: false,
    navigator: false,
    window: false,
    location: false,
    PropTypes: false,
    serverData: false,
    React: false,
    ReactDOM: false,
    useState: false,
    useEffect: false,
    useCallback: false,
    useMemo: false,
    useReducer: false,
    useRef: false,
    useContext: false
  },
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any": 0,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 0,
    'react/prop-types': 0
  },
}
