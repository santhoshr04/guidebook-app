export type Phase = 'entry' | 'pre_trip' | 'on_trip' | 'post_trip'

export interface Airport {
  city: string
  code: string
  terminal: string
}

export interface Flight {
  airline: string
  flightNumber: string
  departTime: number
  reportBy: number
  from: Airport
  to: Airport
}

export interface Baggage {
  checkInPerPax: number
  cabinPerPax: number
}

export interface PackingGroup {
  group: string
  items: string[]
}

export interface Person {
  name: string
  role: string
  phone: string
}

export interface Driver {
  name: string
  phone: string
  arrival: string
  car: string
  carNumber: string
}

export interface PhotoSpot {
  name: string
  image: string
}

export interface Weather {
  icon: string
  temp: string
  note: string
}

export interface Transit {
  city: string
  note: string
}

export interface Meal {
  label: string
  detail: string
  included: boolean
}

export interface TripDay {
  n: number
  date: number
  place: string
  coverImage: string
  stay: string
  summary: string
  dayStart: string
  dayEnd: string
  pickup: string
  drop: string
  plannedHours: number
  freeFrom: string
  coordinator: Person
  driver: Driver
  meetingPoint: string
  meals: Meal[]
  inclusions: string[]
  carry: string[]
  notes: string[]
  photoSpots: PhotoSpot[]
  weather: Weather
  transit: Transit | null
}

export interface Contact {
  label: string
  phone: string
}

export interface Phrase {
  text: string
  native: string
  lang: string
}

export interface CityBasics {
  city: string
  phrases: Phrase[]
  facts: string[]
}

export interface StorytellingCircle {
  city: string
  date: string
  venue: string
}

export interface Referral {
  bonus: string
}

export interface PostTrip {
  storytellingCircle: StorytellingCircle
  referral: Referral
}

export interface Trip {
  id: string
  title: string
  destination: string
  homeCity: string
  startDate: number
  endDate: number
  travellers: number
  brand: { name: string }
}

export interface TripData {
  trip: Trip
  flight: Flight
  baggage: Baggage
  packing: PackingGroup[]
  days: TripDay[]
  contacts: Contact[]
  cityBasics: CityBasics
  postTrip: PostTrip
}
