export const dynamic = 'force-dynamic';

import { fetchNotes } from '../../lib/api'
import css from '../../app/page.module.css'
import NotesClient from './Notes.client'

export default async function NotesPage() {
  const initialSearch = ''
  const initialPage = 1

  const response = await fetchNotes({ search: initialSearch, page: initialPage, perPage: 10 })
  return (
    <div className={css.app}>
      <NotesClient initialNotes={response.notes} initialPage={initialPage} initialSearch={initialSearch}/>
    </div>
  )
}
