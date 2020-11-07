import React, { useState, useCallback } from "react";

import searchSVG from "../../assets/icons/search.svg";

import "./styles.scss";

function SearchForm() {
  const [characterName, setCharacterName] = useState('');

  const onSubmit = useCallback((event) => {
    event.preventDefault();

    console.log({ characterName });
  }, [characterName]);

  return (
    <form className="search-form" onSubmit={onSubmit}>
      <label htmlFor="search-name-input">Nome do personagem</label>

      <div className="search-form__input-group">
        <input
          id="search-name-input"
          type="text"
          placeholder="Search"
          name="name"
          value={characterName}
          onChange={({target}) => {setCharacterName(target.value)}}
        />
        <button type="submit" value="Search character" title="Botão de busca">
          <img src={searchSVG} alt="ícone de busca"></img>
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
