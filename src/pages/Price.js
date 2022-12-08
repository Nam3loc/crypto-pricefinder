import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Price (props) {
    const apiKey = '5B79C730-80AD-4EAF-ADEE-7BDD608C413B';
    
    // Grabbing the Currency symbol from the URL Params
    const { symbol } = useParams();
    // console.log(params.symbol);

     // Using the other two variables to create our URL
  const url = `http://rest-sandbox.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`;

  // State to hold the coin data
  const [coin, setCoin] = useState(null);

  // Function to fetch the coin data
  const getCoin = async () => {
    try {
        const respone = await fetch(url);
        const data = await respone.json();
        setCoin(data);
    } catch(err) {
        console.error(err);
    }
  }

  useEffect(() => {
    getCoin()
  },  [])

  // Loaded function for when data is fetched
  const loaded = () => {
    return (
        <div>
            <h1>
                {coin.asset_id_base}/{coin.asset_id_quote}
            </h1>
            <h2>
                {coin.rate}
            </h2>
        </div>
    )
  }

  // Function for when data doesn't exist
  const loading = () => {
    return (
        <h1>Loading...</h1>
    )
  }

    return (coin && coin.rate ? loaded() : loading());
  };