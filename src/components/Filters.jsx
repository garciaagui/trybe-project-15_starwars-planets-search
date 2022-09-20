import React, { useContext } from 'react';
import PlanetsSearchContext from '../context/PlanetsSearchContext';

export default function Filters() {
  const { filterByName, setFilterByName } = useContext(PlanetsSearchContext);

  return (
    <section>
      <h2>Filters</h2>
      <input
        type="text"
        name="name-filter"
        data-testid="name-filter"
        value={ filterByName }
        onChange={ ({ target }) => { setFilterByName(target.value); } }
      />
    </section>
  );
}
