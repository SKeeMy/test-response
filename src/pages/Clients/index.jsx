import { useState, useContext, useEffect } from 'react'

import ClientsAddForm from '../../components/ClientsAddForm'
import ClientsHeader from '../../components/ClientsHeader'
import ClientsPopup from '../../components/ClientsPopup'
import Client from '../../components/Client'

import useBlackout from '../../hooks/useBlackout'
import { appContext } from '../../context'

import './styles.scss'

export default function Clients() {
	const { setIsActiveMenu } = useContext(appContext)
	const [isAddFormVisible, setIsAddFormVisible] = useState(false)
	const [isPopupVisible, setIsPopupVisible] = useState(false)
	const [clients, setClients] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [limit, setLimit] = useState(10)

	useBlackout([isAddFormVisible, isPopupVisible])
	useEffect(() => {
		const fetchPasteData = async () => {
			try {
				//не понимаю, апи не настроен на вывод фильтрации, могу на фронте конечно это сделать
				const response = await fetch(
					`/raw/EEheJFna?page=${currentPage}&limit=${limit}`
				)
				const data = await response.json()
				setClients(data)
			} catch (error) {
				console.error('Error fetching paste data:', error)
			}
		}

		fetchPasteData()
	}, [currentPage, limit])

	const handlePageChange = page => {
		setCurrentPage(page)
	}

	const handleLimitChange = event => {
		setLimit(event.target.value)
		setCurrentPage(1)
	}
	const handlePageArrow = type => {
		if (type === 'prev') {
			setCurrentPage(currentPage - 1)
		}
		if (type === 'next') {
			setCurrentPage(currentPage + 1)
		}
	}

	const buttons = Array(clients?.data?.QuantityPages) // можно поменять значение для теста запроса тк сейчас одна кнопка
		.fill(0)
		.map((_, i) => (
			<button onClick={() => handlePageChange(i + 1)} key={i}>
				{i + 1}
			</button>
		))

	return (
		<>
			<ClientsHeader
				setIsPopup={setIsAddFormVisible}
				setIsVisible={setIsActiveMenu}
			/>
			<div className='clients'>
				<div className='clients__container scrollbar'>
					<div className='clients__table'>
						<div className='clients__table-row'>
							<span className='clients__table-header'>
								Клиент
								<svg className='clients__table-icon' height='14' width='9'>
									<use xlinkHref='/src/assets/icons/Clients_Sprite.svg#icon-clients-sorting' />
								</svg>
							</span>
							<span className='clients__table-header'>Визиты</span>
							<span className='clients__table-header'>Оплачено</span>
							<span className='clients__table-header'>Средний чек</span>
							<span className='clients__table-header'>Последний визит</span>
							<span className='clients__table-header'>День рождения</span>
						</div>
						{clients?.data?.Clients.map((client, index) => (
							<Client
								surname={client.surname}
								key={client.clientid}
								checkMore={() => setIsPopupVisible(prev => !prev)}
								src='client-1.png'
								name={client.name}
								phone={client.phone}
								visits={client.visits}
								payed={client.Info.Stats[0].Passed}
								averageCheck={client.Info.Stats[0].AverageCheck}
								lastVisit={client.Info.Visits[0].Date}
								date={client.dateofbirth}
							/>
						))}
					</div>
				</div>
				<div className='clients__pagination'>
					<button
						style={currentPage === 1 ? { display: 'none' } : {}}
						onClick={() => handlePageArrow('prev')}
						className='clients__pagination-arrow left'
					>
						<svg className='clients__pagination-icon' height='17' width='17'>
							<use xlinkHref='/src/assets/icons/Clients_Sprite.svg#icon-clients-arrow-left' />
						</svg>
					</button>
					{buttons}

					<button
						style={
							currentPage === clients?.data?.QuantityPages
								? { display: 'none' }
								: {}
						}
						onClick={() => handlePageArrow('next')}
						className='clients__pagination-arrow right'
					>
						<svg className='clients__pagination-icon' height='17' width='17'>
							<use xlinkHref='/src/assets/icons/Clients_Sprite.svg#icon-clients-arrow-right' />
						</svg>
					</button>
					<div>
						<label style={{ color: 'black' }}>
							Limit:
							<input
								type='number'
								value={limit}
								onChange={handleLimitChange}
								min='1'
								max='100'
							/>
						</label>
					</div>
				</div>
			</div>
			<button
				onClick={() => setIsAddFormVisible(prev => !prev)}
				className='clients__add'
			>
				<svg className='clients__add-icon' height='24' width='24'>
					<use xlinkHref='/src/assets/icons/Header_Sprite.svg#icon-header-add' />
				</svg>
				Добавить клиента
			</button>

			<ClientsAddForm
				isVisible={isAddFormVisible}
				setIsVisible={setIsAddFormVisible}
			/>
			<ClientsPopup
				isVisible={isPopupVisible}
				setIsVisible={setIsPopupVisible}
			/>
		</>
	)
}
