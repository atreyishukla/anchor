import React from 'react';

// Predefined data for creatures
const creatures = [
  {
    id: 1,
    name: "SeaCrawler",
    image: "monster.jpg",
    description: "With spiked limbs and a tough, armored shell, the SeaCrawler scuttles across the ocean floor, scavenging and defending its domain. Its keen sense for detecting underwater vibrations makes it a relentless tracker and a formidable opponent for any who disturb its habitat.",
    dangerLevel: 4,
    lastSeen: {
      time: "03:30AM PST",
      location: "Near Point Nemo, in the Pacific Ocean"
    },
    weaknesses: ["Bright Light", "Ultrasonic Sound", "CW"]
  },
  {
    id: 2,
    name: "Kraken",
    image: "monster1.jpg",
    description: "A massive, serpent-like creature lurking in the deep, Krake has powerful tentacles and an ancient, almost mystical intelligence. Known for its immense size and camouflage abilities, it can crush entire vessels, instilling fear in those who venture too close to its territory.",
    dangerLevel: 3,
    lastSeen: {
      time: "02:30PM PST",
      location: "Near Point Nemo, in the Pacific Ocean"
    },
    weaknesses: ["Bright Light", "Ultrasonic Sound", "CW"]
  },
  {
    id: 3,
    name: "Ghoul",
    image: "monster2 .jpg",
    description: "A ghostly, spectral entity haunting the seabed, The Ghoul drifts silently, shrouded in a mist-like aura. It preys on the fears of nearby creatures, causing disorientation and hallucinations, and is rumored to be the remnant of a lost soul trapped beneath the waves.",
    dangerLevel: 5,
    lastSeen: {
      time: "01:30AM PST",
      location: "Near Point Nemo, in the Pacific Ocean"
    },
    weaknesses: ["Bright Light", "Ultrasonic Sound", "CW"]
  },
];

const CreatureCard = ({ creature }) => {
  const { name, image, description, dangerLevel, lastSeen, weaknesses } = creature;

  return (
    <div className="font-primary max-w-6xl mx-auto space-y-4">
      {/* Top section with image and description */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left side - Image and title */}
        <div className="relative rounded-2xl overflow-hidden">
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
          <h2 className="text-2xl text-primary font-bold mb-4">
            Last<br />Seen
          </h2>
          <p className="font-bold text-info">{lastSeen.time}</p>
          <p className="mt-2 text-sm text-info">{lastSeen.location}</p>
        </div>

        {/* Weaknesses */}
        <div className="bg-accent rounded-2xl p-6">
          <h2 className="text-2xl text-primary font-bold mb-4">
            Weakness
          </h2>
          <ul className="space-y-1 text-info">
            {weaknesses.map((weakness, index) => (
              <li key={index}>{weakness}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const CataloguePage = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Map through creatures */}
      {creatures.map(creature => (
        <CreatureCard key={creature.id} creature={creature} className="p-96" />
      ))}
    </div>
  );
};

export default CataloguePage;
