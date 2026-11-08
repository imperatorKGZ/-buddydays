import { blogArticles } from "../src/data/blog/articles.ts";
import { validateBlogArticles } from "../src/features/blog/logic/article-validation.ts";

validateBlogArticles(blogArticles);
console.log(`Validated ${blogArticles.length} blog records.`);
