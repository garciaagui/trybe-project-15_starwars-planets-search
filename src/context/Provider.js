import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PlanetsSearchContext from './PlanetsSearchContext';

function Provider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);

  const contextValue = {
    planetsList,
    setPlanetsList,
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
