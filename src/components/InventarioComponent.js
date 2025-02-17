import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { JsonToExcel } from 'react-json-to-excel';
import { useNavigate } from 'react-router-dom';

const Inventario = () => {
  const [mes, setmes] = useState(localStorage.getItem('mes') || "")
  const [anio, setanio] = useState(localStorage.getItem('anio') || "")
  const [inventario, setinventario] = useState(() => JSON.parse(localStorage.getItem('facturas')) || [])
  const pagina = parseInt(window.location.pathname.split("/").pop())
  const navigate = useNavigate()

  const handleInput = (e) => {
    localStorage.removeItem("mes")
    const mesElegido = e.target.value
    setmes(mesElegido)
    if (anio !== "")
      getData(mesElegido, anio)
  }

  const handleInput1 = (e) => {
    localStorage.removeItem("anio")
    const anioElegido = e.target.value
    setanio(anioElegido)
    if (mes !== "")
      getData(mes, anioElegido)
  }

  const getData = async (mesElegido, anioElegido) => {
    navigate("/inventario/" + pagina)
    let fechaElegida = ""
    if ((mesElegido !== "Enero" && anioElegido === "2024") || (mesElegido === "Enero" && anioElegido === "2025")) {
      fechaElegida = mesElegido.toLowerCase()
    }
    else
      fechaElegida = mesElegido.toLowerCase() + "_" + anioElegido
    const url = "https://facturasdrf.onrender.com/api/FiltrarInventario?mes=" + fechaElegida
    if (mesElegido !== "Seleccione" && anioElegido !== "Seleccione") {
      try {
        const response = await fetch(url)
        if (response.ok) {
          const facturas = await response.json()
          setinventario(facturas)
        }
        else {
          alert("No hay facturas para la fecha elegida")
          setinventario([])
        }
      } catch (error) {
        console.log(error)
      }
    }
    else
      setinventario([])
  }

  const changePage = () => {
    if (mes !== "" && anio !== "") {
      localStorage.setItem("mes", mes)
      localStorage.setItem("anio", anio)
    }
    localStorage.setItem("facturas", JSON.stringify(inventario))
  }

  const RenderCeldas = ({ i }) => {
    return (
      inventario.length > 0 ? <tr>
        <td>
          {inventario[(pagina - 1) * 10 + i].id}
        </td>
        <td>
          {inventario[(pagina - 1) * 10 + i].serie_comprobante}
        </td>
        <td>
          {inventario[(pagina - 1) * 10 + i].ruc_emisor}
        </td>
        <td>
          {inventario[(pagina - 1) * 10 + i].razon_social_emisor}
        </td>
        <td>
          {inventario[(pagina - 1) * 10 + i].fecha_emision}
        </td>
        <td>
          {inventario[(pagina - 1) * 10 + i].identificacion_receptor}
        </td>
        <td>
          {inventario[(pagina - 1) * 10 + i].subtotal_15}
        </td>
        <td>
          {inventario[(pagina - 1) * 10 + i].subtotal_0}
        </td>
        <td>
          {inventario[(pagina - 1) * 10 + i].iva}
        </td>
        <td>
          {inventario[(pagina - 1) * 10 + i].importe_total}
        </td>
      </tr> : null
    )
  }

  const celdas = Array.from({ length: 10 }, (_, i) => (
    <RenderCeldas i={i} />
  ))

  const celdasFaltantes = Array.from({ length: inventario.length % 10 }, (_, i) => (
    <RenderCeldas i={i} />
  ))

  const newLength = () => {
    if (inventario.length % 10 !== 0)
      return 1
    else
      return 0
  }

  const paginas = Array.from({ length: (inventario.length / 10 + newLength()) }, (_, i) => (
    i + 1 === pagina ? <PaginationItem active>
      <PaginationLink href={"/inventario/" + (i + 1)}>
        {i + 1}
      </PaginationLink>
    </PaginationItem> : <PaginationItem>
      <PaginationLink href={"/inventario/" + (i + 1)}>
        {i + 1}
      </PaginationLink>
    </PaginationItem>
  ))

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6'>
          <Form>
            <FormGroup>
              <Label for="exampleSelect" className='mt-3'>
                Escoja el mes
              </Label>
              {pagina === 1 ? <Input onChange={handleInput}
                id="exampleSelect"
                name="select"
                type="select"
                className='w-50'
                value={localStorage.getItem('mes')}
              >
                <option>
                  Seleccione
                </option>
                <option>
                  Enero
                </option>
                <option>
                  Febrero
                </option>
                <option>
                  Marzo
                </option>
                <option>
                  Abril
                </option>
                <option>
                  Mayo
                </option>
                <option>
                  Junio
                </option>
                <option>
                  Julio
                </option>
                <option>
                  Agosto
                </option>
                <option>
                  Septiembre
                </option>
                <option>
                  Octubre
                </option>
                <option>
                  Noviembre
                </option>
                <option>
                  Diciembre
                </option>
              </Input> : <Input disabled
                className='w-50'
                value={localStorage.getItem('mes')}
              ></Input>}
              <Label for="exampleSelect" className='mt-3'>
                Escoja el año
              </Label>
              {pagina === 1 ? <Input onChange={handleInput1}
                id="exampleSelect"
                name="select"
                type="select"
                className='w-50'
                value={localStorage.getItem('anio')}
              >
                <option>
                  Seleccione
                </option>
                <Options />
              </Input> : <Input disabled
                className='w-50'
                value={localStorage.getItem('anio')}
              ></Input>}
            </FormGroup>
          </Form>
        </div>
        {inventario.length > 0 ? <div className='col-6 mt-4'>
          <JsonToExcel
            title="Exportar a Excel"
            data={inventario}
            fileName={mes}
            btnClassName="custom-classname"
          />
        </div> : null}
      </div>
      <Table
        size="sm"
        striped
      >
        <thead>
          <tr>
            <th>
              id
            </th>
            <th>
              serie_comprobante
            </th>
            <th>
              ruc_emisor
            </th>
            <th>
              razon_social_emisor
            </th>
            <th>
              fecha_emision
            </th>
            <th>
              identificacion_receptor
            </th>
            <th>
              subtotal_15
            </th>
            <th>
              subtotal_0
            </th>
            <th>
              iva
            </th>
            <th>
              importe_total
            </th>
          </tr>
        </thead>
        {pagina <= (inventario.length / 10) ? <tbody>
          {celdas}
        </tbody> : <tbody>
          {celdasFaltantes}
        </tbody>}
      </Table>
      {inventario.length > 0 ? <Pagination onClick={changePage}
        aria-label="Page navigation example"
        size="sm"
      >
        <PaginationItem>
          <PaginationLink
            first
            href="/inventario/1"
          />
        </PaginationItem>
        {pagina - 1 > 0 ? <PaginationItem>
          <PaginationLink
            href={"/inventario/" + (pagina - 1)}
            previous
          />
        </PaginationItem> : <PaginationItem disabled>
          <PaginationLink
            previous
          />
        </PaginationItem>
        }
        {paginas}
        {pagina + 1 <= paginas.length ? <PaginationItem>
          <PaginationLink
            href={"/inventario/" + (pagina + 1)}
            next
          />
        </PaginationItem> : <PaginationItem disabled>
          <PaginationLink
            next
          />
        </PaginationItem>
        }
        <PaginationItem>
          <PaginationLink
            href={"/inventario/" + paginas.length}
            last
          />
        </PaginationItem>
      </Pagination> : null}
    </div>
  )
}

const Options = () => {

  let years = Array.from(new Array(16), (val, index) => index + 2024);
  return (
    years.map((year) => {
      return <option>{year}</option>
    }))
}

export default Inventario