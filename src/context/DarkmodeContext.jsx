import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
const DarkmodeContext = createContext();
function DarkmodeProvider({ children }) {
    const [isDarkmode, setIsDarkmode] = useLocalStorageState(false, "isDarkmode");
    useEffect(() => {
        if (isDarkmode) {
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.remove("light-mode");
        } else {
            document.documentElement.classList.add("light-mode");
            document.documentElement.classList.remove("dark-mode");
        }
    }, [isDarkmode]);
    function toggleDarkmode() {
        setIsDarkmode((isDark) => !isDark);
    }
    return (
        <DarkmodeContext.Provider value={{isDarkmode,toggleDarkmode}}>
            {children}
        </DarkmodeContext.Provider>
    )
}
function useDarkmode() {
    const context = useContext(DarkmodeContext);
    if (context === undefined) {
        throw new Error("useDarkmode must be used within a DarkmodeProvider");
    }
    return context;
}
export { DarkmodeProvider, useDarkmode };