import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PlanetsSearchContext from './PlanetsSearchContext';

export default function Provider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({});

  const contextValue = {
    planetsList,
    setPlanetsList,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    order,
    setOrder,
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
