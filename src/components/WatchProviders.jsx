import { useState, useEffect } from 'react';
import { getWatchProviders } from '../services/api';
import '../css/WatchProviders.css';

function WatchProviders({ movieId }) {
  const [providers, setProviders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('US'); // Default to US
  const [availableRegions, setAvailableRegions] = useState([]);

  useEffect(() => {
    async function fetchWatchProviders() {
      setLoading(true);
      try {
        const data = await getWatchProviders(movieId);
        setProviders(data);

        // Get list of available regions
        if (data) {
          const regions = Object.keys(data);
          setAvailableRegions(regions);

          // Set default region, prefer US if available
          if (regions.length > 0) {
            if (regions.includes('US')) {
              setSelectedRegion('US');
            } else {
              setSelectedRegion(regions[0]);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching watch providers:', err);
        setError('Failed to load watch providers information.');
      } finally {
        setLoading(false);
      }
    }

    if (movieId) {
      fetchWatchProviders();
    }
  }, [movieId]);

  // Get region name from region code
  const getRegionName = (code) => {
    try {
      const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
      return regionNames.of(code);
    } catch (error) {
      return code; // Fallback to code if regionNames is not supported
    }
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  // Function to handle provider click
  // The TMDB API only provides the general JustWatch URL for the movie,
  // so we'll direct users there (it will show all providers in one place)
  const handleProviderClick = (providerUrl, providerName) => {
    if (providerUrl) {
      // Track analytics if needed
      console.log(`User clicked on ${providerName} provider`);
      window.open(providerUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) return <div className="providers-loading">Loading providers...</div>;
  if (error) return <div className="providers-error">{error}</div>;
  if (!providers || Object.keys(providers).length === 0) {
    return <div className="no-providers">No watch provider information available.</div>;
  }

  // Get providers for selected region
  const regionProviders = providers[selectedRegion];
  // JustWatch base URL for providers - this is the general link to all providers for this movie
  const justWatchUrl = regionProviders?.link || '';

  return (
    <div className="watch-providers">
      <h3>Where to Watch</h3>

      {availableRegions.length > 0 && (
        <div className="region-selector">
          <label htmlFor="region-select">Select Region:</label>
          <select
            id="region-select"
            value={selectedRegion}
            onChange={handleRegionChange}
          >
            {availableRegions.map(region => (
              <option key={region} value={region}>
                {getRegionName(region)}
              </option>
            ))}
          </select>
        </div>
      )}

      {regionProviders ? (
        <div className="providers-container">
          {/* Rent providers */}
          {regionProviders.rent && regionProviders.rent.length > 0 && (
            <div className="provider-section">
              <h4>Rent</h4>
              <div className="provider-list">
                {regionProviders.rent.map(provider => (
                  <div
                    key={provider.provider_id}
                    className="provider clickable"
                    onClick={() => handleProviderClick(justWatchUrl, provider.provider_name)}
                    title={`Rent on ${provider.provider_name}`}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                    />
                    <span className="provider-name">{provider.provider_name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Buy providers */}
          {regionProviders.buy && regionProviders.buy.length > 0 && (
            <div className="provider-section">
              <h4>Buy</h4>
              <div className="provider-list">
                {regionProviders.buy.map(provider => (
                  <div
                    key={provider.provider_id}
                    className="provider clickable"
                    onClick={() => handleProviderClick(justWatchUrl, provider.provider_name)}
                    title={`Buy on ${provider.provider_name}`}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                    />
                    <span className="provider-name">{provider.provider_name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stream providers */}
          {regionProviders.flatrate && regionProviders.flatrate.length > 0 && (
            <div className="provider-section">
              <h4>Stream</h4>
              <div className="provider-list">
                {regionProviders.flatrate.map(provider => (
                  <div
                    key={provider.provider_id}
                    className="provider clickable"
                    onClick={() => handleProviderClick(justWatchUrl, provider.provider_name)}
                    title={`Stream on ${provider.provider_name}`}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                    />
                    <span className="provider-name">{provider.provider_name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* If there's a link to more info */}
          {justWatchUrl && (
            <div className="more-info">
              <a href={justWatchUrl} target="_blank" rel="noopener noreferrer">
                View All Watch Options
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="no-providers-region">
          No provider information available for this region.
        </div>
      )}
    </div>
  );
}

export default WatchProviders;
