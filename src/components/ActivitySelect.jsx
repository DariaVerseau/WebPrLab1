import React from 'react';

function ActivitySelect({ value, onChange }) {
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

  return (
    <div className="form__group">
      <label className="form__label" htmlFor="activity">
        <span className="form__label__icon">🏃</span>
        Физическая активность
      </label>
      <select
        id="activity"
        className="form__select"
        value={value}
        onChange={onChange}
      >
        <option value="minimal">Минимальная (1.2)</option>
        <option value="low">Низкая (1.375)</option>
        <option value="medium">Средняя (1.55)</option>
        <option value="high">Высокая (1.7)</option>
        <option value="veryHigh">Очень высокая (1.9)</option>
      </select>
      <span className={getActivityBadgeClass(value)}>
        {getActivityLabel(value)}
      </span>
    </div>
  );
}

export default ActivitySelect;