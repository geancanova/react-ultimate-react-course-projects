import {
  getRemovedIngredientsById,
  removeOptionalIngredients,
} from './cartSlice';
import { useDispatch, useSelector } from 'react-redux';

function UpdateIngredients({
  ingredients,
  pizzaId,
  currentRemovedIngredients,
}) {
  const dispatch = useDispatch();

  function handleInputChange(e) {
    if (!e.currentTarget.checked) {
      dispatch(removeOptionalIngredients(pizzaId, e.target.value));
    }
  }

  return (
    <div className="pt-2">
      {ingredients.map((ingredient) => (
        <div className="mb-2 flex items-center gap-2" key={ingredient}>
          <input
            className="h-3 w-3 accent-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:ring-offset-1"
            type="checkbox"
            name={`${pizzaId}_ingredient`}
            id={`${pizzaId}_${ingredient}`}
            defaultChecked
            value={ingredient}
            onChange={handleInputChange}
          />
          <label className="font-medium" htmlFor={`${pizzaId}_${ingredient}`}>
            {ingredient}
          </label>
        </div>
      ))}
    </div>
  );
}

export default UpdateIngredients;
