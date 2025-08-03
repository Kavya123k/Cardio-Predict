import React, { useState } from 'react';
import { Header } from './components/Header';
import { InfoSection } from './components/InfoSection';
import { PredictionForm } from './components/PredictionForm';
import { PredictionResult, PredictionData } from './components/PredictionResult';
import { calculateHeartRisk } from './utils/heartRiskAlgorithm';

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

function App() {
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async (formData: FormData) => {
    setIsLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = calculateHeartRisk(formData);
    setPrediction(result);
    setIsLoading(false);

    // Smooth scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNewPrediction = () => {
    setPrediction(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {!prediction && <InfoSection />}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {!prediction ? (
            <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
          ) : (
            <div id="results">
              <PredictionResult 
                prediction={prediction} 
                onNewPrediction={handleNewPrediction}
              />
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              <strong>Disclaimer:</strong> This tool is for educational purposes only and should not replace professional medical advice.
            </p>
            <p className="text-sm">
              Always consult with a qualified healthcare provider for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;