import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const API_URL = 'https://healthhub-backend-6w0u.onrender.com/clinics';

const useClinics = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch clinics');
        }
        const data = await response.json();
        setClinics(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast.error('Failed to load clinics');
      }
    };

    fetchClinics();
  }, []);

  const addClinic = async (newClinic) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClinic),
      });
      if (!response.ok) {
        throw new Error('Failed to add clinic');
      }
      const data = await response.json();
      setClinics([...clinics, data]);
      return data;
    } catch (err) {
      toast.error('Failed to add clinic');
      throw err;
    }
  };

  const updateClinic = async (id, updatedClinic) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedClinic),
      });
      if (!response.ok) {
        throw new Error('Failed to update clinic');
      }
      const data = await response.json();
      setClinics(clinics.map(clinic => clinic.id === id ? data : clinic));
      return data;
    } catch (err) {
      toast.error('Failed to update clinic');
      throw err;
    }
  };

  const deleteClinic = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete clinic');
      }
      setClinics(clinics.filter(clinic => clinic.id !== id));
    } catch (err) {
      toast.error('Failed to delete clinic');
      throw err;
    }
  };

  const addReview = async (clinicId, newReview) => {
    try {
      const clinicToUpdate = clinics.find(clinic => clinic.id === clinicId);
      if (!clinicToUpdate) {
        throw new Error('Clinic not found');
      }
      
      const updatedClinic = {
        ...clinicToUpdate,
        reviews: [...clinicToUpdate.reviews, newReview]
      };
      
      const response = await fetch(`${API_URL}/${clinicId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedClinic),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add review');
      }
      
      const data = await response.json();
      setClinics(clinics.map(clinic => clinic.id === clinicId ? data : clinic));
    } catch (err) {
      toast.error('Failed to add review');
      throw err;
    }
  };

  return {
    clinics,
    loading,
    error,
    addClinic,
    updateClinic,
    deleteClinic,
    addReview,
  };
};

export default useClinics;