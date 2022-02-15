import React from "react";
import { useFilterContext } from "../../state/FilterContext";
import Button from "../button/Button";
import { DateRangeValue } from "./DateRange";
import s from "./Filter.module.css";

interface FilterProps {
  setFilterVisible: React.Dispatch<React.SetStateAction<boolean>>;
  filterWaypoints: (from: string, to: string) => void;
  clearFilter: Function;
}

const Filter = ({ setFilterVisible, filterWaypoints, clearFilter }: FilterProps) => {
  const { dateRange, setDateRange } = useFilterContext();

  const handleDateChange = (
    range: HTMLInputElement,
    rangeValue: DateRangeValue
  ) => {
    switch (rangeValue) {
      case DateRangeValue.FROM:
        setDateRange({ ...dateRange, from: range.value });
        break;
      case DateRangeValue.TO:
        setDateRange({ ...dateRange, to: range.value });
        break;
      default:
        return;
    }
  };

  const handleFilterWaypointsClick = () => {
    filterWaypoints(dateRange.from, dateRange.to);
    setFilterVisible(false);
  };

  const handleClearFilterClick = () => {
    clearFilter();
  };

  return (
    <div className={s.container}>
      <p>Choose date range to filter waypoints.</p>
      <div className={s.filterItem}>
        <label htmlFor="date-from">Date from</label>
        <input
          type="date"
          id="date-from"
          value={dateRange.from}
          onChange={(e) => handleDateChange(e.target, DateRangeValue.FROM)}
        />
      </div>
      <div className={s.filterItem}>
        <label htmlFor="">Date to</label>
        <input
          type="date"
          id="date-to"
          value={dateRange.to}
          onChange={(e) => handleDateChange(e.target, DateRangeValue.TO)}
        />
      </div>
      <div className={s.btnContainer}>
        <Button
          textColor="black"
          backgroundColor="#2594E9"
          title="Filter"
          action={handleFilterWaypointsClick}
        />
        <Button
          title="Clear"
          textColor={"black"}
          backgroundColor={"#2594E9"}
          action={handleClearFilterClick}
        />
      </div>
    </div>
  );
};

export default Filter;
