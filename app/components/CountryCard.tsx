'use client'

import { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CountryCardProps } from '../types'

export const CountryCard = memo(function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/country/${country.cca3}`} className="block">
      <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-32">
          <Image
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            fill
            sizes="(max-width: 640px) 50vw, 
                   (max-width: 768px) 33vw,
                   (max-width: 1024px) 25vw,
                   20vw"
            className="object-cover"
            loading="lazy"
            priority={false}
          />
        </div>
        <div className="p-4">
          <h2 className="text-sm font-semibold truncate">{country.name.common}</h2>
        </div>
      </div>
    </Link>
  )
})
