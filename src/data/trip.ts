import type { TripData } from '../types'

const DAY = 86_400_000
const HOUR = 3_600_000

const now = Date.now()
const start = now + 12 * DAY + 6 * HOUR

const cover = (seed: string) => `https://picsum.photos/seed/${seed}/900/1500`
const thumb = (seed: string) => `https://picsum.photos/seed/${seed}/300/300`

export const tripData: TripData = {
  trip: {
    id: 'vietnam-hanoi-2025',
    title: 'Vietnam Family Escape',
    destination: 'Vietnam',
    homeCity: 'Chennai',
    startDate: start,
    endDate: start + 3 * DAY + 21 * HOUR,
    travellers: 4,
    brand: { name: 'LocoTrails' },
  },
  flights: [
    {
      airline: { code: '6E', name: 'IndiGo', color: '#2b2fa8' },
      flightNumber: '1049',
      departTime: start,
      arriveTime: start + 7 * HOUR,
      reportBy: start - 3 * HOUR,
      durationHrs: 7,
      stops: 'Via Bangkok (BKK) · 1 stop',
      layoverNote: '1h 30m layover in Bangkok. Stay in the transit area — your boarding pass covers both legs.',
      from: { city: 'Chennai', code: 'MAA', terminal: 'T2', flag: '🇮🇳' },
      to: { city: 'Hanoi', code: 'HAN', terminal: 'T2', flag: '🇻🇳' },
      document: {
        name: 'Flight e-ticket · 6E 1049',
        category: 'Boarding',
        detail: 'Chennai (MAA) to Hanoi (HAN), via Bangkok. PNR LT7X2Q · Seat 14A · 20 kg + 7 kg per traveller.',
      },
    },
    {
      airline: { code: '6E', name: 'IndiGo', color: '#2b2fa8' },
      flightNumber: '1050',
      departTime: start + 3 * DAY + 14 * HOUR,
      arriveTime: start + 3 * DAY + 21 * HOUR,
      reportBy: start + 3 * DAY + 11 * HOUR,
      durationHrs: 7,
      stops: 'Via Bangkok (BKK) · 1 stop',
      layoverNote: '1h 30m layover in Bangkok. Report at the IndiGo counter 3 hours before departure.',
      from: { city: 'Hanoi', code: 'HAN', terminal: 'T2', flag: '🇻🇳' },
      to: { city: 'Chennai', code: 'MAA', terminal: 'T2', flag: '🇮🇳' },
      document: {
        name: 'Return e-ticket · 6E 1050',
        category: 'Boarding',
        detail: 'Hanoi (HAN) to Chennai (MAA), via Bangkok. PNR LT7X2Q · Seat 14A · Report 3 hours before departure.',
      },
    },
  ],
  baggage: {
    checkInPerPax: 20,
    cabinPerPax: 7,
    policyNote: 'IndiGo international allowance: 20 kg check-in + 7 kg cabin per traveller.',
  },
  packing: [
    {
      group: 'Documents & Money',
      items: ['4 passports', 'Vietnam e-visa', 'Travel insurance', 'Flight confirmations', 'Cards + emergency cash'],
    },
    {
      group: 'Electronics',
      items: ['Phones', 'Phone chargers', 'Power banks (cabin only)', 'Travel adapter', 'Headphones'],
    },
    {
      group: 'Clothing (per person)',
      items: ['T-shirts / tops 5–6', 'Bottoms 3', 'Innerwear 7–8', 'Sleepwear 2', 'One light layer'],
    },
    {
      group: 'Health & Toiletries',
      items: ['Prescription medicines', 'Fever / pain medicine', 'Basic first-aid', 'Insect repellent', 'Sunscreen'],
    },
    {
      group: 'Beach & Swim',
      items: ['Swimwear', 'Quick-dry towel', 'Waterproof phone pouch', 'Flip-flops', 'Sun hat'],
    },
    {
      group: 'Child Kit',
      items: ['Child medicines', 'Wet wipes', 'Favourite snacks', 'Small toy / activity', 'Comfort item'],
    },
  ],
  documents: [
    {
      name: 'Flight e-ticket · 6E 1049 / 6E 1050',
      category: 'Booking',
      detail: 'Chennai → Hanoi (via Bangkok) and return. PNR: LT7X2Q. 4 travellers, 20 kg + 7 kg each.',
    },
    {
      name: 'Vietnam e-visa',
      category: 'Visa',
      detail: 'Approved e-visa valid 30 days. Entry at Hanoi (HAN). Carry a printed copy.',
    },
    {
      name: 'Hanoi La Siesta — stay confirmation',
      category: 'Stay',
      detail: 'Old Quarter, Hanoi. Check-in 14:00, check-out 12:00. Confirmation LT-HL-2291.',
    },
    {
      name: 'Halong Bay cruise voucher',
      category: 'Stay',
      detail: 'Overnight cruise, Day 2. Boarding at 07:30. Voucher LT-HB-0087.',
    },
    {
      name: 'Travel insurance',
      category: 'Insurance',
      detail: 'Family plan covering all 4 travellers. Policy LT-INS-556231. 24×7 assistance included.',
    },
    {
      name: 'Airport transfer vouchers',
      category: 'Transfer',
      detail: 'Hanoi airport pickup and all inter-city transfers. Show voucher to the driver.',
    },
  ],
  connectivity: {
    headline: 'Get connected before you land',
    summary:
      'Stay online from the moment you touch down. Buy an eSIM from India and activate it on landing, or enable international roaming before you fly.',
    options: [
      {
        name: 'Airalo eSIM · Vietnam',
        price: 'from ₹899',
        note: 'Buy in India, install now, activate on landing. Best value.',
        recommended: true,
      },
      {
        name: 'Nomad eSIM · Vietnam',
        price: 'from ₹1,050',
        note: 'Instant QR activation. Good if you forget to set it up early.',
      },
      {
        name: 'Viettel SIM · HAN airport',
        price: 'from ₹500',
        note: 'Cheaper, but you are offline until you buy it after landing.',
      },
      {
        name: 'Airtel / Jio international roaming',
        price: 'from ₹649/day',
        note: 'Keep your own number. Activate a pack before departure.',
      },
    ],
    roamingNote:
      'Turn on data roaming only after activating your eSIM or roaming pack, and switch off “Data Roaming” for your primary SIM to avoid charges.',
  },
  accommodations: [
    {
      name: 'Hanoi La Siesta, Old Quarter',
      place: 'Hanoi · Days 1 & 4',
      checkIn: '14:00',
      checkOut: '12:00',
      phone: '+84 24 3929 0000',
      address: '94 Ma May St, Hoan Kiem, Hanoi',
    },
    {
      name: 'Overnight cruise, Halong Bay',
      place: 'Halong Bay · Day 2',
      checkIn: '12:30',
      checkOut: '10:00',
      phone: '+84 900 000 111',
      address: 'Tuan Chau Marina, Halong',
    },
    {
      name: 'Tam Coc Garden Resort',
      place: 'Ninh Binh · Day 3',
      checkIn: '14:00',
      checkOut: '11:00',
      phone: '+84 900 000 222',
      address: 'Hai Nham, Hoa Lu, Ninh Binh',
    },
  ],
  days: [
    {
      n: 1,
      date: start,
      place: 'Hanoi',
      coverImage: cover('hanoi-old-quarter'),
      stay: 'Hanoi La Siesta, Old Quarter',
      summary: 'Arrival, hotel check-in and an Old Quarter evening walk',
      dayStart: '14:00',
      dayEnd: '22:00',
      pickup: '14:30',
      drop: '22:00',
      plannedHours: 6,
      freeFrom: '19:30',
      coordinator: { name: 'Nandu', role: 'LocoTrails Ops', phone: '+91 90000 11111' },
      driver: { name: 'Mr. Hung', phone: '+84 912 345 678', arrival: '14:15', car: 'Toyota Innova', carNumber: '29A-123.45' },
      meetingPoint: 'Hanoi La Siesta lobby, Old Quarter',
      activities: [
        { time: '14:30', title: 'Airport pickup & hotel transfer', durationHrs: 1 },
        { time: '16:30', title: 'Guided Old Quarter walk', durationHrs: 2 },
        { time: '19:00', title: 'Welcome dinner', durationHrs: 1.5 },
      ],
      tickets: [
        { name: 'Airport transfer voucher', kind: 'Transfer', detail: 'Show at the arrivals gate. Driver Mr. Hung, car 29A-123.45.' },
        { name: 'Old Quarter guided walk', kind: 'Activity', detail: 'Guide meets you in the hotel lobby at 16:30.' },
      ],
      mapMarkers: [
        { name: 'Hanoi La Siesta', lat: 21.0335, lng: 105.8531 },
        { name: 'Hoan Kiem Lake', lat: 21.0287, lng: 105.8524 },
        { name: 'St Joseph Cathedral', lat: 21.0286, lng: 105.8489 },
      ],
      meals: [
        { label: 'Breakfast', detail: 'In flight / on arrival', included: false, onYourOwn: true },
        {
          label: 'Lunch',
          detail: 'On your own near the hotel',
          included: false,
          onYourOwn: true,
          mustTry: ['Banh mi from a street cart', 'Bun cha'],
        },
        { label: 'Dinner', detail: 'Welcome dinner in the Old Quarter', included: true },
      ],
      carry: ['Passport & visa', 'Light layer for the flight', 'Comfortable walking shoes', 'Rain cover'],
      bringExtra: [],
      notes: [
        'Keep 30 minutes after landing for immigration',
        'Local SIM cards and eSIM kiosks are available at the airport',
        'Hotel check-in opens at 14:00',
      ],
      photoSpots: [
        { name: 'Hoan Kiem Lake', image: thumb('hoan-kiem') },
        { name: 'St Joseph Cathedral', image: thumb('st-joseph') },
        { name: 'Train Street', image: thumb('train-street') },
      ],
      weather: { icon: 'cloud-sun', temp: '24–30°C', note: 'Humid with a chance of short showers', carryTips: ['Carry an umbrella — short showers likely'] },
      transit: { city: 'Bangkok (BKK)', note: '3h layover — keep boarding passes handy and check the gate on screens' },
    },
    {
      n: 2,
      date: start + DAY,
      place: 'Halong Bay',
      coverImage: cover('halong-bay'),
      stay: 'Overnight cruise, Halong Bay',
      summary: 'Cruise, kayaking and sunset on the bay',
      dayStart: '07:30',
      dayEnd: '21:00',
      pickup: '07:15',
      drop: '21:00',
      plannedHours: 8,
      freeFrom: '18:30',
      coordinator: { name: 'Nandu', role: 'LocoTrails Ops', phone: '+91 90000 11111' },
      driver: { name: 'Mr. Tuan', phone: '+84 987 654 321', arrival: '07:00', car: 'Ford Transit', carNumber: '14A-556.78' },
      meetingPoint: 'Hotel lobby, 07:15',
      activities: [
        { time: '07:30', title: 'Transfer to Halong Bay', durationHrs: 3 },
        { time: '12:00', title: 'Cruise & kayaking', durationHrs: 3 },
        { time: '15:00', title: 'Sung Sot cave visit', durationHrs: 1 },
        { time: '17:30', title: 'Sunset on the sundeck', durationHrs: 1 },
      ],
      tickets: [
        { name: 'Halong cruise boarding pass', kind: 'Activity', detail: 'Board at Tuan Chau Marina, 07:30 sharp.' },
        { name: 'Kayaking ticket', kind: 'Activity', detail: 'Life jackets provided onboard.' },
      ],
      mapMarkers: [
        { name: 'Tuan Chau Marina', lat: 20.9151, lng: 106.9864 },
        { name: 'Sung Sot Cave', lat: 20.9051, lng: 107.0201 },
        { name: 'Ti Top Island', lat: 20.8875, lng: 107.0764 },
      ],
      meals: [
        { label: 'Breakfast', detail: 'At the hotel, 06:30', included: true },
        {
          label: 'Lunch',
          detail: 'Onboard the cruise',
          included: true,
          mustTry: ['Fresh grilled seafood', 'Halong spring rolls'],
        },
        { label: 'Dinner', detail: 'Sunset dinner on the sundeck', included: true },
      ],
      carry: ['Swimwear', 'Sun hat & sunscreen', 'Camera', 'Motion-sickness tablets', 'A small overnight bag'],
      bringExtra: ['Extra set of clothes — you will get wet kayaking', 'Quick-dry towel', 'Waterproof pouch for your phone'],
      notes: [
        'Cruise check-in closes at 07:30 sharp',
        'Wi-Fi is limited once you are on the bay',
        'Leave large luggage on the coach — pack a small overnight bag',
      ],
      photoSpots: [
        { name: 'Sung Sot Cave', image: thumb('sung-sot') },
        { name: 'Ti Top Island', image: thumb('ti-top') },
        { name: 'Sunset on the sundeck', image: thumb('sundeck') },
      ],
      weather: { icon: 'sun', temp: '25–31°C', note: 'Clear and bright — great for the bay', carryTips: ['Carry a hat — strong sun on the water', 'High-SPF sunscreen'] },
      transit: null,
    },
    {
      n: 3,
      date: start + 2 * DAY,
      place: 'Ninh Binh',
      coverImage: cover('ninh-binh'),
      stay: 'Tam Coc Garden Resort',
      summary: 'Trang An boat ride, Mua Cave viewpoint and cycling',
      dayStart: '08:00',
      dayEnd: '20:00',
      pickup: '07:45',
      drop: '20:00',
      plannedHours: 7,
      freeFrom: '17:30',
      coordinator: { name: 'Nandu', role: 'LocoTrails Ops', phone: '+91 90000 11111' },
      driver: { name: 'Mr. Tuan', phone: '+84 987 654 321', arrival: '07:30', car: 'Ford Transit', carNumber: '14A-556.78' },
      meetingPoint: 'Hotel lobby, 07:45',
      activities: [
        { time: '09:00', title: 'Trang An boat ride', durationHrs: 2 },
        { time: '12:00', title: 'Mua Cave viewpoint climb', durationHrs: 1.5 },
        { time: '15:00', title: 'Village cycling', durationHrs: 1.5 },
      ],
      tickets: [
        { name: 'Trang An boat ticket', kind: 'Activity', detail: 'Boats depart every 15 minutes from the dock.' },
        { name: 'Mua Cave entry', kind: 'Activity', detail: 'Around 500 steps — take it slow.' },
      ],
      mapMarkers: [
        { name: 'Trang An boat dock', lat: 20.252, lng: 105.913 },
        { name: 'Mua Cave viewpoint', lat: 20.229, lng: 105.936 },
        { name: 'Tam Coc Garden Resort', lat: 20.216, lng: 105.937 },
      ],
      meals: [
        { label: 'Breakfast', detail: 'At the hotel, 07:00', included: true },
        {
          label: 'Lunch',
          detail: 'Set menu near Tam Coc',
          included: true,
          mustTry: ['Ninh Binh goat meat', 'Crispy rice (com chay)'],
        },
        { label: 'Dinner', detail: 'At liberty — on your own at the resort', included: false, onYourOwn: true },
      ],
      carry: ['Sun hat & sunscreen', 'Shoes for the climb', 'Reusable water bottle', 'Insect repellent'],
      bringExtra: ['Extra pair of socks — the boat ride may splash', 'A light jacket for the early morning'],
      notes: [
        'Mua Cave has around 500 steps — take it slow',
        'The boat ride is about 2 hours, bring a hat',
        'Carry small cash for local vendors',
      ],
      photoSpots: [
        { name: 'Mua Cave viewpoint', image: thumb('mua-cave') },
        { name: 'Trang An river', image: thumb('trang-an') },
      ],
      weather: { icon: 'cloud-sun', temp: '23–29°C', note: 'Mild with light cloud cover', carryTips: ['Carry a light jacket for the morning', 'Carry an umbrella — brief showers possible'] },
      transit: null,
    },
    {
      n: 4,
      date: start + 3 * DAY,
      place: 'Hanoi',
      coverImage: cover('hanoi-streets'),
      stay: 'Day rooms, Hanoi',
      summary: 'Old Quarter market, egg coffee and transfer to the airport',
      dayStart: '09:00',
      dayEnd: '18:00',
      pickup: '09:00',
      drop: '16:30',
      plannedHours: 5,
      freeFrom: '15:00',
      coordinator: { name: 'Nandu', role: 'LocoTrails Ops', phone: '+91 90000 11111' },
      driver: { name: 'Mr. Hung', phone: '+84 912 345 678', arrival: '08:45', car: 'Toyota Innova', carNumber: '29A-123.45' },
      meetingPoint: 'Hotel lobby, 09:00',
      activities: [
        { time: '09:30', title: 'Dong Xuan market walk', durationHrs: 1.5 },
        { time: '14:00', title: 'Egg coffee at Cafe Giang', durationHrs: 1 },
        { time: '16:30', title: 'Transfer to the airport', durationHrs: 1 },
      ],
      tickets: [
        { name: 'Airport transfer voucher', kind: 'Transfer', detail: 'Depart hotel at 16:30 for HAN airport.' },
        { name: 'Return flight 6E 1050', kind: 'Booking', detail: 'Check-in opens 3 hours before departure.' },
      ],
      mapMarkers: [
        { name: 'Dong Xuan Market', lat: 21.036, lng: 105.85 },
        { name: 'Cafe Giang', lat: 21.034, lng: 105.852 },
        { name: 'HAN Airport', lat: 21.2212, lng: 105.8072 },
      ],
      meals: [
        { label: 'Breakfast', detail: 'At the hotel, 08:00', included: true },
        {
          label: 'Lunch',
          detail: 'At liberty — Old Quarter street food',
          included: false,
          onYourOwn: true,
          mustTry: ['Pho', 'Banh cuon'],
        },
        { label: 'Dinner', detail: 'In flight / on return', included: false, onYourOwn: true },
      ],
      carry: ['Passport & boarding pass', 'Duty-free shopping list', 'Phone charger in cabin bag', 'Light layer for the flight'],
      bringExtra: [],
      notes: [
        'Day rooms are available until 12:00',
        'Be at the airport 3 hours before departure',
        'Settle any hotel incidentals before you leave',
      ],
      photoSpots: [
        { name: 'Dong Xuan Market', image: thumb('dong-xuan') },
        { name: 'Cafe Giang', image: thumb('egg-coffee') },
      ],
      weather: { icon: 'cloud-sun', temp: '24–30°C', note: 'Warm and humid', carryTips: ['Carry an umbrella — humid with showers'] },
      transit: null,
    },
  ],
  contacts: [
    { label: '24×7 Helpline', phone: '+91 90000 00000' },
    { label: 'Nandu · LocoTrails Ops', phone: '+91 90000 11111' },
    { label: 'Hanoi Local Ops', phone: '+84 900 000 000' },
    { label: 'Mr. Hung · Driver', phone: '+84 912 345 678' },
  ],
  cityBasics: {
    city: 'Hanoi',
    phrases: [
      { text: 'Hello', native: 'Xin chào', lang: 'vi-VN' },
      { text: 'Thank you', native: 'Cảm ơn', lang: 'vi-VN' },
      { text: 'How much?', native: 'Bao nhiêu tiền?', lang: 'vi-VN' },
      { text: 'Delicious', native: 'Ngon quá', lang: 'vi-VN' },
    ],
    facts: [
      'Hanoi is over 1,000 years old and means "inside the river".',
      'Egg coffee was invented here in the 1940s when milk was scarce.',
      'The Old Quarter has 36 ancient streets, each named after the craft once sold there.',
      'Motorbikes are the main way around — cross the road slowly and predictably.',
    ],
  },
  quickRef: {
    mustTryFood: ['Pho', 'Banh Mi', 'Cha Ca La Vong', 'Bun Cha'],
    mustTryDrinks: ['Egg coffee', 'Vietnamese iced coffee', 'Bia Hoi'],
  },
  faqs: [
    {
      question: 'Is it safe to eat from the local street vendors?',
      answer:
        'Absolutely — and it is one of the great joys of Vietnam. We point you to stalls we know and trust, and your coordinator can recommend a favourite near your hotel. If you would prefer, we will happily arrange a table at a vetted restaurant instead.',
    },
    {
      question: 'Do I need to carry my passport everywhere?',
      answer:
        'No. Leave it in your hotel safe and carry a photo of it for ID. We keep a secure copy on file as well, so if it is ever misplaced we can help you sort it out quickly and discreetly.',
    },
    {
      question: 'Can I wear shorts at the beach?',
      answer:
        'Of course — beach and resort areas are relaxed, so pack your favourite shorts and swimwear. For temples and the Old Quarter we suggest covering shoulders and knees as a mark of respect; a light scarf in your day bag is all you need.',
    },
    {
      question: 'Is tipping expected?',
      answer:
        'Never obligatory, always appreciated. If you would rather not think about it, we can arrange a discreet gratuity across your trip — just ask your coordinator and consider it handled.',
    },
    {
      question: 'Should I bargain at the markets?',
      answer:
        'A little friendly bargaining is part of the fun at Dong Xuan and around the Old Quarter. Smile, open around half, and settle where you are both happy. And if you would like us to source something for you, we will negotiate on your behalf.',
    },
    {
      question: 'Can I drink the tap water?',
      answer:
        'We recommend bottled or filtered water throughout — it is provided at your hotels and on the cruise. Your coordinator will keep you stocked, and we will flag the best spots for a cold drink along the way.',
    },
    {
      question: 'How do I get cash while travelling?',
      answer:
        'ATMs are easy to find in the cities, and your hotel can help. We suggest carrying a little local cash for markets and small cafes. If you are ever stuck, message your coordinator and we will guide you to the nearest option.',
    },
    {
      question: 'What if I am not feeling well?',
      answer:
        'Tell your coordinator straight away — this is exactly what we are here for. We will arrange a doctor or a pharmacy run and gently adjust your day so you can rest. The 24×7 helpline is always just a call away.',
    },
  ],
  postTrip: {
    storytellingCircle: {
      city: 'Chennai',
      date: 'First Sunday of next month · 6 pm',
      venue: 'LocoTrails Studio, Alwarpet',
    },
    referral: { bonus: '₹1,000 travel credit per confirmed friend' },
  },
}
