import Loader from "../../img/loading.svg";
import Styles  from "./Loading.module.css";

function Loading(){
    return(
        <div className={Styles.loader_container}>
            <img className={Styles.loader} src={Loader} alt="loading"/>
        </div>
    )
}
export default Loading