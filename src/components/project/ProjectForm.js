import Input from "../form/Input";
import Styles from "./ProjectForm.module.css";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import {useState, useEffect} from 'react';

function ProjectForm({handleSubmit, projectData, btnText}){

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {})
    
    useEffect(() => {
        fetch("http://localhost:5000/categories",{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((resp) => resp.json())
        .then((data) => {setCategories(data)})
    }, [])

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project)
    }
    function handleOnChange(e){
        setProject({...project, [e.target.name]: e.target.value})
        console.log(project)
    }
    function handleOnCategory(e){
        setProject({
            ...project,
            category:{
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            }
        })
    }

    return(
        <form onSubmit={submit} className={Styles.form}>
            <Input
                type="text"
                text="Nome"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleOnChange}
                value={project.name ? project.name : ""}
            />
            <Input
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleOnChange}
                value={project.budget ? project.budget : ""}
            />
            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleOnCategory}
                value={project.category ? project.category.id : ""}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}
export default ProjectForm