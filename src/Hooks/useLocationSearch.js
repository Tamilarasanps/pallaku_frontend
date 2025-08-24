import { useState, useMemo } from "react";
import { State, City } from "country-state-city";
import { useTrip } from "../Contexts/TripType";

const useLocationSearch = () => {
  const [suggestionsFrom, setSuggestionsFrom] = useState([]);
  const [suggestionsTo, setSuggestionsTo] = useState([]);
  const { fromInput, setFromInput, toInput, setToInput } = useTrip();

  const searchData = useMemo(() => {
    const states = State.getStatesOfCountry("IN");
    const cities = states.flatMap((state) =>
      City.getCitiesOfState("IN", state.isoCode)
    );

    return [
      ...states.map((state) => ({ name: state.name, type: "State" })),
      ...cities.map((city) => ({ name: city.name, type: "District" })),
    ];
  }, []);

  const handleFromChange = (e) => {
    const value = e.target.value;
    setFromInput(value);

    const matches = searchData.filter((item) =>
      item.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestionsFrom(matches);
  };

  const handleToChange = (e) => {
    const value = e.target.value;
    setToInput(value);

    const matches = searchData.filter((item) =>
      item.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestionsTo(matches);
  };

  const selectFrom = (name) => {
    setFromInput(name);
    setSuggestionsFrom([]);
  };

  const selectTo = (name) => {
    setToInput(name);
    setSuggestionsTo([]);
  };

  return {
    fromInput,
    toInput,
    suggestionsFrom,
    suggestionsTo,
    handleFromChange,
    handleToChange,
    selectFrom,
    selectTo,
  };
};

export default useLocationSearch;

