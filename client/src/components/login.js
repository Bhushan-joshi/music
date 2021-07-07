import React from "react"
import { Container,Image } from "react-bootstrap"
import img from '../assets/spotify.png'

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=e89c6e04e8fe4941a89caa7343cc50bb&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
        <span> </span><Image className="spotify_img" src={img} />
      </a>
    </Container>
  )
}