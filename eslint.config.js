import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },//This configuration tells ESLint to ignore any files in the dist directory. The dist directory is typically used for compiled or built files, and you usually don’t want to lint them.
  {
    files: ['**/*.{js,jsx}'],//This specifies that the configuration applies to all files with .js or .jsx extensions in the project. The ** means all directories and subdirectories.
    languageOptions: {
      ecmaVersion: 2020,//: Specifies that the code uses ECMAScript 2020 syntax.
      globals: globals.browser,//Declares browser-specific global variables (e.g., window, document).

      parserOptions: {
        ecmaVersion: 'latest',//Use the latest ECMAScript version available.
        ecmaFeatures: { jsx: true },//Enables JSX syntax support (for React code).
        sourceType: 'module',//Treats the code as ECMAScript modules (ESM), allowing import and export statements.
      },
    },
    settings: { react: { version: '18.3' } },//This setting tells ESLint which version of React to use. Here, it is set to React version 18.3
    plugins: {//Enable the React plugin
      react,// Enables the React plugin, which includes rules for React-specific code, such as hooks and JSX syntax
      'react-hooks': reactHooks,// Enables the React Hooks plugin, which enforces rules for using React hooks properly.
      'react-refresh': reactRefresh,// Enables the React Fast Refresh plugin, which helps with better development experience (hot reloading of React components).
    },
    rules: {
      ...js.configs.recommended.rules,//Spread operator that includes ESLint's recommended JavaScript rules.
      ...react.configs.recommended.rules,//Includes the recommended rules for React.
      ...react.configs['jsx-runtime'].rules,//Includes rules specific to JSX runtime (in case you're using JSX with React 17+ and newer).
      ...reactHooks.configs.recommended.rules,//Includes the recommended rules for React Hooks.
      'react/jsx-no-target-blank': 'off',//Disables the rule that typically warns about using target="_blank" in JSX without rel="noopener noreferrer".
      'react-refresh/only-export-components': [//This rule ensures that only components are exported for hot reloading. The rule is set to "warn", with an option to allow constant exports.
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
