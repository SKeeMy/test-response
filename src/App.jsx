import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import Clients from './pages/Clients'
function App() {
	// const [pasteData, setPasteData] = useState(null)
	// const apiKey = '6a8I2Yli1x28DczNLs3Sxmo8Y7NhDjh9'
	// useEffect(() => {
	// 	const fetchPasteData = async () => {
	// 		try {
	// 			const response = await fetch(`/raw/EEheJFna`, {
	// 				method: 'get',
	// 				headers: {
	// 					'Content-Type': 'application/x-www-form-urlencoded',
	// 				},
	// 			})
	// 			const data = await response.json()
	// 			setPasteData(data)
	// 		} catch (error) {
	// 			console.error('Error fetching paste data:', error)
	// 		}
	// 	}

	// 	fetchPasteData()
	// }, [])
	return <Clients />
}

export default App
