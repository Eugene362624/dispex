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
import { getFlatsInHouse } from './actions/houseActions';
import { addClientAction, deleteClientAction } from './actions/clientActions';

function App() {
  // const [housesLoading, setHousesLoading] = useState(false)
  // const [street, setStreet] = useState([])
  // const [flatsLoading, setFlatsLoading] = useState(true)
  const [isClicked, setIsClicked] = useState({ id: '', ckecked: false })
  // const [flats, setFlats] = useState([])
  // const [noData, setNoData] = useState(false)

  const getCompanies = useSelector(state => state.getCompanies)
  const { MC, error, loading } = getCompanies

  const getCompany = useSelector(state => state.getCompany)
  const { companyStreets, companyError, companyLoading, noData, selectedCompany } = getCompany
  
  const getHouse = useSelector(state => state.getHouse)
  const {flats, flatsLoading, flatsError} = getHouse

  const addClient = useSelector(state => state.addClient)
  const {clientAddError, clientAddLoading} = addClient

  const deleteClient = useSelector(state => state.deleteClient)
  const {clientDeleteError, clientDeleteLoading} = deleteClient

  const getStreet = useSelector(state => state.getStreet)
  const {houses, streetError, streetLoading} = getStreet

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getListOfCompanies())
  }, [])

  const selectMCHandler = (e) => {
    dispatch(getCompanyClients(e))
  }

  const selectStreetHandler = (id, name) => {
    dispatch(getHousesOnStreet(id, name))
  }


  const selectHouseHandler = (id) => {
    dispatch(getFlatsInHouse(id))
  }

  const clientClickHandler = (id) => {
    setIsClicked({ id: id, clicked: !isClicked.checked })
  }

  const deleteClientHandler = (id) => {
    dispatch(deleteClientAction(id))
  }

  const addClientHandler = () => {
    let newUser = prompt('Добавить нового пользователя', "Введите имя, телефон, почту через запятую как в примере")
    if (newUser) {
      newUser = newUser.split(',')
    }
    if (newUser && newUser.length == 3) {
      dispatch(addClientAction(newUser[0], newUser[1], newUser[2]))
    } else {
      alert('Неправильный формат данных или неполные данные')
    }
  }

  console.log(houses)

  return (
    <div className="App">

      {error ? 'Произошла ошибка...' :
      loading ?
        "Загрузка" :
        <ButtonGroup id="companies">{MC.map((e, i) => { return <Button data-id={e.id} onClick={() => selectMCHandler(e.id)} disabled={selectedCompany == e.id} key={i} >{e.name}</Button> })}</ButtonGroup>
      }
      <br></br>
      {
        companyLoading ? "Загрузка обслуживаемых улиц УК" : 
        companyStreets.map((street, i) => {
          return <Accordion key={i} >
            <AccordionSummary onClick={() => selectStreetHandler(street.id, street.name)}>Улица {street.name}</AccordionSummary>
            <AccordionDetails>
              {streetLoading && !houses.some(el => houses.streetName == el.streetName)? "Загрузка домов на данной улице" : 
                houses.map((housesGroup, i) => {
                  return housesGroup.map((house, i) => {
                    return house.streetName !== street.name ? "" : 
                    <Accordion key={i} >
                      <AccordionSummary onClick={(e) => e.target.classList.contains('Mui-expanded') ? '' : selectHouseHandler(house.id)}>Дом {house.building}</AccordionSummary>
                      <AccordionDetails>
                        {flatsLoading? "Загрузка квартир дома" : 
                          flats.map((flatsGroup, i) => {
                            return flatsGroup.map((flat, i) => {
                              return flat.houseId !== house.id ? '' : 
                              <Accordion key={i} id="cards">
                              <AccordionSummary>Квартира {flat.flat}</AccordionSummary>
                              <AccordionDetails>
                                <ButtonGroup>{flat.clients.map((e, i) => { return !(isClicked.id == e.id) ? 
                                  <Button onClick={() => clientClickHandler(e.id)}>{e.name}</Button> : 
                                  <ButtonGroup id="double"><Button onClick={() => deleteClientHandler(e.id)}>{!clientDeleteError ? (clientDeleteLoading ? "Удаляем..." : "Удалить") : 'Ошибка!'}</Button><Button onClick={() => setIsClicked({ id: '', isClicked: false })}>Назад</Button></ButtonGroup> })}
                                  <Button id="add" onClick={() => addClientHandler()}>{!clientAddError ? (clientAddLoading ? "Добавляем..." : <>Добавить жильца <AddIcon></AddIcon></>) : 'Ошибка!'}</Button>
                                </ButtonGroup>
                              </AccordionDetails>
                            </Accordion>
                            })
                          })
                        }
                      </AccordionDetails>
                    </Accordion>
                  })
                })
              }
            </AccordionDetails>
          </Accordion>
        })
      }
    </div>
  );
}

export default App;
