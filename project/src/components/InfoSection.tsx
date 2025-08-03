import React from 'react';
import { Shield, Clock, Users, Award } from 'lucide-react';

export const InfoSection: React.FC = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: 'Medically Validated',
      description: 'Based on established cardiovascular risk assessment guidelines and clinical research.'
    },
    {
      icon: <Clock className="w-6 h-6 text-green-600" />,
      title: 'Instant Results',
      description: 'Get comprehensive risk analysis in seconds with detailed explanations and recommendations.'
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: 'Personalized Care',
      description: 'Tailored recommendations based on your individual health profile and risk factors.'
    },
    {
      icon: <Award className="w-6 h-6 text-yellow-600" />,
      title: 'Evidence-Based',
      description: 'Algorithms developed using peer-reviewed medical literature and clinical best practices.'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Advanced Heart Disease Risk Assessment
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform analyzes multiple cardiovascular risk factors to provide 
            you with a comprehensive assessment of your heart disease risk, along with personalized 
            recommendations for maintaining optimal heart health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-gray-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Input Health Data</h4>
              <p className="text-gray-600">Enter your vital signs, medical history, and lifestyle factors</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI Analysis</h4>
              <p className="text-gray-600">Our algorithm analyzes your data using medical guidelines</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Get Results</h4>
              <p className="text-gray-600">Receive detailed risk assessment and personalized recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};