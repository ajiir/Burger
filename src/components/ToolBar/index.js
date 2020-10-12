import React from "react";
import Logo from "../Logo/index";
import css from "./style.module.css";
import Menu from "../Menu";
import HamburgerMenu from "../HamburgerMenu";

const Toolbar = (props) => (
  <header className={css.Toolbar}>
    <div>
      <HamburgerMenu toggleSideBar={props.toggleSideBar} />
    </div>
    <Logo />
    <nav className={css.HideOnMobile}>
      <Menu />
    </nav>
  </header>
);

export default Toolbar;
