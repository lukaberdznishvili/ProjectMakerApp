import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSideBar from "./components/ProjectSideBar";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject";

function App() {
  const[projectState, setProjectState] = useState({
    
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text){
    setProjectState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId : prevState.selectedProjectId,
        id: taskId
      };
      return{
        ...prevState,
        
        tasks: [newTask, ...prevState.tasks ]
      };
    })
  };

  function handleDEleteTask(id){
    setProjectState(prevState => {
      return{
        ...prevState,
        
        tasks: prevState.tasks.filter((task) => task.id !== id)
      }
    });
  };

  function handleStartAtProject(){
    setProjectState(prevState => {
      return{
        ...prevState,
        selectedProjectId: null,
      }
    });
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId)

  let content = <SelectedProject 
  project={selectedProject} 
  onDelete={handleDelete} 
  onAddTask = {handleAddTask} 
  onDeleteTask = {handleDEleteTask}
  tasks={projectState.tasks} />;
  if(projectState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddproject} onCancle={handleCancle} />
  }else if(projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAtProject}/>
  }
  

  function handleAddproject(projectData){
    setProjectState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      };
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject ]
      };
    })
  }

  function handleCancle(){
    setProjectState(prevState => {
      return{
        ...prevState,
        selectedProjectId: undefined,
      }
    });
  }

  function handleSelect(id){
    setProjectState(prevState => {
      return{
        ...prevState,
        selectedProjectId: id,
      }
    });
  }


  function handleDelete(){
    setProjectState(prevState => {
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      }
    });
  }

  return (
    <>
    <main className="h-screen my-8 flex gap-8">
      <ProjectSideBar projects={projectState.projects} onStartAddProject={handleStartAtProject} onSelectProject={handleSelect} selectedProjectId={projectState.selectedProjectId}/>
      {content }
      
    </main>
    </>
  );
}

export default App;
