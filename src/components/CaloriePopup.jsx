import React from 'react';

function CaloriePopup({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="calorie-popup">
      <span className="calorie-popup__icon">🍎</span>
      <span className="calorie-popup__text">
        1 яблоко ≈ 52 ккал
      </span>
      <button className="calorie-popup__close" onClick={onClose}>×</button>
    </div>
  );
}

export default CaloriePopup;