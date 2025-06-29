'use client'

import css from '../../app/page.module.css'
import NoteList from '../../components/NoteList/NoteList'
import SearchBox from '../../components/SearchBox/SearchBox'
import Pagination from '../../components/Pagination/Pagination'
import { useEffect, useState } from 'react'
import {  useQuery } from '@tanstack/react-query'
import { fetchNotes, type HttpResponse } from '../../lib/api'
import NoteModal from '../../components/NoteModal/NoteModal'
import { useDebounce } from 'use-debounce'
import { Note } from '../../types/note'

type Props = {
  initialNotes: Note[],
  initialPage: number,
  initialSearch: string
}

const NotesClient = ({ initialNotes, initialPage, initialSearch}: Props) => {
  const [page, setPage] = useState(initialPage)
  const [search, setSearch] = useState(initialSearch || '')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [debouncedSearch] = useDebounce(search, 400)
  const perPage = 10


  const { data, isLoading, error } = useQuery<HttpResponse, Error>({
	queryKey: ['notes', page, debouncedSearch] ,
  queryFn: () => fetchNotes({ search: debouncedSearch, page, perPage }),
  initialData: { notes: initialNotes, totalPages: 1 },
  refetchOnWindowFocus: false
  });

  useEffect(() => {
	setPage(1)
  }, [debouncedSearch])

  const notes = data?.notes || []
  
  if (isLoading) return <p>Loading notes...</p>
  if (error) return <p>Error loading notes!</p>


  function handleModalOpen() {
	setIsModalOpen(true)
  }

  function handleModalClose() {
	setIsModalOpen(false)
  }

  return <div className={css.app}>
	<header className={css.toolbar}>
    <SearchBox search={search} onSearchChange={setSearch} />
		{data && data.totalPages > 1 && <Pagination page={page} totalPages={data.totalPages || 1} onPageChange={setPage}/>}
		<button className={css.button} onClick={handleModalOpen}>Create note +</button>
		{isModalOpen && <NoteModal onClose={handleModalClose}/>}
  </header>
  {!isLoading && notes.length > 0 && <NoteList notes={notes}/>}
</div>
};

export default NotesClient;