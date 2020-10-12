import React from "react";
import css from "./style.module.css";
import Menu from "../Menu";
import Logo from "../Logo";
import Shadow from "../General/Shadow";

const Sidebar = (props) => {
  let classes = [css.Sidebar, css.Close];

  if (props.showSidebar) {
    classes = [css.Sidebar, css.Open];
  }
  return (
    <div>
      <Shadow show={props.showSidebar} darhad={props.toggleSidebar} />
      <div onClick={props.toggleSidebar} className={classes.join(" ")}>
        <div className={css.Logo}>
          <Logo />
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default Sidebar;
