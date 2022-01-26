import Head from 'next/head'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { useEffect, useState } from "react";

function Chart({charts}) {
	const [chartOption, setchartOption] = useState("stat1")
	const [chartType, setchartType] = useState("line")
	const rowData = charts.map((chart) => chart[chartOption])
	const categoryData = charts.map((chart) => chart.name)

	const options = {
		title: {
		  text: ''
		},
		credits: false,
		series: [{
			type: chartType,
			name: chartOption,
			data: rowData || null,
		}],
		xAxis: {
			categories: categoryData || null,
		},
		plotOptions: {
			series: {
				color: chartOption === 'stat1' ? '#7300ad' : '#333'
			}
		},
	}
	
	const handleChartDataChange = (e) => { 
		setchartOption(e.target.value)
	}

	const handleChartTypeChange = (e) => { 
		setchartType(e.target.value)
	}

	return (
		<div className="bg-gray-100 h-screen flex flex-col justify-between">
			<Head>
				<title>Chart App</title>
			</Head>
			<main className="mb-4 p-6 font-light">
				<div className="sm:flex sm:justify-between">
					<h1 className="text-4xl mb-4 pr-4">Simple Chart</h1>
					<div className="mb-4 w-full sm:w-auto">
						<select 
							className="mr-2 py-2 px-6 rounded shadow w-full sm:w-auto mb-2 sm:mb-0"
							onChange={e => handleChartDataChange(e)}
							defaultValue="stat1"
						>
							<option value="stat1">Stat 1</option>
							<option value="stat2">Stat 2</option>
						</select>
						<select 
							className="py-2 px-6 rounded shadow w-full sm:w-auto"
							onChange={e => handleChartTypeChange(e)}
						>
							<option value="line">Line</option>
							<option value="bar">Bar</option>
						</select>
					</div>
				</div>
				<div className="charts-container bg-white rounded-xl p-4 shadow-lg ">
					<HighchartsReact
						highcharts={Highcharts}
						options={options}
					/>
				</div>
			</main>
			<footer className="px-2 mb-4 flex justify-center items-center font-light text-gray-400">
				<a className="flex p-1" href="https://github.com/jicant/chart-app">
					<svg className="mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm2.218 18.616c-.354.069-.468-.149-.468-.336v-1.921c0-.653-.229-1.079-.481-1.296 1.56-.173 3.198-.765 3.198-3.454 0-.765-.273-1.389-.721-1.879.072-.177.312-.889-.069-1.853 0 0-.587-.188-1.923.717-.561-.154-1.159-.231-1.754-.234-.595.003-1.193.08-1.753.235-1.337-.905-1.925-.717-1.925-.717-.379.964-.14 1.676-.067 1.852-.448.49-.722 1.114-.722 1.879 0 2.682 1.634 3.282 3.189 3.459-.2.175-.381.483-.444.936-.4.179-1.413.488-2.037-.582 0 0-.37-.672-1.073-.722 0 0-.683-.009-.048.426 0 0 .46.215.777 1.024 0 0 .405 1.25 2.353.826v1.303c0 .185-.113.402-.462.337-2.782-.925-4.788-3.549-4.788-6.641 0-3.867 3.135-7 7-7s7 3.133 7 7c0 3.091-2.003 5.715-4.782 6.641z"/></svg>
					jicant
				</a>
				 / 
				<a className="flex p-1" href="https://github.com/jen/chart-app">
					jencant
				</a>
			</footer>
		</div>
	)
}

export async function getStaticProps() {
	// Get the posts from backend on component render
	const res = await fetch(`https://chart.jencan.net/api/chart-data`, { method: 'GET'})
	const charts = await res.json()

	return {
		props: {
			charts,
		},
	}
}
  
export default Chart
