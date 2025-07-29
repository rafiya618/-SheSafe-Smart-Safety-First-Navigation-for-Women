import React, { useState, useEffect, useRef } from 'react';
import { LoadScript } from '@react-google-maps/api';
import axios from 'axios';
import { FaShieldAlt } from 'react-icons/fa';
import DoodleBackground from './components/DoodleBackground';
import MapComponent from './components/MapComponent';
import ControlsPanel from './components/ControlsPanel';
import RouteInfoPanel from './components/RouteInfoPanel';
import TipsPanel from './components/TipsPanel';
import WeatherCard from './components/WeatherCard';

const crowdPlaceTypes = [
  'restaurant', 'hospital', 'school', 'park', 'store', 'transit_station' ];

const geminiAPI = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`;

function App() {
  const [map, setMap] = useState(null);
  const [currentPos, setCurrentPos] = useState(null);
  const [destination, setDestination] = useState('');
  const [directions, setDirections] = useState(null);
  const [weatherTips, setWeatherTips] = useState('');
  const [loading, setLoading] = useState(false);
  const [routesWithScores, setRoutesWithScores] = useState([]);
  const [currentRouteIdx, setCurrentRouteIdx] = useState(0);
  const [showShortest, setShowShortest] = useState(false);
  const [shortestRouteIdx, setShortestRouteIdx] = useState(null);
  const [error, setError] = useState('');
  const autocompleteRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        setCurrentPos({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      err => {
        setCurrentPos({ lat: 40.748817, lng: -73.985428 }); // Fallback: NYC
        setError('Unable to access your location. Showing default location.');
      }
    );
  }, []);

  // Initialize Google Places Autocomplete on input
  useEffect(() => {
    let autocomplete;
    if (
      window.google &&
      window.google.maps &&
      window.google.maps.places &&
      autocompleteRef.current
    ) {
      autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, {
        types: ['geocode', 'establishment']
      });
      autocomplete.setFields(['geometry', 'formatted_address', 'name']);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place && place.geometry && place.geometry.location) {
          setDestination({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address || place.name
          });
        }
      });
    }
    return () => {
      if (autocomplete && autocomplete.unbindAll) autocomplete.unbindAll();
    };
  }, [autocompleteRef, window.google]);

  const handleRoute = () => {
    setLoading(true);
    setError('');
    setShowShortest(false);
    const dirService = new window.google.maps.DirectionsService();

    dirService.route({
      origin: currentPos,
      destination: typeof destination === 'string' ? destination : destination,
      travelMode: 'DRIVING',
      provideRouteAlternatives: true
    }, async (res, status) => {
      if (status === 'OK') {
        try {
          const scoredRoutes = await Promise.all(res.routes.map(async (route) => {
            const score = await calculateCrowdScore(route);
            const distance = route.legs.reduce((sum, leg) => sum + leg.distance.value, 0);
            return { route, score, distance };
          }));

          scoredRoutes.sort((a, b) => {
            if (a.score !== b.score) return a.score - b.score;
            return a.distance - b.distance;
          });

          let minDist = Infinity, minIdx = 0;
          res.routes.forEach((route, idx) => {
            const dist = route.legs.reduce((sum, leg) => sum + leg.distance.value, 0);
            if (dist < minDist) {
              minDist = dist;
              minIdx = idx;
            }
          });
          setShortestRouteIdx(minIdx);

          setRoutesWithScores(scoredRoutes);
          setCurrentRouteIdx(0);

          setDirections({
            directions: res,
            routeIndex: res.routes.indexOf(scoredRoutes[0].route)
          });

          fetchTips(typeof destination === 'string' ? destination : (destination.name || ''));
        } catch (err) {
          setError('Failed to calculate safest route. Please try again.');
        }
        setLoading(false);
      } else {
        setError('Unable to find route. Please check your destination.');
        setLoading(false);
      }
    });
  };

  const calculateCrowdScore = async (route) => {
    try {
      const service = new window.google.maps.places.PlacesService(map);
      const points = route.overview_path.filter((_, idx) => idx % 10 === 0);
      let totalScore = 0;

      for (const pt of points) {
        await Promise.all(crowdPlaceTypes.map(type => new Promise((resolve) => {
          service.nearbySearch({
            location: pt,
            radius: 200,
            type
          }, (results) => {
            totalScore += (results?.length || 0);
            resolve();
          });
        })));
      }
      return -totalScore;
    } catch (e) {
      setError('Error while scoring route. Try again.');
      return 0;
    }
  };

  const fetchTips = async (location) => {
    const prompt = `
      Provide 3 short safety tips for a woman traveling ${location}.
      Also provide local emergency numbers for:
      Police (in digits only)
      Ambulance (in digits only)

      Format your answer exactly like this:
      Tips:
      1. ...
      2. ...
      3. ...
      Police: ...
      Ambulance: ...
      If not known, use "N/A"
      Keep response short and don't add anything else.
    `;
    try {
      const res = await axios.post(geminiAPI, {
        contents: [{ parts: [{ text: prompt }] }]
      });
      let text = res?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No tips available.";
      text = text
        .replace(/^\*\*(.+?)\*\*/gm, '<strong>$1</strong>')
        .replace(/^\*\s(.+)/gm, '<li>$1</li>');
      if (/<li>/.test(text)) {
        text = text.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
      }
      setWeatherTips(text);
    } catch (err) {
      setWeatherTips("Unable to fetch tips at the moment.");
      setError('Failed to fetch safety tips.');
    }
  };

  const handleShowMore = () => {
    if (!routesWithScores.length) return;
    const nextIdx = (currentRouteIdx + 1) % routesWithScores.length;
    setCurrentRouteIdx(nextIdx);

    setDirections(prev => ({
      ...prev,
      routeIndex: prev.directions.routes.indexOf(routesWithScores[nextIdx].route)
    }));

    fetchTips(typeof destination === 'string' ? destination : (destination.name || ''));
  };

  const handleShowShortest = () => {
    if (shortestRouteIdx == null || !directions) return;
    setShowShortest(true);
    setDirections(prev => ({
      ...prev,
      routeIndex: shortestRouteIdx
    }));
  };

  const handleShowSafest = () => {
    setShowShortest(false);
    setDirections(prev => ({
      ...prev,
      routeIndex: prev.directions.routes.indexOf(routesWithScores[currentRouteIdx].route)
    }));
  };

  useEffect(() => {
    if (routesWithScores.length && directions) {
      setDirections(prev => ({
        ...prev,
        routeIndex: prev.directions.routes.indexOf(routesWithScores[currentRouteIdx].route)
      }));
    }
  }, [currentRouteIdx, routesWithScores]);

  const getCurrentRouteDetails = () => {
    if (!routesWithScores.length || !directions) return null;
    const route = routesWithScores[currentRouteIdx].route;
    const score = routesWithScores[currentRouteIdx].score;
    const distance = route.legs.reduce((sum, leg) => sum + leg.distance.value, 0) / 1000;
    const duration = route.legs.reduce((sum, leg) => sum + leg.duration.value, 0) / 60;
    return {
      distance: distance.toFixed(2),
      duration: Math.round(duration),
      score: -score
    };
  };

  const getShortestRouteDetails = () => {
    if (!directions || shortestRouteIdx == null) return null;
    const route = directions.directions.routes[shortestRouteIdx];
    let score = null;
    for (const r of routesWithScores) {
      if (r.route === route) {
        score = -r.score;
        break;
      }
    }
    if (score == null && route) score = "N/A";
    const distance = route.legs.reduce((sum, leg) => sum + leg.distance.value, 0) / 1000;
    const duration = route.legs.reduce((sum, leg) => sum + leg.duration.value, 0) / 60;
    return {
      distance: distance.toFixed(2),
      duration: Math.round(duration),
      score
    };
  };

  return (
    <div className="min-h-screen w-full items-center bg-gradient-to-br from-[#e0e7ff] via-[#c7d2fe] to-[#bae6fd]">
      <DoodleBackground />
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <header className="flex flex-col items-center pt-8 pb-2">
          <h2 className="text-5xl font-extrabold text-[#a21caf] drop-shadow-glow-pink flex items-center gap-3 tracking-tight">
            <FaShieldAlt className="inline-block text-[#a21caf] drop-shadow-glow-pink" size={44} />
            SheSafe
          </h2>
          <span className="text-[#6366f1] font-semibold mt-2 text-lg">Your safety, your way</span>
        </header>
        <main className="flex flex-col md:flex-row gap-8 justify-center items-start w-full max-w-7xl mx-auto px-2 py-4">
          {/* Left: Controls and Info */}
          <section className="flex flex-col gap-4 w-full md:max-w-sm">
            <ControlsPanel
              autocompleteRef={autocompleteRef}
              destination={destination}
              setDestination={setDestination}
              handleRoute={handleRoute}
              handleShowMore={handleShowMore}
              handleShowShortest={handleShowShortest}
              handleShowSafest={handleShowSafest}
              loading={loading}
              routesWithScores={routesWithScores}
              showShortest={showShortest}
              error={error}
            />
            <RouteInfoPanel
              routesWithScores={routesWithScores}
              currentRouteIdx={currentRouteIdx}
              showShortest={showShortest}
              getCurrentRouteDetails={getCurrentRouteDetails}
              getShortestRouteDetails={getShortestRouteDetails}
            />
            <TipsPanel weatherTips={weatherTips} />
          </section>
          {/* Right: Map */}
          <section className="flex flex-col gap-4 w-full h-full">
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={["places"]}>
              <MapComponent
                currentPos={currentPos}
                destination={destination}
                directions={directions}
                showShortest={showShortest}
                onMapLoad={map => setMap(map)}
              />
            </LoadScript>
            {destination && typeof destination === 'object' && (
              <div className="mt-4">
                <WeatherCard location={destination} />
              </div>
            )}

          </section>
        </main>
      </div>
    </div>
  );
}

export default App;