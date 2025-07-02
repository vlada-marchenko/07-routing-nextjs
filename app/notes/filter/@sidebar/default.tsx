import Link from 'next/link'
import css from './SidebarNotes.module.css'
import { fetchNotes } from '../../../../lib/api'

const SidebarNotes = async () => {
  const { notes } = await fetchNotes({ search: '', page: 1 })
  const tags = [...new Set(notes.map(note => note.tag))].sort()

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/All" className={css.menuLink}>
          All notes
        </Link>
      </li>
      {tags.map(tag => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default SidebarNotes 

