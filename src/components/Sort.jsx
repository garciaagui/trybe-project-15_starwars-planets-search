import React, { useContext } from 'react';
import PlanetsSearchContext from '../context/PlanetsSearchContext';

export default function Sort() {
  const {
    sortColumn,
    setSortColumn,
    sort,
    setSort,
    setOrder } = useContext(PlanetsSearchContext);

  return (
    <section>
      <h2>Sort</h2>

      <select
        name="column-sort"
        data-testid="column-sort"
        value={ sortColumn }
        onChange={ ({ target }) => { setSortColumn(target.value); } }
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
          setOrder({ sortColumn, sort });

          setSortColumn('population');
          setSort('');
        } }
      >
        Sort
      </button>

    </section>
  );
}
