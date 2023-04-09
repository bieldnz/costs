import Styles from "./ProjectCard.module.css"
import {Link} from "react-router-dom"
import {BsPencil, BsFillTrashFill} from "react-icons/bs"

function ProjectCard({name, budget, category, handleRemove, id}){

    const remove = (e) => {
        e.preventDefault();
        handleRemove(id)
    }

    return(
        <div className={Styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento: </span>R${budget}
            </p>
            <p className={Styles.category_text}>
                <span className={`${Styles[category.name.toLowerCase()]}`}></span> {category.name}
            </p>
            <div className={Styles.project_card_actions}>
                <Link to={`/project/${id}`}>
                    <BsPencil/> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
    )
}
export default ProjectCard