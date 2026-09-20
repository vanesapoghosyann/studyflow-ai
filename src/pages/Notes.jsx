import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { initialNotes } from "../data/initialData";

function Notes() {
  const [notes, setNotes] = useLocalStorage(
    "studyflow-notes",
    initialNotes
  );

  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");

  function addNote(e) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      subject: subject.trim() || "General",
    };

    setNotes([...notes, newNote]);

    setTitle("");
    setContent("");
    setSubject("");
  }

  function deleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  const filteredNotes = notes.filter((note) =>
    `${note.title} ${note.content} ${note.subject}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="page-header">
        <p className="eyebrow">YOUR KNOWLEDGE BASE</p>
        <h1>Notes</h1>
        <p>Keep your learning materials organized in one place.</p>
      </div>

      <form onSubmit={addNote} className="note-form">
        <input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Subject..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">Add Note</button>
      </form>

      <input
        className="search"
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="notes-grid">
        {filteredNotes.map((note) => (
          <article className="note-card" key={note.id}>
            <span>{note.subject}</span>

            <h3>{note.title}</h3>

            <p>{note.content}</p>

            <button onClick={() => deleteNote(note.id)}>
              Delete
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Notes;