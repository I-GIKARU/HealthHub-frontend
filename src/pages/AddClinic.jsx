import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useClinics from '../utils/api';

const AddClinic = () => {
  const { addClinic } = useClinics();
  const navigate = useNavigate();
  const [clinic, setClinic] = useState({
    name: '',
    specialty: '',
    description: '',
    insuranceAccepted: [],
    contact: {
      phone: '',
      email: ''
    },
    address: {
      street: '',
      city: ''
    },
    services: [{ name: '', price: '', duration: '' }],
    reviews: []
  });

  const [newInsurance, setNewInsurance] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setClinic(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setClinic(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServices = [...clinic.services];
    updatedServices[index] = {
      ...updatedServices[index],
      [name]: value
    };
    setClinic(prev => ({
      ...prev,
      services: updatedServices
    }));
  };

  const addService = () => {
    setClinic(prev => ({
      ...prev,
      services: [...prev.services, { name: '', price: '', duration: '' }]
    }));
  };

  const removeService = (index) => {
    const updatedServices = clinic.services.filter((_, i) => i !== index);
    setClinic(prev => ({
      ...prev,
      services: updatedServices
    }));
  };

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
      await addClinic(clinic);
      toast.success('Clinic added successfully!');
      navigate('/manage-clinics');
    } catch (error) {
      toast.error('Failed to add clinic. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-8">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Add New Clinic</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
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
        
        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={clinic.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            required
          ></textarea>
        </div>
        
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
              Add
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
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-3">Services</h2>
          {clinic.services.map((service, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
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
              {clinic.services.length > 1 && (
                <div className="md:col-span-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove Service
                  </button>
                </div>
              )}
            </div>
          ))}
          <button 
            type="button" 
            onClick={addService} 
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition mt-2"
          >
            Add Another Service
          </button>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/manage-clinics')}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
          >
            Manage Clinics
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Save Clinic
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClinic;