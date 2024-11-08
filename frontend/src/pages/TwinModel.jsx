import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MarineEcosystemSimulation = () => {
  const [liveData, setLiveData] = useState({
    temperature: "Loading...",
    waveHeight: "Loading...",
    currentSpeed: "Loading..."
  });
  const [parameters, setParameters] = useState({
    temperature: 26,
    waveHeight: 1,
    currentSpeed: 0.2
  });
  const [chartData, setChartData] = useState({
    labels: ['0min', '10min', '20min', '30min', '40min', '50min', '60min'],
    datasets: [
      {
        label: 'Coral Health (%)',
        data: [100],
        borderColor: '#00897b',
        backgroundColor: 'rgba(0, 137, 123, 0.1)',
        fill: 'origin'
      },
      {
        label: 'Fish Abundance (%)',
        data: [100],
        borderColor: '#1565c0',
        backgroundColor: 'rgba(21, 101, 192, 0.1)',
        fill: 'origin'
      }
    ]
  });

  const fetchLiveData = async () => {
    try {
      const response = await fetch(
        'https://data.api.xweather.com/maritime/-48.8767,-123.3933?filter=1hr&client_id=4sD10XudIcr6dgFi4CXC9&client_secret=ZxllrpDmkaiUzPBiV5T8AuhZfFuHQ6Pibj4nsVt4'
      );
      const data = await response.json();
      if (data.success && data.response[0] && data.response[0].periods[0]) {
        const latest = data.response[0].periods[0];
        setLiveData({
          temperature: `${latest.seaSurfaceTemperatureC}°C`,
          waveHeight: `${latest.significantWaveHeightM}m`,
          currentSpeed: `${latest.seaCurrentSpeedMPS.toFixed(2)}m/s`
        });
        setParameters({
          temperature: latest.seaSurfaceTemperatureC,
          waveHeight: latest.significantWaveHeightM,
          currentSpeed: latest.seaCurrentSpeedMPS
        });
      }
    } catch (error) {
      console.error("Error fetching live data:", error);
    }
  };

  const updateChartData = () => {
    const coralHealth = calculateCoralHealth(parameters.temperature, parameters.waveHeight, parameters.currentSpeed);
    const fishAbundance = calculateFishAbundance(coralHealth, parameters.currentSpeed);

    setChartData((prev) => ({
      ...prev,
      datasets: [
        { ...prev.datasets[0], data: [...prev.datasets[0].data.slice(-6), coralHealth] },
        { ...prev.datasets[1], data: [...prev.datasets[1].data.slice(-6), fishAbundance] }
      ]
    }));
  };

  const calculateCoralHealth = (temp, waveHeight, currentSpeed) => {
    let health = 100;
    const optimalTemp = 26;
    const bleachingThreshold = 30;

    if (temp > optimalTemp) {
      const tempStress = temp - optimalTemp;
      health -= Math.pow(tempStress, 2.1) * 5;
    }

    const criticalWaveHeight = 4;
    if (waveHeight > criticalWaveHeight) {
      const waveStress = waveHeight - criticalWaveHeight;
      health -= Math.pow(waveStress, 1.8) * 6;
    }

    const optimalCurrent = 0.2;
    const currentStress = Math.abs(currentSpeed - optimalCurrent);
    health -= currentStress * 25;

    return Math.max(0, Math.min(100, health));
  };

  const calculateFishAbundance = (coralHealth, currentSpeed) => {
    let abundance = 100;

    if (coralHealth < 75) {
      abundance = 100 * Math.pow(coralHealth / 75, 1.5);
    }

    if (currentSpeed > 0.5) {
      abundance -= (currentSpeed - 0.5) * 30;
    }

    return Math.max(0, Math.min(100, abundance));
  };

  const handleSliderChange = (parameter, value) => {
    setParameters((prev) => ({ ...prev, [parameter]: value }));
    updateChartData();
  };

  useEffect(() => {
    fetchLiveData();
    const intervalId = setInterval(fetchLiveData, 60000); // Fetch every 60 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-secondary p-8 text-info font-primary min-h-screen">
      <h1 className="text-4xl text-primary text-center mb-10">Marine Ecosystem Digital Twin</h1>
      <div className="container mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Live Readings */}
        <div className="card bg-accent rounded-lg shadow-lg p-5">
          <h2 className="text-xl text-primary font-semibold mb-4">Live Readings</h2>
          <div className="bg-secondary p-4 rounded-md border-l-4 border-primary">
            <div className="flex justify-between my-2">
              <span>Temperature:</span>
              <span>{liveData.temperature}</span>
            </div>
            <div className="flex justify-between my-2">
              <span>Wave Height:</span>
              <span>{liveData.waveHeight}</span>
            </div>
            <div className="flex justify-between my-2">
              <span>Current Speed:</span>
              <span>{liveData.currentSpeed}</span>
            </div>
          </div>
        </div>
        
        {/* Simulation Parameters */}
        <div className="card bg-accent rounded-lg shadow-lg p-5">
          <h2 className="text-xl text-primary font-semibold mb-4">Simulation Parameters</h2>
          <div>
            {["temperature", "waveHeight", "currentSpeed"].map((param, idx) => (
              <div key={idx} className="my-4">
                <label className="block text-sm mb-2 capitalize">{param.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type="range"
                  min={param === "temperature" ? 1 : 0}
                  max={param === "temperature" ? 45 : param === "waveHeight" ? 8 : 2}
                  step="0.1"
                  value={parameters[param]}
                  onChange={(e) => handleSliderChange(param, parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="text-right mt-1">{parameters[param]}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Ecosystem Health Indicators */}
        <div className="card bg-accent rounded-lg shadow-lg p-5">
          <h2 className="text-xl text-primary font-semibold mb-4">Ecosystem Health Indicators</h2>
          <Line data={chartData} options={{ responsive: true, scales: { y: { min: 0, max: 100 }}}} />
        </div>
      </div>
    </div>
  );
};

export default MarineEcosystemSimulation;
