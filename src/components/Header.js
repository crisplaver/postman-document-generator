import React from 'react';
import styles from './Header.module.css'

const Header = (props) => {
    const { name, method, url, breads } = props;

    return (
        <div>
            <div className={styles.title}>
                {name} 
                <span style={{fontSize:14, marginLeft: 12}}>{breads.join(' / ')}</span>
            </div>
            <div className={styles.url}>
                <b>{method}</b>
                <span className={styles.url__content}>
                    {url.path.map(p => `/${p}`)}
                </span>
            </div>
        </div>
    )
}

export default Header