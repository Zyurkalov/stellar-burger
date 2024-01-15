import { Link } from "react-router-dom";
import styles from "./not-found-404.module.css";

export const Component404 = (): JSX.Element => {
    return (
        <div className={styles.boxContainer}>
            <div aria-label="страница 404" className={styles.header}>
                <h2 className="text text_type_digits-large">4</h2>
                <h2 className="text text_type_digits-large">4</h2>
            </div>
            <div className={styles.image} />
            
            <div className={styles.textContainer}> 
                <span className={`text text_type_main-medium ${styles.textContent}`}> Страницы не существует</span>
                {localStorage.accessToken 
                ? (<Link to="/" replace={true} className={`text text_type_main-medium ${styles.link}`}>Вернуться</Link>) 
                : (<Link to="login" replace={true} className={`text text_type_main-medium ${styles.link}`}>Вернуться</Link>)}
                
            </div>
        </div>
    )
}