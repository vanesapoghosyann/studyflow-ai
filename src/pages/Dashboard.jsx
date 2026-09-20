import useLocalStorage from "../hooks/useLocalStorage";
import {
  initialSubjects,
  initialTasks,
  initialNotes,
} from "../data/initialData";

function Dashboard() {
  const [subjects] = useLocalStorage(
    "studyflow-subjects",
    initialSubjects
  );

  const [tasks] = useLocalStorage(
    "studyflow-tasks",
    initialTasks
  );

  const [notes] = useLocalStorage(
    "studyflow-notes",
    initialNotes
  );

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const averageProgress =
    subjects.length > 0
      ? subjects.reduce(
          (total, subject) => total + subject.progress,
          0
        ) / subjects.length
      : 0;

  const recentTasks = tasks.slice(0, 5);

  return (
    <section>
      <div className="page-header">
        <p className="eyebrow">WELCOME BACK</p>

        <h1>Your Study Dashboard</h1>

        <p>
          Keep learning, stay organized and make progress.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Subjects</span>
          <strong>{subjects.length}</strong>
        </div>

        <div className="stat-card">
          <span>Completed Tasks</span>
          <strong>{completedTasks}</strong>
        </div>

        <div className="stat-card">
          <span>Average Progress</span>
          <strong>{Math.round(averageProgress)}%</strong>
        </div>

        <div className="stat-card">
          <span>Notes</span>
          <strong>{notes.length}</strong>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Recent Tasks</h2>

        {recentTasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          recentTasks.map((task) => (
            <div className="task-preview" key={task.id}>
              <span>{task.completed ? "✓" : "○"}</span>

              <div>
                <strong
                  className={task.completed ? "completed" : ""}
                >
                  {task.title}
                </strong>

                <small>{task.subject}</small>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Dashboard;