import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClinicCard from '../components/ClinicCard';
import SearchBar from '../components/SearchBar';
import useClinics from '../utils/api';

const ClinicList = () => {
  const { clinics, loading, error } = useClinics();
  const [filteredClinics, setFilteredClinics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (clinics) {
      setFilteredClinics(clinics);
    }
  }, [clinics]);

  const handleSearch = (filters) => {
    let results = [...clinics];
    
    if (filters.searchTerm) {
      results = results.filter(clinic => 
        clinic.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        clinic.specialty.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        clinic.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    
    if (filters.specialty) {
      results = results.filter(clinic => 
        clinic.specialty === filters.specialty
      );
    }
    
    if (filters.insurance) {
      results = results.filter(clinic => 
        clinic.insuranceAccepted.includes(filters.insurance)
      );
    }
    
    setFilteredClinics(results);
  };

  const specialties = [...new Set(clinics.map(clinic => clinic.specialty))];

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div>
      <SearchBar onSearch={handleSearch} specialties={specialties} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClinics.map(clinic => (
          <ClinicCard 
            key={clinic.id} 
            clinic={clinic} 
            onClick={() => navigate(`/clinics/${clinic.id}`)}
          />
        ))}
      </div>
      
      {filteredClinics.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No clinics found matching your criteria. Try adjusting your search filters.
        </div>
      )}
    </div>
  );
};

export default ClinicList;