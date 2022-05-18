import React,{useState,useEffect,useRef} from 'react'
import { Form,FloatingLabel,Button } from 'react-bootstrap';
// import Key from '../secret/Key'

function Input({setResponse}) {
    //for accessing the input field
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    //input search value state
    const [value, setValue] = useState('');
    //loading state to show user that the app is loading
    const [loading, setLoading] = useState(false);
    /*fetchApi function to fetch data from api and update loading state
    also update the local storage with the response */
    console.log(process.env.Key,'why is it not working')
    useEffect(() => {
        if (isEditing ) {
          editFieldRef.current.focus();
        } else if (isEditing && value.length){
          editButtonRef.current.focus();
        }
      }, [isEditing,value]);
    const fetchApi = () => {
        setLoading(true);
        const data = {
            prompt: value,
            temperature: 0.5,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
           };
            
           fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              //Key is imported from secret/Key.js and process key is on heroku
              Authorization: `Bearer ${process.env.Key}`,
            },
            body: JSON.stringify(data),
           }).then(response => {
               return response.json();
              }).then(data => {
                setResponse(prev => {
                    const response = [[value,data.choices[0].text],...prev]
                    localStorage.setItem('response', JSON.stringify(response));
                    return response
                });
                setLoading(false);
                setValue('');
              })
    }
  return (
    <>
        <FloatingLabel controlId="floatingTextarea" label="Enter Prompt" className="mb-3" style={{ width: '80%' }}>
            <Form.Control as="textarea" 
            placeholder="Leave a comment here" 
            style={{ height: '150px', marginBottom: '3px' }}
            value={value}
            ref={editFieldRef}
            onMouseOut={e => setIsEditing(false)}
            onChange={(e) => {setValue(e.target.value);setIsEditing(true)}}/>
            <Button variant="primary" type="submit" ref={editButtonRef} onClick={fetchApi}>{loading ? 'Loading...' : 'Submit'}</Button>
        </FloatingLabel>
    </>
  )
}

export default Input