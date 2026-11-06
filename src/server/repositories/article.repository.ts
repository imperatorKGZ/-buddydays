import "server-only";
/** MDX loading is added when the first reviewed editorial articles are created. */
export const articleRepository = { async listSlugs(): Promise<string[]> { return []; } };
