import React, { useContext, useState } from 'react';
import PlanetsSearchContext from '../context/PlanetsSearchContext';

export default function Sort() {
  const { setOrder } = useContext(PlanetsSearchContext);

  const [column, setColumn] = useState('population');
  const [sort, setSort] = useState('');

  return (
    <section>
      <h2>Sort</h2>

      <select
        name="column-sort"
        data-testid="column-sort"
        value={ column }
        onChange={ ({ target }) => { setColumn(target.value); } }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <label htmlFor="column-sort-input-asc">
        <input
          type="radio"
          name="column-sort-order"
          id="column-sort-input-asc"
          value="ASC"
          data-testid="column-sort-input-asc"
          checked={ sort === 'ASC' }
          onChange={ ({ target }) => { setSort(target.value); } }
        />
        Ascendente
      </label>

      <label htmlFor="column-sort-input-desc">
        <input
          type="radio"
          name="column-sort-order"
          id="column-sort-input-desc"
          value="DESC"
          data-testid="column-sort-input-desc"
          checked={ sort === 'DESC' }
          onChange={ ({ target }) => { setSort(target.value); } }
        />
        Descendente
      </label>

      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => {
          setOrder({ column, sort });

          setColumn('population');
          setSort('');
        } }
      >
        Sort
      </button>

    </section>
  );
}
