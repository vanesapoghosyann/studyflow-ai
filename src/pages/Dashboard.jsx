import { initialSubjects, initialTasks } from "../data/initialData";

function Dashboard() {
  const completedTasks = initialTasks.filter(
    (task) => task.completed
  ).length;

  const averageProgress =
    initialSubjects.reduce(
      (total, subject) => total + subject.progress,
      0
    ) / initialSubjects.length;

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="eyebrow">WELCOME BACK</p>
          <h1>Your Study Dashboard</h1>
          <p>Keep learning, stay organized and make progress.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Subjects</span>
          <strong>{initialSubjects.length}</strong>
        </div>

        <div className="stat-card">
          <span>Completed Tasks</span>
          <strong>{completedTasks}</strong>
        </div>

        <div className="stat-card">
          <span>Average Progress</span>
          <strong>{Math.round(averageProgress)}%</strong>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Today's Tasks</h2>

        {initialTasks.map((task) => (
          <div className="task-preview" key={task.id}>
            <span>
              {task.completed ? "✓" : "○"}
            </span>

            <div>
              <strong>{task.title}</strong>
              <small>{task.subject}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Dashboard;