'use client';

import css from './NotePreview.module.css';

export interface Note {
  id: number;
  title: string;
  content: string;
  tag: string;
  createdAt?: string;   
}

export default function NotePreview({ note }: { note: Note }) {
  return (
    <div className={css.container}>
      <div className={css.item}>
        <header className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </header>

        <p className={css.content}>{note.content}</p>

        {note.createdAt && (
          <time
            dateTime={note.createdAt}
            className={css.date}
          >
            {new Date(note.createdAt).toLocaleDateString()}
          </time>
        )}
      </div>
    </div>
  );
}
