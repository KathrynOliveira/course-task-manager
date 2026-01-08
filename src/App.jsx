import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Task";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
      console.error("Erro ao ler tasks do localStorage:", error);
      return [];
    }
  });

  // recebe uma funcao e uma lista, todo momento em que a lista é atualizada/alterada executa a funcao
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // useEffect(() => {
  //   async function fecthTasks() {
  //     // só consegue usar async/await no useEffect se for uma function
  //     //CHAMAR API
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos?_limit=10",
  //       {
  //         method: "GET",
  //       }
  //     );
  //     //PEGAR OS DADOS QUE ELA RETORNA
  //     const data = await response.json();

  //     //ARMAZENA/PRESISTIR ESSES DADOS NO STATE
  //     setTasks(data);
  //   }

  //   fecthTasks();
  // }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]); // quando atualiza um estado que é uma lista, o push não funciona
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title> Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
