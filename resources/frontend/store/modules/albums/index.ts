import { Module, MutationTree } from "vuex";
import { RootState } from "../../types";
import { Album } from "./types";

const namespaced: boolean = true;

const albums: Module<Album, RootState> = {
  namespaced
};

export default albums;
