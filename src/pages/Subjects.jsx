import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { initialSubjects } from "../data/initialData";

function Subjects() {
  const [subjects, setSubjects] = useLocalStorage(
    "studyflow-subjects",
    initialSubjects
  );

  const [name, setName] = useState("");
  const [progress, setProgress] = useState(0);

  function addSubject(e) {
    e.preventDefault();

    if (!name.trim()) return;

    const newSubject = {
      id: Date.now(),
      name: name.trim(),
      progress: Number(progress),
    };

    setSubjects([...subjects, newSubject]);

    setName("");
    setProgress(0);
  }

  function deleteSubject(id) {
    setSubjects(subjects.filter((subject) => subject.id !== id));
  }

  function updateProgress(id, newProgress) {
    setSubjects(
      subjects.map((subject) =>
        subject.id === id
          ? { ...subject, progress: Number(newProgress) }
          : subject
      )
    );
  }

  return (
    <section>
      <div className="page-header">
        <p className="eyebrow">YOUR LEARNING</p>
        <h1>Subjects</h1>
        <p>Organize the areas you are currently studying.</p>
      </div>

      <form onSubmit={addSubject} className="form">
        <input
          type="text"
          placeholder="Subject name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          min="0"
          max="100"
          placeholder="Progress %"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
        />

        <button type="submit">Add Subject</button>
      </form>

      <div className="cards-grid">
        {subjects.map((subject) => (
          <article className="subject-card" key={subject.id}>
            <h3>{subject.name}</h3>

            <div className="progress-bar">
              <div style={{ width: `${subject.progress}%` }} />
            </div>

            <span>{subject.progress}% completed</span>

            <input
              type="range"
              min="0"
              max="100"
              value={subject.progress}
              onChange={(e) =>
                updateProgress(subject.id, e.target.value)
              }
            />

            <button onClick={() => deleteSubject(subject.id)}>
              Delete
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Subjects;