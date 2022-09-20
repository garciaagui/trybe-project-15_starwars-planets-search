import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PlanetsSearchContext from './PlanetsSearchContext';

function Provider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);
  const [filterByName, setFilterByName] = useState('');

  const contextValue = {
    planetsList,
    setPlanetsList,
    filterByName,
    setFilterByName,
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
