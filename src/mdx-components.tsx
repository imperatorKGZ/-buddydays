import type { MDXComponents } from "mdx/types";
const components: MDXComponents = {
  h2: (props) => <h2 className="mt-10 scroll-mt-24 text-2xl font-bold tracking-tight" {...props}/> ,
  h3: (props) => <h3 className="mt-7 text-xl font-semibold" {...props}/> ,
  a: (props) => <a className="text-link" {...props}/> ,
  blockquote: (props) => <blockquote className="border-l-4 border-stone-300 pl-4 italic text-stone-600" {...props}/> ,
};
export function useMDXComponents(): MDXComponents { return components; }
