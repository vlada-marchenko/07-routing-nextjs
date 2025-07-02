import Modal from '../../../../../components/Modal/Modal';
import NotePreview from '../../../../../components/NotePreview/NotePreview';
import { fetchNoteById } from '../../../../../lib/api';

interface NoteModalPageProps {
  params: {
    id: string;
  };
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const note = await fetchNoteById(Number(params.id));

  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
}