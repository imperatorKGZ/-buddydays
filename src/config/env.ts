import "server-only";
import { z } from "zod";

const optionalNonEmpty = z.string().trim().min(1).optional();

const serverEnvSchema = z
  .object({
    SITE_URL: z.url().default("http://localhost:3000"),
    DEPLOYMENT_ENV: z.enum(["development", "preview", "production"]).default("development"),
    AMAZON_ENABLED: z.enum(["true", "false"]).default("false"),
    AMAZON_ASSOCIATE_TAG: optionalNonEmpty,
    AMAZON_CREATORS_API_ENABLED: z.enum(["true", "false"]).default("false"),
    AMAZON_CREATORS_API_CLIENT_ID: optionalNonEmpty,
    AMAZON_CREATORS_API_CLIENT_SECRET: optionalNonEmpty,
    ANALYTICS_ENABLED: z.enum(["true", "false"]).default("false"),
  })
  .superRefine((env, ctx) => {
    if (env.AMAZON_ENABLED === "true" && !env.AMAZON_ASSOCIATE_TAG) {
      ctx.addIssue({ code: "custom", path: ["AMAZON_ASSOCIATE_TAG"], message: "Required when AMAZON_ENABLED=true." });
    }
    if (
      env.AMAZON_CREATORS_API_ENABLED === "true" &&
      (env.AMAZON_ENABLED !== "true" || !env.AMAZON_CREATORS_API_CLIENT_ID || !env.AMAZON_CREATORS_API_CLIENT_SECRET)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["AMAZON_CREATORS_API_ENABLED"],
        message: "Creators API requires Amazon to be enabled and both API credentials.",
      });
    }
  });

export function getServerEnv() {
  return serverEnvSchema.parse(process.env);
}
