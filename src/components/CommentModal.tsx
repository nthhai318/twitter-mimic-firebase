import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";

export default function CommentModal() {
  const [modal, setModal] = useRecoilState(modalState);
  return (
    <div>
      <h1 onClick={() => setModal(modal ? false : true)}>Comment Modal</h1>
      {modal && <p>The modal is open</p>}
    </div>
  );
}
