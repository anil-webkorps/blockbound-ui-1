import React, {createContext, useState} from 'react'
import axios from 'axios'

// const SERVER_API_LINK = "https://api.blockbound.co/api/"
const SERVER_API_LINK = "https://5cc6db7bb33a.ngrok.io/api/"


const FileContext = createContext(null);

function FileContextProvider(props) {
  
    const [configuration, setConfiguration] = useState({add_in_mail:false})
    const [loading, setLoading] = useState(false)
    const getCurrencies = async (currency) => {
        let usd_price = await axios.get(`https://v6.exchangerate-api.com/v6/3febe786b94688359979c7d6/pair/USD/`+currency,)
        console.log(usd_price)
        let gbp_price = await axios.get(`https://v6.exchangerate-api.com/v6/3febe786b94688359979c7d6/pair/GBP/`+currency,)
        setConfiguration({...configuration, currency_price:usd_price.data.conversion_rate, currency:currency, price:getPrice(configuration?.speed, usd_price.data.conversion_rate, gbp_price.data.conversion_rate), fee_price:gbp_price.data.conversion_rate})   
    }
    
    const getPrice = (i, currency_price=null, main_price=null) => {
        let total_price = 0;
        let price = 0;
        let price_list = 0
        if(currency_price)
        {
            price = currency_price
            price_list = configuration?.price_list ? (i == 1 
                ? configuration?.price_list['60']['total']['p2wpkh']['usd']
                : i == 2
                ? configuration?.price_list['360']['total']['p2wpkh']['usd']
                : i == 3
                && configuration?.price_list['1440']['total']['p2wpkh']['usd']
                ) :""
        }
        else{
            price = configuration?.currency_price
            price_list = configuration?.price_list ? (i == 1 
                ? configuration?.price_list['60']['total']['p2wpkh']['usd']
                : i == 2
                ? configuration?.price_list['360']['total']['p2wpkh']['usd']
                : i == 3
                && configuration?.price_list['1440']['total']['p2wpkh']['usd']
                ) :""
        }

      total_price = calculation(price, price_list, main_price).toFixed(2)
    return total_price
  }


  const calculation = (currency_price, price_list, main_price) => {
    let multiplication = currency_price * price_list
    let per = multiplication*(5/100)
    let total = multiplication+per+(main_price? (main_price*2) : (configuration?.fee_price*2))
    return (total)
  }

    const getPriceList = () => {
        let response = axios.get(`https://bitcoiner.live/api/fees/estimates/latest`,)
        response.then((result)=>{            
            let list = result?.data?.estimates
            setConfiguration({...configuration, price_list:list})
        })
    }

    const storeTokenDetail = async (token, currency, amount, description, hash, email, subscribed) => {
        try{
            let response = await axios.post(`${SERVER_API_LINK}paymentapi`,
            {
                "description": description, 
                "source": token.id,
                "currency": currency,
                "amount": amount,
                "hash": hash,
                "email": email,
                "subscribed": subscribed
            })
            console.log(response)
            return response.data
        } catch (e) {
            console.log(e.Error)
        }
    }

    const registerHash = async (hash) => {
        try{
            let response = await axios.post(`${SERVER_API_LINK}v1/register`,
            {
                d:hash
            })
            return response.data    
        } catch (e) {
            console.log(e.Error)
        }
    }

    const getStatus = async (hash) => {
        try{
            let response = await axios.get(`${SERVER_API_LINK}v1/status/${hash}`)
            return response.data  
        } catch (e) {
            console.log(e.Error)
        }  
    }

    const value = {
        configuration,
        setConfiguration,
        getCurrencies,
        getPriceList, 
        storeTokenDetail,
        registerHash,
        getStatus,
        getPrice,
        loading, 
        setLoading,
        calculation
    }
  
    return <FileContext.Provider value={value}>{props.children}</FileContext.Provider>
}
  
const FileContextConsumer = FileContext.Consumer
  
export { FileContext, FileContextProvider, FileContextConsumer }
