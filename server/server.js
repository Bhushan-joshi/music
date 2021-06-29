const express = require("express")
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser')
const lyricsFinder = require('lyrics-finder')
require('dotenv').config()

const app = express();
const PORT=process.env.PORT||3001

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/refresh", (req, res) => {
	const refreshToken = req.body.refreshToken
	const spotifyApi = new SpotifyWebApi({
		redirectUri: process.env.redirectUri,
		clientId: process.env.clientId,
		clientSecret: process.env.clientSecret,
		refreshToken,
	})

	spotifyApi
		.refreshAccessToken()
		.then(data => {
			res.json({
				accessToken: data.body.accessToken,
				expiresIn: data.body.expiresIn,
			})
		})
		.catch(err => {
			console.log(err)
			res.sendStatus(400)
		})
})
app.post('/login', (req, res) => {
	const code = req.body.code
	const spotifyApi = new SpotifyWebApi({
		redirectUri: process.env.redirectUri,
		clientId: process.env.clientId,
		clientSecret: process.env.clientSecret,
	})

	spotifyApi.authorizationCodeGrant(code).then(data => {
		res.json({
			accessToken: data.body.access_token,
			refreshToken: data.body.refresh_token,
			expiresIn: data.body.expires_in,
		})
	}).catch(err => {
		res.sendStatus(400);
	})
})


app.get("/lyrics", async (req, res) => {
	const lyrics =
		(await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
	res.json({ lyrics })
})


if (process.env.NODE_ENV === 'production') {
	app.use(express.static("client/build"));
}

app.listen(PORT, () => {
	console.log(`server started on ${PORT}`);
})