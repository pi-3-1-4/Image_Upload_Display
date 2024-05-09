import { useState } from 'react'
import axios from 'axios'

import './App.css'

function App() {
  const [file,setFile] = useState()
  const [uploadMessage,setUploadMessage] = useState('')
  const [getdata,setGetdata] = useState([])
  const handleFile =(e)=>{
    console.log(e)
    setFile(e.target.files[0])
    
  }
  async function handleFetch(){
    try{
      let res = await axios.get('http://127.0.0.1:3000/api/getImagesData')
      console.log(res.data)
      setGetdata(res.data)
      if(!res.data.length){
        setUploadMessage(`Couldn't find any files in DB`);
        setTimeout(() => {
          setUploadMessage('')
        }, 1500);
    }

    }catch(e){
      console.log(e)
    }
  }

  const handleUpload = () =>{
    const formData = new FormData();
    if(file){
      formData.append('file',file)
    axios.post('http://127.0.0.1:3000/api/uploads',formData)
    .then(res=>{
      if(res.status===201){
        setUploadMessage('Upload successful !')
        setTimeout(() => {
          setUploadMessage('')
        }, 1500);
      }
    })
    .catch(e=>console.log(e))
    }else{
      setUploadMessage('Please select a file')
      setTimeout(() => {
        setUploadMessage('')
      }, 1500);
    }
    
  }
  return(
    <>
    <div className='div1'>
    <h2>Welcome to Image Upload and Display</h2>
    <input type='file' name='file' onChange={handleFile}/>
    <button type='submit' onClick={handleUpload}>upload</button>
    <span>    </span>
    <button onClick={handleFetch}>Get Images</button>
    <h3>{uploadMessage}</h3>
    <br/>
    </div>
    {getdata.length?<div>
      <table>
      <tr>
        <th>File Name</th>
        <th>Size</th>
        <th>Upload Date</th>
        <th>Links</th>
      </tr>
      {getdata.map((e, key) => {
                    return (
                        <tr key={key}>
                            <td>{e.filename}</td>
                            <td>{e.size}</td>
                            <td>{e.uploadDate}</td>
                            <td ><a href={e.link} target="_blank"><img className='imagespace' href={e.link} target="_blank" src={e.link}/></a></td>
                            {/* <tr><a className='link' href={e.link} target="_blank">image link</a></tr> */}
                            
                        </tr>
                    )
                })}
                <></>
      
    </table>
    </div>:<></>}
    </>
  )
}

export default App
