import React from 'react';
import { FaShieldAlt, FaExclamationCircle } from 'react-icons/fa';
import { MdOutlineRoute } from 'react-icons/md';

const ControlsPanel = ({
  autocompleteRef,
  destination,
  setDestination,
  handleRoute,
  handleShowMore,
  handleShowShortest,
  handleShowSafest,
  loading,
  routesWithScores,
  showShortest,
  error
}) => {
  return (
    <div className="bg-[#f3f4f6] rounded-3xl shadow-2xl px-8 py-6 border-x-2 border-b-2 border-t-0 border-[#818cf8] backdrop-blur-md">
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <input
            ref={autocompleteRef}
            type="text"
            placeholder="Enter destination..."
            value={typeof destination === 'string' ? destination : (destination.name || '')}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-5 py-3 rounded-full border border-[#818cf8] focus:outline-none focus:ring-4 focus:ring-[#818cf8] shadow-lg bg-[#f3f4f6] text-[#374151] placeholder-[#a5b4fc] font-medium transition"
            style={{
              position: 'relative',
              zIndex: 20
            }}
          />
        </div>
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          <button
            onClick={handleRoute}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#be185d] via-[#6d28d9] to-[#0e7490] text-white font-bold shadow-lg hover:from-[#a21caf] hover:to-[#0e7490] hover:scale-[1.03] transition-all duration-200 border-0 focus:ring-4 focus:ring-[#818cf8] ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2 w-full justify-center">
                <svg className="animate-spin h-5 w-5 text-gray-200" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-25" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                <span className="block w-full text-center text-gray-200">Loading...</span>
              </span>
            ) : (
              <>
                <FaShieldAlt className="text-white" /> Show Safest
              </>
            )}
          </button>
          {routesWithScores.length > 1 && (
            <button
              onClick={handleShowMore}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0ea5e9] via-[#6d28d9] to-[#be185d] text-white font-bold shadow-lg hover:from-[#0ea5e9] hover:to-[#be185d] hover:scale-[1.03] transition-all duration-200 border-0 focus:ring-4 focus:ring-[#818cf8]"
              disabled={loading}
            >
              <span className="font-bold">Show More</span>
            </button>
          )}
          {routesWithScores.length > 0 && (
            showShortest ? (
              <button
                onClick={handleShowSafest}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#22d3ee] via-[#6d28d9] to-[#be185d] text-white font-bold shadow-lg hover:from-[#22d3ee] hover:to-[#be185d] hover:scale-[1.03] transition-all duration-200 border-0 focus:ring-4 focus:ring-[#818cf8]"
              >
                <FaShieldAlt /> Show Safest
              </button>
            ) : (
              <button
                onClick={handleShowShortest}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#c83636] via-[#f55151] to-[#dd552c] text-white font-bold shadow-lg hover:from-[#dd552c] hover:to-[#c83636]  hover:scale-[1.03] transition-all duration-200 border-0 focus:ring-4 focus:ring-[#818cf8]"
              >
                <MdOutlineRoute /> Show Shortest
              </button>
            )
          )}
        </div>
        {error && (
          <div className="flex items-center gap-2 mt-2 text-red-400 bg-red-900/80 rounded-lg px-4 py-2 shadow">
            <FaExclamationCircle /> <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlsPanel;