import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { initialNotes } from "../data/initialData";

function Notes() {
  const [notes, setNotes] = useLocalStorage(
    "studyflow-notes",
    initialNotes
  );

  const [search, setSearch] = useState("");

  function deleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  const filteredNotes = notes.filter((note) =>
    `${note.title} ${note.content}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="page-header">
        <h1>Notes</h1>
        <p>Your personal learning knowledge base.</p>
      </div>

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