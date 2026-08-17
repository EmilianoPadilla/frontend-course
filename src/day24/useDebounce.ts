import { useState, useEffect } from 'react'
//Imports two hooks — useState to store the debounced value and useEffect to set up the timer!


/* Defines the custom hook. 4 things here:
- <T> — a TypeScript generic. Means this hook works with ANY type — string, number, object. Whatever type you pass in, you get back the same type.
- value: T — the value to debounce, could be any type
- delay: number — how many milliseconds to wait before updating
- : T — the return type, same type as the input                         */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value) //Creates a state variable called debouncedValue that starts as value, and gives a function called setDebouncedValue to update it later
  

  //Runs after every render where value or delay changed — which is exactly when we need to reset the timer.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)  //Sets a timer. After delay milliseconds, updates debouncedValue with the current value.
    }, delay) 

    return () => clearTimeout(timer) //Cleans up the timer if value or delay changes before the timer finishes. This prevents multiple timers from running at once and ensures only the latest value is used.
  }, [value, delay]) //The effect depends on value and delay, so it runs whenever either changes.

  return debouncedValue //Returns the debounced value to whatever component called this hook.
}

export default useDebounce 

/*
The complete flow:
User types "interstellar" quickly:
→ each keystroke updates value
→ useEffect fires, cancels previous timer, starts new one
→ user stops typing
→ 500ms passes with no new keystrokes
→ timer fires → setDebouncedValue("interstellar")
→ component using useDebounce re-renders with new debouncedValue
→ API call happens with "interstellar"
*/