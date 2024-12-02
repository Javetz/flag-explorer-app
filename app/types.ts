export interface RawCountry {
    cca3: string
    name: {
      common: string
    }
    flags: {
      svg: string
    },
    population: string,
    capital: string
  }
  
  export interface CountryCardProps {
    country: RawCountry
  }
  
  export interface CountriesGridProps {
    countries: RawCountry[]
  }
  