import { useEffect, useState } from "react";
import axios from 'axios';

export default function useAuth(code) {
	const [accessToken, setAccessToken] = useState()
	const [refreshToken, setRefreshToken] = useState()
	const [expiresIn, setExpiresIn] = useState()

	useEffect(() => {
		axios.post(`https://music-app-in.herokuapp.com/login`, {
			code:code,
		}).then(res => {
			setAccessToken(res.data.accessToken)
			setRefreshToken(res.data.refreshToken)
			setExpiresIn(res.data.expiresIn)
			window.history.pushState({}, null, "/")
		}).catch(err => {
			window.location = "/"
		})
	}, [code])
	useEffect(() => {
		if (!refreshToken || !expiresIn) return
		const interval = setInterval(() => {
			axios.post(`https://music-app-in.herokuapp.com/refresh`, {
				refreshToken,
			}).then(res => {
				console.log(res.data);
				setAccessToken(res.data.accessToken)
				setExpiresIn(res.data.expiresIn)
			}).catch(err => {
				window.location = "/"
			})
		}, (expiresIn - 60) * 1000)
		return () => clearTimeout(interval);

	}, [refreshToken, expiresIn])
	return accessToken;
}