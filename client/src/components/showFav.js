import React from 'react'

export default function showFav({ track,chooseTrack }) {
	function handlePlay() {
		chooseTrack(track)
	  }

  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
	  onClick={handlePlay}
    key={track.id}
    >
      <img src={track.albumUrl} style={{ height: "50px", width: "50px", borderRadius:'50%' }} className="mr-3" alt={track.title} />
      <div className="ml-3" style={{marginLeft:"10px"}}>
        <div style={{color:'whitesmoke'}}>{track.title}</div>
      </div>
    </div>
  )
}
