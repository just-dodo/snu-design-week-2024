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

  const courseName = useCourseStore((state) => state.courseName);
  const setCourseName = useCourseStore((state) => state.setCourseName);

  const courseData = courseList.find((course) => course.path === courseName);
  const courseTitle = courseData?.title;
  const path = courseData?.path;
  const titleList = courseList.map((value) => value.title);

  const pageId = parsePageId(props.pageId);
  const recordMap = props.recordMap!;
  const collection = recordMap.collection;
  // console.log("🚀 ~ CoursePage ~ collection:", collection);
  // const collection_query = recordMap.collection_query;
  // // console.log(
  // //   "🚀 ~ CoursePage ~ collection_query:",
  // //   collection_query["1192cfba-780a-8135-80b7-000b2aaefd43"][
  // //     "1252cfba-780a-8059-8d85-000c2bd37aab"
  // //   ].collection_group_results?.blockIds
  // // );
  // const blockIds =
  //   collection_query["1192cfba-780a-8135-80b7-000b2aaefd43"][
  //     "1252cfba-780a-8059-8d85-000c2bd37aab"
  //   ].collection_group_results?.blockIds;
  // console.log("🚀 ~ CoursePage ~ blockIds:", blockIds);

  // const blockDatas = blockIds?.map((blockId: string) => {
  //   return recordMap.block[blockId].value;
  // });
  // console.log("🚀 ~ blockDatas ~ blockDatas:", blockDatas);

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
  return (
    <>
      <div className="w-screen h-fit flex-col flex justify-center items-center content-center text-primary text-2xl font-bold p-6 gap-[50px]">
        <XWrapper className="flex justify-between">
          {courseList.map((value, index) => {
            const isSelected = courseTitle === value.title;
            const opacityClassName = isSelected ? "" : "opacity-20";
            return (
              <div
                key={`titlebutton-${index}`}
                className={
                  "h-fit rounded-full  outline-2 border-primary py-[10px] px-[22px] text-center shadow-inner cursor-pointer " +
                  opacityClassName +
                  " hover:opacity-100"
                }
                onClick={() => {
                  setCourseName(value.path);
                }}
              >
                <p className="font-semibold text-[16px] leading-[19px]">
                  {value.title}
                </p>
              </div>
            );
          })}
        </XWrapper>
        <XWrapper className="flex flex-col md:flex-col justify-between gap-6">
          <div>
            <div className="flex flex-col relative md:flex-row justify-start items-start h-full flex-1 text-base tracking-wide">
              <div className="flex flex-col relative ">
                <h1 className="font-bold text-3xl leading-3xl ">
                  {courseData?.korean_text}
                </h1>
                <h1 className="mt-[4px] font-bold text-3xl leading-3xl  ">
                  {courseData?.english_text}
                </h1>
                <h2 className="text-[20px] font-bold leading-6 -tracking-[0.2px] mt-5">
                  지도교수 | {courseData?.advisor}
                </h2>
                <h2 className="text-[16px]] leading-6 -tracking-[0.2px]">
                  Advisor | {courseData?.advisor_eng}
                </h2>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between gap-8 text-[15px] leading-[160%]">
            <div className="flex flex-col justify-start items-start h-full flex-1">
              <p className=" ">{courseData?.description}</p>
            </div>
            <div className="flex flex-col justify-start items-start h-full flex-1 ">
              <p className=" ">{courseData?.description_eng}</p>
            </div>
          </div>
        </XWrapper>
        <XWrapper>
          <NotionPage {...props} />
        </XWrapper>
      </div>
    </>
  );
}
