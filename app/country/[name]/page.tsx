import { RawCountry } from '@/app/types'
import Image from 'next/image'
import Link from 'next/link'

async function getCountry(name: string): Promise<Array<RawCountry>> {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${name}`,{
    next: {
      revalidate: 3600
    },
    headers: {
      'Accept-Encoding': 'gzip, deflate, br'
    }
  })
  if (!res.ok) {
    throw new Error('Failed to fetch country')
  }
  return res.json()
}

export default async function CountryDetail({ params }: any ) {
  const [country] = await getCountry(params.name)

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to all countries</Link>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center">
        <Image
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          style={{
            maxHeight: '400px',
            objectFit: 'contain'
          }}
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
          <p className="text-xl mb-2"><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p className="text-xl mb-2"><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
        </div>
      </div>
    </div>
  )
}

