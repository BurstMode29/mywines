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
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedWine, setSelectedWine] = useState(null);
  const [newWine, setNewWine] = useState({
    name: '',
    year: '',
    type: 'Red',
    varietal: 'Cabernet Sauvignon',
    rating: '',
    consumed: 'No',
    dateConsumed: '',
  });

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const openEditModal = (wine: React.SetStateAction<null>) => {
    setSelectedWine(wine);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedWine(null);
    setEditModalOpen(false);
  };

  const handleCreate = async () => {
    const response = await fetch('/api/add_wines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWine),
    });

    if (response.ok) {
      const data = await response.json();
      setWines([...wines, data.createdWine]);
      closeCreateModal();
    } else {
      console.error('Error creating wine:', response.statusText);
    }
  };

  const handleEdit = async () => {
    // Use API endpoint to edit the selected wine
    const response = await fetch(`/api/editWine?id=${selectedWine.id}`, {
      method: 'PUT',
    });

    if (response.ok) {
      const data = await response.json();
      // Update the wines state with the edited wine
      setWines(wines.map((wine) => (wine.id === data.editedWine.id ? data.editedWine : wine)));
      closeEditModal();
    } else {
      console.error('Error editing wine:', response.statusText);
    }
  };

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

      {/* Create Wine Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80" >
          <div className="bg-white h-3 p-7">
            {/* Wine creation form goes here */}
            <h2 className="text-2xl font-bold mb-4">Create Wine</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Name</label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  value={newWine.name}
                  onChange={(e) => setNewWine({ ...newWine, name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Year</label>
                <input
                  type="number"
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Type</label>
                <select
                  className="mt-1 p-2 border rounded w-full"
                >
                  <option value="Red">Red</option>
                  <option value="White">White</option>
                  <option value="Rosé">Rosé</option>
                  <option value="White Blend">White Blend</option>
                  <option value="Red Blend">Red Blend</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Varietal</label>
                <select
                  className="mt-1 p-2 border rounded w-full"
                // Add necessary state and onChange handler
                >
                  <option value="Cabernet Sauvignon">Cabernet Sauvignon</option>
                  <option value="Merlot">Merlot</option>
                  <option value="Shiraz">Shiraz</option>
                  <option value="Chenin Blanc">Chenin Blanc</option>
                  <option value="Sauvignon Blanc">Sauvignon Blanc</option>
                  <option value="Verdelho">Verdelho</option>
                  <option value="Chardonnay">Chardonnay</option>
                  <option value="Durif">Durif</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  className="mt-1 p-2 border rounded w-full"
                // Add necessary state and onChange handler
                />
              </div>
              <div className='flex justify-center item-center' >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Consumed</label>
                  <select
                    className="mt-1 p-2 border rounded w-full"
                  // Add necessary state and onChange handler
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Date Consumed</label>
                  <input
                    type="date"
                    className="mt-1 p-2 border rounded w-full"
                  // Add necessary state and onChange handler
                  />
                </div>
              </div>
              <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleCreate}
              >
                Create Wine
              </button>
              <button
                type="button"
                className="bg-gray-500 text-red py-2 px-4 rounded"
                onClick={closeCreateModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Wine Modal */}
      {isEditModalOpen && selectedWine && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
          <div className="bg-white p-4">
            {/* Wine editing form goes here */}
            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleEdit}>
              Save Changes
            </button>
            <button className="bg-gray-500 text-white py-2 px-4 rounded" onClick={closeEditModal}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="text-lg text-white font-semibold text-left mb-12 flex justify-center items-center p-2 ">
        <p>
          Build and manage your personal wine collections effortlessly.
        </p>
        <button
          className='bg-blue-500 text-white font-bold py-2 px-4 rounded'
          type="button"
          onClick={openCreateModal}
        >
          Create
        </button>
      </div>
    </main>
  );
};

export default WineList;
