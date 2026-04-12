import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';  

// ✅ Импортируем утилиты
import { validateAge, validateHeight, validateWeight } from './utils/validation';
import { calculateBMR, calculateTDEE, ACTIVITY_COEFFICIENTS } from './utils/calculations';

// ✅ Импортируем компоненты формы
import GenderSelect from './components/GenderSelect';
import AgeInput from './components/AgeInput';
import HeightInput from './components/HeightInput';
import WeightInput from './components/WeightInput';
import ActivitySelect from './components/ActivitySelect';
import FormButtons from './components/FormButtons';
import ResultBlock from './components/ResultBlock';
import FallingFood from './components/FallingFood';

// Activity coefficients

// Food SVG components

// Validation functions

// Calculation functions

// Food data

// Styles

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('minimal');
  
  const [ageError, setAgeError] = useState('');
  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');
  
  const [isFormValid, setIsFormValid] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultBMR, setResultBMR] = useState(0);
  const [resultTDEE, setResultTDEE] = useState(0);

  // Validate on change
  useEffect(() => {
    const ageValidation = validateAge(age);
    setAgeError(ageValidation.error);
    
    const heightValidation = validateHeight(height);
    setHeightError(heightValidation.error);
    
    const weightValidation = validateWeight(weight);
    setWeightError(weightValidation.error);
    
    const valid = ageValidation.valid && heightValidation.valid && weightValidation.valid;
    setIsFormValid(valid);
  }, [age, height, weight]);

  // Auto-correct age value
  const handleAgeChange = (e) => {
    let value = e.target.value;
    if (value === '') {
      setAge('');
      return;
    }
    let num = Number(value);
    if (num < 0) num = 0;
    if (num > 150) num = 150;
    setAge(num.toString());
  };

  // Auto-correct height value
  const handleHeightChange = (e) => {
    let value = e.target.value;
    if (value === '') {
      setHeight('');
      return;
    }
    let num = Number(value);
    if (num < 0) num = 0;
    setHeight(num.toString());
  };

  // Auto-correct weight value
  const handleWeightChange = (e) => {
    let value = e.target.value;
    if (value === '') {
      setWeight('');
      return;
    }
    let num = Number(value);
    if (num < 0) num = 0;
    setWeight(num.toString());
  };

  // Calculate button handler
  const handleCalculate = () => {
    if (!isFormValid) return;
    
    const bmr = calculateBMR(gender, Number(weight), Number(height), Number(age));
    const tdee = calculateTDEE(bmr, activityLevel);
    
    setResultBMR(Math.round(bmr));
    setResultTDEE(Math.round(tdee));
    setShowResult(true);
    setShowPopup(true); 

    setTimeout(() => setShowPopup(false), 5000);  // ← Добавить
  
    setTimeout(() => {
      document.querySelector('.counter-result')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      });
    }, 100);
  };

  // Clear button handler
  const handleClear = () => {
    setGender('male');
    setAge('');
    setHeight('');
    setWeight('');
    setActivityLevel('minimal');
    setAgeError('');
    setHeightError('');
    setWeightError('');
    setShowResult(false);
    setResultBMR(0);
    setResultTDEE(0);
    setShowPopup(false); 
  };

  return (
    <>
      <FallingFood />

      <div className="container">
        <h1 className="app-title">🔥 Счетчик калорий</h1>
        
        <div className="counter-form">
          <GenderSelect value={gender} onChange={(e) => setGender(e.target.value)} />
          <AgeInput value={age} onChange={handleAgeChange} error={ageError} />
          <HeightInput value={height} onChange={handleHeightChange} error={heightError} />
          <WeightInput value={weight} onChange={handleWeightChange} error={weightError} />
          <ActivitySelect value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} />
          <FormButtons onCalculate={handleCalculate} onClear={handleClear} isDisabled={!isFormValid} />
        </div>
     
        <ResultBlock 
          show={showResult} 
          bmr={resultBMR} 
          tdee={resultTDEE}
          activityLevel={activityLevel}
        />
      </div>
    </> 
  );
}

export default App;
