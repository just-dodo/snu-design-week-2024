import * as React from "react";

import { ImageBlock } from "notion-types";
import { getTextContent } from "notion-utils";

import { LazyImage } from "../components/lazy-image";
import { NotionContextProvider, dummyLink, useNotionContext } from "../context";
import { CollectionCardProps } from "../types";
import { cs } from "../utils";
import { Property } from "./property";
import WorkCardDeco from "../assets/WorkCardDeco";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config.js";
import { useRouter } from "next/router";
import useCourseType from "utils/useCourseType";

export const WorkCard: React.FC<
  CollectionCardProps & {
    groupName: string;
  }
> = ({
  collection,
  block,
  cover,
  coverSize,
  coverAspect,
  properties,
  className,
  groupName,
  ...rest
}) => {
  const fullConfig = resolveConfig(tailwindConfig);

  const ctx = useNotionContext();
  const {
    components,
    recordMap,
    mapPageUrl,
    mapImageUrl,
    isLinkCollectionToUrlProperty,
  } = ctx;
  let coverContent = null;

  const { page_cover_position = 0.5 } = block.format || {};
  const coverPosition = (1 - page_cover_position) * 100;

  const courseType = useCourseType();

  const isVD = courseType === "VD";

  if (cover?.type === "page_content") {
    const contentBlockId = block.content?.find((blockId) => {
      const block = recordMap.block[blockId]?.value;

      if (block?.type === "image") {
        return true;
      }
    });

    if (contentBlockId) {
      const contentBlock = recordMap.block[contentBlockId]?.value as ImageBlock;

      const source =
        contentBlock.properties?.source?.[0]?.[0] ??
        contentBlock.format?.display_source;

      if (source) {
        const src = mapImageUrl(source, contentBlock);
        const caption = contentBlock.properties?.caption?.[0]?.[0];

        coverContent = (
          <LazyImage
            height={247}
            width={352}
            src={src}
            alt={caption || "notion image"}
            style={{
              objectFit: coverAspect,
            }}
          />
        );
      }
    }

    if (!coverContent) {
      coverContent = <div className="notion-collection-card-cover-empty" />;
    }
  } else if (cover?.type === "page_cover") {
    const { page_cover } = block.format || {};

    if (page_cover) {
      const coverPosition = (1 - page_cover_position) * 100;

      coverContent = (
        <LazyImage
          height={247}
          width={352}
          src={mapImageUrl(page_cover, block)}
          alt={getTextContent(block.properties?.title)}
          style={{
            objectFit: coverAspect,
            objectPosition: `center ${coverPosition}%`,
            backgroundColor: "red",
          }}
        />
      );
    }
  } else if (cover?.type === "property") {
    const { property } = cover;
    const schema = collection.schema[property];
    const data = block.properties?.[property];

    if (schema && data) {
      if (schema.type === "file") {
        const files = data
          .filter((v) => v.length === 2)
          .map((f) => f.flat().flat());
        const file = files[0];

        if (file) {
          coverContent = (
            <span className={`notion-property-${schema.type}`}>
              <LazyImage
                height={247}
                width={352}
                alt={file[0] as string}
                src={mapImageUrl(file[2] as string, block)}
                style={{
                  objectFit: coverAspect,
                }}
              />
            </span>
          );
        }
      } else {
        coverContent = (
          <Property propertyId={property} schema={schema} data={data} />
        );
      }
    }
  }
  let linkProperties = [];
  //check if a visible property has a url and we settings are for linking to it for the card
  if (isLinkCollectionToUrlProperty) {
    linkProperties = properties
      ?.filter(
        (p) =>
          p.visible && p.property !== "title" && collection.schema[p.property]
      )
      .filter((p) => {
        if (!block.properties) return false;
        const schema = collection.schema[p.property];

        return schema.type == "url";
      })
      .map((p) => {
        return block.properties[p.property];
      })
      ?.filter((p) => p && p.length > 0 && p[0] != undefined); //case where the url is empty
  }
  let url = null;
  if (
    linkProperties &&
    linkProperties.length > 0 &&
    linkProperties[0].length > 0 &&
    linkProperties[0][0].length > 0
  ) {
    url = linkProperties[0][0][0];
  }

  function getPropertyValue(propertyName: string) {
    const property = properties?.find((p) => {
      return (
        p.visible &&
        collection.schema[p.property] &&
        collection.schema[p.property].name === propertyName
      );
    });
    if (property) {
      return block?.properties?.[property?.property]?.[0]?.[0];
    }
    return null;
  }
  const studentName = getPropertyValue("학생이름");
  const studentName_eng = getPropertyValue("학생이름_영문");
  const workName = getPropertyValue("작품이름");
  const workName_eng = getPropertyValue("작품이름_영문");

  const innerCard = (
    <div className="flex flex-col w-full h-fit">
      <div
        className="w-[350px] md:w-[447px] h-[248px] relative overflow-hidden mx-0 
    !outline-primary rounded-2xl !outline-2 !outline  "
      >
        {(coverContent || cover?.type !== "none") && (
          <>
            <div className="absolute top-0 w-full h-[248px] z-0">
              {coverContent}
            </div>
            <div className="absolute top-0 w-full h-[248px] z-10 bg-black opacity-40"></div>
          </>
        )}

        <div className="relative flex  flex-col justify-between h-full w-full z-20 px-[15px] py-[15px]">
          <div className="relative bg-secondary !outline-primary rounded-full !outline-2 !outline z-20 w-[27px] min-h-[27px] h-[27px]"></div>

          <div className="relative flex flex-row justify-between w-full z-20 text-secondary text-[16px]">
            <div className={"flex flex-col items-start "}>
              <div className="font-bold">{studentName}</div>
              <div className="font-regular">{studentName_eng}</div>
            </div>
            <div className={"flex flex-col items-end "}>
              <div className="font-bold">{workName}</div>
              <div className="font-regular">{workName_eng}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden flex-col justify-between w-full z-20 text-primary text-[16px] gap-[10px] px-1 py-[10px]">
        <div className={"flex flex-col items-start gap-[5px] "}>
          <div className="font-semibold">{workName}</div>
          <div className="font-medium text-xs">{workName_eng}</div>
        </div>
        <div className={"flex flex-row gap-[6px] items-center "}>
          <div className="font-semibold">{studentName}</div>
          <div className="font-medium text-xs">{studentName_eng}</div>
        </div>
      </div>
    </div>
  );

  return (
    <NotionContextProvider
      {...ctx}
      components={{
        ...ctx.components,
        // Disable <a> tabs in all child components so we don't create invalid DOM
        // trees with stacked <a> tags.
        Link: (props) => {
          return (
            <form action={props.href} target="_blank">
              <input
                type="submit"
                value={props?.children?.props?.children ?? props.href}
                className="nested-form-link notion-link"
              />
            </form>
          );
        },
        PageLink: dummyLink,
      }}
    >
      <components.PageLink
        className={cs(className, " flex-0 flex w-full")}
        href={`/works/${block.id}`}
        {...rest}
      >
        {innerCard}
      </components.PageLink>
    </NotionContextProvider>
  );
};
