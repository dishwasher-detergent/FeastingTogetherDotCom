export default function handler(req, res) {
  let apiKey = req.body.apiKey


  fetch("https://api.yelp.com/v3/businesses/search?location=null&latitude=" + req.body.lat + "&longitude=" + req.body.lng + "&radius=20000&price="+req.body.price+"&open_now=1&limit=50", {
      method: 'GET',
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
      })
    }).then(res => res.json())
      .then(
        (result) =>
        {
          res.status(200).json(result)
        },
        (error) =>
        {
          res.status(200).json(error)
        }
      )

  
}
