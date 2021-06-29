import React from "react"

export default function TrackSearchResult({ track,chooseTrack }) {
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
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} className="mr-3" alt={track.title} />
      <div className="ml-3" style={{marginLeft:"20px"}}>
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  )
}