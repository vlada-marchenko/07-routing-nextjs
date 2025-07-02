import Modal from '../../../../../components/Modal/Modal';
import NotePreview from '../../../../../components/NotePreview/NotePreview';
import { fetchNoteById } from '../../../../../lib/api';

export default async function NoteModalPage({
  params,
}: {
  params: Promise<{ id: string }>;  
}) {
  const { id } = await params;     
  const note = await fetchNoteById(Number(id));

  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
}
