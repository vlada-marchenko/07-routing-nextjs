import css from './LayoutNotes.module.css';

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
};

export default function NotesLayout({ children, sidebar, modal }: Props) {
  return (
    <>
      <div className={css.container}>
        <aside className={css.sidebar}>{sidebar}</aside>
        <section className={css.notesWrapper}>{children}</section>
      </div>
      {modal}
    </>
  );
}