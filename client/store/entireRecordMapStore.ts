import { ExtendedRecordMap, RecordMap } from "notion-types";
import { create } from "zustand";

type State = {
  entireRecordMap: ExtendedRecordMap | null;
};

type Action = {
  setEntireRecordMap: (entireRecordMap: ExtendedRecordMap) => void;
};

const useEntireRecordMapStore = create<State & Action>((set) => ({
  entireRecordMap: null,
  setEntireRecordMap: (newEntireRecordMap: ExtendedRecordMap) =>
    set({ entireRecordMap: newEntireRecordMap }),
}));

export default useEntireRecordMapStore;
