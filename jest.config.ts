import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      isolatedModules: true,
      tsconfig: 'tsconfig.json',
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      paths: {
        "@utils/*": ["src/utils/*"]
      },
    }]
  }
}
export default config