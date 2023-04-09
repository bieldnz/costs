import Message from "../layout/Message"
import {useLocation} from "react-router-dom"
import LinkButton from "../layout/LinkButton"
import Style from "./Projects.module.css"
import Container from "../layout/Container"
import { useEffect, useState } from "react"
import ProjectCard from "./ProjectCard"
import Loading from "../layout/Loading"

function Projects(){

    const [removeLoading, setRemoveLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [projectMessage, setProjectMessage] = useState("")

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/projects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProjects(data)
            setRemoveLoading(true)
        })
        .catch((err) => console.log(err))
    }, 3000)
    }, [])

    const location = useLocation();
    let message = "";
    if(location.state){
        message = location.state.message
    }

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {"Content-Type":"application/json"}
        })
        .then((resp) => resp.json())
        .then(() => {setProjects(projects.filter((project) => project.id !== id))
        setProjectMessage("Projeto removido com sucesso")})
        .catch((err) => console.log(err))
    }

    

    return(
        
            <div className={Style.project_container}>
                <div className={Style.title_container}>
                    <h1>Meus Projetos</h1>
                    <LinkButton text="Criar Projeto" to="/newProject"></LinkButton>
                </div>
                <div className={Style.baixo}>
                    {message && <Message msg={message} type="success"/>}
                    {projectMessage && <Message msg={projectMessage} type="success"/>}
                    {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                        name={project.name}
                        budget={project.budget}
                        handleRemove={removeProject}
                        id={project.id}
                        key={project.id}
                        category={project.category ? project.category : ""}
                        />
                    ))}
                </div>
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 &&(
                    <p>Não há projetos</p>
                )}
            </div>
            
        
    )
}
export default Projects