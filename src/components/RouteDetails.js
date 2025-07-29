import React from 'react';

const RouteDetails = ({ details, highlight }) => {
  if (!details) return null;
  return (
    <div className={`flex flex-col gap-1 text-base font-medium ${highlight ? "text-gray-600" : "text-gray-600"}`}>
      <span><span className="font-semibold">Distance:</span> {details.distance} km</span>
      <span><span className="font-semibold">Duration:</span> {details.duration} min</span>
      <span>
        <span className="font-semibold">Safety Score:</span>{" "}
        <span className={`inline-block px-2 py-0.5 rounded-full font-bold shadow-glow-pink ${highlight ? "bg-red-100 text-red-500" : "bg-pink-100 text-red-500"}`}>{details.score}</span>
        <span className="ml-1 text-xs text-red-500">(higher is safer)</span>
      </span>
    </div>
  );
};

export default RouteDetails;