import { useEffect } from 'react';

export default function useFetchPlanets(setState) {
  const URL = 'https://swapi.dev/api/planets';

  useEffect(() => {
    const getPlanetsList = async () => {
      const { results } = await fetch(URL).then((response) => response.json());

      const planets = results.reduce((acc, curr) => {
        delete curr.residents;
        acc.push(curr);
        return acc;
      }, []);

      setState(planets);
    };
    getPlanetsList();
  }, []);
}
