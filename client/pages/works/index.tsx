import * as React from "react";

import { NotionPage } from "@/components/NotionPage";
import { resolveNotionPage } from "@/lib/resolve-notion-page";
import XWrapper from "components/x-wrapper";
import { getPageProperty, parsePageId } from "notion-utils";
import { domain, isDev } from "@/lib/config";
import backButtonImg from "assets/back-button.png";
import { PageProps, Params } from "@/lib/types";
import courseList from "wordings/course";
import { useRouter } from "next/router";
import Image from "next/image";

import CONFIGS from "configs";
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
  const courseName = "visual-design";
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

  //  <div className="flex-1 w-screen bg-white align-center-top">

  const courseData = courseList.find((course) => course.path === courseName);
  return (
    <>
      <div className="w-screen h-fit  flex justify-center items-center content-center text-primary text-2xl font-bold p-6">
        <XWrapper className="flex flex-col md:flex-col justify-between ">
          <div>
            <div className="flex flex-col relative md:flex-row justify-start items-start h-full flex-1 text-base tracking-wide">
              <div className="flex flex-col relative ml-[0.3rem] ">
                <h1 className="font-bold text-3xl leading-3xl ">
                  {courseData?.korean_text}
                </h1>
                <h1 className="mt-[4px] font-bold text-3xl leading-3xl  ">
                  {courseData?.english_text}
                </h1>
                <h2 className="text-[1.1rem] leading-6 -tracking-[0.2px] mt-5">
                  지도교수 | {courseData?.advisor}
                </h2>
                <h2 className="text-[1.1rem] leading-6 -tracking-[0.2px]">
                  Advisor | {courseData?.advisor_eng}
                </h2>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col justify-start items-start h-full flex-1 mytext-2 pr-4 py-6 md:py-0">
              <p className=" ">{courseData?.description}</p>
            </div>
            <div className="flex flex-col justify-start items-start h-full flex-1 mytext-2 pr-4 py-6 md:py-0">
              <p className=" ">{courseData?.description_eng}</p>
            </div>
          </div>
        </XWrapper>
      </div>
      <XWrapper>
        <NotionPage {...props} />
      </XWrapper>
    </>
  );
}
