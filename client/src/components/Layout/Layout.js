import React from 'react'
import { Outlet, Link } from 'react-router-dom';

import classes from './Layout.module.css';

const Layout = () => {
  return (
    <React.Fragment>
      <header className={classes.header} >
        <div className={classes.logo} >
          <Link to='/songs' >Lyricify</Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className={classes.footer} >Copyright @ Lyricify - Made with Love</footer>
    </React.Fragment>
  )
}

export default Layout;