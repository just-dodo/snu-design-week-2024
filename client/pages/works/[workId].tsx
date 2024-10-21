import * as React from "react";

import { NotionPage } from "@/components/NotionPage";
import { domain, isDev } from "@/lib/config";
import { resolveNotionPage } from "@/lib/resolve-notion-page";
import { PageBlock, PageProps } from "@/lib/types";
import XWrapper from "components/x-wrapper";
import { getPageProperty, parsePageId } from "notion-utils";
import { FiInstagram } from "@react-icons/all-files/fi/FiInstagram";
import { getSiteMap } from "@/lib/get-site-map";
import courseList from "wordings/course";
import Image from "next/image";
import backButtonImg from "assets/back-button.png";
import { useRouter } from "next/router";
import { Loading } from "@/components/Loading";
import Link from "next/link";
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight";
import CONFIGS from "configs";
import { mapImageUrl } from "@/lib/map-image-url";
const DATABASE_ID = CONFIGS.databaseId;
export const getStaticProps = async (context: {
  params: { courseName: any; workId: any };
}) => {
  const { courseName, workId } = context.params;
  try {
    // parse pageId from url
    const pageId = parsePageId(workId);

    const props: PageProps = await resolveNotionPage(domain, pageId);
    return { props, revalidate: 10 };
  } catch (err) {
    console.error("page error", domain, err);

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err;
  }
};

export async function getStaticPaths() {
  // if (isDev) {
  //   return {
  //     paths: [],
  //     fallback: true
  //   }
  // }

  const siteMap = await getSiteMap();
  const nowDomain = isDev ? "localhost:3000" : domain;
  const props: PageProps = await resolveNotionPage(nowDomain, DATABASE_ID);
  const block = props?.recordMap?.block;
  // block to array
  const blockArray = Object.keys(block).map((key) => block[key].value);
  // filter out the collection view
  const pages = blockArray.filter(
    (block) =>
      block?.type === "page" &&
      block?.parent_id === "989f931c-a428-4d70-8094-879dbffedfe2"
  );
  const courseNameList = courseList.map((course) => course.path);
  interface Path {
    params: { courseName: string; workId: string };
  }
  const paths: Path[] = [];
  courseNameList.map((courseName) => {
    const newPaths: Path[] = pages
      .map((page) => {
        if (!page?.properties) return;
        const title = page.properties.title?.[0][0] as string;
        const pageCourseName = page.properties?.vABH?.[0][0];

        const pageId = page.id;
        const cannonicalPageId = Object.keys(siteMap.canonicalPageMap).find(
          (key) => siteMap.canonicalPageMap[key] === pageId
        );

        if (pageCourseName === courseName) {
          return {
            params: {
              courseName: courseName,

              workId: cannonicalPageId,
            },
          };
        }
      })
      .filter((path) => path !== undefined) as Path[];
    paths.push(...newPaths);
  });

  const staticPaths = {
    paths: paths,
    fallback: true,
  };

  return staticPaths;
}

export default function WorkPage(props: PageProps) {
  const pageId = parsePageId(props.pageId);
  const recordMap = props.recordMap!;
  const router = useRouter();
  if (!props.recordMap) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const collection = recordMap.collection;
  const topRef = React.useRef<HTMLDivElement>(null);

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
  console.log("🚀 ~ WorkPage ~ pageBlock:", pageBlock);
  // get blocks without pageBlock
  const blocks = Object.values(recordMap.block).filter(
    (block) => block.value?.id !== pageId
  );
  // console.log("BLOCKs", blocks);
  // get types of blocks
  const blockTypes = blocks.map((block) => block.value?.type);
  // print blockTypes
  // console.log("BLOCK TYPES", blockTypes);

  // get page properties object from pageBlock with schemaArray
  const pageProperties: { [x: string]: string | undefined } = {};
  schemaArray.map((item) => {
    pageProperties[item] = getPageProperty<string>(item, pageBlock, recordMap);
  });

  const socialImage = mapImageUrl(
    getPageProperty<string>("Social Image", pageBlock, recordMap) ||
      (pageBlock as PageBlock).format?.page_cover ||
      "",
    pageBlock
  );
  const coverPosition = (pageBlock as PageBlock).format?.page_cover_position;

  const allowedTypes = [
    "text",
    "image",
    "video",
    "embed",
    "collection_view",
    "column",
    "column_list",
    "header",
    "page",
  ];

  // filter blocks with allowedTypes
  const filteredBlocks = blocks.filter((block) => {
    const type = block.value?.type;
    if (allowedTypes.includes(type)) {
      return block;
    }
  });

  // inject filteredBlocks and pageBlock to props
  const newProps = {
    ...props,
    recordMap: {
      ...recordMap,
      block: {
        [pageId]: {
          ...recordMap.block[pageId],
        },
        ...filteredBlocks.reduce((acc, block) => {
          // @ts-ignore
          acc[block?.value?.id] = block;
          return acc;
        }, {}),
      },
    },
  };
  const anotherWorkPath = pageProperties["다른 작품 링크"]?.replace(
    "https://snudesignweek.com",
    ""
  );

  function scrollTop() {
    if (topRef.current) {
      console.log("scrollTop");
      topRef.current.scrollIntoView();
      // window.scrollTo({
      //   top: topRef.current.offsetTop ,
      // });
    }
  }
  React.useEffect(() => {
    // scroll to topRef over 60px when page is loaded
    scrollTop();
  }, [pageId]);

  return (
    <>
      {/* <div className={"w-full h-[60px] md:h-[80px]"} /> */}
      {/* top bar */}
      <div className="relative md:fixed md:top-[60px] w-screen z-30 h-fit md:h-[80px] flex justify-center items-center content-center text-primary text-2xl font-bold p-6 pl-3 md:p-0">
        <div
          className="w-fit h-full mr-[1.2rem] md:hidden"
          onClick={() => {
            router.back();
          }}
        >
          <Image
            src={backButtonImg}
            alt="button"
            layout="intrinsic"
            width={14}
            height={7}
            className="m-3"
          />
        </div>
        <XWrapper className="justify-between">
          {/* authorContainer */}
          <div className="flex flex-row items-center justify-start md:justify-center h-full md:relative md:-left-6">
            <div
              className="w-fit h-full hidden md:block relative -left-16 cursor-pointer"
              onClick={() => {
                router.back();
              }}
            >
              <Image
                src={backButtonImg}
                alt="button"
                width={14}
                height={7}
                className="mt-6"
              />
            </div>
            <p className="text-base md:text-xl md:mr-2 font-bold">
              {/* @ts-ignore */}
              {pageProperties["학생이름"]}
            </p>
            <p className="mx-4 text-base md:text-xl font-bold ml-2 md:ml-0 ">
              {/* @ts-ignore */}
              {pageProperties["학생이름_영문"]}
            </p>
          </div>
          <div className="flex flex-row items-center justify-start md:justify-center h-full mb-4 md:mb-0">
            <p className="text-base md:text-xl font-bold">
              {/* @ts-ignore */}
              {pageProperties["작품이름"]}
            </p>
          </div>
          <div className="flex flex-col justify-center items-start h-full text-base tracking-wide">
            <p
              className=" cursor-pointer"
              onClick={() => {
                // open instagram link in new tab
                window.open(
                  `https://www.instagram.com/${pageProperties["인스타 아이디"]}`,
                  "_blank"
                );
              }}
            >
              {/* @ts-ignore */}
              <FiInstagram className="inline-block mr-2" />
              {"@" + pageProperties["인스타 아이디"]}
            </p>
            <p>
              {/* @ts-ignore */}
              {pageProperties["Email"]}
            </p>
          </div>
        </XWrapper>
      </div>

      {/* content */}
      <div className="w-full justify-center items-center flex ">
        <div
          className="w-full aspect-video absolute top-0 left-0"
          style={{
            backgroundSize: "cover",
            backgroundPosition: coverPosition,
            // no-repeat
            backgroundRepeat: "no-repeat",
            // gradient image from top to bottom
            backgroundImage: `url(${socialImage})`,
          }}
        >
          <div className="w-full h-full bg-gradient-to-b from-transparent to-secondary"></div>
        </div>
        <XWrapper>
          <div className="w-full  p-6 md:p-0">
            <div className="w-full h-0 md:h-20" />
            <NotionPage {...newProps} />
          </div>
        </XWrapper>
      </div>

      <XWrapper className="flex md:flex-col justify-center items-center h-full">
        <div className="w-full h-20" />
        <div className="w-full  justify-center items-center flex">
          {pageProperties["다른 작품 링크"]?.startsWith(
            "https://snudesignweek.com/"
          ) && (
            <Link
              className="w-fit px-2 h-[33px] rounded-full border-[1px] border-primary 
              flex justify-center items-center text-primary text-sm font-bold cursor-pointer
              hover:bg-primary hover:text-white
              "
              href={anotherWorkPath || "/"}
              // onClick={(e) => {
              //   scrollTop();
              // }}
            >
              <p className="text-[15px] pt-1 px-[1rem] pb-[0.1rem] h-full flex justfy-center items-center content-center align-bottom ">
                이 학생의 다른 작품 보기
                <BsArrowRight className="inline-block ml-2 mb-[0.1rem]" />
              </p>
            </Link>
          )}
        </div>
        <div className="w-full h-[120px]" />
      </XWrapper>
    </>
  );
}
