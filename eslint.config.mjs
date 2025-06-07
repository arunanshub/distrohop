import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import query from "@tanstack/eslint-plugin-query"
import sonar from "eslint-plugin-sonarjs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

// TODO:
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...query.configs["flat/recommended"],
  {
    ...sonar.configs.recommended,
    rules: {
      ...sonar.configs.recommended.rules,
      "sonarjs/todo-tag": "off",
    },
  },
]

export default eslintConfig
