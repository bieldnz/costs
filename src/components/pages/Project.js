import Loading from "../layout/Loading"
import Container from "../layout/Container"
import Styles from "./Project.module.css"
import Message from "../layout/Message"
import ServiceCard from "../services/ServiceCard"

import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import {parse, v4 as uuidv4} from "uuid"

import ProjectForm from "../project/ProjectForm"
import ServiceForm from "../services/ServiceForm"

function Project(){
    const {id} = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [projectForm, setProjectForm] = useState(false)
    const [serviceForm, setServiceForm] = useState(false)
    const [message, setMessage]= useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`,{
            method: "GET",
            headers: {"Content-Type":'application/json'}
        })
        .then((resp) => resp.json())
        .then((data) => {setProject(data)
        setServices(data.services)})
        .catch((err) => console.log(err))
        }, 2000)
    }, [id])

    function toogleProjectForm(){
        setProjectForm(!projectForm)
    }
    function toggleServiceForm(){
        setServiceForm(!serviceForm)
    }
    function removeService(id, cost){
        const servicesUpdated = project.services.filter((service) => (
            service.id !== id
        ))

        console.log(project.services)
        console.log(servicesUpdated)

        const projectUpdated = project;
        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
            method:"PATCH",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(projectUpdated)
        }).then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage("Servicço escluido com sucesso")
        })

    }
    function editPost(project){

        setMessage("")

        if(project.budget < project.cost){
            setMessage('O orçamento não pode ser menor que o custo do projeto')
            setType("error")
            return
        }
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "PATCH",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(project)
        }).then((resp) => resp.json())
        .then((data) => {setProject(data)
        console.log(data)
        setMessage("Projeto atualizado")
        setType("success")})
        setProjectForm(false)
    }

    function createService(project){
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(lastServiceCost) + parseFloat(project.cost)
        
        if(newCost > parseFloat(project.budget)){
            setMessage("Orçamento ultrapassado, verifique o valor do serviço")
            setType("error")
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(project)
        }).then((resp) => resp.json())
        .then((data) => {console.log(data)
        setServiceForm(false)})
        .catch((err) => console.log(err))

    }

    return(
        <>
            {project.name ? (
                <div className={Styles.project_details}>
                    <Container customClass="collumn">
                    {message && <Message msg={message} type={type}/>}
                    <div className={Styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button onClick={toogleProjectForm} className={Styles.btn}>
                            {!projectForm ? "Editar Projeto" : "Fechar"}
                        </button>
                        {!projectForm ? (
                            <div>
                                <p>
                                    <span>Categoria: </span>{project.category.name}
                                </p>
                                <p>
                                    <span>Total do orçamento: </span>{project.budget}
                                </p>
                                <p>
                                    <span>Total ultilizado: </span>{project.budget}
                                </p>
                            </div>
                        ) : (
                            <ProjectForm projectData={project} handleSubmit={editPost} btnText='Editar projeto'/> 
                        )}
                    </div>
                    <div className={Styles.service_form_container}>
                        <h2>Adicione serviço: </h2>
                        <button className={Styles.btn} onClick={toggleServiceForm}>
                            {!serviceForm ? "Adicionar serviço": "Fechar"}
                        </button>
                        <div className={Styles.project_info}>
                            {serviceForm && (
                                <ServiceForm
                                    handleSubmit={createService}
                                    projectData={project}
                                    btnText='Adicionar serviço'
                                />
                            )}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                        {services.length > 0 ?(
                            services.map((service) => (
                                <ServiceCard
                                name={service.name}
                                id={service.id}
                                description={service.description}
                                cost={service.cost}
                                key={service.id}
                                handleRemove={removeService}
                            />
                            ))
                        ):(
                            <p>Não há serviços</p>
                        )}
                    </Container>
                </Container>
                </div>
            ) : (<Loading/>)}
        </>
    )
}
export default Project