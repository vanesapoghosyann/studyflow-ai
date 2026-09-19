import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <span>✦</span>
        StudyFlow
      </div>

      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/subjects">Subjects</NavLink>
        <NavLink to="/notes">Notes</NavLink>
        <NavLink to="/tasks">Tasks</NavLink>
        <NavLink to="/ai">AI Assistant</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;