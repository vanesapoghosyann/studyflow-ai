import useLocalStorage from "../hooks/useLocalStorage";
import { initialTasks } from "../data/initialData";

function Tasks() {
  const [tasks, setTasks] = useLocalStorage(
    "studyflow-tasks",
    initialTasks
  );

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <section>
      <div className="page-header">
        <h1>Tasks</h1>
        <p>Track the things you need to accomplish.</p>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-item" key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />

            <div>
              <strong
                className={task.completed ? "completed" : ""}
              >
                {task.title}
              </strong>

              <small>{task.subject}</small>
            </div>

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Tasks;