import React from 'react';
import Home from '../app/page';
import { renderToString } from 'react-dom/server'; // To render components to a static HTML string
import '@testing-library/jest-dom'; // Retain jest-dom for DOM assertions

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        { cca3: 'USA', name: { common: 'United States' }, flags: { svg: 'usa.svg' } },
        { cca3: 'CAN', name: { common: 'Canada' }, flags: { svg: 'canada.svg' } },
      ]),
  })
);

describe('Home', () => {
  it('renders the heading', async () => {
    // Render the component to a string (no real DOM involved)
    const htmlString = renderToString(await Home());

    // Check if the heading exists in the rendered HTML
    expect(htmlString).toContain('<h1 class="text-3xl font-bold mb-8 text-center">Country Flags</h1>');
  });

  it('renders country flags', async () => {
    const htmlString = renderToString(await Home());

    // Check if the country flags are rendered
    expect(htmlString).toContain('<img alt="Flag of United States"');
    expect(htmlString).toContain('<img alt="Flag of Canada"');
  });
});
