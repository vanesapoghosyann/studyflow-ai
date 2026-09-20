import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { initialTasks } from "../data/initialData";

function Tasks() {
  const [tasks, setTasks] = useLocalStorage(
    "studyflow-tasks",
    initialTasks
  );

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");

  function addTask(e) {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      subject: subject.trim() || "General",
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setTitle("");
    setSubject("");
  }

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

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <section>
      <div className="page-header">
        <p className="eyebrow">STAY ORGANIZED</p>
        <h1>Tasks</h1>
        <p>
          {completedTasks} of {tasks.length} tasks completed.
        </p>
      </div>

      <form onSubmit={addTask} className="form">
        <input
          type="text"
          placeholder="What do you need to do?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Subject..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-item" key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />

            <div>
              <strong className={task.completed ? "completed" : ""}>
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