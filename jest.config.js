/* eslint-disable @typescript-eslint/no-require-imports */
const {
	pathsToModuleNameMapper
} = require("ts-jest/utils")
const isCI = require("is-ci")
const {
	compilerOptions
} = require("./tsconfig.nodejs")
const isGenerating = process.env.GENERATE === "true"
const isUnit = process.env.UNIT === "true"
/* If it is not unit or generator - then it is integration */
const isIntegration = process.env.INTEGRATION === "true" || !(isUnit || isGenerating)
const config = {
	globals: {
		"ts-jest": {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			diagnostics: !isIntegration,
			tsconfig: "tsconfig.json"
		}
	},
	moduleDirectories: [
		"node_modules",
		"src",
		".storybook"
	],
	moduleFileExtensions: [
		"json",
		"ts",
		"js"
	],
	moduleNameMapper: {
		...pathsToModuleNameMapper(compilerOptions.paths,
			{
				prefix: "<rootDir>/src/"
			}),
		"^lodash-es$": "lodash"
	},
	setupFiles: [
		"<rootDir>/src/__tests__/unit/index.ts"
	],
	setupFilesAfterEnv: [
		/* "jest-chain" */
	],
	testEnvironment: "node",
	testMatch: [
		"**/spec(.*)?.ts?(x)"
	],
	transform: {
		"^.+\\.(tsx?)$": "ts-jest"
	},
	transformIgnorePatterns: [
		"<rootDir>/node_modules",
		"<rootDir>/node_modules/@babel",
		"<rootDir>/node_modules/@jest"
	]
}
if (isUnit) {
	config.testMatch = [
		"**/spec.ts?(x)"
	]
	config.maxWorkers = "100%"
	config.globalSetup = ""
	config.setupFiles = [
		"<rootDir>/src/__tests__/unit/index.ts"
	]
}
if (isIntegration) {
	config.testMatch = [
		"**/spec.integration.ts?(x)"
	]
	config.testTimeout = isCI
		? 30000
		: 10000
	config.globalSetup = "<rootDir>/src/__tests__/integration/global/index.ts"
	config.setupFiles = [
		"<rootDir>/src/__tests__/integration/index.ts"
	]
}
else if (isGenerating) {
	config.testMatch = [
		"**/spec.generate.ts"
	]
	config.maxWorkers = "100%"
	config.globalSetup = ""
	config.setupFiles = [
		"<rootDir>/src/__tests__/unit/index.ts"
	]
}
module.exports = config