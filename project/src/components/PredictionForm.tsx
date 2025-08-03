import React, { useState } from 'react';
import { Heart, User, Activity, Droplet, Gauge } from 'lucide-react';

interface FormData {
  age: string;
  sex: string;
  systolicBP: string;
  diastolicBP: string;
  cholesterol: string;
  heartRate: string;
  smoking: string;
  diabetes: string;
  familyHistory: string;
}

interface PredictionFormProps {
  onPredict: (data: FormData) => void;
  isLoading: boolean;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({ onPredict, isLoading }) => {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    sex: '',
    systolicBP: '',
    diastolicBP: '',
    cholesterol: '',
    heartRate: '',
    smoking: '',
    diabetes: '',
    familyHistory: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.age || parseInt(formData.age) < 1 || parseInt(formData.age) > 120) {
      newErrors.age = 'Please enter a valid age (1-120)';
    }

    if (!formData.sex) {
      newErrors.sex = 'Please select sex';
    }

    const systolic = parseInt(formData.systolicBP);
    if (!formData.systolicBP || systolic < 70 || systolic > 250) {
      newErrors.systolicBP = 'Please enter valid systolic BP (70-250)';
    }

    const diastolic = parseInt(formData.diastolicBP);
    if (!formData.diastolicBP || diastolic < 40 || diastolic > 150) {
      newErrors.diastolicBP = 'Please enter valid diastolic BP (40-150)';
    }

    if (systolic && diastolic && systolic <= diastolic) {
      newErrors.systolicBP = 'Systolic must be higher than diastolic';
    }

    const chol = parseInt(formData.cholesterol);
    if (!formData.cholesterol || chol < 100 || chol > 500) {
      newErrors.cholesterol = 'Please enter valid cholesterol (100-500 mg/dL)';
    }

    const hr = parseInt(formData.heartRate);
    if (!formData.heartRate || hr < 40 || hr > 200) {
      newErrors.heartRate = 'Please enter valid heart rate (40-200 bpm)';
    }

    if (!formData.smoking) newErrors.smoking = 'Please select smoking status';
    if (!formData.diabetes) newErrors.diabetes = 'Please select diabetes status';
    if (!formData.familyHistory) newErrors.familyHistory = 'Please select family history';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onPredict(formData);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-100 p-3 rounded-full">
          <Heart className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Health Assessment</h2>
          <p className="text-gray-600">Enter your medical information for heart disease risk analysis</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Basic Information
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age (years)</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${errors.age ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="Enter your age"
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
              <select
                value={formData.sex}
                onChange={(e) => handleInputChange('sex', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${errors.sex ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              >
                <option value="">Select sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.sex && <p className="text-red-500 text-sm mt-1">{errors.sex}</p>}
            </div>
          </div>

          {/* Vital Signs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Vital Signs
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Systolic BP</label>
                <input
                  type="number"
                  value={formData.systolicBP}
                  onChange={(e) => handleInputChange('systolicBP', e.target.value)}
                  className={`w-full px-3 py-3 rounded-lg border ${errors.systolicBP ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="120"
                />
                {errors.systolicBP && <p className="text-red-500 text-xs mt-1">{errors.systolicBP}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Diastolic BP</label>
                <input
                  type="number"
                  value={formData.diastolicBP}
                  onChange={(e) => handleInputChange('diastolicBP', e.target.value)}
                  className={`w-full px-3 py-3 rounded-lg border ${errors.diastolicBP ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="80"
                />
                {errors.diastolicBP && <p className="text-red-500 text-xs mt-1">{errors.diastolicBP}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-2">
                  <Droplet className="w-4 h-4" />
                  Total Cholesterol (mg/dL)
                </span>
              </label>
              <input
                type="number"
                value={formData.cholesterol}
                onChange={(e) => handleInputChange('cholesterol', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${errors.cholesterol ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="200"
              />
              {errors.cholesterol && <p className="text-red-500 text-sm mt-1">{errors.cholesterol}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-2">
                  <Gauge className="w-4 h-4" />
                  Resting Heart Rate (bpm)
                </span>
              </label>
              <input
                type="number"
                value={formData.heartRate}
                onChange={(e) => handleInputChange('heartRate', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${errors.heartRate ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="72"
              />
              {errors.heartRate && <p className="text-red-500 text-sm mt-1">{errors.heartRate}</p>}
            </div>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Medical History & Risk Factors</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Smoking Status</label>
              <select
                value={formData.smoking}
                onChange={(e) => handleInputChange('smoking', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${errors.smoking ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              >
                <option value="">Select status</option>
                <option value="never">Never smoked</option>
                <option value="former">Former smoker</option>
                <option value="current">Current smoker</option>
              </select>
              {errors.smoking && <p className="text-red-500 text-sm mt-1">{errors.smoking}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Diabetes</label>
              <select
                value={formData.diabetes}
                onChange={(e) => handleInputChange('diabetes', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${errors.diabetes ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              >
                <option value="">Select status</option>
                <option value="no">No diabetes</option>
                <option value="prediabetes">Pre-diabetes</option>
                <option value="type2">Type 2 diabetes</option>
              </select>
              {errors.diabetes && <p className="text-red-500 text-sm mt-1">{errors.diabetes}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Family History</label>
              <select
                value={formData.familyHistory}
                onChange={(e) => handleInputChange('familyHistory', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${errors.familyHistory ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              >
                <option value="">Select history</option>
                <option value="none">No family history</option>
                <option value="distant">Distant relatives</option>
                <option value="immediate">Immediate family</option>
              </select>
              {errors.familyHistory && <p className="text-red-500 text-sm mt-1">{errors.familyHistory}</p>}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Analyzing...
            </span>
          ) : (
            'Analyze Heart Disease Risk'
          )}
        </button>
      </form>
    </div>
  );
};