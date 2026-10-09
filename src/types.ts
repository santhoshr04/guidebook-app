export type Phase = 'entry' | 'pre_trip' | 'on_trip' | 'post_trip'

export interface Airline {
  code: string
  name: string
  color: string
}

export interface Airport {
  city: string
  code: string
  terminal: string
  flag: string
}

export interface Flight {
  airline: Airline
  flightNumber: string
  departTime: number
  from: Airport
  to: Airport
  reportBy?: number
  durationHrs?: number
}

export interface Baggage {
  checkInPerPax: number
  cabinPerPax: number
  policyNote: string
}

export interface PackingGroup {
  group: string
  items: string[]
}

export interface DocumentItem {
  name: string
  category: string
  detail: string
}

export interface ConnectivityOption {
  name: string
  price: string
  note: string
  recommended?: boolean
}

export interface Connectivity {
  headline: string
  summary: string
  options: ConnectivityOption[]
  roamingNote: string
}

export interface Accommodation {
  name: string
  place: string
  checkIn: string
  checkOut: string
  phone: string
  address: string
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
  carryTips: string[]
}

export interface Transit {
  city: string
  note: string
}

export interface Meal {
  label: string
  detail: string
  included: boolean
  mustTry?: string[]
  onYourOwn?: boolean
}

export interface Activity {
  time: string
  title: string
  durationHrs: number
}

export interface Ticket {
  name: string
  kind: string
  detail: string
}

export interface MapMarker {
  name: string
  lat: number
  lng: number
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
  activities: Activity[]
  tickets: Ticket[]
  mapMarkers: MapMarker[]
  inclusions: string[]
  carry: string[]
  bringExtra: string[]
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

export interface QuickRef {
  mustTryFood: string[]
  mustTryDrinks: string[]
}

export interface SupportFaq {
  question: string
  answer: string
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
  flights: Flight[]
  baggage: Baggage
  packing: PackingGroup[]
  documents: DocumentItem[]
  connectivity: Connectivity
  accommodations: Accommodation[]
  days: TripDay[]
  contacts: Contact[]
  cityBasics: CityBasics
  quickRef: QuickRef
  supportFaqs: SupportFaq[]
  postTrip: PostTrip
}
