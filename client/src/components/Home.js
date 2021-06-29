import useAuth from "./useAuth"
import { Container, Form, Row, Col, Image, Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./player";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
	clientId: 'e89c6e04e8fe4941a89caa7343cc50bb'
})


const Home = ({ code }) => {
	const accessToken = useAuth(code);
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [playingTrack, setPlayingTrack] = useState();
	const [lyrics, setLyrics] = useState('');
	const [showLyrics, setShowLyrics] = useState(false)
	const [trackImage, setTrackImage] = useState();


	const selectTrack = (track) => {
		setPlayingTrack(track)
		setSearch('')
		setLyrics("")
	}

	useEffect(() => {
		if (!playingTrack) return

		axios
			.get(`http://localhost:${process.env.PORT || 3001}/lyrics`, {
				params: {
					track: playingTrack.title,
					artist: playingTrack.artist,
				},
			})
			.then(res => {
				setLyrics(res.data.lyrics)
			})
	}, [playingTrack])

	useEffect(() => {
		if (!accessToken) return
		spotifyApi.setAccessToken(accessToken)
	}, [accessToken])


	useEffect(() => {
		if (!search) return setSearchResults([])
		if (!accessToken) return
		let cancle = false
		spotifyApi.searchTracks(search).then(res => {
			if (cancle) return
			setSearchResults(res.body.tracks.items.map(track => {
				const smallestAlbumImage = track.album.images.reduce(
					(smallest, image) => {
						if (image.height < smallest.height) return image
						return smallest
					},
					track.album.images[0]
				)
				const largestAlbumImage = track.album.images.reduce(
					(largest, image) => {
						if (image.height > largest.height) return image
						return largest
					},
					track.album.images[0]
				)

				return {
					artist: track.artists[0].name,
					title: track.name,
					uri: track.uri,
					albumUrl: smallestAlbumImage.url,
					lrgAlbumUrl: largestAlbumImage.url,
				}
			})
			)
		})
		return () => cancle = true
	}, [search, accessToken])

	useEffect(() => {
		if (!playingTrack) return
		setTrackImage(playingTrack.lrgAlbumUrl)
	}, [playingTrack])


	const handleClose = () => setShowLyrics(false)
	const handleOpen = () => setShowLyrics(true)


	return <Container fluid="md" className="d-flex flex-column py-2" style={{ height: '100vh' }} >
		<Row>
			<Form.Control
				type="search"
				placeholder="Search Songs/Artists"
				value={search}
				size="md-3"
				onChange={e => setSearch(e.target.value)} />
		</Row>
		<Container>
			<Row>
				<Col>
					<div className="flex-grow-1 my-2" style={{ color: 'white' }} >
						{searchResults.map(track => (
							<TrackSearchResult track={track} id={track.uri} chooseTrack={selectTrack} />
						))}
						{playingTrack && (
							trackImage ? <Container className="Track_image">
								<Image className='img' src={trackImage} roundedCircle />
							</Container> : null
						)}
						{playingTrack && (
							<div style={{ display: 'flex', justifyContent: 'center',marginTop:'15px' }}>
								<Button variant="primary" onClick={handleOpen}>Show Lyrics</Button>
							</div>
						)}
						{
							<Modal show={showLyrics} onHide={handleClose}  size="lg"
							aria-labelledby="contained-modal-title-vcenter"
							centered >
								{searchResults.length === 0 && (
								<div className="text-center" style={{ whiteSpace: "pre", color: 'black', }}>
									{lyrics}
								</div>
								)}
							</Modal>
						}
					</div>
				</Col>
			</Row>
		</Container>
		<Container style={{ position: "fixed", bottom: '0' }}>
			<Row>
				<Col >
					<Player accessToken={accessToken} trackUri={playingTrack?.uri} />
				</Col>
			</Row>
		</Container>
	</Container>
}

export default Home