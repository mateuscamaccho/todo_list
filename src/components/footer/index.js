import styles from './styles.module.scss';
import { AiFillHeart, AiOutlineGithub, AiOutlineLinkedin } from 'react-icons/ai';


function Footer() {
    return (
        <div className={styles.footer}>
            Desenvolvido com
            <AiFillHeart className={styles.hearticon} />
            <a href="https://mateuscamaccho.github.io/" target="_blank">Mateus Camacho</a>
            <a href="https://github.com/mateuscamaccho" target="_blank">
                <AiOutlineGithub className={styles.icon} />
            </a>
            <a href="https://www.linkedin.com/in/mateus-camaccho" target="_blank">
                <AiOutlineLinkedin className={styles.icon} />
            </a>
        </div>
    )
}

export default Footer;