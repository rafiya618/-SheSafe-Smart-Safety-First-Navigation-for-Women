import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
const containerStyle = {
  width: '100%',
  height: '70vh'
};
const MapComponent = ({ 
  currentPos, 
  destination, 
  directions, 
  showShortest, 
  onMapLoad 
}) => {
  return (
    <div className="w-full max-w-4xl">
      <div className="rounded-2xl overflow-hidden shadow-lg border-x-2 border-b-2 border-[#818cf8] bg-[#f3f4f6]">
        <GoogleMap
          mapContainerStyle={{ ...containerStyle, backgroundColor: "#f3f4f6" }}
          options={{
            styles: [
              { elementType: 'geometry', stylers: [{ color: '#f3f4f6' }] },
              { elementType: 'labels.text.stroke', stylers: [{ color: '#f3f4f6' }] },
              { elementType: 'labels.text.fill', stylers: [{ color: '#6366f1' }] },
              { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#e0e7ff' }] },
              { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#bae6fd' }] },
              { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#a5b4fc' }] },
              { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#e0e7ff' }] },
            ],
            disableDefaultUI: false,
            backgroundColor: "#f3f4f6"
          }}
          center={currentPos}
          zoom={14}
          onLoad={onMapLoad}
        >
          {currentPos && (
            <Marker
              position={currentPos}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/pink-dot.png"
              }}
            />
          )}
          {directions && (
            <DirectionsRenderer
              directions={directions.directions}
              routeIndex={directions.routeIndex}
              options={{
                polylineOptions: showShortest
                  ? { strokeColor: "#ef4444", strokeWeight: 7, strokeOpacity: 0.95 }
                  : { strokeColor: "#a21caf", strokeWeight: 7, strokeOpacity: 0.95 },
                suppressMarkers: false
              }}
            />
          )}
          {typeof destination === 'object' && destination.lat && (
            <Marker
              position={{ lat: destination.lat, lng: destination.lng }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
              }}
            />
          )}
        </GoogleMap>
      </div>
      
    </div>
  );
};

export default MapComponent;