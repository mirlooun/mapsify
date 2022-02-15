import React, { useContext, useState } from "react";
import { DateRange } from "../components/filter/DateRange";

interface FilterState {
  dateRange: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
}

const initialState: FilterState = {
  dateRange: { from: "", to: "" },
  setDateRange: () => {},
};

export const FilterContext = React.createContext(initialState);

const FilterContextProvider: React.FC = (props) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: "",
    to: "",
  });

  const initialState: FilterState = {
    dateRange: dateRange,
    setDateRange: setDateRange,
  };

  return (
    <FilterContext.Provider value={initialState}>
      {props.children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);

export default FilterContextProvider;
