// ============================================================
// Philippine Regions & Geographic Constants
// ============================================================
// Based on the official PSGC (Philippine Standard Geographic Code)
// Used for shipment routing, analytics, and compliance.
// ============================================================

export interface PhilippineRegion {
  readonly code: string;
  readonly name: string;
  readonly designation: string;
  readonly majorPorts: string[];
  readonly majorAirports: string[];
  readonly islandGroup: 'luzon' | 'visayas' | 'mindanao';
}

export const PHILIPPINE_REGIONS: PhilippineRegion[] = [
  {
    code: 'NCR',
    name: 'National Capital Region',
    designation: 'NCR',
    majorPorts: ['Manila International Container Terminal', 'Manila South Harbor'],
    majorAirports: ['NAIA (Ninoy Aquino International Airport)'],
    islandGroup: 'luzon',
  },
  {
    code: 'CAR',
    name: 'Cordillera Administrative Region',
    designation: 'CAR',
    majorPorts: [],
    majorAirports: ['Loakan Airport (Baguio)'],
    islandGroup: 'luzon',
  },
  {
    code: 'R01',
    name: 'Ilocos Region',
    designation: 'Region I',
    majorPorts: ['Port of San Fernando', 'Port of Currimao'],
    majorAirports: ['Laoag International Airport'],
    islandGroup: 'luzon',
  },
  {
    code: 'R02',
    name: 'Cagayan Valley',
    designation: 'Region II',
    majorPorts: ['Port of Aparri'],
    majorAirports: ['Tuguegarao Airport'],
    islandGroup: 'luzon',
  },
  {
    code: 'R03',
    name: 'Central Luzon',
    designation: 'Region III',
    majorPorts: ['Port of Subic', 'Port of Mariveles'],
    majorAirports: ['Clark International Airport'],
    islandGroup: 'luzon',
  },
  {
    code: 'R04A',
    name: 'CALABARZON',
    designation: 'Region IV-A',
    majorPorts: ['Port of Batangas'],
    majorAirports: [],
    islandGroup: 'luzon',
  },
  {
    code: 'R04B',
    name: 'MIMAROPA',
    designation: 'Region IV-B',
    majorPorts: ['Port of Puerto Princesa'],
    majorAirports: ['Puerto Princesa Airport'],
    islandGroup: 'luzon',
  },
  {
    code: 'R05',
    name: 'Bicol Region',
    designation: 'Region V',
    majorPorts: ['Port of Tabaco', 'Port of Sorsogon'],
    majorAirports: ['Legazpi Airport', 'Naga Airport'],
    islandGroup: 'luzon',
  },
  {
    code: 'R06',
    name: 'Western Visayas',
    designation: 'Region VI',
    majorPorts: ['Port of Iloilo', 'Port of Dumangas'],
    majorAirports: ['Iloilo International Airport'],
    islandGroup: 'visayas',
  },
  {
    code: 'R07',
    name: 'Central Visayas',
    designation: 'Region VII',
    majorPorts: ['Port of Cebu', 'Port of Tagbilaran'],
    majorAirports: ['Mactan-Cebu International Airport'],
    islandGroup: 'visayas',
  },
  {
    code: 'R08',
    name: 'Eastern Visayas',
    designation: 'Region VIII',
    majorPorts: ['Port of Tacloban', 'Port of Ormoc'],
    majorAirports: ['Daniel Z. Romualdez Airport (Tacloban)'],
    islandGroup: 'visayas',
  },
  {
    code: 'R09',
    name: 'Zamboanga Peninsula',
    designation: 'Region IX',
    majorPorts: ['Port of Zamboanga'],
    majorAirports: ['Zamboanga International Airport'],
    islandGroup: 'mindanao',
  },
  {
    code: 'R10',
    name: 'Northern Mindanao',
    designation: 'Region X',
    majorPorts: ['Port of Cagayan de Oro', 'Port of Iligan'],
    majorAirports: ['Laguindingan Airport'],
    islandGroup: 'mindanao',
  },
  {
    code: 'R11',
    name: 'Davao Region',
    designation: 'Region XI',
    majorPorts: ['Port of Davao', 'Port of Panabo'],
    majorAirports: ['Francisco Bangoy International Airport'],
    islandGroup: 'mindanao',
  },
  {
    code: 'R12',
    name: 'SOCCSKSARGEN',
    designation: 'Region XII',
    majorPorts: ['Port of General Santos'],
    majorAirports: ['General Santos International Airport'],
    islandGroup: 'mindanao',
  },
  {
    code: 'R13',
    name: 'Caraga',
    designation: 'Region XIII',
    majorPorts: ['Port of Nasipit', 'Port of Surigao'],
    majorAirports: ['Bancasi Airport (Butuan)'],
    islandGroup: 'mindanao',
  },
  {
    code: 'BARMM',
    name: 'Bangsamoro Autonomous Region in Muslim Mindanao',
    designation: 'BARMM',
    majorPorts: ['Port of Polloc', 'Port of Jolo'],
    majorAirports: ['Cotabato Airport'],
    islandGroup: 'mindanao',
  },
];

/** Quick lookup by region code */
export const REGION_MAP = new Map(
  PHILIPPINE_REGIONS.map((r) => [r.code, r]),
);

/** All major Philippine ports for route planning */
export const ALL_MAJOR_PORTS = PHILIPPINE_REGIONS.flatMap((r) =>
  r.majorPorts.map((port) => ({ port, region: r.code, islandGroup: r.islandGroup })),
);

/** All major Philippine airports */
export const ALL_MAJOR_AIRPORTS = PHILIPPINE_REGIONS.flatMap((r) =>
  r.majorAirports.map((airport) => ({ airport, region: r.code, islandGroup: r.islandGroup })),
);
