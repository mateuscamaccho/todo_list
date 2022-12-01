import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

function Erro() {
    return (
        <div className={styles.erro}>
            <h2>Error 404</h2>
            Ops, acho que essa pagina não existe!!
            <Link to="/">Voltar para a página principal</Link>
        </div>
    )
}

export default Erro;