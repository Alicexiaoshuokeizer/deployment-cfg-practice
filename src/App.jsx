import { useState, useEffect } from 'react';

const BASE_URL = import.meta.process.env.VITE_BASE_URL;

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/tasks`)
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true)
        setLoading(false);
      })
  }, []);

  if (loading) return <h1>Loading tasks...</h1>;

  if (error) return <h1>Something went wrong, please try again later</h1>;

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );

}

// import { useEffect } from 'react';
// const BASE_URL = 'http://localhost:3001';

// export default function App() {
//   useEffect(() => {
//     fetch(`${BASE_URL}/ping`)
//       .then(res => res.json())
//       .then(data => console.log(data.message));
//   }, []);

//   return <h1>Checking connection...</h1>;
// }


// //  WRONG - This will cause infinite requests!
// export default function App() {
//   const [tasks, setTasks] = useState([]);
//   // This runs on EVERY render
//   fetch(`${BASE_URL}/tasks`)
//     .then(res => res.json())
//     .then(data => setTasks(data)); // setTasks triggers a re-render...
//   return <ul>{tasks.map(t => <li key={t.id}>{t.title}</li>)}</ul>;
// }