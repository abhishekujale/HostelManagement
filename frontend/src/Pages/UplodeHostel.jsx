/*import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../Store/userAtom';

function UplodeHostel() {
  const user = useRecoilValue(userAtom);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    hostelName: '',
    area: '',
    address:'',
    gender: '',
    rooms: '',
    sharing: '',
    totalStudents: '',
    price: '',
    contact: '',
    hotWater: '',
    wifi: '',
    ventilation: '',
    drinkingWater: '',
    vacancy: ''
  });

  useEffect(() => {
    if (!user || !user.userId) {
      toast.error('User ID is not available. Please try logging in again.');
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: ['rooms', 'sharing', 'totalStudents', 'price', 'contact'].includes(name) 
        ? Number(value) 
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ownerId = user.userId || user._id || user.id;
    if (!ownerId) {
      toast.error('User ID is not available. Please try logging in again.');
      return;
    }
    if (images.length < 2) {
      toast.error('Please upload at least 2 images.');
      return;
    }
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      formDataToSend.append('owner', ownerId);
      images.forEach(image => {
        formDataToSend.append('images', image);
      });
  
      const response = await axios.post("http://localhost:3000/api/v1/owner/uploderoom", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Server response:', response.data);
      toast.success('Hostel information submitted successfully!');
      resetForm();
    } catch (error) {
      console.error('Error object:', error);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      toast.error(`Error submitting form data: ${error.response?.data?.message || error.message}`);
    }
  };

  const resetForm = () => {
    setFormData({
      hostelName: '',
      area: '',
      address:'',
      gender: '',
      rooms: '',
      sharing: '',
      totalStudents: '',
      price: '',
      contact: '',
      hotWater: '',
      wifi: '',
      ventilation: '',
      drinkingWater: '',
      vacancy: ''
    });
    setImages([]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-5">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Hostel Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Hostel Name</label>
          <input
            type="text"
            name="hostelName"
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
            <option value="Near Kit college">Near Kit college</option>
            <option value="ST colony">ST colony</option>
            <option value="Near Main Gate">Near Main Gate</option>
            <option value="Bharati Vidyapeeth">Bharati Vidyapeeth</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter full address"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Room</label>
          <input
            type="text"
            name="rooms"
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
        <div className='grid grid-cols-2'>
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
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Upload Images (Minimum 2 images)</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={(e) => setImages([...e.target.files])}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UplodeHostel;*/
import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Webcam from 'react-webcam';

function UplodeHostel() {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    hostelName: '',
    area: '',
    address: '',
    gender: '',
    rooms: '',
    sharing: '',
    totalStudents: '',
    price: '',
    contact: '',
    hotWater: '',
    wifi: '',
    ventilation: '',
    drinkingWater: '',
    vacancy: ''
  });
  const [cameraOpen, setCameraOpen] = useState(false);
  const webcamRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: ['rooms', 'sharing', 'totalStudents', 'price', 'contact'].includes(name) 
        ? Number(value) 
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length < 2) {
      toast.error('Please upload at least 2 images.');
      return;
    }
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      images.forEach(image => {
        formDataToSend.append('images', image);
      });

      const response = await axios.post("http://localhost:3000/api/v1/owner/uploderoom", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Hostel information submitted successfully!');
      resetForm();
    } catch (error) {
      console.error('Error object:', error);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      toast.error(`Error submitting form data: ${error.response?.data?.message || error.message}`);
    }
  };

  const resetForm = () => {
    setFormData({
      hostelName: '',
      area: '',
      address: '',
      gender: '',
      rooms: '',
      sharing: '',
      totalStudents: '',
      price: '',
      contact: '',
      hotWater: '',
      wifi: '',
      ventilation: '',
      drinkingWater: '',
      vacancy: ''
    });
    setImages([]);
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], `camera_image_${Date.now()}.jpg`, { type: 'image/jpeg' });
          setImages(prevImages => [...prevImages, file]);
        });
      setCameraOpen(false);
    }
  }, [webcamRef]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prevImages => [...prevImages, ...files]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-5">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Hostel Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Hostel Name</label>
          <input
            type="text"
            name="hostelName"
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
            <option value="Near Kit college">Near Kit college</option>
            <option value="ST colony">ST colony</option>
            <option value="Near Main Gate">Near Main Gate</option>
            <option value="Bharati Vidyapeeth">Bharati Vidyapeeth</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter full address"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Room</label>
          <input
            type="text"
            name="rooms"
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
        <div className='grid grid-cols-2 gap-4'>
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
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Upload Images (Minimum 2)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="button"
            onClick={() => setCameraOpen(true)}
            className="mt-2 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Capture Image
          </button>
          {cameraOpen && (
            <div className="mt-4">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="100%"
              />
              <button
                onClick={capture}
                className="mt-2 w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
              >
                Capture
              </button>
              <button
                onClick={() => setCameraOpen(false)}
                className="mt-2 w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                Close Camera
              </button>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UplodeHostel;
