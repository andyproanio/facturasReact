import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { OrbitProgress } from 'react-loading-indicators';

const Home = (props) => {
  const [activo, setactivo] = useState(false)
  localStorage.clear()

  const handleInput = (e) => {
    props.setfile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setactivo(true)
    const formData = new FormData();
    formData.append('archivo', props.file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    await props.axios.post('https://facturasdrf.onrender.com/api/SubirComprobantes/', formData, config)
      .then(response => alert(response.data))
      .catch(err => console.log(err))
    window.location.replace('');
  }

  return (
    <div className='container'>
      <br></br>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleFile">
            Archivo de comprobantes decargado del SRI
          </Label>
          <Input onChange={handleInput}
            id="exampleFile"
            name="file"
            type="file"
          />
          {activo ? <OrbitProgress color="#4431cc" size="medium" text="" textColor="" /> : null}
        </FormGroup>
        <Button>
          Enviar
        </Button>
      </Form>
    </div>
  )
}

export default Home;