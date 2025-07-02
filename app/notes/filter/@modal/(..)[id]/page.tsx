import Modal from '../../../../../components/Modal/Modal';
import NotePreview from '../../../../../components/NotePreview/NotePreview';
import { fetchNoteById } from '../../../../../lib/api';

type Props = {
  params: { id: string };
};

export default async function NoteModalPage(props: Props | Promise<Props>) {
  const { params } = await props;
  const note = await fetchNoteById(Number(params.id));

  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
}