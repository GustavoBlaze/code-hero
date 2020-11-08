import React from "react";

import "./styles.scss";

function CharactersTable({ characters, onClickCallback }) {
  return (
    <table className="characters-table">
      <thead>
        <tr className="characters-table__head">
          <th className="characters-table__head__character">Personagem</th>
          <th className="characters-table__head__series">Séries</th>
          <th className="characters-table__head__events">Eventos</th>
        </tr>
      </thead>
      <tbody>
        {characters.map(({ id, name, thumbnail, series, events }) => (
          <tr key={String(id)} className="characters-table__row" onClick={() => onClickCallback(id)}>
            <td className="characters-table__row__character">
              <img
                src={`${thumbnail.path}.${thumbnail.extension}`}
                alt={`${name}-thumbnail`}
              />
              <strong>{name}</strong>
            </td>
            <td className="characters-table__row__series">
              {series.items.length === 0 ? (
                <p>...</p>
              ) : (
                <>
                  {series.items
                    .filter((_, index) => index < 3)
                    .map((serie, serieIndex) => (
                      <p key={String(serieIndex)}>{serie.name}</p>
                    ))}
                </>
              )}
            </td>
            <td className="characters-table__row__events">
              {events.items.length === 0 ? (
                <p>...</p>
              ) : (
                <>
                  {events.items
                    .filter((_, index) => index < 3)
                    .map((event, eventIndex) => (
                      <p key={String(eventIndex)}>{event.name}</p>
                    ))}
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

CharactersTable.defaultProps = {
  characters: [],
};

export default CharactersTable;
