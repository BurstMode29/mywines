'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import '../src/app/globals.css';

interface Wine {
  id: number;
  name: string;
  year: number;
  type: 'Red' | 'White' | 'Rosé' | 'White Blend' | 'Red Blend';
  varietal: 'Cabernet Sauvignon' | 'Merlot' | 'Shiraz' | 'Chenin Blanc' | 'Sauvignon Blanc' | 'Verdelho' | 'Chardonnay' | 'Durif' | string;
  rating?: number;
  consumed?: 'Yes' | 'No';
  dateConsumed?: string;
}

const WineList = () => {
  const [wines, setWines] = useState<Wine[]>([]);

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const response = await fetch('/api/wines');
        if (response.ok) {
          const data = await response.json();
          setWines(data);
        } else {
          console.error('Failed to fetch wines');
        }
      } catch (error) {
        console.error('Error during wine fetch:', error);
      }
    };

    fetchWines();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8"
    >
      <div className="flex justify-between align-center items-center w-full">
        {/* Logo */}
        <div className="">
          <a
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/mywineslogo.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={200}
              height={150}
              priority
            />
          </a>
        </div>
        {/* Menu Icon/Btn */}
        <a
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/menu.svg"
            alt="Menu Icon"
            className="mb-5 lg:mb-10"
            width={30}
            height={30}
            priority
          />
        </a>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      <table className="min-w-full bg-#302E2E border border-white-300 text-white" >
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Year</th>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Varietal</th>
            <th className="border border-gray-300 px-4 py-2">Rating</th>
            <th className="border border-gray-300 px-4 py-2">Consumed</th>
            <th className="border border-gray-300 px-4 py-2">Date Consumed</th>
          </tr>
        </thead>
        <tbody>
          {wines.map((wine, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="border border-gray-300 px-4 py-2">{wine.id}</td>
              <td className="border border-gray-300 px-4 py-2">{wine.name}</td>
              <td className="border border-gray-300 px-4 py-2">{wine.year}</td>
              <td className="border border-gray-300 px-4 py-2">{wine.type}</td>
              <td className="border border-gray-300 px-4 py-2">{wine.varietal}</td>
              <td className="border border-gray-300 px-4 py-2">{wine.rating || 'N/A'}</td>
              <td className="border border-gray-300 px-4 py-2">{wine.consumed || 'N/A'}</td>
              <td className="border border-gray-300 px-4 py-2">{wine.dateConsumed || 'N/A'}</td>
              {/* Add other wine fields here */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="text-lg text-white font-semibold text-left mb-12 flex justify-center items-center p-2 ">
        <p>
          Build and manage your personal wine collections effortlessly.
        </p>
        <button
          className='bg-blue-500 text-white font-bold py-2 px-4 rounded'
          type="button"
        >
          Create
        </button>
      </div>
    </main>
  );
};

export default WineList;
