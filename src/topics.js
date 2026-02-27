const TOPICS = [
  'Chrome Hearts Eyewear Craftsmanship',
  'Dita Machina Precision Engineering',
  'Jacques Marie Mage Limited Edition',
  'Cartier Sunglasses Luxury Details',
  'Tom Ford Aviator Iconic Style',
  'Oliver Peoples Vintage Inspired',
  'Persol Italian Handmade Quality',
  'Gentle Monster Architectural Design',
  'Lindberg Titanium Minimalism',
  'Ray-Ban Meta Smart Luxury',
  'Luxury Silk & Sunglasses',
  'Alpha Male Eyewear Power',
  'Poolside Glamour Specs',
  'Yacht Sunset Shades',
];

const SCENARIOS = {
  female: [
    {
      name: 'Silk Morning + Specs',
      desc: 'Роскошный пентхаус, утро. Девушка в расстегнутой шелковой блузке на голое тело, короткие шорты. На лице — брендовые солнцезащитные очки.',
      pose: 'Сидя на краю кровати, одна нога согнута, рука поправляет оправу, взгляд через линзы.',
    },
    {
      name: 'Poolside Desire + Eyewear',
      desc: 'Вилла у бассейна в Майами. Девушка в мокром бикини + прозрачная накидка. На лице — крупные очки Gentle Monster.',
      pose: 'Лежа на шезлонге, одна рука за головой, очки слегка спущены на кончик носа.',
    },
  ],
  male: [
    {
      name: 'Power Suit + Aviators',
      desc: 'Яхта в Монако, закат. Молодой человек в расстегнутой льняной рубашке, виден рельефный торс. На лице — классические авиаторы Tom Ford.',
      pose: 'Стоя у перил, одна рука в кармане, другая держит очки за дужку.',
    },
  ],
};

function getRandomTopic() {
  return TOPICS[Math.floor(Math.random() * TOPICS.length)];
}

function getRandomScenario(gender) {
  const list = SCENARIOS[gender] || SCENARIOS.female;
  return list[Math.floor(Math.random() * list.length)];
}

module.exports = { getRandomTopic, getRandomScenario, SCENARIOS };