import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PlanetsSearchContext from './PlanetsSearchContext';

function Provider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const contextValue = {
    planetsList,
    setPlanetsList,
    filterByName,
    setFilterByName,
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue,
    filterByNumericValues,
    setFilterByNumericValues,
  };

  return (
    <PlanetsSearchContext.Provider value={ contextValue }>
      {children}
    </PlanetsSearchContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
