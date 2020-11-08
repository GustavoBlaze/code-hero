import React, { useMemo, useState, useEffect, useCallback } from "react";
import md5 from "js-md5";

import arrowRightSVG from "../../assets/icons/arrow-right.svg";
import "./styles.scss";

const API_URL = "https://gateway.marvel.com/v1/public/characters";
const PUBLIC_KEY = "597b63caf3f947556f47c4f1ad84abce";

function CharacterModal({ character, closeCallback, ...rest }) {
  const [comics, setComics] = useState([]);

  const { id, thumbnail, name, description } = useMemo(
    () => ({
      id: character.id,
      thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
      name: character.name,
      description: character.description,
    }),
    [character]
  );

  useEffect(() => {
    async function loadComics() {
      const timestamp = Number(new Date());
      const hash = md5.create();
      hash.update(timestamp + PUBLIC_KEY);

      const {
        data: { results },
      } = await fetch(
        `${API_URL}/${id}/comics?ts=${timestamp}&apikey=${PUBLIC_KEY}`
      ).then((r) => r.json());

      setComics(results);
    }

    loadComics();
  }, [id]);

  const handleModalClick = useCallback(({ target }) => {
    const { id } = target;
    if (id === "character-modal") {
      closeCallback();
    }
  }, [closeCallback]);

  return (
    <div
      className="character-modal"
      id="character-modal"
      {...rest}
      onClick={handleModalClick}
    >
      <div className="character-modal__container">
        <header className="character-modal__header">
          <img src={thumbnail} alt="character-thumbnail" />
          <button type="button" onClick={closeCallback}>
            Fechar
          </button>

          <h2>{name}</h2>
        </header>
        <div className="character-modal__content">
          <h2>Descrição</h2>
          <p>{`${description || "..."}`}</p>
          <h2 style={{ display: "flex", alignItems: "center" }}>
            Comics{" "}
            {comics.length > 0 && (
              <img className="arrow-right" alt="arrow-right-icon" src={arrowRightSVG} />
            )}
          </h2>
          {comics.length === 0 ? (
            <p>...</p>
          ) : (
            <ul>
              {comics.map((comic) => (
                <li key={String(comic.id)}>
                  <a
                    href={comic.urls.find(({ type }) => type === "detail")?.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt="comic-thumbnail"
                      title={comic.title}
                      loading="lazy"
                    />

                    {comic.title}
                    <br></br>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

CharacterModal.defaultProps = {
  character: {},
  closeCallback: () => {},
};

export default React.memo(CharacterModal);
