import React, { useState, useEffect, useCallback, useMemo } from "react";

import Header from "../../components/Header";
import SearchForm from "../../components/SearchForm";
import CharactersTable from "../../components/CharactersTable";
import FooterWithPagination from "../../components/FooterWithPagination";
import CharacterModal from "../../components/CharacterModal";
import md5 from "js-md5";

import "./styles.scss";

const API_URL = "https://gateway.marvel.com/v1/public/characters";
const PUBLIC_KEY = "597b63caf3f947556f47c4f1ad84abce";

function Home() {
  const [data, setData] = useState({});
  const [lastSearch, setLastSearch] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(false);

  const { page, pages, results } = useMemo(
    () => ({
      page: data.offset / 10,
      pages: Math.floor(data.total / data.limit) || 1,
      results: Array.isArray(data.results) ? data.results : [],
    }),
    [data]
  );

  const paseApiData = useCallback((response) => {
    const { code, data } = response;

    if (code !== 200) {
      console.error("Houve um erro buscar os dados", response);
      return;
    }

    setData(data);
  }, []);

  const callApi = useCallback(
    async (characterName, offset = 0) => {
      setLoading(true);

      const timestamp = Number(new Date());
      const hash = md5.create();
      hash.update(timestamp + PUBLIC_KEY);

      try {
        const data = await fetch(
          `${API_URL}?ts=${timestamp}&nameStartsWith=${
            characterName || "A"
          }&offset=${offset * 10}&orderBy=name&limit=10&apikey=${PUBLIC_KEY}`
        ).then((r) => r.json());

        paseApiData(data);
        setLastSearch(characterName);

        if (window) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      } catch (err) {
        console.error(err);
      }

      setLoading(false)
    },
    [paseApiData]
  );

  const handlePaginationClick = useCallback(
    (page) => {
      callApi(lastSearch, page);
    },
    [callApi, lastSearch]
  );

  const handleCharacterListClick = useCallback(
    (characterId) => {
      const htmlPage = document?.querySelector("html");

      if (htmlPage) htmlPage.style.overflowY = "hidden";

      const character = results.find(({ id }) => id === characterId);
      setSelectedCharacter(character || null);
    },
    [results]
  );

  const handleModalCloseClick = useCallback(() => {
    const htmlPage = document?.querySelector("html");

    if (htmlPage) htmlPage.style.overflowY = "auto";

    setSelectedCharacter(null);
  }, []);

  useEffect(() => {
    callApi(null, 0);
  }, [callApi]);

  return (
    <div className="home">
      <Header />
      <section className="home__content">
        <h1 className="home__content__title">Busca de personagens</h1>
        <SearchForm callApiCallback={callApi} loading={loading}/>
        <CharactersTable
          onClickCallback={handleCharacterListClick}
          characters={results}
        />
      </section>
      <FooterWithPagination
        page={page || 1}
        pages={pages}
        callback={handlePaginationClick}
      />
      {selectedCharacter && (
        <CharacterModal
          closeCallback={handleModalCloseClick}
          character={selectedCharacter}
        />
      )}
    </div>
  );
}

export default Home;
