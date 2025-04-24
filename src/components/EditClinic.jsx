import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useClinics from '../utils/api';
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';

const EditClinic = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clinics, updateClinic } = useClinics();
  const [clinic, setClinic] = useState(null);
  const [newInsurance, setNewInsurance] = useState('');

  // Load clinic data
  useEffect(() => {
    const foundClinic = clinics.find(c => c.id === id);
    if (foundClinic) {
      setClinic(foundClinic);
    }
  }, [id, clinics]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setClinic(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setClinic(prev => ({ ...prev, [name]: value }));
    }
  };

  // Services Management
  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServices = [...clinic.services];
    updatedServices[index] = { ...updatedServices[index], [name]: value };
    setClinic(prev => ({ ...prev, services: updatedServices }));
  };

  const addService = () => {
    setClinic(prev => ({
      ...prev,
      services: [...prev.services, { name: '', price: '', duration: '' }]
    }));
  };

  const removeService = (index) => {
    const updatedServices = clinic.services.filter((_, i) => i !== index);
    setClinic(prev => ({ ...prev, services: updatedServices }));
  };

  // Insurance Management
  const addInsurance = () => {
    if (newInsurance && !clinic.insuranceAccepted.includes(newInsurance)) {
      setClinic(prev => ({
        ...prev,
        insuranceAccepted: [...prev.insuranceAccepted, newInsurance]
      }));
      setNewInsurance('');
    }
  };

  const removeInsurance = (insurance) => {
    setClinic(prev => ({
      ...prev,
      insuranceAccepted: prev.insuranceAccepted.filter(item => item !== insurance)
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateClinic(clinic.id, clinic);
      toast.success('Clinic updated successfully!');
      navigate('/manage-clinics');
    } catch (error) {
      toast.error('Failed to update clinic. Please try again.');
    }
  };

  if (!clinic) {
    return <div className="text-center py-10">Loading clinic data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-8">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Edit Clinic: {clinic.name}</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Clinic Name</label>
            <input
              type="text"
              name="name"
              value={clinic.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Specialty</label>
            <input
              type="text"
              name="specialty"
              value={clinic.specialty}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={clinic.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            required
          />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="contact.phone"
                  value={clinic.contact.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="contact.email"
                  value={clinic.contact.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Address</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Street</label>
                <input
                  type="text"
                  name="address.street"
                  value={clinic.address.street}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  name="address.city"
                  value={clinic.address.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Insurance Accepted */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Insurance Accepted</h2>
          <div className="flex mb-2">
            <input
              type="text"
              value={newInsurance}
              onChange={(e) => setNewInsurance(e.target.value)}
              placeholder="Add insurance provider"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addInsurance}
              className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {clinic.insuranceAccepted.map((insurance, index) => (
              <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                <span>{insurance}</span>
                <button
                  type="button"
                  onClick={() => removeInsurance(insurance)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Services</h2>
          {clinic.services.map((service, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-gray-700 mb-2">Service Name</label>
                <input
                  type="text"
                  name="name"
                  value={service.name}
                  onChange={(e) => handleServiceChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Price</label>
                <input
                  type="text"
                  name="price"
                  value={service.price}
                  onChange={(e) => handleServiceChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={service.duration}
                  onChange={(e) => handleServiceChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="bg-red-100 text-red-600 px-3 py-2 rounded hover:bg-red-200 transition flex items-center"
                >
                  <FaMinus className="mr-1" /> Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addService}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition mt-2"
          >
            <FaPlus className="inline mr-1" /> Add Service
          </button>
        </div>
        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/manage-clinics')}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditClinic;