import Styles from './Message.module.css'
import{useEffect, useState} from 'react'
import Projects from '../pages/Projects';

function Message({type, msg}){
    const [visible, setVisible] = useState(false);
    

    useEffect(() => {
        if(!msg){
            setVisible(false);
            return
        }
        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000)
        return () => clearTimeout(timer);
    }, [msg])

    return(
        <>
            {visible && (
                <div className={`${Styles.message} ${Styles[type]}`}>{msg}</div>
            )}
        </>
    )
}
export default Message;