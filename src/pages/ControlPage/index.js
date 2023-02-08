import './ControlStyle.scss'
import Header from '../../components/Header';
import React from 'react';

const Songs = (props) => {
	return (
		<tbody>
			<tr>
				<td>{props.artist}</td>
				<td>{props.title}</td>
				<td>{props.album}</td>
				<td>{props.length}</td>
				<td><button>lataa</button> <button>poista</button></td>
			</tr>
		</tbody>
	)
}


const ControlPage = () => {
	const songs = [
		{
			artist: 'Minä',
			title: 'Otsikko',
			album: 'Kokoelma',
			length: '6:60'
		},
		{
			artist: 'Sinä',
			title: 'Titteli',
			album: 'Bangeri',
			length: '4:20'

		},
		{
			artist: 'Yhä minä',
			title: 'Kovakoodattua kuraa',
			album: 'Joo totanoin',
			length: '6.69'
		}
	]
	return (
		<>
			<Header title='Hallintanäkymä' />
			<div className='ControlContent' >
				<p>Tervetuloa hallintanäkymään :P</p>
			</div>
			<div>
				<table>
					<tbody>
						<tr>
							<th>Artist</th>
							<th>Title</th>
							<th>Album</th>
							<th>length</th>
						</tr>
					</tbody>
					{songs.map(s => (
						<Songs
							key={s.title}
							artist={s.artist}
							title={s.title}
							album={s.album}
							length={s.length} />
					))}
				</table>
			</div>
		</>
	)
}

export default ControlPage;