import { render, screen } from '@testing-library/react'
import React from 'react';
import CountryDetail from '../app/country/[name]/page'
import '@testing-library/jest-dom'

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { name: { common: 'United States' }, population: 331002651, capital: ['Washington, D.C.'], flags: { svg: 'usa.svg' } },
    ]),
  })
) as jest.Mock;

describe('CountryDetail', () => {
  it('renders country details', async () => {
    render(await CountryDetail({ params: { name: 'USA' } }));
    
    const populationText = screen.getByText((content, element) => 
        content.includes('331,002,651')
      );
    const capitalText = screen.getByText((content) => 
        content.includes('Washington, D.C')
    );
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(populationText).toBeInTheDocument();
    expect(capitalText).toBeInTheDocument();
    expect(screen.getByAltText('Flag of United States')).toBeInTheDocument();
  })

  it('renders back link', async () => {
    render(await CountryDetail({ params: { name: 'USA' } }))
    
    const backLink = screen.getByText('← Back to all countries')
    expect(backLink).toBeInTheDocument()
    expect(backLink).toHaveAttribute('href', '/')
  })
})

