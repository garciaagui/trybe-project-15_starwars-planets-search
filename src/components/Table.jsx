import React, { useContext } from 'react';
import PlanetsSearchContext from '../context/PlanetsSearchContext';
import useFetchPlanets from '../hooks/useFetchPlanets';

export default function Table() {
  const { planetsList,
    setPlanetsList, filterByName,
    filterByNumericValues } = useContext(PlanetsSearchContext);

  const operators = {
    'maior que': (a, b) => a > b,
    'menor que': (a, b) => a < b,
    'igual a': (a, b) => a === b,
  };

  const handleFilters = () => {
    // if (!filterByNumericValues.length) return planetsList;
    // const { column, comparison, value } = filterByNumericValues[0];
    // return planetsList
    //   .filter((planet) => operators[comparison](Number(planet[column]), Number(value)));
    const filteredList = filterByNumericValues.reduce((acc, curr) => {
      const { column, value, comparison } = curr;
      return acc
        .filter((planet) => operators[comparison](Number(planet[column]), Number(value)));
    }, planetsList);

    return filterByName.length
      ? filteredList.filter(({ name }) => name.toLowerCase().includes(filterByName))
      : filteredList;
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
        {handleFilters().map((planet) => (
          <tr key={ planet.name }>
            <td>{ planet.name }</td>
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
