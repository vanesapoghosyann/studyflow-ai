import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { initialSubjects } from "../data/initialData";

function Subjects() {
  const [subjects, setSubjects] = useLocalStorage(
    "studyflow-subjects",
    initialSubjects
  );

  const [name, setName] = useState("");

  function addSubject(e) {
    e.preventDefault();

    if (!name.trim()) return;

    const newSubject = {
      id: Date.now(),
      name,
      progress: 0,
    };

    setSubjects([...subjects, newSubject]);
    setName("");
  }

  return (
    <section>
      <div className="page-header">
        <h1>Subjects</h1>
        <p>Organize the areas you are currently studying.</p>
      </div>

      <form onSubmit={addSubject} className="form">
        <input
          type="text"
          placeholder="New subject..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Add Subject</button>
      </form>

      <div className="cards-grid">
        {subjects.map((subject) => (
          <article className="subject-card" key={subject.id}>
            <h3>{subject.name}</h3>

            <div className="progress-bar">
              <div
                style={{ width: `${subject.progress}%` }}
              />
            </div>

            <span>{subject.progress}% completed</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Subjects;