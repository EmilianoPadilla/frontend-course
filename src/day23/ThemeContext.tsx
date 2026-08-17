import { createContext, useContext, useState } from 'react'

type Theme = 'light' | 'dark' //A union type — Theme can only ever be the string 'light' or 'dark'

//Defines the shape of what the context will provide — a theme value and a function to toggle it.
interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

/* Creates the context object. The null default means "no value yet" — components will get null if they try to use the context outside of a Provider.
The <ThemeContextType | null> tells TypeScript what the context can contain */
const ThemeContext = createContext<ThemeContextType | null>(null)


/* This is the Provider component — it wraps parts of your app and makes the theme available to everything inside it. 
children is a special React prop that represents whatever is nested inside the component.
*/
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light') //The actual theme state — starts as 'light'. This lives inside the Provider so it's shared with all children.

  function toggleTheme() {
    setTheme((prev) => prev === 'light' ? 'dark' : 'light') //Toggles between light and dark    
  }

  //Renders the Provider with the current theme value and toggle function. Everything wrapped in {children} gets access to these values.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

//A custom hook that makes using the context cleaner. Instead of writing useContext(ThemeContext) everywhere, components just call useTheme().
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside ThemeProvider')
  return context
}


//We use named exports here because we're exporting TWO things from the same file. A file can only have one default export.