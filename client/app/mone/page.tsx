import * as React from "react";

import { domain } from "@/lib/config";
import { resolveNotionPage } from "@/lib/resolve-notion-page";
import { PageProps } from "@/lib/types";
import { parsePageId } from "notion-utils";

import MonePage from "./mone";
const MONE_URL =
  "https://dodo4114.notion.site/f5ce83a0ea8248c58ded144f62b8ec57";
const getSingleNotionPageProps = async (url: string) => {
  try {
    // parse pageId from url
    const pageId = parsePageId(url);

    const props: PageProps = await resolveNotionPage(domain, pageId);
    return props;
  } catch (err) {
    console.error("page error", domain, err);

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err;
  }
};

export default async function WorkPage() {
  const props = await getSingleNotionPageProps(MONE_URL);
  return <MonePage {...props} />;
}
