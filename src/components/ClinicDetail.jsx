import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import ReviewForm from './ReviewForm';
import { toast } from 'react-toastify';
import useClinics from '../utils/api';

const ClinicDetail = () => {
  const { id } = useParams();
  const { clinics, addReview } = useClinics();
  const clinic = clinics.find(c => String(c.id) === String(id));
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!clinic) {
    return <div className="text-center py-10">Clinic not found</div>;
  }

  const averageRating = clinic.reviews.length > 0 
    ? (clinic.reviews.reduce((sum, review) => sum + review.rating, 0) / clinic.reviews.length).toFixed(1)
    : 0;

  const handleAddReview = (newReview) => {
    addReview(clinic.id, newReview);
    setShowReviewForm(false);
    toast.success('Review submitted successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">{clinic.name}</h1>
        <p className="text-xl text-gray-600 mb-4">{clinic.specialty}</p>
        
        <div className="flex items-center mb-6">
          <div className="flex mr-4">
            {[1, 2, 3, 4, 5].map((star) => (
              star <= Math.round(averageRating) ? 
                <FaStar key={star} className="text-yellow-400 text-xl" /> : 
                <FaRegStar key={star} className="text-yellow-400 text-xl" />
            ))}
          </div>
          <span className="text-gray-700">
            {averageRating} out of 5 ({clinic.reviews.length} reviews)
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-blue-600 mr-2" />
                <span>{clinic.address.street}, {clinic.address.city}</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-blue-600 mr-2" />
                <span>{clinic.contact.phone}</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-blue-600 mr-2" />
                <span>{clinic.contact.email}</span>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-800">Insurance Accepted</h2>
            <div className="flex flex-wrap gap-2">
              {clinic.insuranceAccepted.map((insurance, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {insurance}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Services</h2>
            <div className="space-y-4">
              {clinic.services.map((service, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-gray-800">{service.name}</h3>
                  <div className="flex justify-between text-gray-600 mt-1">
                    <span>Price: {service.price}</span>
                    <span>Duration: {service.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">About</h2>
          <p className="text-gray-700">{clinic.description}</p>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Patient Reviews</h2>
            <button 
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {showReviewForm ? 'Cancel' : 'Add Review'}
            </button>
          </div>
          
          {showReviewForm && (
            <ReviewForm onSubmit={handleAddReview} />
          )}
          
          {clinic.reviews.length > 0 ? (
            <div className="space-y-6">
              {clinic.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        star <= review.rating ? 
                          <FaStar key={star} className="text-yellow-400" /> : 
                          <FaRegStar key={star} className="text-yellow-400" />
                      ))}
                    </div>
                    <span className="font-medium">{review.patientName}</span>
                    <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          )}
        </div>
        
        <Link 
          to="/clinics" 
          className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Back to Clinics
        </Link>
      </div>
    </div>
  );
};

export default ClinicDetail;