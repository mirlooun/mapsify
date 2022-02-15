import React, { useState } from "react";
import Filter from "../filter/Filter";
import Button from "../button/Button";
import s from "./ControlPanel.module.css";
import FilterContextProvider from "../../state/FilterContext";
import { useSummaryContext } from "../../state/SummaryContext";
import { Marker } from "../../model/marker";

interface ControlPanelProps {
  directions: google.maps.DirectionsResult | null;
  setDirections: React.Dispatch<
    React.SetStateAction<google.maps.DirectionsResult | null>
  >;
  filterWaypoints: (from: string, to: string) => void;
  clearFilter: () => void;
  calculateDistance: (currentWaypoints: Marker[]) => void;
}

const ControlPanel = ({
  directions,
  setDirections,
  filterWaypoints,
  clearFilter,
  calculateDistance,
}: ControlPanelProps) => {
  const { currentWaypoints, setCurrentWaypoints } = useSummaryContext();
  const [isFilterVisible, setFilterVisible] = useState(true);

  const handleFilterButtonClick = () => {
    setFilterVisible(!isFilterVisible);
  };

  const handleClearButtonClick = () => clearFilter();

  const handleCalculateRouteButtonClick = () => calculateDistance(currentWaypoints);

  const handleChooseNewTripClick = () => {
    setCurrentWaypoints([]);
    setDirections(null);
  };

  return (
    <div className={s.container}>
      <FilterContextProvider>
        {isFilterVisible ? (
          <Filter
            filterWaypoints={filterWaypoints}
            setFilterVisible={setFilterVisible}
            clearFilter={handleClearButtonClick}
          />
        ) : null}
      </FilterContextProvider>
      <div className={s.innerContainer}>
        <Button
          title={isFilterVisible ? "Close filter" : "Open filter"}
          textColor="black"
          backgroundColor="white"
          action={handleFilterButtonClick}
        />
        {currentWaypoints.length > 1 && !directions ? (
          <Button
            title="Calculate distance"
            action={handleCalculateRouteButtonClick}
            textColor={"black"}
            backgroundColor={"white"}
          />
        ) : null}
        {directions ? (
          <Button
            title="Choose another trip"
            action={handleChooseNewTripClick}
            textColor={"black"}
            backgroundColor={"white"}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ControlPanel;
