import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// Activity coefficients
const ACTIVITY_COEFFICIENTS = {
  minimal: 1.2,
  low: 1.375,
  medium: 1.55,
  high: 1.7,
  veryHigh: 1.9
};

// Validation functions
const validateAge = (value) => {
  if (value === '' || value === null) return { valid: false, error: 'Возраст не должен быть пустым' };
  const num = Number(value);
  if (num < 0) return { valid: false, error: 'Возраст не может быть меньше 0' };
  if (num > 150) return { valid: false, error: 'Возраст не может быть больше 150' };
  return { valid: true, error: '' };
};

const validateHeight = (value) => {
  if (value === '' || value === null) return { valid: false, error: 'Рост не должен быть пустым' };
  const num = Number(value);
  if (num < 0) return { valid: false, error: 'Рост не может быть меньше 0' };
  return { valid: true, error: '' };
};

const validateWeight = (value) => {
  if (value === '' || value === null) return { valid: false, error: 'Вес не должен быть пустым' };
  const num = Number(value);
  if (num < 0) return { valid: false, error: 'Вес не может быть меньше 0' };
  return { valid: true, error: '' };
};

// Calculation functions
const calculateBMR = (gender, weight, height, age) => {
  if (gender === 'male') {
    return 66.5 + (13.75 * weight) + (5.003 * height) - (6.775 * age);
  } else {
    return 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
  }
};

const calculateTDEE = (bmr, activityLevel) => {
  return bmr * ACTIVITY_COEFFICIENTS[activityLevel];
};

// Styles
const styles = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 40px 20px;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
  }

  .app-title {
    text-align: center;
    color: white;
    font-size: 2.5rem;
    margin-bottom: 30px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }

  .counter-form {
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  }

  .form__group {
    margin-bottom: 25px;
  }

  .form__label {
    display: block;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
    font-size: 1rem;
  }

  .form__control {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .form__control:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  }

  .form__control_error {
    border-color: #e74c3c !important;
    background-color: #fdf2f2;
  }

  .form__error {
    color: #e74c3c;
    font-size: 0.85rem;
    margin-top: 5px;
    display: block;
  }

  .form__radio-group {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  .form__radio-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 10px 15px;
    background: #f8f9fa;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .form__radio-label:hover {
    background: #e9ecef;
  }

  .form__radio-label input[type="radio"] {
    accent-color: #667eea;
  }

  .form__select {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none; /* Убирает стандартный стиль браузера */
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 15px center;
  padding-right: 40px; /* Место для стрелочки */

  color: #333;              /* Цвет текста */
  display: block;           /* Гарантирует отображение */
  position: relative;       /* Для корректного позиционирования */
  z-index: 1; 
}

.form__select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

/* Опции должны иметь нормальный фон */
.form__select option {
  padding: 10px;
  background: white;
  color: #333;
}

  .form__buttons {
    display: flex;
    gap: 15px;
    margin-top: 30px;
  }

  .form__btn {
    flex: 1;
    padding: 15px 25px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .form__btn_calculate {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .form__btn_calculate:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
  }

  .form__btn_calculate:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .form__btn_clear {
    background: #f8f9fa;
    color: #333;
    border: 2px solid #e0e0e0;
  }

  .form__btn_clear:hover {
    background: #e9ecef;
    border-color: #ccc;
  }

  .counter-result {
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    margin-top: 30px;
    display: none;
    animation: slideIn 0.5s ease;
  }

  .counter-result_active {
    display: block;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .result__title {
    text-align: center;
    color: #333;
    font-size: 1.5rem;
    margin-bottom: 25px;
  }

  .result__item {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 15px;
    text-align: center;
  }

  .result__label {
    color: #666;
    font-size: 0.95rem;
    margin-bottom: 8px;
  }

  .result__value {
    color: #667eea;
    font-size: 2rem;
    font-weight: 700;
  }

  .result__unit {
    color: #999;
    font-size: 1rem;
    font-weight: 400;
  }

  @media (max-width: 480px) {
    .app-title {
      font-size: 1.8rem;
    }
    
    .form__radio-group {
      flex-direction: column;
      gap: 10px;
    }
    
    .form__buttons {
      flex-direction: column;
    }
    
    .result__value {
      font-size: 1.5rem;
    }
  }
`;

function App() {
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
  };

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <h1 className="app-title"> Счетчик калорий</h1>
        
        <div className="counter-form">
          {/* Gender Selection */}
          <div className="form__group">
            <label className="form__label">Пол</label>
            <div className="form__radio-group">
              <label className="form__radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Мужской
              </label>
              <label className="form__radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Женский
              </label>
            </div>
          </div>

          {/* Age Input */}
          <div className="form__group">
            <label className="form__label" htmlFor="age">Возраст (лет)</label>
            <input
              type="number"
              id="age"
              className={`form__control ${ageError ? 'form__control_error' : ''}`}
              value={age}
              onChange={handleAgeChange}
              placeholder="Введите возраст"
              min="0"
              max="150"
            />
            <span className="form__error">{ageError}</span>
          </div>

          {/* Height Input */}
          <div className="form__group">
            <label className="form__label" htmlFor="height">Рост (см)</label>
            <input
              type="number"
              id="height"
              className={`form__control ${heightError ? 'form__control_error' : ''}`}
              value={height}
              onChange={handleHeightChange}
              placeholder="Введите рост"
              min="0"
            />
            <span className="form__error">{heightError}</span>
          </div>

          {/* Weight Input */}
          <div className="form__group">
            <label className="form__label" htmlFor="weight">Вес (кг)</label>
            <input
              type="number"
              id="weight"
              className={`form__control ${weightError ? 'form__control_error' : ''}`}
              value={weight}
              onChange={handleWeightChange}
              placeholder="Введите вес"
              min="0"
            />
            <span className="form__error">{weightError}</span>
          </div>

          {/* Activity Level Selection */}
          <div className="form__group">
            <label className="form__label" htmlFor="activity">Физическая активность</label>
            <select
              id="activity"
              className="form__select"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
            >
              <option value="minimal">Минимальная (1.2)</option>
              <option value="low">Низкая (1.375)</option>
              <option value="medium">Средняя (1.55)</option>
              <option value="high">Высокая (1.7)</option>
              <option value="veryHigh">Очень высокая (1.9)</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="form__buttons">
            <button
              className="form__btn form__btn_calculate"
              onClick={handleCalculate}
              disabled={!isFormValid}
            >
              Рассчитать
            </button>
            <button
              className="form__btn form__btn_clear"
              onClick={handleClear}
            >
              Очистить поля
            </button>
          </div>
        </div>

        {/* Result Block */}
        <div className={`counter-result ${showResult ? 'counter-result_active' : ''}`}>
          <h2 className="result__title">📊 Результаты расчета</h2>
          
          <div className="result__item">
            <div className="result__label">
              Суточная норма для поддержания функционирования
            </div>
            <div className="result__value">
              {resultBMR} <span className="result__unit">ккал</span>
            </div>
          </div>

          <div className="result__item">
            <div className="result__label">
              Суточная норма для поддержания веса
            </div>
            <div className="result__value">
              {resultTDEE} <span className="result__unit">ккал</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
