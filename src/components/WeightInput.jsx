import React from 'react';

function WeightInput({ value, onChange, error }) {
  return (
    <div className="form__group">
      <label className="form__label" htmlFor="weight">
        <span className="form__label__icon">⚖️</span>
        Вес (кг)
      </label>
      <input
        type="number"
        id="weight"
        className={`form__control ${error ? 'form__control_error' : ''}`}
        value={value}
        onChange={onChange}
        placeholder="Введите вес"
        min="0"
      />
      {error && (
        <span className="form__error">
          ⚠️ {error}
        </span>
      )}
    </div>
  );
}

export default WeightInput;