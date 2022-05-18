import React from 'react'

function Response({response}) {
  return (
      <div className='response' style={{ background: 'whitesmoke'}}>
          <div className='responseDiv'><h5>Prompt:</h5> <p>{response[0]}</p></div>
          <div className='responseDiv'><h5>Response:</h5> <p>{response[1]}</p></div>
        </div>
    
  )
}

export default Response