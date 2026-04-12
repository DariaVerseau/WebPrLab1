function AgeInput({ value, onChange, error }) {
  return (
    <div className="form__group">
      <label className="form__label" htmlFor="age">
        <span className="form__label__icon">🎂</span>
        Возраст (лет)
      </label>
      <input
        type="number"
        id="age"
        className={`form__control ${error ? 'form__control_error' : ''}`}
        value={value}
        onChange={onChange}
        placeholder="Введите возраст"
      />
      {error && <span className="form__error">⚠️ {error}</span>}
    </div>
  );
}

export default AgeInput;