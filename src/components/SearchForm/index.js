import React, { useState, useCallback } from "react";

import searchSVG from "../../assets/icons/search.svg";
import "./styles.scss";

function SearchForm({ callApiCallback, loading, ...rest }) {
  const [characterName, setCharacterName] = useState("");

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      await callApiCallback(characterName);
    },
    [callApiCallback, characterName]
  );

  return (
    <form className="search-form" onSubmit={onSubmit} {...rest}>
      <label htmlFor="search-name-input">Nome do personagem</label>

      <div className="search-form__input-group">
        <input
          id="search-name-input"
          type="text"
          placeholder="Pesquisar"
          name="name"
          value={characterName}
          onChange={({ target }) => {
            setCharacterName(target.value);
          }}
        />
        <button type="submit" value="Search character" title="Botão de busca">
          <img src={searchSVG} alt="ícone de busca"></img>
        </button>
      </div>
      <span className="search-form__loading" style={{opacity: loading ? 1 : 0}}>Carregando...</span>
    </form>
  );
}

export default SearchForm;
