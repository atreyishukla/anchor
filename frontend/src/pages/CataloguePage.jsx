import React from 'react';

// Predefined data for creatures
const creatures = [
  {
    id: 1,
    name: "SeaCrawler",
    image: "monster.jpg",
    description: "In the neon-drenched alleys of Navi Mumbai, a terror stalks the night. The Nightcrawler, once a brilliant hacker, is now a chilling victim of cyberpsychosis. His augmented mind twists reality, and his chrome limbs lash out in a desperate war against his own fractured perception. A twisted cyborg, its humanity fractured by cyberpsychosis. Wracked by glitches and hallucinations, the Nightcrawler hunts through the shadows, its augmented senses blurring the line between reality and a nightmare world.",
    dangerLevel: 4,
    lastSeen: {
      time: "01:30AM IST",
      location: "Near Panvel, on route to Mumbai-Pune highway"
    },
    primaryLocations: ["Bandra", "Panvel", "Thane"]
  },
  {
    id: 2,
    name: "Kraken",
    image: "monster1.jpg",
    description: "In the neon-drenched alleys of Navi Mumbai, a terror stalks the night. The Nightcrawler, once a brilliant hacker, is now a chilling victim of cyberpsychosis. His augmented mind twists reality, and his chrome limbs lash out in a desperate war against his own fractured perception. A twisted cyborg, its humanity fractured by cyberpsychosis. Wracked by glitches and hallucinations, the Nightcrawler hunts through the shadows, its augmented senses blurring the line between reality and a nightmare world.",
    dangerLevel: 3,
    lastSeen: {
      time: "01:30AM IST",
      location: "Near Panvel, on route to Mumbai-Pune highway"
    },
    primaryLocations: ["Bandra", "Panvel", "Thane"]
  },
  {
    id: 3,
    name: "Ghoul",
    image: "monster2 .jpg",
    description: "In the neon-drenched alleys of Navi Mumbai, a terror stalks the night. The Nightcrawler, once a brilliant hacker, is now a chilling victim of cyberpsychosis. His augmented mind twists reality, and his chrome limbs lash out in a desperate war against his own fractured perception. A twisted cyborg, its humanity fractured by cyberpsychosis. Wracked by glitches and hallucinations, the Nightcrawler hunts through the shadows, its augmented senses blurring the line between reality and a nightmare world.",
    dangerLevel: 4,
    lastSeen: {
      time: "01:30AM IST",
      location: "Near Panvel, on route to Mumbai-Pune highway"
    },
    primaryLocations: ["Bandra", "Panvel", "Thane"]
  },
];

const CreatureCard = ({ creature }) => {
  const { name, image, description, dangerLevel, lastSeen, primaryLocations } = creature;

  return (
    <div className="font-priamry max-w-6xl mx-auto space-y-4">
      {/* Top section with image and description */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left side - Image and title */}
        <div className="relative ounded-2xl overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover opacity-90 rounded-md"
          />
          <div className="absolute bottom-6 left-6">
            <h1 className="text-white text-4xl font-bold">
              The<br />
              <span className="text-white">{name}</span>
            </h1>
          </div>
        </div>

        {/* Right side - Description */}
        <div className="bg-accent rounded-2xl p-6 text-info">
        <h2 className="text-primary text-2xl font-bold mb-4">
            Description
          </h2>
          <p className="text-sm leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Bottom section with three cards */}
      <div className="grid grid-cols-3 gap-4">
        {/* Danger Level */}
        <div className="bg-accent rounded-2xl p-6">
          <h2 className="text-primary text-2xl font-bold mb-4">
            Danger<br />Level
          </h2>
          <div className="text-info flex text-2xl">
            {'★'.repeat(dangerLevel)}{'☆'.repeat(5 - dangerLevel)}
          </div>
        </div>

        {/* Last Seen */}
        <div className="bg-accent rounded-2xl p-6">
          <h2 className="text-2xl  text-primary font-bold mb-4">
            Last<br />Seen
          </h2>
          <p className="font-bold text-info">{lastSeen.time}</p>
          <p className="mt-2 text-sm text-info">{lastSeen.location}</p>
        </div>

        {/* Primary Locations */}
        <div className="bg-accent rounded-2xl p-6">
          <h2 className="text-2xl text-primary font-bold mb-4">
            Primary<br />Locations
          </h2>
          <ul className="space-y-1 text-info">
            {primaryLocations.map((location, index) => (
              <li key={index}>{location}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const CataloguePage = () => {
  return (
    <div className="min-h-screen bg-base-100 p-20">
      {/* Map through creatures */}
      {creatures.map(creature => (
        <CreatureCard key={creature.id} creature={creature} className="mb-40"/>
      ))}
    </div>
  );
};

export default CataloguePage;