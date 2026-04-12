function GenderSelect({ value, onChange }) {
  return (
    <div className="form__group">
      <label className="form__section-title">
        <span className="form__section-title__icon">👤</span>
        Выберите пол
      </label>
      <div className="form__radio-group">
        <label className="form__radio-label">
          <span className="form__radio-icon">👨</span>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={value === 'male'}
            onChange={onChange}
          />
          <span className="form__radio-text">Мужской</span>
        </label>
        <label className="form__radio-label">
          <span className="form__radio-icon">👩</span>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={value === 'female'}
            onChange={onChange}
          />
          <span className="form__radio-text">Женский</span>
        </label>
      </div>
    </div>
  );
}

export default GenderSelect;