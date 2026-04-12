export const validateAge = (value) => {
  if (value === '' || value === null) 
    return { valid: false, error: 'Возраст не должен быть пустым' };
  const num = Number(value);
  if (num < 0) 
    return { valid: false, error: 'Возраст не может быть меньше 0' };
  if (num > 150) 
    return { valid: false, error: 'Возраст не может быть больше 150' };
  return { valid: true, error: '' };
};

export const validateHeight = (value) => {
  if (value === '' || value === null) 
    return { valid: false, error: 'Рост не должен быть пустым' };
  const num = Number(value);
  if (num < 0) 
    return { valid: false, error: 'Рост не может быть меньше 0' };
  return { valid: true, error: '' };
};

export const validateWeight = (value) => {
  if (value === '' || value === null) 
    return { valid: false, error: 'Вес не должен быть пустым' };
  const num = Number(value);
  if (num < 0) 
    return { valid: false, error: 'Вес не может быть меньше 0' };
  return { valid: true, error: '' };
};