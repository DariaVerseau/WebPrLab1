import React, { useState, useEffect, useCallback } from 'react';
import { FOOD_ITEMS } from '../utils/foodIcons';

function FallingFood() {
  const [foods, setFoods] = useState([]);

  const createFood = useCallback(() => {
    const randomFood = FOOD_ITEMS[Math.floor(Math.random() * FOOD_ITEMS.length)];
    const id = Date.now() + Math.random();
    const left = Math.random() * 100;
    const duration = 4 + Math.random() * 3;
    const size = 35 + Math.random() * 25;

    return { id, food: randomFood, left, duration, size };
  }, []);

  useEffect(() => {
  const initialFoods = Array.from({ length: 10 }, (_, index) => {
    const food = createFood();
    food.startY = -(index * 100);
    food.delay = index * 0.4;
    return food;
  });
  
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setFoods(initialFoods);

  const interval = setInterval(() => {
    const newFood = createFood();
    newFood.startY = -60;
    newFood.delay = 0;
    
    setFoods(prev => {
      const filtered = prev.filter(f => Date.now() - f.id < f.duration * 1000);
      return [...filtered, newFood].slice(-15);
    });
  }, 400);

  return () => clearInterval(interval);
}, [createFood]);

  return (
    <div className="falling-food-container">
      {foods.map((food) => {
        const FoodComponent = food.food.component;
        return (
          <div
            key={food.id}
            className="falling-food"
            style={{
              left: `${food.left}%`,
              width: `${food.size}px`,
              height: `${food.size}px`,
              animationDuration: `${food.duration}s`,
              animationDelay: food.delay ? `${food.delay}s` : '0s',
              top: food.startY ? `${food.startY}px` : '-60px'
            }}
          >
            <FoodComponent />
          </div>
        );
      })}
    </div>
  );
}

export default FallingFood;