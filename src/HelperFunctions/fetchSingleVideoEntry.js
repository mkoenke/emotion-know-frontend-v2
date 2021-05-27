export default function fetchSingleVideoEntry (entryId){
  return fetch(`http://localhost:3000/video_entries/${entryId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify()
  })
  .then(resp => resp.json())
  .then(data => console.log(data))
}