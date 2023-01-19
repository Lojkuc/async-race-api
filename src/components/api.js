import { showCars } from "./UI"
import { generateCar } from "./utils"

const base = 'http://127.0.0.1:3000'
const garage = `${base}/garage`
const winners  = `${base}/winners`


export const getCars = async (page,limit = 7) =>{
  const response = await fetch(`${garage}?_page =${page}&_limit=${limit}`)
  return {
    items:await response.json(),
    count:response.headers.get('X-Total-count')
  };
}


export const getCar = async(id) =>(await fetch(`${garage}/${id}`)).json();

export const createCar = async(res) => {
  const name = document.querySelector('#create-name')
  const color = document.querySelector('#create-color')
  let resuls = {
    name:name.value,
    color:color.value
  }
  let response = await fetch('http://127.0.0.1:3000/garage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(resuls)
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


export const deleteCar = async(id,event) =>{
  console.log(event.target);
}


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