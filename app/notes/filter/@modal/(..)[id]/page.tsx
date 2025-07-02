import Modal from '../../../../../components/Modal/Modal';
import NotePreview from '../../../../../components/NotePreview/NotePreview';
import { fetchNoteById } from '../../../../../lib/api';

export default async function NoteModalPage(
  props: { params: { id: string } } | Promise<{ params: { id: string } }>
) {
  const { params } = await props;
  const note = await fetchNoteById(Number(params.id));

  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
}