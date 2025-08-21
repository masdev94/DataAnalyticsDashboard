export interface CitySuggestion {
    name: string;
    country: string;
    state?: string;
    displayName: string;
    coordinates?: {
      lat: number;
      lon: number;
    };
    timezone?: string;
  }
  
  export const POPULAR_CITIES: CitySuggestion[] = [
    { 
      name: 'Belgrade', 
      country: 'Serbia', 
      displayName: 'Belgrade, Serbia',
      timezone: 'Europe/Belgrade'
    },
    { 
      name: 'London', 
      country: 'United Kingdom', 
      displayName: 'London, United Kingdom',
      timezone: 'Europe/London'
    },
    { 
      name: 'New York', 
      country: 'United States', 
      displayName: 'New York, United States',
      timezone: 'America/New_York'
    },
    { 
      name: 'Paris', 
      country: 'France', 
      displayName: 'Paris, France',
      timezone: 'Europe/Paris'
    },
    { 
      name: 'Berlin', 
      country: 'Germany', 
      displayName: 'Berlin, Germany',
      timezone: 'Europe/Berlin'
    },
    { 
      name: 'Zagreb', 
      country: 'Croatia', 
      displayName: 'Zagreb, Croatia',
      timezone: 'Europe/Zagreb'
    },
    { 
      name: 'Budapest', 
      country: 'Hungary', 
      displayName: 'Budapest, Hungary',
      timezone: 'Europe/Budapest'
    },
    { 
      name: 'Prague', 
      country: 'Czech Republic', 
      displayName: 'Prague, Czech Republic',
      timezone: 'Europe/Prague'
    },
    { 
      name: 'Warsaw', 
      country: 'Poland', 
      displayName: 'Warsaw, Poland',
      timezone: 'Europe/Warsaw'
    },
    { 
      name: 'Rome', 
      country: 'Italy', 
      displayName: 'Rome, Italy',
      timezone: 'Europe/Rome'
    },
    { 
      name: 'Madrid', 
      country: 'Spain', 
      displayName: 'Madrid, Spain',
      timezone: 'Europe/Madrid'
    },
    { 
      name: 'Amsterdam', 
      country: 'Netherlands', 
      displayName: 'Amsterdam, Netherlands',
      timezone: 'Europe/Amsterdam'
    },
    { 
      name: 'Brussels', 
      country: 'Belgium', 
      displayName: 'Brussels, Belgium',
      timezone: 'Europe/Brussels'
    },
    { 
      name: 'Vienna', 
      country: 'Austria', 
      displayName: 'Vienna, Austria',
      timezone: 'Europe/Vienna'
    },
    { 
      name: 'Stockholm', 
      country: 'Sweden', 
      displayName: 'Stockholm, Sweden',
      timezone: 'Europe/Stockholm'
    },
    { 
      name: 'Oslo', 
      country: 'Norway', 
      displayName: 'Oslo, Norway',
      timezone: 'Europe/Oslo'
    },
    { 
      name: 'Copenhagen', 
      country: 'Denmark', 
      displayName: 'Copenhagen, Denmark',
      timezone: 'Europe/Copenhagen'
    },
    { 
      name: 'Helsinki', 
      country: 'Finland', 
      displayName: 'Helsinki, Finland',
      timezone: 'Europe/Helsinki'
    },
    { 
      name: 'Dublin', 
      country: 'Ireland', 
      displayName: 'Dublin, Ireland',
      timezone: 'Europe/Dublin'
    },
    { 
      name: 'Lisbon', 
      country: 'Portugal', 
      displayName: 'Lisbon, Portugal',
      timezone: 'Europe/Lisbon'
    },
    { 
      name: 'Athens', 
      country: 'Greece', 
      displayName: 'Athens, Greece',
      timezone: 'Europe/Athens'
    },
    { 
      name: 'Bucharest', 
      country: 'Romania', 
      displayName: 'Bucharest, Romania',
      timezone: 'Europe/Bucharest'
    },
    { 
      name: 'Sofia', 
      country: 'Bulgaria', 
      displayName: 'Sofia, Bulgaria',
      timezone: 'Europe/Sofia'
    },
    { 
      name: 'Tallinn', 
      country: 'Estonia', 
      displayName: 'Tallinn, Estonia',
      timezone: 'Europe/Tallinn'
    },
    { 
      name: 'Riga', 
      country: 'Latvia', 
      displayName: 'Riga, Latvia',
      timezone: 'Europe/Riga'
    },
    { 
      name: 'Vilnius', 
      country: 'Lithuania', 
      displayName: 'Vilnius, Lithuania',
      timezone: 'Europe/Vilnius'
    },
    { 
      name: 'Tokyo', 
      country: 'Japan', 
      displayName: 'Tokyo, Japan',
      timezone: 'Asia/Tokyo'
    },
    { 
      name: 'Beijing', 
      country: 'China', 
      displayName: 'Beijing, China',
      timezone: 'Asia/Shanghai'
    },
    { 
      name: 'Sydney', 
      country: 'Australia', 
      displayName: 'Sydney, Australia',
      timezone: 'Australia/Sydney'
    },
    { 
      name: 'Toronto', 
      country: 'Canada', 
      displayName: 'Toronto, Canada',
      timezone: 'America/Toronto'
    },
    { 
      name: 'Mumbai', 
      country: 'India', 
      displayName: 'Mumbai, India',
      timezone: 'Asia/Kolkata'
    },
    { 
      name: 'Sao Paulo', 
      country: 'Brazil', 
      displayName: 'Sao Paulo, Brazil',
      timezone: 'America/Sao_Paulo'
    },
    { 
      name: 'Cairo', 
      country: 'Egypt', 
      displayName: 'Cairo, Egypt',
      timezone: 'Africa/Cairo'
    },
    { 
      name: 'Mexico City', 
      country: 'Mexico', 
      displayName: 'Mexico City, Mexico',
      timezone: 'America/Mexico_City'
    },
    { 
      name: 'Bangkok', 
      country: 'Thailand', 
      displayName: 'Bangkok, Thailand',
      timezone: 'Asia/Bangkok'
    },
    { 
      name: 'Moscow', 
      country: 'Russia', 
      displayName: 'Moscow, Russia',
      timezone: 'Europe/Moscow'
    },
    { 
      name: 'Kiev', 
      country: 'Ukraine', 
      displayName: 'Kiev, Ukraine',
      timezone: 'Europe/Kiev'
    },
    { 
      name: 'Minsk', 
      country: 'Belarus', 
      displayName: 'Minsk, Belarus',
      timezone: 'Europe/Minsk'
    },
    { 
      name: 'Chisinau', 
      country: 'Moldova', 
      displayName: 'Chisinau, Moldova',
      timezone: 'Europe/Chisinau'
    },
    { 
      name: 'Bratislava', 
      country: 'Slovakia', 
      displayName: 'Bratislava, Slovakia',
      timezone: 'Europe/Bratislava'
    },
    { 
      name: 'Ljubljana', 
      country: 'Slovenia', 
      displayName: 'Ljubljana, Slovenia',
      timezone: 'Europe/Ljubljana'
    },
    { 
      name: 'Podgorica', 
      country: 'Montenegro', 
      displayName: 'Podgorica, Montenegro',
      timezone: 'Europe/Podgorica'
    },
    { 
      name: 'Tirane', 
      country: 'Albania', 
      displayName: 'Tirane, Albania',
      timezone: 'Europe/Tirane'
    },
    { 
      name: 'Skopje', 
      country: 'North Macedonia', 
      displayName: 'Skopje, North Macedonia',
      timezone: 'Europe/Skopje'
    },
    { 
      name: 'Sarajevo', 
      country: 'Bosnia and Herzegovina', 
      displayName: 'Sarajevo, Bosnia and Herzegovina',
      timezone: 'Europe/Sarajevo'
    }
  ];
  
  export const CITY_CATEGORIES = {
    EUROPE: POPULAR_CITIES.filter(city => city.timezone?.startsWith('Europe/')),
    ASIA: POPULAR_CITIES.filter(city => city.timezone?.startsWith('Asia/')),
    AMERICA: POPULAR_CITIES.filter(city => city.timezone?.startsWith('America/')),
    AFRICA: POPULAR_CITIES.filter(city => city.timezone?.startsWith('Africa/')),
    AUSTRALIA: POPULAR_CITIES.filter(city => city.timezone?.startsWith('Australia/'))
  };