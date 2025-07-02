import Modal from '../../../../components/Modal/Modal';
import NotePreview from './NotePreview.client';
import { fetchNoteById } from '../../../../lib/api';

type Params = Promise<{ id: string }>;

export default async function NoteModalPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;      
  const note = await fetchNoteById(Number(id));

  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
}
