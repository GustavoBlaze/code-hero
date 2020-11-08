import React, { useState, useCallback, useMemo } from "react";

import Header from "../../components/Header";
import SearchForm from "../../components/SearchForm";
import CharactersTable from "../../components/CharactersTable";

import "./styles.scss";

function Home() {
  const [data, setData] = useState({});

  const { limit, total, offset, results } = useMemo(
    () => ({
      limit: data.limit || 0,
      total: data.total || 0,
      offset: data.offset || 0,
      results: Array.isArray(data.results) ? data.results : [],
    }),
    [data]
  );

  const parseApiDataCallback = useCallback((response) => {
    const { code, data } = response;

    if (code !== 200) {
      console.error("Houve um erro buscar os dados", response);
      return;
    }

    setData(data);
  }, []);

  console.log({ limit, total, offset, results });

  return (
    <div className="page">
      <Header />
      <section className="page__content">
        <h1 className="page__content__title">Busca de personagens</h1>
        <SearchForm parseApiDataCallback={parseApiDataCallback} />
        <CharactersTable characters={results} />
      </section>
    </div>
  );
}

export default Home;
