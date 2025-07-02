import { fetchNoteById } from '../../../lib/api';
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';

type NotePageProps = {
  params: { id: string };
};

export default async function NotePage(
  props: NotePageProps | Promise<NotePageProps>
) {
  const { params } = await props;
  const noteId = Number(params.id);

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NoteDetailsClient noteId={noteId} />
    </HydrationBoundary>
  );
}