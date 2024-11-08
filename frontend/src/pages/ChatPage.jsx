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

      {creatures.map((creature) => (
        <div
          key={creature.id}
          className="grid gap-4 mb-10 max-w-4xl mx-auto p-4 bg-accent rounded-lg lg:grid-cols-6 lg:grid-rows-5 lg:h-96"
        >
          {/* Image */}
          <div
            className="lg:col-span-4 lg:row-span-4 bg-cover bg-center rounded-lg"
            style={{
              backgroundImage: `url(${creature.image})`,
            }}
          ></div>

          {/* Description */}
          <div className="lg:col-span-2 lg:row-span-4 bg-accent p-4 rounded-lg text-left text-info text-base">
            <p>{creature.description}</p>
          </div>

          {/* Danger Level */}
          <div className="lg:col-span-2 lg:row-span-1">
            <h2 className="text-2xl font-bold text-gray-900">Danger Level</h2>
            <p className="text-xl mt-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < creature.dangerLevel ? "text-yellow-500" : "text-gray-400"}>
                  ★
                </span>
              ))}
            </p>
          </div>

          {/* Last Seen */}
          <div className="lg:col-span-2 lg:row-span-1">
            <h2 className="text-2xl font-bold text-info">Last Seen</h2>
            <p className="mt-2 text-lg">{creature.lastSeen}</p>
            <p className="mt-1 text-lg">{creature.location}</p>
          </div>

          {/* Primary Locations */}
          <div className="lg:col-span-2 lg:row-span-1">
            <h2 className="text-2xl font-bold text-info">Primary Locations</h2>
            {creature.primaryLocations.map((location, index) => (
              <p key={index} className="mt-1 text-lg">
                {location}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreatureCatalogue;