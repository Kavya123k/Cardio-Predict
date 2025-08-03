import { RiskFactors, PredictionData } from '../components/PredictionResult';

interface InputData {
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

export const calculateHeartRisk = (data: InputData): PredictionData => {
  let riskScore = 0;
  const riskFactors: RiskFactors = {
    age: { level: 'low', description: '' },
    bloodPressure: { level: 'low', description: '' },
    cholesterol: { level: 'low', description: '' },
    heartRate: { level: 'low', description: '' },
    lifestyle: { level: 'low', description: '' }
  };

  const age = parseInt(data.age);
  const systolic = parseInt(data.systolicBP);
  const diastolic = parseInt(data.diastolicBP);
  const cholesterol = parseInt(data.cholesterol);
  const heartRate = parseInt(data.heartRate);

  // Age risk assessment
  if (age < 45) {
    riskFactors.age = {
      level: 'low',
      description: 'Age is not a significant risk factor at this time.'
    };
  } else if (age < 65) {
    riskScore += 15;
    riskFactors.age = {
      level: 'moderate',
      description: 'Age is becoming a moderate risk factor. Regular monitoring recommended.'
    };
  } else {
    riskScore += 25;
    riskFactors.age = {
      level: 'high',
      description: 'Advanced age significantly increases cardiovascular risk.'
    };
  }

  // Gender-based risk adjustment
  if (data.sex === 'male') {
    riskScore += 10;
  }

  // Blood pressure assessment
  if (systolic < 120 && diastolic < 80) {
    riskFactors.bloodPressure = {
      level: 'low',
      description: 'Blood pressure is optimal (Normal: <120/80 mmHg).'
    };
  } else if (systolic < 140 && diastolic < 90) {
    riskScore += 10;
    riskFactors.bloodPressure = {
      level: 'moderate',
      description: 'Blood pressure is elevated. Consider lifestyle modifications.'
    };
  } else {
    riskScore += 20;
    riskFactors.bloodPressure = {
      level: 'high',
      description: 'High blood pressure significantly increases heart disease risk.'
    };
  }

  // Cholesterol assessment
  if (cholesterol < 200) {
    riskFactors.cholesterol = {
      level: 'low',
      description: 'Cholesterol levels are within healthy range (<200 mg/dL).'
    };
  } else if (cholesterol < 240) {
    riskScore += 10;
    riskFactors.cholesterol = {
      level: 'moderate',
      description: 'Cholesterol is borderline high. Dietary changes may help.'
    };
  } else {
    riskScore += 20;
    riskFactors.cholesterol = {
      level: 'high',
      description: 'High cholesterol substantially increases cardiovascular risk.'
    };
  }

  // Heart rate assessment
  if (heartRate >= 60 && heartRate <= 100) {
    riskFactors.heartRate = {
      level: 'low',
      description: 'Resting heart rate is within normal range (60-100 bpm).'
    };
  } else if (heartRate > 100) {
    riskScore += 8;
    riskFactors.heartRate = {
      level: 'moderate',
      description: 'Elevated resting heart rate may indicate cardiovascular stress.'
    };
  } else {
    riskScore += 5;
    riskFactors.heartRate = {
      level: 'moderate',
      description: 'Very low heart rate - consider consulting a healthcare provider.'
    };
  }

  // Lifestyle factors
  let lifestyleRisk = 0;
  let lifestyleDescriptions: string[] = [];

  // Smoking
  if (data.smoking === 'current') {
    riskScore += 20;
    lifestyleRisk += 3;
    lifestyleDescriptions.push('Current smoking significantly increases risk');
  } else if (data.smoking === 'former') {
    riskScore += 5;
    lifestyleRisk += 1;
    lifestyleDescriptions.push('Former smoking has some residual risk');
  } else {
    lifestyleDescriptions.push('Non-smoking status is protective');
  }

  // Diabetes
  if (data.diabetes === 'type2') {
    riskScore += 20;
    lifestyleRisk += 3;
    lifestyleDescriptions.push('Type 2 diabetes substantially increases risk');
  } else if (data.diabetes === 'prediabetes') {
    riskScore += 10;
    lifestyleRisk += 2;
    lifestyleDescriptions.push('Pre-diabetes increases cardiovascular risk');
  } else {
    lifestyleDescriptions.push('No diabetes detected');
  }

  // Family history
  if (data.familyHistory === 'immediate') {
    riskScore += 15;
    lifestyleRisk += 2;
    lifestyleDescriptions.push('Strong family history increases genetic risk');
  } else if (data.familyHistory === 'distant') {
    riskScore += 5;
    lifestyleRisk += 1;
    lifestyleDescriptions.push('Some family history noted');
  } else {
    lifestyleDescriptions.push('No significant family history');
  }

  // Set lifestyle risk level
  if (lifestyleRisk <= 2) {
    riskFactors.lifestyle = {
      level: 'low',
      description: lifestyleDescriptions.join('; ') + '.'
    };
  } else if (lifestyleRisk <= 5) {
    riskFactors.lifestyle = {
      level: 'moderate',
      description: lifestyleDescriptions.join('; ') + '.'
    };
  } else {
    riskFactors.lifestyle = {
      level: 'high',
      description: lifestyleDescriptions.join('; ') + '.'
    };
  }

  // Calculate final risk percentage (cap at 95%)
  const riskPercentage = Math.min(95, Math.max(5, riskScore));
  
  // Determine overall risk level
  let riskLevel: 'low' | 'moderate' | 'high';
  if (riskPercentage < 30) {
    riskLevel = 'low';
  } else if (riskPercentage < 70) {
    riskLevel = 'moderate';
  } else {
    riskLevel = 'high';
  }

  // Generate personalized recommendations
  const recommendations = generateRecommendations(data, riskLevel, riskFactors);
  const nextSteps = generateNextSteps(riskLevel);

  return {
    riskLevel,
    riskPercentage,
    riskFactors,
    recommendations,
    nextSteps
  };
};

const generateRecommendations = (
  data: InputData, 
  riskLevel: 'low' | 'moderate' | 'high',
  riskFactors: RiskFactors
): string[] => {
  const recommendations: string[] = [];

  // Blood pressure recommendations
  if (riskFactors.bloodPressure.level !== 'low') {
    recommendations.push('Monitor blood pressure regularly and consider the DASH diet');
    recommendations.push('Reduce sodium intake to less than 2,300mg per day');
  }

  // Cholesterol recommendations
  if (riskFactors.cholesterol.level !== 'low') {
    recommendations.push('Follow a heart-healthy diet low in saturated fats');
    recommendations.push('Consider omega-3 fatty acids and soluble fiber supplementation');
  }

  // Lifestyle recommendations
  if (data.smoking === 'current') {
    recommendations.push('Quit smoking immediately - this is the single most important change');
  }

  if (data.diabetes !== 'no') {
    recommendations.push('Maintain optimal blood glucose control through diet and medication');
  }

  // General recommendations based on risk level
  if (riskLevel === 'low') {
    recommendations.push('Maintain current healthy lifestyle patterns');
    recommendations.push('Aim for 150 minutes of moderate exercise per week');
  } else {
    recommendations.push('Increase physical activity to at least 150 minutes per week');
    recommendations.push('Consider Mediterranean-style diet rich in fruits, vegetables, and whole grains');
    recommendations.push('Manage stress through relaxation techniques or counseling');
  }

  recommendations.push('Maintain a healthy weight (BMI 18.5-24.9)');
  recommendations.push('Get adequate sleep (7-9 hours per night)');

  return recommendations;
};

const generateNextSteps = (riskLevel: 'low' | 'moderate' | 'high'): string[] => {
  const baseSteps = [
    'Schedule a comprehensive physical examination with your primary care physician',
    'Discuss this risk assessment with your healthcare provider',
  ];

  if (riskLevel === 'low') {
    return [
      ...baseSteps,
      'Continue annual health screenings and maintain current lifestyle',
      'Monitor blood pressure and cholesterol every 2-3 years'
    ];
  } else if (riskLevel === 'moderate') {
    return [
      ...baseSteps,
      'Consider additional cardiac screening tests (EKG, stress test)',
      'Work with healthcare provider to address modifiable risk factors',
      'Monitor progress with regular follow-up appointments every 3-6 months'
    ];
  } else {
    return [
      'Seek immediate consultation with a cardiologist',
      'Discuss comprehensive cardiac evaluation including advanced testing',
      'Consider medication therapy for risk factor management',
      'Implement aggressive lifestyle modifications with professional support',
      'Schedule regular monitoring appointments every 1-3 months'
    ];
  }
};