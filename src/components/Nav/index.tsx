import React from 'react';
import {

    Icon,
    Sidebar,
  } from 'semantic-ui-react'

/* Styles */
import styles from './index.module.scss';

const Nav = () => {
    const [visible, setVisible] = React.useState(false)
    const options: any[] = [
        {title: 'Home', to: '/', icon: 'home'},
        {title: 'Login', to: '/', icon: 'home'},
        {title: 'Explore', to: '/', icon: ''},
        {title: 'Requests', to: '/', icon: ''},
    ]
		return (
        <>
            <button onClick={() => setVisible(true)}> hi </button>
            <Sidebar
                className={styles.nav}
              animation='overlay'
              icon='labeled'
              inverted
              onHide={() => setVisible(false)}
              vertical
              visible={visible}
              width='thin'
            >
                <div className={styles.nav}> 
                    {options.map((option) => {
                        return (
                        <div className={styles.navOption}>
                            <Icon name={option.icon} className={styles.icon}/>
                            <p className={styles.navText}> {option.title} </p>
                        </div>);
                    })}
                </div>
            </Sidebar>
        </>

		);
};

export default Nav;
