function getGroup({
  collectionView,
  collectionData,
  courseName,
}: {
  collectionView: any;
  collectionData: any;
  courseName: string;
}) {
  if (!collectionView || !collectionData || !courseName) return null;
  const boardGroups =
    collectionView?.format?.board_columns ||
    collectionView?.format?.board_groups2 ||
    [];
  const groupName = courseName;
  const groupProperty = boardGroups.find(
    (group: any) => group.value.value === groupName
  );
  const boardResults = (collectionData as any).board_columns?.results;

  if (!boardResults) return null;

  if (!groupProperty?.value?.type) {
    return;
  } else {
    const group = (collectionData as any)[
      `results:${groupProperty?.value?.type}:${
        groupProperty?.value?.value || "uncategorized"
      }`
    ];
    if (!group || groupProperty.hidden) {
      return;
    }
    return group;
  }
}

export default getGroup;
