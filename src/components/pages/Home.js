import Saving from '../../img/savings.svg';
import LinkButton from '../layout/LinkButton';
import Styles from '../pages/Home.module.css'

function Home(){
    return(
        <section className={Styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton text="Criar Projeto" to={'/newProject'} />
            <img src={Saving} />
        </section>
    )
}
export default Home