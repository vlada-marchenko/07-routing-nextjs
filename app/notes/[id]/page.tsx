import { fetchNoteById } from '../../../lib/api';
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';

type Props = {
  params: { id: string };        // ✅ без Promise
};

export default async function NoteDetails({ params }: Props) {
  const noteId = Number(params.id);   // ✅ без await

  /* ─── Prefetch для React Query ─── */
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={noteId} />
    </HydrationBoundary>
  );
}