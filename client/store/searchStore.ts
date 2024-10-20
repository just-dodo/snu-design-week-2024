import { create } from "zustand";

type State = {
  searchText: string
}

type Action = {
  setSearchText: (searchText: State["searchText"]) => void;
}



const useSearchStore = create<State & Action>((set) => ({
  searchText: "",
  setSearchText: (newSearchText: string) => set({ searchText: newSearchText }),
}));

export default useSearchStore;
