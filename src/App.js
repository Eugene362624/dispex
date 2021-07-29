import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AddIcon from '@material-ui/icons/Add';
import { baseUrl } from './config';
import './index.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyClients, getListOfCompanies } from './actions/comanyActions'
import { getHousesOnStreet } from './actions/streetAction';

function App() {
  // const [loading, setLoading] = useState(true) 
  const [housesLoading, setHousesLoading] = useState(true)
  // const [data, setData] = useState([])
  const [street, setStreet] = useState([])
  const [flatsLoading, setFlatsLoading] = useState(true)
  const [isClicked, setIsClicked] = useState({ id: '', ckecked: false })
  const [flats, setFlats] = useState([])
  // const [noData, setNoData] = useState(false)

  //management companies
  // const [MC, setMC] = useState([])
  // const [selectedMC, setSelectedMC] = useState('')

  const getCompanies = useSelector(state => state.getCompanies)
  const { MC, error, loading } = getCompanies

  const getCompany = useSelector(state => state.getCompany)
  const { data, companyError, companyLoading, noData, selectedCompany } = getCompany
  
  // const getStreet = useSelector(state => state.getStreet)
  // const {street, streetError, streetLoading} = getStreet

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getListOfCompanies())
  }, [])

  console.log(street)
  const selectMCHandler = (e) => {
    // setstreet([])
    setFlats([])
    // setNoData(true)
    // setSelectedMC(e)
    dispatch(getCompanyClients(e))
  }

  const selectStreetHandler = (id, name) => {
    setHousesLoading(true)
    axios.get(baseUrl + `/HousingStock?streetId=${id}`)
      .then(res => { return !street.some(e => e.streetName == name) ? (setStreet(street.concat({ streetName: name, flats: res.data })), setHousesLoading(false)) : '' })
      .catch(err => console.log(err.res))
    // dispatch(getHousesOnStreet(id, name))
  }


  const selectHouseHandler = (id) => {
    setFlatsLoading(true)
    axios.get(baseUrl + `/HousingStock?houseId=${id}`)
      .then(res => { return !flats.some(e => e.houseId == id) ? (setFlats(flats.concat({ houseId: id, flats: res.data })), setFlatsLoading(false)) : '' })
      .catch(err => console.log(err.res))
  }

  const clientClickHandler = (id) => {
    setIsClicked({ id: id, clicked: !isClicked.checked })
  }

  const deleteClientHandler = (id) => {
    axios.delete(baseUrl + `/HousingStock/bind_client/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  const addClientHandler = () => {
    let newUser = prompt('Добавить нового пользователя', "Введите имя, телефон, почту через запятую как в примере")
    newUser = newUser.split(',')
    console.log(newUser)
    if (newUser.length == 3) {
      axios.post(baseUrl + ` /HousingStock/client`, {
        Name: newUser[0],
        Phone: newUser[1],
        Email: newUser[2]
      })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    } else {
      alert('Неправильный формат данных или неполные данные')
    }
  }

  return (
    <div className="App">

      {/* {error ? 'Произошла ошибка...' : ""} */}
      {loading ?
        "Загрузка" :
        <ButtonGroup>{MC.map((e, i) => { return <Button data-id={e.id} onClick={() => selectMCHandler(e.id)} disabled={selectedCompany == e.id} key={i} >{e.name}</Button> })}</ButtonGroup>
      }
      {
        companyLoading ?
          "Загрузка..." :
          (!noData ?
            (<div className='street'>
              {
                data.map((e, i) => {
                  if (data[i + 1]) {
                    return (data[i].streetName == data[i + 1].streetName) ? null : <Accordion key={`${e.streetName}__${i}`} onClick={() => selectStreetHandler(e.streetId, e.streetName)}><AccordionSummary>Улица {e.streetName}</AccordionSummary>
                      <AccordionDetails>
                        {housesLoading && !street.some(el => e.streetName == el.streetName) ? "Загрузка..." : ''}
                        {
                          street.map((street, i) => {
                            return (street.streetName == e.streetName) ?
                              street.flats.map((flat, i) => street.flats[i + 1] ? (street.flats[i + 1].houseId == flat.houseId ? null : <Accordion onClick={() => selectHouseHandler(flat.houseId)} key={`${flat.houseId}__${i}`}><AccordionSummary>Дом {street.flats[i].houseId}</AccordionSummary><AccordionDetails>{flats.map((house, i) => {
                                return (house.houseId == flat.houseId) ?
                                  house.flats.map((flat, i) => <Accordion id="cards"><AccordionSummary>Квартира {flat.flat}</AccordionSummary><AccordionDetails><ButtonGroup>{flat.clients.map((e, i) => { return !(isClicked.id == e.id) ? <Button onClick={() => clientClickHandler(e.id)}>{e.name}</Button> : <ButtonGroup id="double"><Button onClick={() => deleteClientHandler(e.id)}>Удалить</Button><Button onClick={() => setIsClicked({ id: '', isClicked: false })}>Назад</Button></ButtonGroup> })}<Button id="add" onClick={() => addClientHandler()}>Добавить жильца <AddIcon></AddIcon></Button></ButtonGroup></AccordionDetails></Accordion>)
                                  : ''
                              })}</AccordionDetails></Accordion>) :
                                <Accordion onClick={() => selectHouseHandler(flat.houseId)} key={`${flat.houseId}__${i}`}><AccordionSummary>Дом {street.flats[i].houseId}</AccordionSummary><AccordionDetails>{flats.map((house, i) => {
                                  return (house.houseId == flat.houseId) ?
                                    house.flats.map((flat, i) => <Accordion id="cards"><AccordionSummary>Квартира {flat.flat}</AccordionSummary><AccordionDetails><ButtonGroup>{flat.clients.map((e, i) => { return !(isClicked.id == e.id) ? <Button onClick={() => clientClickHandler(e.id)}>{e.name}</Button> : <ButtonGroup id="double"><Button onClick={() => deleteClientHandler(e.id)}>Удалить</Button><Button onClick={() => setIsClicked({ id: '', isClicked: false })}>Назад</Button></ButtonGroup> })}<Button id="add" onClick={() => addClientHandler()}>Добавить жильца <AddIcon></AddIcon></Button></ButtonGroup></AccordionDetails></Accordion>)
                                    : ''
                                })}</AccordionDetails></Accordion>)
                              : ''
                          })
                        }
                      </AccordionDetails>
                    </Accordion>
                  }
                  else {
                    return (!data[i].streetName) ? null : <Accordion key={`${e.streetName}__${i}`} onClick={() => selectStreetHandler(e.streetId, e.streetName)}><AccordionSummary>Улица {e.streetName}</AccordionSummary>
                      <AccordionDetails>
                        {housesLoading && !street.some(el => e.streetName == el.streetName) ? "Загрузка..." : ''}
                        {
                          street.map((street, i) => {
                            return (street.streetName == e.streetName) ?
                              street.flats.map((flat, i) => street.flats[i + 1] ? (street.flats[i + 1].houseId == flat.houseId ? null : <Accordion onClick={() => selectHouseHandler(flat.houseId)} key={`${flat.houseId}__${i}`}><AccordionSummary>Дом {street.flats[i].houseId}</AccordionSummary><AccordionDetails>{flats.map((house, i) => {
                                return (house.houseId == flat.houseId) ?
                                  house.flats.map((flat, i) => <Accordion id="cards"><AccordionSummary>Квартира {flat.flat}</AccordionSummary><AccordionDetails><ButtonGroup>{flat.clients.map((e, i) => { return !(isClicked.id == e.id) ? <Button onClick={() => clientClickHandler(e.id)}>{e.name}</Button> : <ButtonGroup id="double"><Button onClick={() => deleteClientHandler(e.id)}>Удалить</Button><Button onClick={() => setIsClicked({ id: '', isClicked: false })}>Назад</Button></ButtonGroup> })}<Button id="add" onClick={() => addClientHandler()}>Добавить жильца <AddIcon></AddIcon></Button></ButtonGroup></AccordionDetails></Accordion>)
                                  : ''
                              })}</AccordionDetails></Accordion>) :
                                <Accordion onClick={() => selectHouseHandler(flat.houseId)} key={`${flat.houseId}__${i}`}><AccordionSummary>Дом {street.flats[i].houseId}</AccordionSummary><AccordionDetails>{flats.map((house, i) => {
                                  return (house.houseId == flat.houseId) ?
                                    house.flats.map((flat, i) => <Accordion id="cards"><AccordionSummary>Квартира {flat.flat}</AccordionSummary><AccordionDetails><ButtonGroup>{flat.clients.map((e, i) => { return !(isClicked.id == e.id) ? <Button onClick={() => clientClickHandler(e.id)}>{e.name}</Button> : <ButtonGroup id="double"><Button onClick={() => deleteClientHandler(e.id)}>Удалить</Button><Button onClick={() => setIsClicked({ id: '', isClicked: false })}>Назад</Button></ButtonGroup> })}<Button id="add" onClick={() => addClientHandler()}>Добавить жильца <AddIcon></AddIcon></Button></ButtonGroup></AccordionDetails></Accordion>)
                                    : ''
                                })}</AccordionDetails></Accordion>)
                              : ''
                          })
                        }
                      </AccordionDetails>
                    </Accordion>
                  }
                })
              }
            </div>)
            :
            "Нет информации")
      }


    </div>
  );
}

export default App;
