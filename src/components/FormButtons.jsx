import React from 'react';

function FormButtons({ onCalculate, onClear, isDisabled }) {
  return (
    <div className="form__buttons">
      <button
        className="form__btn form__btn_calculate"
        onClick={onCalculate}
        disabled={isDisabled}
      >
        <span className="form__btn__icon">🧮</span>
        Рассчитать
      </button>
      <button
        className="form__btn form__btn_clear"
        onClick={onClear}
      >
        <span className="form__btn__icon">🗑️</span>
        Очистить
      </button>
    </div>
  );
}

export default FormButtons;