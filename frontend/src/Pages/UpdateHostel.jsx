import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const UpdateHostelPopup = ({ hostelId, onClose }) => {
  const [token, setToken] = useState('');
  const [formData, setFormData] = useState({
    hostelName: '',
    area: '',
    rooms: '',
    sharing: '',
    totalStudents: '',
    price: '',
    hotWater: '',
    wifi: '',
    ventilation: '',
    drinkingWater: '',
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      setError("No authentication token found. Please log in.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchHostelData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/owner/hostel/${hostelId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data);
        const data = response.data;
        setFormData({
          hostelName: data.hostelName,
          area: data.area,
          rooms: data.rooms,
          sharing: data.sharing,
          totalStudents: data.totalStudents,
          price: data.price,
          contact: data.contact,
          hotWater: data.hotWater,
          wifi: data.wifi,
          ventilation: data.ventilation,
          drinkingWater: data.drinkingWater,
          vacancy: data.vacancy,
        });
      } catch (error) {
        toast.error('Error fetching hostel data!');
      }
    };

    fetchHostelData();
  }, [hostelId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/owner/update/${hostelId}`, formData,{
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data)
      toast.success('Hostel information updated successfully!');
      onClose();  // Close the popup after successful update
      window.location.reload();
    } catch (error) {
      toast.error('Error updating hostel information!');
    }
  };

  return (
    <div className='z-10'>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Hostel Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Hostel Name</label>
            <input
              type="text"
              name="name"
              value={formData.hostelName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter hostel name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Area</label>
            <select
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>Select area</option>
              <option value="Area 1">Near Kit college.</option>
              <option value="Area 2">ST colony.</option>
              <option value="Area 3">Near Main Gate</option>
              <option value="Area 4">Bharati Vidyapeeth</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Room</label>
            <input
              type="text"
              name="room"
              value={formData.rooms}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter room"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Sharing</label>
            <input
              type="text"
              name="sharing"
              value={formData.sharing}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter sharing"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Total Students</label>
            <input
              type="number"
              name="totalStudents"
              value={formData.totalStudents}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter total students"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter price"
              required
            />
          </div>
          <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Vacancy</label>
          <select
            name="vacancy"
            value={formData.vacancy}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>Select vacancy</option>
            <option value="fill">Fill</option>
            <option value="vacant">Vacant</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Contact</label>
          <input
            type="number"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter contact number"
            required
          />
        </div>

          <h3 className="text-lg font-bold mt-6 mb-4">Features</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Hot Water</label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="hotWater"
                    value="yes"
                    checked={formData.hotWater === 'yes'}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="hotWater"
                    value="no"
                    checked={formData.hotWater === 'no'}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  No
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Wi-Fi</label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="wifi"
                    value="yes"
                    checked={formData.wifi === 'yes'}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="wifi"
                    value="no"
                    checked={formData.wifi === 'no'}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  No
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Ventilation</label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="ventilation"
                    value="yes"
                    checked={formData.ventilation === 'yes'}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="ventilation"
                    value="no"
                    checked={formData.ventilation === 'no'}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  No
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Drinking Water</label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="drinkingWater"
                    value="yes"
                    checked={formData.drinkingWater === 'yes'}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="drinkingWater"
                    value="no"
                    checked={formData.drinkingWater === 'no'}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500 transition duration-200"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default UpdateHostelPopup;

