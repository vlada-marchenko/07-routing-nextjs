'use client'
import css from './TagsMenu.module.css';
import { fetchNotes } from '../../lib/api';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const loadTags = async () => {
      try {
        const { notes } = await fetchNotes({ search: '', page: 1})
        const unique = [...new Set(notes.map(note => note.tag))].sort()
        setTags(unique)
      } catch (err) {
        console.error(err)
      }
    }

    loadTags()
  }, [])

  
    return (
  <div className={css.menuContainer}>
  <button onClick={toggleMenu} className={css.menuButton}>
    Notes ▾
  </button>
    {isOpen && (
       <ul className={css.menuList}>
          <li className={css.menuItem}>
              <Link href={`/notes/filter/All`} onClick={toggleMenu} className={css.menuLink}>
                All notes
              </Link>
          </li>
    {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
        <Link href={`/notes/filter/${tag}`} onClick={toggleMenu} className={css.menuLink}>
          {tag}
        </Link>
      </li>
    ))}

    </ul>
)}
</div>
    )
}

export default TagsMenu;