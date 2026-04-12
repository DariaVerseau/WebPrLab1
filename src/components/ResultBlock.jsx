import React from 'react';
import { ACTIVITY_COEFFICIENTS } from '../utils/calculations';

function ResultBlock({ show, bmr, tdee, activityLevel }) {
  const getActivityLabel = (level) => {
    const labels = {
      minimal: 'Минимальная',
      low: 'Низкая',
      medium: 'Средняя',
      high: 'Высокая',
      veryHigh: 'Очень высокая'
    };
    return labels[level] || level;
  };

  const getActivityBadgeClass = (level) => {
    return `activity-badge activity-badge--${level}`;
  };

  if (!show) return null;

  return (
    <div className={`counter-result ${show ? 'counter-result_active' : ''}`}>
      <div className="success-checkmark">✓</div>
      <h2 className="result__title">
        <span className="result__title__icon">📊</span>
        Результаты расчета
      </h2>
      
      <div className="result__grid">
        <div className="result__item">
          <div className="result__label">
            Для поддержания функционирования
          </div>
          <div className="result__value result__value--animating">
            {bmr}
            <span className="result__unit">ккал</span>
          </div>
        </div>

        <div className="result__item result__item--highlight">
          <div className="result__label">
            Для поддержания веса
            <br />
            <small>(с учётом активности)</small>
          </div>
          <div className="result__value result__value--animating">
            {tdee}
            <span className="result__unit">ккал</span>
          </div>
          <span className={getActivityBadgeClass(activityLevel)}>
            {getActivityLabel(activityLevel)} × {ACTIVITY_COEFFICIENTS[activityLevel]}
          </span>
        </div>
      </div>

      <div className="result__info">
        <span className="result__info__icon">💡</span>
        Для похудения уменьшите суточную норму на 15-20%, 
        для набора массы — увеличьте на 10-15%
      </div>

      <div className="result__info" style={{ borderTop: 'none', paddingTop: '15px' }}>
        <span className="result__info__icon">🍕</span>
        Это примерно {Math.round(tdee / 285)} кусочков пиццы или 
        {Math.round(tdee / 198)} пончиков в день
      </div>
    </div>
  );
}

export default ResultBlock;