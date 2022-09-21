import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData from './mockData'

beforeEach(() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
})

afterEach(() => jest.clearAllMocks());

it('Verifica os elementos de filtragem', async () => {
  render(<App/>)

  await waitFor(() => {
    expect(screen.getByTestId(/name-filter/i)).toBeInTheDocument();
    expect(screen.getByTestId(/column-filter/i)).toBeInTheDocument();
    expect(screen.getByTestId(/comparison-filter/i)).toBeInTheDocument();
    expect(screen.getByTestId(/value-filter/i)).toBeInTheDocument();
    expect(screen.getByTestId(/button-filter/i)).toBeInTheDocument();
    expect(screen.getByTestId(/button-remove-filters/i)).toBeInTheDocument();
  })
})

it('Verifica a renderização do conteúdo da tabela', async () => {
  render(<App/>)

  const rowsBeforeFetch = screen.getAllByRole('row');
  expect(rowsBeforeFetch).toHaveLength(1);  

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets')

    const rowsAfterFetch = screen.getAllByRole('row');
    expect(rowsAfterFetch).toHaveLength(11);  
  })
})

it('Verifica se o conteúdo da tabela é filtrado ao utilizar o filtro de texto', async () => {
  render(<App/>)
  await waitFor(() => {
    const rowsBeforeFiltering = screen.getAllByRole('row');
    expect(rowsBeforeFiltering).toHaveLength(11);  
  })
  const contentToFilter = 'y'
  userEvent.type(screen.getByTestId(/name-filter/i), contentToFilter)

  const rowsAfterFiltering = screen.getAllByRole('row');
  expect(rowsAfterFiltering).toHaveLength(2);

  const filteredPlanets = screen.getAllByTestId(/planet-name/i)
  expect(filteredPlanets).toHaveLength(1)
  expect(filteredPlanets[0].innerHTML.toLowerCase().includes(contentToFilter)).toBeTruthy()
})

it('Verifica se o conteúdo da tabela é filtrado ao utilizar os filtros numéricos', async () => {
  render(<App/>)
  await waitFor(() => {
    const rowsBeforeFiltering = screen.getAllByRole('row');
    expect(rowsBeforeFiltering).toHaveLength(11);  
  })
  
  userEvent.selectOptions(screen.getByTestId(/column-filter/i), ['population'])
  userEvent.selectOptions(screen.getByTestId(/comparison-filter/i), ['maior que'])
  userEvent.type(screen.getByTestId(/value-filter/i), '6000000')
  userEvent.click(screen.getByTestId(/button-filter/i))


  const rowsAfterFirstFiltering = screen.getAllByRole('row');
  expect(rowsAfterFirstFiltering).toHaveLength(6);

  const filteredPlanets1 = screen.getAllByTestId(/planet-name/i)
  expect(filteredPlanets1).toHaveLength(5)
  
  const planetNames1 = ['Alderaan', 'Endor', 'Naboo', 'Coruscant', 'Kamino']
  filteredPlanets1.forEach((planet, index) => {
    expect(planet).toHaveTextContent(planetNames1[index])
  })

  userEvent.selectOptions(screen.getByTestId(/column-filter/i), ['orbital_period'])
  userEvent.selectOptions(screen.getByTestId(/comparison-filter/i), ['menor que'])
  userEvent.type(screen.getByTestId(/value-filter/i), '400')
  userEvent.click(screen.getByTestId(/button-filter/i))

  const rowsAfterSecondFiltering = screen.getAllByRole('row');
  expect(rowsAfterSecondFiltering).toHaveLength(4);

  const filteredPlanets2 = screen.getAllByTestId(/planet-name/i)
  expect(filteredPlanets2).toHaveLength(3)
  
  const planetNames2 = ['Alderaan', 'Naboo', 'Coruscant']
  filteredPlanets2.forEach((planet, index) => {
    expect(planet).toHaveTextContent(planetNames2[index])
  })
})

it('Testa a funcionalidade do botão de remoção de filtros', async () => {
  render(<App/>)
  await waitFor(() => {})
  
  userEvent.selectOptions(screen.getByTestId(/column-filter/i), ['diameter'])
  userEvent.selectOptions(screen.getByTestId(/comparison-filter/i), ['maior que'])
  userEvent.type(screen.getByTestId(/value-filter/i), '10000')
  userEvent.click(screen.getByTestId(/button-filter/i))

  userEvent.selectOptions(screen.getByTestId(/column-filter/i), ['surface_water'])
  userEvent.selectOptions(screen.getByTestId(/comparison-filter/i), ['igual a'])
  userEvent.type(screen.getByTestId(/value-filter/i), '12')
  userEvent.click(screen.getByTestId(/button-filter/i))

  const rowsAfterFiltering = screen.getAllByRole('row');
  expect(rowsAfterFiltering).toHaveLength(2);

  const planetsAfterFiltering = screen.getAllByTestId(/planet-name/i)
  expect(planetsAfterFiltering).toHaveLength(1)

  userEvent.click(screen.getByTestId(/button-remove-filters/i))

  const rowsAfterFiltersRemoval = screen.getAllByRole('row');
  expect(rowsAfterFiltersRemoval).toHaveLength(11);

  const planetsAfterFiltersRemoval = screen.getAllByTestId(/planet-name/i)
  expect(planetsAfterFiltersRemoval).toHaveLength(10)
})

it('Testa a remoção individual de filtro', async () => {
  render(<App/>)
  await waitFor(() => {
    const rowsBeforeFiltering = screen.getAllByRole('row');
    expect(rowsBeforeFiltering).toHaveLength(11);  
  })
  
  userEvent.selectOptions(screen.getByTestId(/column-filter/i), ['population'])
  userEvent.selectOptions(screen.getByTestId(/comparison-filter/i), ['maior que'])
  userEvent.type(screen.getByTestId(/value-filter/i), '6000000')
  userEvent.click(screen.getByTestId(/button-filter/i))

  const rowsAfterFirstFiltering = screen.getAllByRole('row');
  expect(rowsAfterFirstFiltering).toHaveLength(6);
  const filteredPlanets1 = screen.getAllByTestId(/planet-name/i)
  expect(filteredPlanets1).toHaveLength(5)
  
  userEvent.selectOptions(screen.getByTestId(/column-filter/i), ['orbital_period'])
  userEvent.selectOptions(screen.getByTestId(/comparison-filter/i), ['menor que'])
  userEvent.type(screen.getByTestId(/value-filter/i), '400')
  userEvent.click(screen.getByTestId(/button-filter/i))

  const rowsAfterSecondFiltering = screen.getAllByRole('row');
  expect(rowsAfterSecondFiltering).toHaveLength(4);
  const filteredPlanets2 = screen.getAllByTestId(/planet-name/i)
  expect(filteredPlanets2).toHaveLength(3)

  const removeFilterBtns = screen.getAllByTestId(/button-remove-specific-filter/i)
  expect(removeFilterBtns).toHaveLength(2)

  userEvent.click(removeFilterBtns[0])

  const rowsAfterFilterRemoval = screen.getAllByRole('row');
  expect(rowsAfterFilterRemoval).toHaveLength(6);
  const planetsAfterFilterRemoval = screen.getAllByTestId(/planet-name/i)
  expect(planetsAfterFilterRemoval).toHaveLength(5)
})

it('Verifica os elementos de ordenação', async () => {
  render(<App/>)

  await waitFor(() => {
    expect(screen.getByTestId('column-sort')).toBeInTheDocument();
    expect(screen.getByTestId(/column-sort-input-asc/i)).toBeInTheDocument();
    expect(screen.getByTestId(/column-sort-input-desc/i)).toBeInTheDocument();
    expect(screen.getByTestId(/column-sort-button/i)).toBeInTheDocument();
  })
})

it('Verifica se o conteúdo da tabela é ordenado ao utilizar as ferramentas de sort', async () => {
  render(<App/>)
  await waitFor(() => {})
  
  userEvent.selectOptions(screen.getByTestId('column-sort'), ['diameter'])
  userEvent.click(screen.getByTestId(/column-sort-input-asc/i))
  userEvent.click(screen.getByTestId(/column-sort-button/i))

  const ascOrderedPlanets = screen.getAllByTestId(/planet-name/i)
  const ascPlanetsOrder = ['Endor', 'Hoth', 
  'Dagobah', 'Yavin IV', 'Tatooine', 'Naboo', 'Coruscant', 'Alderaan', 'Kamino','Bespin']

  ascOrderedPlanets.forEach((planet, index) => {
    expect(planet).toHaveTextContent(ascPlanetsOrder[index])
  })

  userEvent.selectOptions(screen.getByTestId('column-sort'), ['rotation_period'])
  userEvent.click(screen.getByTestId(/column-sort-input-desc/i))
  userEvent.click(screen.getByTestId(/column-sort-button/i))

  const descOrderedPlanets = screen.getAllByTestId(/planet-name/i)
  const descPlanetsOrder = ['Kamino', 'Naboo',
  'Alderaan', 'Yavin IV', 'Coruscant', 'Tatooine', 'Hoth', 'Dagobah', 'Endor', 'Bespin']

  descOrderedPlanets.forEach((planet, index) => {
    expect(planet).toHaveTextContent(descPlanetsOrder[index])
  })

})
