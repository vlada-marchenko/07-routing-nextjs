import { fetchNoteById } from "../../../lib/api"
import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query"
import NoteDetailsClient from "./NoteDetails.client"

type Props = {
    params: Promise<{ id: string }>
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params
  const queryClient = new QueryClient()
  const noteId = Number(id)

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(Number(noteId))
  })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient noteId={noteId}/>
        </HydrationBoundary>
    )
}

export default NoteDetails

