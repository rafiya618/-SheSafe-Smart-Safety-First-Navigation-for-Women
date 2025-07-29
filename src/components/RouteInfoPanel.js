import React from 'react';
import RouteDetails from './RouteDetails';
import { FaShieldAlt, FaExclamationCircle } from 'react-icons/fa';
import { MdOutlineRoute } from 'react-icons/md';

const RouteInfoPanel = ({
  routesWithScores,
  currentRouteIdx,
  showShortest,
  getCurrentRouteDetails,
  getShortestRouteDetails
}) => {
  return (
    <>
      {routesWithScores.length > 0 && (
        <div className="bg-[#f3f4f6] rounded-3xl shadow-2xl px-8 py-6 flex flex-col items-center w-full border-x-2 border-b-2 border-t-0 border-[#818cf8] backdrop-blur-md mt-6">
          <span className="text-lg font-bold text-[#6376d4] mb-1 tracking-wide drop-shadow-glow-purple">
            {showShortest ? "Shortest Route" : `Route ${currentRouteIdx + 1} of ${routesWithScores.length}`}
          </span>
          <RouteDetails
            details={showShortest ? getShortestRouteDetails() : getCurrentRouteDetails()}
            highlight={showShortest}
          />
          <span className="text-xs text-[#cd5593] mt-1">
            {showShortest
              ? "Shortest route (not always safest)"
              : currentRouteIdx === 0
                ? "Safest route"
                : "Alternative route"}
          </span>
        </div>
      )}
      {routesWithScores.length > 0 && showShortest && (
        <div className="bg-[#f3f4f6] rounded-3xl shadow-lg px-8 py-6 mt-6 flex flex-col items-center w-full border-x-2 border-b-2 border-t-0 border-[#818cf8] backdrop-blur-md">
          <span className="text-lg font-bold text-[#6376d4] mb-2">Comparison</span>
          <div className="flex flex-col gap-2 w-full font-semibold text-gray-600">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#22d3ee] flex items-center gap-1"><FaShieldAlt /> Safest</span>
              <span className="font-semibold text-[#ef4444] flex items-center gap-1"><MdOutlineRoute /> Shortest</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Distance: {getCurrentRouteDetails()?.distance} km</span>
              <span className="text-sm">Distance: {getShortestRouteDetails()?.distance} km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Duration: {getCurrentRouteDetails()?.duration} min</span>
              <span className="text-sm">Duration: {getShortestRouteDetails()?.duration} min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Safety Score: {getCurrentRouteDetails()?.score}</span>
              <span className="text-sm">Safety Score: {getShortestRouteDetails()?.score}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RouteInfoPanel;