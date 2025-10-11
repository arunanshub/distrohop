import type { MDXComponents } from "mdx/types"

const components: MDXComponents = {
  code: ({ children, ...props }) => {
    return (
      <code {...props} className="font-mono!">
        {children}
      </code>
    )
  },
}

export function useMDXComponents(): MDXComponents {
  return components
}
