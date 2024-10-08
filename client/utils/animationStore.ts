import { create } from "zustand";

export interface AnimationData {
  isAnimationFinished: boolean;
  setIsAnimationFinished: (isAnimationFinished: boolean) => void;
}

export const useAnimationDataStore = create<AnimationData>((set) => ({
  isAnimationFinished: false,
  setIsAnimationFinished: (isAnimationFinished) => set({ isAnimationFinished }),
}));
