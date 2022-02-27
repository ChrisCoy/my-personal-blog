import * as prismic from "@prismicio/client";
import { ClientConfig } from "@prismicio/client";

export function getPrismicClient(req?: unknown) {
  const prismicClient = prismic.createClient(process.env.PRISMIC_API_ENDPOINT);
  return prismicClient;
}
