import { Suspense } from 'react'
import { CountriesGrid } from './components/CountriesGrid'
import { LoadingGrid } from './components/LoadingGrid'
import { ErrorBoundary } from './components/ErrorBoundary'
import { RawCountry } from './types'

async function getCountries() {
  try {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca3', {
      next: {
        revalidate: 3600
      },
      headers: {
        'Accept-Encoding': 'gzip, deflate, br'
      }
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch countries')
    }
    
    const data = await res.json()
    return data

  } catch (error) {
    console.error('Error fetching countries:', error)
    return [] // Return empty array as fallback
  }
}

function sortCountries(countries: RawCountry[]) {
  return [...countries].sort((a, b) => 
    a.name.common.localeCompare(b.name.common)
  )
}

export default async function Home() {
  const countries = await getCountries()
  const sortedCountries = sortCountries(countries)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Country Flags</h1>
      <ErrorBoundary>
        <Suspense fallback={<LoadingGrid />}>
          <CountriesGrid countries={sortedCountries} />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}
