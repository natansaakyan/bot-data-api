module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint/eslint-plugin', 'boundaries'],
	extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:boundaries/recommended', 'prettier'],
	root: true,
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: ['.eslintrc.js'],
	settings: {
		'boundaries/elements': [
			{
				type: 'primary-element',
				pattern: 'primary-**/**'
			},
			{
				type: 'secondary-element',
				pattern: 'secondary-**/**'
			},
			{
				type: 'application-element',
				pattern: 'application/**'
			},
			{
				type: 'repository',
				pattern: '**.adapter**',
				mode: 'file'
			}
		],
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true
			}
		}
	},
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'boundaries/element-types': [
			2,
			{
				default: 'disallow',
				message: '${file.type} is not allowed to import ${dependency.type}',
				rules: [
					{
						from: 'primary-element',
						allow: ['application-element', 'primary-element']
					},
					{
						from: 'secondary-element',
						allow: ['application-element', 'secondary-element']
					},
					{
						from: 'application-element',
						allow: ['application-element', 'repository']
					},
					{
						from: 'repository',
						allow: ['application-element', 'repository', 'secondary-element'],
					},
				],
			},
		],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
			},
		],
	},
};
