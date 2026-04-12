import React from 'react';

function HeightInput({ value, onChange, error }) {
  return (
    <div className="form__group">
      <label className="form__label" htmlFor="height">
        <span className="form__label__icon">📏</span>
        Рост (см)
      </label>
      <input
        type="number"
        id="height"
        className={`form__control ${error ? 'form__control_error' : ''}`}
        value={value}
        onChange={onChange}
        placeholder="Введите рост"
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

export default HeightInput;