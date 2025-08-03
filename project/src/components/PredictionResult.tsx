import React from 'react';
import { Heart, AlertTriangle, CheckCircle, Info, TrendingUp, Shield } from 'lucide-react';

export interface RiskFactors {
  age: { level: 'low' | 'moderate' | 'high'; description: string };
  bloodPressure: { level: 'low' | 'moderate' | 'high'; description: string };
  cholesterol: { level: 'low' | 'moderate' | 'high'; description: string };
  heartRate: { level: 'low' | 'moderate' | 'high'; description: string };
  lifestyle: { level: 'low' | 'moderate' | 'high'; description: string };
}

export interface PredictionData {
  riskLevel: 'low' | 'moderate' | 'high';
  riskPercentage: number;
  riskFactors: RiskFactors;
  recommendations: string[];
  nextSteps: string[];
}

interface PredictionResultProps {
  prediction: PredictionData;
  onNewPrediction: () => void;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({ 
  prediction, 
  onNewPrediction 
}) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="w-5 h-5" />;
      case 'moderate': return <Info className="w-5 h-5" />;
      case 'high': return <AlertTriangle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getOverallRiskIcon = () => {
    switch (prediction.riskLevel) {
      case 'low': return <Shield className="w-8 h-8 text-green-600" />;
      case 'moderate': return <TrendingUp className="w-8 h-8 text-yellow-600" />;
      case 'high': return <AlertTriangle className="w-8 h-8 text-red-600" />;
    }
  };

  const getOverallRiskColor = () => {
    switch (prediction.riskLevel) {
      case 'low': return 'from-green-500 to-green-600';
      case 'moderate': return 'from-yellow-500 to-yellow-600';
      case 'high': return 'from-red-500 to-red-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Risk Assessment */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {getOverallRiskIcon()}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Risk Assessment Complete
          </h2>
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold bg-gradient-to-r ${getOverallRiskColor()} text-white`}>
            <Heart className="w-5 h-5" />
            {prediction.riskLevel.charAt(0).toUpperCase() + prediction.riskLevel.slice(1)} Risk
            <span className="text-sm">({prediction.riskPercentage}%)</span>
          </div>
        </div>

        {/* Risk Visualization */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Risk Level</span>
            <span>{prediction.riskPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getOverallRiskColor()} transition-all duration-1000 ease-out`}
              style={{ width: `${prediction.riskPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Low (0-30%)</span>
            <span>Moderate (30-70%)</span>
            <span>High (70-100%)</span>
          </div>
        </div>

        {/* Risk Level Description */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">What this means:</h3>
          <p className="text-gray-700 leading-relaxed">
            {prediction.riskLevel === 'low' && 
              "Your current risk factors suggest a low probability of developing heart disease in the next 10 years. Continue maintaining healthy lifestyle choices."
            }
            {prediction.riskLevel === 'moderate' && 
              "You have some risk factors that may increase your chances of heart disease. Consider discussing prevention strategies with your healthcare provider."
            }
            {prediction.riskLevel === 'high' && 
              "Multiple risk factors indicate an elevated risk for heart disease. It's important to consult with a healthcare professional for comprehensive evaluation and management."
            }
          </p>
        </div>
      </div>

      {/* Detailed Risk Factors */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          Risk Factor Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(prediction.riskFactors).map(([factor, data]) => (
            <div key={factor} className={`border rounded-lg p-4 ${getRiskColor(data.level)}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold capitalize">
                  {factor === 'bloodPressure' ? 'Blood Pressure' : 
                   factor === 'heartRate' ? 'Heart Rate' : factor}
                </h4>
                <div className="flex items-center gap-1">
                  {getRiskIcon(data.level)}
                  <span className="text-sm font-medium capitalize">{data.level}</span>
                </div>
              </div>
              <p className="text-sm">{data.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Recommendations
          </h3>
          <ul className="space-y-3">
            {prediction.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-blue-600" />
            Next Steps
          </h3>
          <ul className="space-y-3">
            {prediction.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-gray-700">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-yellow-800 font-semibold mb-1">Medical Disclaimer</h4>
            <p className="text-yellow-700 text-sm leading-relaxed">
              This assessment is for educational purposes only and should not replace professional medical advice. 
              Always consult with a qualified healthcare provider for proper diagnosis and treatment recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onNewPrediction}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200"
        >
          New Assessment
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 transition-all duration-200"
        >
          Print Results
        </button>
      </div>
    </div>
  );
};