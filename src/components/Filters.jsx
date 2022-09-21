import React, { useContext } from 'react';
import PlanetsSearchContext from '../context/PlanetsSearchContext';

export default function Filters() {
  const {
    filterByName,
    setFilterByName,
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue,
    filterByNumericValues,
    setFilterByNumericValues } = useContext(PlanetsSearchContext);

  const columnsOptions = ['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  const notSelectedColumns = columnsOptions.reduce((acc, curr) => {
    if (!filterByNumericValues.some((el) => Object.values(el).includes(curr))) {
      acc.push(curr);
      return acc;
    }
    return acc;
  }, []);

  return (
    <section>
      <h2>Filters</h2>
      <input
        type="text"
        name="name-filter"
        data-testid="name-filter"
        value={ filterByName }
        onChange={ ({ target }) => { setFilterByName(target.value.toLowerCase()); } }
      />

      <select
        name="column-filter"
        data-testid="column-filter"
        value={ column }
        onChange={ ({ target }) => { setColumn(target.value); } }
      >
        {notSelectedColumns.map((el) => (
          <option key={ el } value={ el }>{el}</option>
        ))}
        {/* <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option> */}
      </select>

      <select
        name="comparison-filter"
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ ({ target }) => { setComparison(target.value); } }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        name="value-filter"
        data-testid="value-filter"
        value={ value }
        onChange={ ({ target }) => { setValue(target.value); } }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          setFilterByNumericValues(filterByNumericValues
            .concat({ column, comparison, value }));

          setColumn(notSelectedColumns.filter((option) => option !== column)[0]);
          setComparison('maior que');
          setValue('0');
        } }
      >
        Filter
      </button>

    </section>
  );
}
