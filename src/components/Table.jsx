import React, { useContext } from 'react';
import PlanetsSearchContext from '../context/PlanetsSearchContext';
import useFetchPlanets from '../hooks/useFetchPlanets';

export default function Table() {
  const { planetsList,
    setPlanetsList, filterByName,
    filterByNumericValues,
    order } = useContext(PlanetsSearchContext);

  const operators = {
    'maior que': (a, b) => a > b,
    'menor que': (a, b) => a < b,
    'igual a': (a, b) => a === b,
    ASC: (a, b) => a - b,
    DESC: (a, b) => b - a,
  };

  const handleSort = (arr, sort, op) => {
    const nums = arr.filter((e) => Number(e[sort]));
    const words = arr.filter((e) => !Number(e[sort]));

    nums.sort((a, b) => operators[op](Number(a[sort]), Number(b[sort])));
    words.sort();
    return nums.concat(words);
  };

  const handleFilters = () => {
    const filtered = filterByNumericValues.reduce((acc, curr) => {
      const { column, value, comparison } = curr;
      return acc
        .filter((planet) => operators[comparison](Number(planet[column]), Number(value)));
    }, planetsList);

    return filterByName.length
      ? filtered.filter(({ name }) => name.toLowerCase().includes(filterByName))
      : filtered;
  };

  const handleOrderedList = () => {
    const filtered = handleFilters();
    const { sortColumn, sort } = order;
    return sort
      ? handleSort(filtered, sortColumn, sort)
      : filtered;
  };

  // const list = filterByName.length
  //   ? handleFilterByNumericValues().filter(({ name }) => name.includes(filterByName))
  //   : handleFilterByNumericValues();

  useFetchPlanets(setPlanetsList);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {handleOrderedList().map((planet) => (
          <tr key={ planet.name }>
            <td data-testid="planet-name">{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>{ planet.films }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
