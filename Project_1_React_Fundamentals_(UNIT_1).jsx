// src/components/StudentCard.jsx
function StudentCard({ name, section, cgpa, onDelete }) {
  return (
    <div className="card m-2 p-2">
      <h5>{name} ({section})</h5>
      <p>CGPA: {cgpa}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

// export default StudentCard;


// Basic code skeleton: 



import { useState } from "react";
import StudentCard from "./components/StudentCard";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Vicky", section: "CS-A", cgpa: 8.5 },
    { id: 2, name: "Rahul", section: "CS-A", cgpa: 7.9 },
  ]);

  const [name, setName] = useState("");
  const [cgpa, setCgpa] = useState("");

  const addStudent = (e) => {
    e.preventDefault();
    if (!name || !cgpa) return;

    const newStudent = {
      id: Date.now(),
      name,
      section: "CS-A", // yahan apna section daal
      cgpa: Number(cgpa),
    };

    setStudents((prev) => [...prev, newStudent]);
    setName("");
    setCgpa("");
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="container">
      <h1>React Basics – {`Your Name, CS-A`}</h1>

      <form onSubmit={addStudent}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="CGPA"
          value={cgpa}
          onChange={(e) => setCgpa(e.target.value)}
        />
        <button type="submit">Add Student</button>
      </form>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        students.map((s) => (
          <StudentCard
            key={s.id}
            name={s.name}
            section={s.section}
            cgpa={s.cgpa}
            onDelete={() => deleteStudent(s.id)}
          />
        ))
      )}
    </div>
  );
}

export default App;
 
