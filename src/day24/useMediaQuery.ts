import { useState, useEffect } from 'react'

//Takes a CSS media query string like '(max-width: 768px)' and returns a boolean — true if the screen matches, false if not!
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(
    () => window.matchMedia(query).matches
  ) //Creates state with a lazy initializer — reads the current match status immediately when the hook first runs.

  //Creates a media query object to listen for changes. This is separate from the one in useState because we need to attach an event listener to it
  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    function handleChange(event: MediaQueryListEvent) {
      setMatches(event.matches)
    } //Called whenever the screen size changes and crosses the query threshold. event.matches is true if the query now matches, false if it doesn't

    mediaQuery.addEventListener('change', handleChange) //Tells the browser "call handleChange whenever this media query changes" — like when you resize the window from desktop to mobile size

    return () => mediaQuery.removeEventListener('change', handleChange) //Cleanup function — removes the event listener when the component unmounts. Without this, the listener would keep running even after the component is gone, causing memory leaks
  }, [query]) //Reruns the effect if the query string changes — though in practice the query rarely changes!

  return matches //Returns the boolean — true if screen matches the query, false if not
}

export default useMediaQuery


/* The complete flow:
Component mounts on desktop (1200px wide):
→ useState reads window.matchMedia('(max-width: 768px)').matches
→ matches = false (screen is wider than 768px)
→ useEffect sets up listener

User resizes window to 500px:
→ browser detects query now matches
→ handleChange fires with event.matches = true
→ setMatches(true) → component re-renders
→ matches = true → show mobile layout!

User resizes back to 1200px:
→ handleChange fires with event.matches = false
→ setMatches(false) → component re-renders
→ matches = false → show desktop layout! */