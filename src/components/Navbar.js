const Navbar = () => {
    return ( 
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item has-text-white" href="https://bulma.io">
              <div className="is-size-5">Uchiha</div>
            </a>

            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

  <div className="navbar-menu">
    

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          
          <a className="button is-primary">
            WOW
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
     );
}
 
export default Navbar;