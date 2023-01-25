import { showCars } from "./UI"
import { generateCar } from "./utils"
import { showCar } from "./UI"
const base = 'http://127.0.0.1:3000'
const garage = `${base}/garage`
const engine = `${base}/engine`
const winners  = `${base}/winners`


export const getCars = async (page = 1,limit = 7) =>{
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`)
  return {
    items:await response.json(),
    count:response.headers.get('X-Total-count')
  };
}
export const getPage = async (id) => await document.querySelector('.page_text').innerHTML.slice(-2)

export const getCar = async(id) =>(await fetch(`${garage}/${id}`)).json();

export const getWinners = async() =>{
  const response = (await fetch(`${winners}`)).json()
  let res
  for(let el of await response){
  res = await getCar(el.id)
  }
  return {
    name:res.name,
    id:res.id,
    color:res.color,
  }
}

export const createCar = async(res) => {
  const name = document.querySelector('#create-name')
  const color = document.querySelector('#create-color')
  let results = {
    name:name.value,
    color:color.value
  }
  let response = await fetch('http://127.0.0.1:3000/garage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(results)
  });
  name.value = "";
  color.value = "#FFFFFF";
  await showCars()
}

document.addEventListener('click',async (e)=>{
  if(e.target.className == 'select'){
    selectCar(e)
  }
  if(e.target.className == 'remove'){
    removeCar(e)
  }
})


export const selectCar = async(e) =>{
  const name = document.querySelector('#update-name')
  const color = document.querySelector('#update-color')
  let id = e.target.id;
  name.className = e.target.id;
  let res = await getCar(id)
  name.value = res.name;
  color.value = res.color;
}


export const removeCar = async(e) =>{
  let id = e.target.id;
  let response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
    method: 'DELETE',
  });
  await showCars()
}


export const updateCar = async() =>{
  const name = document.querySelector('#update-name')
  const color = document.querySelector('#update-color')
  let res = {
    name:name.value,
    color:color.value
  }
  let response = await fetch(`http://127.0.0.1:3000/garage/${name.className}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(res)
  });
  name.value = "";
  color.value = "#FFFFFF";
  await showCars()
}

export const startEngine = async(id) =>{
  let response = await fetch(`${engine}?id=${id}&status=started`, {
    method: 'PATCH',
  });
  const data = await response.json()
  return data
}
export const drive = async(id) =>{
  let response = await fetch(`${engine}?id=${id}&status=drive`, {
    method: 'PATCH',
  });
  if(response.status == 500){
    return "stop"
  }
  const data = await response.json()
  return data
}
export const stopEngine = async(id) =>{
  let car = await getCar(id);
  let response = await fetch(`${engine}?id=${id}&status=stopped`, {
    method: 'PATCH',
  });
  const data = await response.json()
  return data
}

export const race = async (id) => {
  const {velocity,distance} = await startEngine(id)
  const run = drive(id)
  let status;
  run.then((data)=>status = data)
  const car = document.querySelector(`#car${id}`).children[1]
  let pos = 110
  let interval = setInterval(frame,(distance/velocity)/1000);
  let time1 = Date.now()
  let arrCar = []
  async function frame(){
    if(status == "stop"){
      return
    }
    if(pos > document.body.clientWidth - 280){
      clearInterval(interval)
      let time2 = Date.now()
      arrCar.push(id)
      console.log(arrCar);
    }
    else{
      pos+=2
      car.style.left = pos + "px"
    }
  }
}

export const resetRace = async (id) => {
  const {velocity,distance} = await stopEngine(id)
  const car = document.querySelector(`#car${id}`).children[1]
  let pos = 110
  car.style.left = pos + "px"
}

export const createWinner = async (id,time) =>{
  let results = {
    id:id,
    wins:1,
    time:time
  }
  let response = await fetch(`${winners}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(results)
  });
}

export const getWinner = async(id) =>(await fetch(`${winners}/${id}`)).json();

export const updateWinner = async(id,time) =>{
  let res = {
    win:1,
    time:time
  }
  let response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(res)
  });
}

export const becameWinner = async(id,time) =>{
  console.log("HERE");
  if (Object.keys(await getWinner(id)).length == 0) {
    createWinner(id,time)
  }
  else{
    updateWinner(id,(time))
  }
}