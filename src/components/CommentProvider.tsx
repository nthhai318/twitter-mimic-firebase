import { createContext } from "react";
import { Dispatch } from "react";

export const ModalContext = createContext({
  modal: false,
  toggleModal: () => {},
  postid: {},
  savePostId: (e: {}) => {},
});
