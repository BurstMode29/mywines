'use client'
import React, { useState } from 'react';
import Image from 'next/image'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
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
        <Image
          className=""
          src="/winedine.svg"
          alt="WineDine Logo"
          width={300}
          height={90}
          priority
        />
      </div>

      <div className="text-lg text-white font-semibold text-center mb-8">
        Explore a vast collection of wines from around the world.
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
          <div className="">
            {/* Modal content (e.g., email and password inputs) goes here */}
            <label className='text-white' >Email</label>
            <input type="text" className="block w-full border p-2 mb-4" />

            <label className='text-white' >Password</label>
            <input type="password" className="block w-full border p-7 mb-2 h-2 " />

            <button
              className='bg-blue-500 text-white font-bold py-2 px-4 rounded'
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div>
        <button className='bg-white text-black font-bold py-2 px-4 rounded'
          onClick={toggleModal}
        >
          Login
        </button>
      </div>
    </main>
  )
}
