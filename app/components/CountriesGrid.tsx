'use client'

import { memo } from 'react'
import { CountryCard } from './CountryCard'
import { CountriesGridProps } from '../types'

export const CountriesGrid = memo(function CountriesGrid({ countries }: CountriesGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  )
})
