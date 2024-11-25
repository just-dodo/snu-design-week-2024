import * as React from "react";

import { PageBlock } from "notion-types";

import { useNotionContext } from "../context";
import { EmptyIcon } from "../icons/empty-icon";
import { CollectionViewProps } from "../types";
import { cs } from "../utils";
import { WorkCard } from "./work-card";
import { CollectionGroup } from "./collection-group";
import { getCollectionGroups } from "./collection-utils";
import { Property } from "./property";
import { useRouter } from "next/router";
import useCourseStore from "store/courseStore";
import useSearchStore from "store/searchStore";
import courseList from "wordings/course";

export const CollectionWorksGallery: React.FC<CollectionViewProps> = ({
  collection,
  collectionView,
  collectionData,
  padding,
}) => {
  return (
    <Board
      padding={padding}
      collectionView={collectionView}
      collection={collection}
      collectionData={collectionData}
    />
  );
};

function Board({ collectionView, collectionData, collection, padding }) {
  const { recordMap } = useNotionContext();
  const { board_cover = { type: "none" }, board_cover_size = "medium" } =
    collectionView?.format || {};
  const board_cover_aspect = "cover";
  const boardGroups =
    collectionView?.format?.board_columns ||
    collectionView?.format?.board_groups2 ||
    [];

  const boardStyle = React.useMemo(
    () => ({
      paddingLeft: padding,
    }),
    [padding]
  );

  const searchText = useSearchStore((state) => state.searchText);
  const courseName = useCourseStore((state) => state.courseName);
  const groupName = courseName;
  const groupProperty = boardGroups.find(
    (group) => group.value.value === groupName
  );
  const boardResults = (collectionData as any).board_columns?.results;

  // get all values its key starts with "results"
  const _allBlockIds = Object.keys(collectionData as any)
    .filter((key) => key.startsWith("results"))
    .map((key) => (collectionData as any)[key].blockIds);

  // remove duplicate
  const allBlockIds = _allBlockIds
    .flat()
    .filter((value, index, self) => self.indexOf(value) === index);

  const CollectionCards = React.useMemo(() => {
    if (!boardResults) return null;

    let blockIds;
    if (!groupProperty?.value?.type) {
      blockIds = allBlockIds;
    } else {
      const schema = collection.schema[groupProperty.property];
      const group = (collectionData as any)[
        `results:${groupProperty?.value?.type}:${
          groupProperty?.value?.value || "uncategorized"
        }`
      ];
      if (!group || !schema || groupProperty.hidden) {
        blockIds = allBlockIds;
      } else {
        blockIds = group.blockIds;
      }
    }

    const blocks = blockIds
      ?.map((blockId: string) => {
        const block = recordMap.block[blockId]?.value as PageBlock;

        if (!block) {
          console.log("block is null");
          return null;
        }

        const studentName = getPropertyValue(
          block,
          collectionView.format?.board_properties,
          collection,
          "학생이름"
        );
        const studentName_eng = getPropertyValue(
          block,
          collectionView.format?.board_properties,
          collection,
          "학생이름_영문"
        );
        const workName = getPropertyValue(
          block,
          collectionView.format?.board_properties,
          collection,
          "작품이름"
        );
        const workName_eng = getPropertyValue(
          block,
          collectionView.format?.board_properties,
          collection,
          "작품이름_영문"
        );
        const courseName = getPropertyValue(
          block,
          collectionView.format?.board_properties,
          collection,
          "수업"
        );

        const course = courseList.find((course) => course.path === courseName);
        const courseKoreanText = course?.korean_text;
        const courseEnglishText = course?.english_text;




        const searchAbleString =
          `${studentName} ${studentName_eng} ${workName} ${workName_eng} ${courseKoreanText} ${courseEnglishText}`.toLowerCase();

        if (
          searchText &&
          !searchAbleString.includes(searchText.toLowerCase())
        ) {
          return null;
        }

        return (
          <WorkCard
            className=" "
            collection={collection}
            block={block}
            cover={board_cover}
            coverSize={board_cover_size}
            coverAspect={board_cover_aspect}
            properties={collectionView.format?.board_properties}
            key={blockId}
            groupName={groupName ? groupName : ""}
          />
        );
      })
      .filter((block) => !!block);

    return blocks.length > 0 ? (
      <div className="w-full flex justify-center items-center">
        <div className="w-fit pb-10 grid grid-cols-1 sm:grid-cols-2 gap-3 justify-center self-center">
          {blocks}
        </div>
      </div>
    ) : (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-primary text-xl font-bold text-center">
          검색 결과가 없습니다.
        </p>
      </div>
    );
  }, [
    boardResults,
    allBlockIds,
    groupProperty,
    recordMap,
    searchText,
    courseName,
  ]);

  return <div className="flex-1 flex w-full">{CollectionCards}</div>;
}

function getPropertyValue(
  block: PageBlock,
  properties: any,
  collection: any,
  propertyName: string
) {
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
