import create, { GetState, SetState, State, StoreApi } from "zustand";

import createStarSlice, { StarSlice } from "./createStarSlice";

export type SliceStateCreator<S extends State, CustomSetState = SetState<S>> = (
  set: CustomSetState,
  get: GetState<S>,
  api: StoreApi<S>
) => S;

//interface ICommon extends BearCommon, FishCommon {}
//interface IStore extends ICommon, BearSlice, FishSlice {}
interface IStore extends StarSlice {}

const useStore = create<IStore>(
  (set, get, api): IStore => ({
    ...createStarSlice(
      set as unknown as SetState<StarSlice>,
      get as unknown as GetState<StarSlice>,
      api as unknown as StoreApi<StarSlice>
    ),
  })
);

export default useStore;
