import Styles from "../project/ProjectForm.module.css"
import Input from "../form/Input"
import SubmitButton from "../form/SubmitButton"
import { useState } from "react"

function ServiceForm({handleSubmit, projectData, btnText}){

    const[service, setService] = useState({})

    const submit = (e) => {
        e.preventDefault();
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({...service, [e.target.name] : e.target.value})
    }

    return(
        <>
            <form onSubmit={submit} className={Styles.form}>
                <Input
                    type="text"
                    text="Nome do serviço"
                    name="name"
                    placeholder="Insira o nome do serviço"
                    handleOnChange={handleChange}
                />
                <Input
                    type="text"
                    text="Custo do serviço"
                    name="cost"
                    placeholder="Insira o custo do serviço"
                    handleOnChange={handleChange}
                />
                <Input
                    type="text"
                    text="Descrição do serviço"
                    name="description"
                    placeholder="Insira a descrição do serviço"
                    handleOnChange={handleChange}
                />
                <SubmitButton text={btnText}/>
            </form>
        </>
    )

}
export default ServiceForm