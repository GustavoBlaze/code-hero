import React from "react";

import logo from "../../assets/img/logo.png";
import "./styles.scss";

function Header({ ...props }) {
  return (
    <header className="header" {...props}>
      <div className="header__container">
        <img src={logo} alt="objective logo" />

        <div className="candidate">
          <b>Luiz Gustavo</b>
          <p>Teste de Front-end</p>
        </div>

        <strong className="letters">CB</strong>
      </div>
    </header>
  );
}

export default Header;
