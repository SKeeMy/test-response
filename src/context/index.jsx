import { createContext, useState } from 'react'

export const appContext = createContext({})
export const AppContextProvider = ({ children }) => {
	const [isActiveMenu, setIsActiveMenu] = useState(false)
	const [isActiveBlackout, setIsActiveBlackout] = useState(false)

	return (
		<appContext.Provider
			value={{
				isActiveMenu,
				setIsActiveMenu,
				isActiveBlackout,
				setIsActiveBlackout,
			}}
		>
			{children}
		</appContext.Provider>
	)
}
