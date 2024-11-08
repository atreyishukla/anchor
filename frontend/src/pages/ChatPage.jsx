import React from 'react';

const creatures = [
  {
    id: 1,
    name: "Nightcrawler",
    description: "In the neon-drenched alleys of Navi Mumbai, a terror stalks the night...",
    dangerLevel: 4,
    lastSeen: "01:30AM IST",
    location: "Near Panvel, on route to Mumbai-Pune highway",
    primaryLocations: ["Bandra", "Panvel", "Thane"],
    image: "avatar.png",
  },
  {
    id: 2,
    name: "Robodawg",
    description: "In the neon-drenched alleys of Navi Mumbai, fear takes a new form...",
    dangerLevel: 3,
    lastSeen: "4:00AM IST",
    location: "Near Bandra",
    primaryLocations: ["Bandra", "Andheri", "Washi"],
    image: "avatar.png",
  },
  {
    id: 3,
    name: "Glitcher",
    description: "A haunting howl echoes through Navi Mumbai's underbelly...",
    dangerLevel: 4,
    lastSeen: "02:30AM IST",
    location: "Near Thane",
    primaryLocations: ["Thane", "Andheri", "Panvel"],
    image: "avatar.png",
  },
];

const CreatureCatalogue = () => {
  return (
    <div className="bg-secondary text-info py-10 px-5">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold">the creature</h1>
        <h1 className="text-3xl font-bold">catalogue.</h1>
        <p className="text-lg mt-2">remember safety comes first</p>
      </header>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {creatures.map((creature) => (
          <div key={creature.id} className="bg-accent rounded-lg p-6 shadow-lg">
            {/* Image */}
            <div
              className="bg-cover bg-center rounded-lg h-40 mb-4"
              style={{
                backgroundImage: `url(${creature.image})`,
              }}
            ></div>

            {/* Creature Info */}
            <h2 className="text-xl font-bold text-info mb-2">{creature.name}</h2>
            <p className="text-sm mb-4">{creature.description}</p>

            {/* Danger Level */}
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-bold text-info">Danger Level</h3>
              <p className="text-lg mt-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < creature.dangerLevel ? "text-primary-500" : "text-gray-400"}>
                    ★
                  </span>
                ))}
              </p>
            </div>

            {/* Last Seen */}
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-bold text-info">Last Seen</h3>
              <p className="text-sm mt-2">{creature.lastSeen}</p>
              <p className="text-sm">{creature.location}</p>
            </div>

            {/* Primary Locations */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-info">Primary Locations</h3>
              <ul className="list-disc list-inside mt-2">
                {creature.primaryLocations.map((location, index) => (
                  <li key={index} className="text-sm">
                    {location}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatureCatalogue;
