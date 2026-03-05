export interface Attraction {
  id: string;
  name: string;
  category: 'water-slide' | 'wave-pool' | 'lazy-river' | 'splash-pad' | 'show';
  description: string;
  minHeight?: string;
  minAge?: number;
  intensity: 'kids' | 'family' | 'thrilling';
  image: string;
  duration: string;
  nextSchedule: string;
  capacity: number;
  currentVisitors: number;
  // Optional extended details for attraction detail pages
  location?: string;
  annualVisitors?: string;
  waterType?: string;
  history?: string;
  condition?: string;
  videoUrl?: string;
}

export const ATTRACTIONS: Attraction[] = [
  {
    id: 'tornado-rush',
    name: 'Tornado Rush',
    category: 'water-slide',
    description: 'A thrilling 5-floor water slide with tight turns and splash landing.',
    minHeight: '4\'6"',
    intensity: 'thrilling',
    image: '/images/Atlantis_Aquaventure_Trident_Tower_waterslides.jpg',
    duration: '3 minutes',
    nextSchedule: '10:15 AM',
    capacity: 50,
    currentVisitors: 38,
    location: 'Thrill Zone - North Section',
    annualVisitors: '180,000+ visitors per year',
    waterType: 'Chlorinated fresh water, 82°F',
    history: 'Opened in 2015, Tornado Rush has been our signature attraction. Built with German engineering and safety standards, it features the steepest descent in the region.',
    condition: 'Fully operational & well-maintained',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 'wave-master',
    name: 'Wave Master',
    category: 'wave-pool',
    description: 'Experience artificial waves up to 6 feet tall in our massive wave pool.',
    minAge: 5,
    intensity: 'family',
    image: '/images/18b2638a.webp',
    duration: 'All day',
    nextSchedule: 'Always open',
    capacity: 500,
    currentVisitors: 342,
    location: 'Central Hub',
    annualVisitors: '250,000+ visitors per year',
    waterType: 'Treated salt water (gentler on skin), 84°F',
    history: 'Since 2012, Wave Master has been featuring advanced wave technology with 8 distinct wave patterns. It\'s one of the largest wave pools in the state.',
    condition: 'Excellent - recent upgrades completed in 2024',
  },
  {
    id: 'lazy-river-cruise',
    name: 'Lazy River Cruise',
    category: 'lazy-river',
    description: 'Relax on a tube while floating through scenic landscapes.',
    intensity: 'family',
    image: '/images/JUNGLE+BAY+WATERPARK.webp',
    duration: '20 minutes',
    nextSchedule: 'Continuous',
    capacity: 200,
    currentVisitors: 156,
    location: 'Recreation Area - Surrounding Park',
    annualVisitors: '220,000+ visitors per year',
    waterType: 'Chlorinated fresh water, 80°F',
    history: 'Our original attraction from 2010, the Lazy River has been the perfect escape for families. Features tropical landscaping and waterfall effects.',
    condition: 'Wonderfully maintained with regular inspections',
  },
  {
    id: 'splash-kingdom',
    name: 'Splash Kingdom',
    category: 'splash-pad',
    description: 'Perfect for young swimmers with interactive water play.',
    minAge: 2,
    intensity: 'kids',
    image: '/images/antlantis.webp',
    duration: 'All day',
    nextSchedule: 'Always open',
    capacity: 150,
    currentVisitors: 89,
    location: 'Family Zone - South Section',
    annualVisitors: '120,000+ young visitors per year',
    waterType: 'Chlorinated fresh water, 86°F (warmer for comfort)',
    history: 'Opened in 2013, Splash Kingdom was designed with pediatricians to ensure safety for toddlers and young children. Features soft landing surfaces.',
    condition: 'Safe & regularly inspected (daily)',
  },
  {
    id: 'cosmic-adventure',
    name: 'Cosmic Adventure',
    category: 'water-slide',
    description: 'A family-friendly slide with underwater tunnel sections.',
    minHeight: '3\'6"',
    minAge: 6,
    intensity: 'family',
    image: '/images/Wild-Island-Waterpark-Hurricane-Cove-1024x576.jpg',
    duration: '2 minutes',
    nextSchedule: '10:30 AM',
    capacity: 80,
    currentVisitors: 62,
    location: 'Family Zone - Central',
    annualVisitors: '160,000+ visitors per year',
    waterType: 'Chlorinated fresh water, 82°F',
    history: 'Launched in 2016 with a space theme, Cosmic Adventure features LED lighting effects in the tunnel section. Perfect for families discovering thrill rides.',
    condition: 'Excellent condition with LED system upgrade in 2023',
  },
  {
    id: 'aquatic-acrobatics',
    name: 'Aquatic Acrobatics Show',
    category: 'show',
    description: 'Watch professional swimmers perform stunning routines.',
    minAge: 3,
    intensity: 'family',
    image: '/images/Splashway-Waterpark_54_990x660.webp',
    duration: '25 minutes',
    nextSchedule: '2:00 PM',
    capacity: 300,
    currentVisitors: 245,
    location: 'Main Amphitheater',
    annualVisitors: '200,000+ spectators per year',
    waterType: 'Olympic-grade chlorinated water, 84°F',
    history: 'Established in 2011, our show features international athletes and local champions. Daily performances showcase diving, synchronized swimming, and acrobatics.',
    condition: 'World-class facility with professional maintenance staff on site',
  },
];


export const ZONES = [
  { id: 'thrill-zone', name: 'Thrill Zone', x: 25, y: 25, color: '#CC0000' },
  { id: 'family-zone', name: 'Family Zone', x: 60, y: 40, color: '#FFB300' },
  { id: 'kids-zone', name: 'Kids Zone', x: 40, y: 70, color: '#00B359' },
  { id: 'relaxation', name: 'Relaxation Area', x: 75, y: 65, color: '#0066CC' },
];
