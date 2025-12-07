interface CountryData {
  code: string;
  name: string;
  adjacentCountries: string[];
}

const COUNTRIES_DATA: CountryData[] = [
  {
    code: 'IN',
    name: 'India',
    adjacentCountries: ['Pakistan', 'China', 'Nepal', 'Bhutan', 'Bangladesh', 'Myanmar', 'Sri Lanka']
  },
  {
    code: 'US',
    name: 'United States',
    adjacentCountries: ['Canada', 'Mexico']
  },
  {
    code: 'NZ',
    name: 'New Zealand',
    adjacentCountries: []
  },
  {
    code: 'CN',
    name: 'China',
    adjacentCountries: ['Russia', 'Mongolia', 'North Korea', 'Vietnam', 'Laos', 'Myanmar', 'India', 'Bhutan', 'Nepal', 'Pakistan', 'Afghanistan', 'Tajikistan', 'Kyrgyzstan', 'Kazakhstan']
  },
  {
    code: 'FR',
    name: 'France',
    adjacentCountries: ['Belgium', 'Luxembourg', 'Germany', 'Switzerland', 'Italy', 'Monaco', 'Andorra', 'Spain']
  },
  {
    code: 'DE',
    name: 'Germany',
    adjacentCountries: ['Denmark', 'Poland', 'Czech Republic', 'Austria', 'Switzerland', 'France', 'Luxembourg', 'Belgium', 'Netherlands']
  },
  {
    code: 'BR',
    name: 'Brazil',
    adjacentCountries: ['Venezuela', 'Guyana', 'Suriname', 'French Guiana', 'Colombia', 'Peru', 'Bolivia', 'Paraguay', 'Argentina', 'Uruguay']
  },
  {
    code: 'AU',
    name: 'Australia',
      adjacentCountries: []
    },
  {
    code: 'EG',
    name: 'Egypt',
    adjacentCountries: ['Libya', 'Sudan', 'Israel', 'Palestine']
  },
  {
    code: 'JP',
    name: 'Japan',
    adjacentCountries: []
  }
];

export interface AdjacentCountriesResult {
  countryName: string;
  adjacentCountries: string[];
  error?: string;
}

export function getAdjacentCountries(countryCode: string): AdjacentCountriesResult {
  const normalizedCountryCode = countryCode.toUpperCase().trim();
  const country = COUNTRIES_DATA.find(country => country.code === normalizedCountryCode);
  
  if (!country) {
    return {
      countryName: '',
      adjacentCountries: [],
      error: `Country code "${normalizedCountryCode}" not found in database. Supported codes: ${COUNTRIES_DATA.map(country => country.code).join(', ')}`
    };
  }
  
  return {
    countryName: country.name,
    adjacentCountries: country.adjacentCountries
  };
}

export function getSupportedCountryCodes(): string[] {
  return COUNTRIES_DATA.map(country => country.code);
}

