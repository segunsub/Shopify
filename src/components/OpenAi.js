import React,{useState,useEffect} from 'react'
import Input from './Input'
import Response from './Response';

/* openAi function rederes the input and response components
    and checks the localstorage if saved responses are stored in local storage */
function OpenAi() {
    const [response, setResponse] = useState([]);
    useEffect(() => {
        const responseStorage = localStorage.getItem('response')
        if(responseStorage) {
            setResponse(JSON.parse(responseStorage))
        }
    }, [])
  return (
    <div className='Page'>
        <h1>Fun With AI</h1>
        <Input setResponse={setResponse}/>
        <h3>Responses</h3>
        {response.map((res,i) => <Response response={res} key={i}/>)}
    </div>
  )
}

export default OpenAi