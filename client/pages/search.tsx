import * as React from "react";

import { NotionPage } from "@/components/NotionPage";
import { resolveNotionPage } from "@/lib/resolve-notion-page";
import XWrapper from "components/x-wrapper";
import { getPageProperty, parsePageId } from "notion-utils";
import { domain } from "@/lib/config";
import { PageProps } from "@/lib/types";
import courseList from "wordings/course";
import { useRouter } from "next/router";

import CONFIGS from "configs";
import { useState } from "react";
import useCourseStore from "store/courseStore";
import useSearchStore from "store/searchStore";
import { SearchIcon } from "icons/Search";
import PCTitle from "components/pc-title";
const DATABASE_ID = CONFIGS.databaseId;

export const getStaticProps = async () => {
  try {
    const props: PageProps = await resolveNotionPage(domain, DATABASE_ID);
    return { props, revalidate: 10 };
  } catch (err) {
    console.error("page error", domain, err);

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err;
  }
};

export default function CoursePage(props: PageProps) {
  const router = useRouter();

  const searchParams = router.query.search;

  const searchText = useSearchStore((state) => state.searchText);
  const setSearchText = useSearchStore((state) => state.setSearchText);

  React.useLayoutEffect(() => {
    if (searchParams) {
      setSearchText(searchParams as string);
    }
  }, [searchParams, setSearchText]);

  const pageId = parsePageId(props.pageId);
  const recordMap = props.recordMap!;
  const collection = recordMap.collection;
  // get a item from collection that item.value.parent_id is equal to the dbId
  const pageData = Object.values(collection).find((item: any) => {
    // if item has value and value has parent_id
    if (item && item.value && item.value.parent_id) {
      // if item.value.parent_id without - is equal to dbId
      if (item.value.parent_id.replace(/-/g, "") === DATABASE_ID) {
        return item;
      }
    }
  });

  const schema = pageData?.value.schema || {};
  // convert schema to array w/ name
  const schemaArray = Object.values(schema).map((item) => {
    return item.name;
  });

  const pageBlock = recordMap.block[pageId].value;

  // get page properties object from pageBlock with schemaArray
  const pageProperties: { [x: string]: string | undefined } = {};
  schemaArray.map((item) => {
    pageProperties[item] = getPageProperty<string>(item, pageBlock, recordMap);
  });

  return (
    <>
      <div className="w-screen h-full flex-col flex justify-center items-center content-center text-primary text-2xl font-bold p-6 gap-[50px] md:pt-[180px] py-[50px] ">
        <PCTitle imgsrc="/img/pc-title-search.svg" className="mb-5" />

        <XWrapper className="flex justify-between relative !h-fit">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full h-[61px] text-xl border-2 border-primary bg-transparent rounded-full px-[30px] !focus:border-transparent !focus:ring-0 ring-0 focus:outline-none"
          />
          <SearchIcon
            color={"#E22613"}
            className="absolute right-[15px] top-[6px]"
          />
        </XWrapper>

        <XWrapper className=" mb-10">
          <NotionPage {...props} />
        </XWrapper>
      </div>
    </>
  );
}
