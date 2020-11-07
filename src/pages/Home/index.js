import React from "react";

import Header from "../../components/Header";
import SearchForm from "../../components/SearchForm";

import "./styles.scss";

function Home() {
  return (
    <div className="page">
      <Header />
      <section className="page__content">
        <h1 className="page__content__title">Busca de personagens</h1>
        <SearchForm />
      </section>
    </div>
  );
}

export default Home;
