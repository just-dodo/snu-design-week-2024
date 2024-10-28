import { create } from "zustand";

type State = {
  courseName: string
}

type Action = {
  setCourseName: (courseName: State["courseName"]) => void;
}



const useCourseStore = create<State & Action>((set) => ({
  courseName: "",
  setCourseName: (newCourseName: string) => set({ courseName: newCourseName }),
}));

export default useCourseStore;
