import React, { useState, useCallback } from "react";
import md5 from "js-md5";

import searchSVG from "../../assets/icons/search.svg";
import "./styles.scss";

const API_URL = "https://gateway.marvel.com/v1/public/characters";
const PUBLIC_KEY = "597b63caf3f947556f47c4f1ad84abce";

function SearchForm({ parseApiDataCallback }) {
  const [characterName, setCharacterName] = useState("");

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const timestamp = Number(new Date());
      const hash = md5.create();
      hash.update(timestamp + PUBLIC_KEY);

      try {
        const data = await fetch(
          `${API_URL}?ts=${timestamp}&nameStartsWith=${characterName}&orderBy=name&limit=10&apikey=${PUBLIC_KEY}`
        ).then((r) => r.json());

        parseApiDataCallback(data);
      } catch (err) {
        console.error(err);
      }
    },
    [characterName, parseApiDataCallback]
  );

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
          onChange={({ target }) => {
            setCharacterName(target.value);
          }}
        />
        <button type="submit" value="Search character" title="Botão de busca">
          <img src={searchSVG} alt="ícone de busca"></img>
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
