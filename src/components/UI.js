import { createEngine, getCars, race, resetRace, selectCar } from "./api"
import { changePage } from "./utils";
import { getWinners } from "./api";
import { getPage } from "./api";
import { startEngine,stopEngine } from "./api";
export const renderHeader = async (e) => {
  document.body.innerHTML = `
  <div class = "pages">
    <button class="to-garage">TO GARAGE</button>
    <button class="to-winners">TO WINNERS</button>
  </div>
  <div class = "content"></div>
  `
  document.querySelector('.to-garage').addEventListener('click',renderGarage);
  document.querySelector('.to-winners').addEventListener('click',renderWinners);
  
}
export const renderWinners = async (e) => {
  document.querySelector('.content').innerHTML = `
  <h2 class="header_text">Winners</h2>
  <div class="block-page">
    <h2 class = "page_text">Page № 1</h2>
    <button class="prev-page">PREV</button>
    <button class="next-page">NEXT</button>
  </div>
  <div class="list">
    <div class="list-number-car-block">
      <h1 class="list-number-car-block__text">Number</h1>
      ${(await getWinners()).id}
    </div>
    <div class="list-img-car-block">
      <h1 class="list-img-car-block__text">Car</h1>
      <i class="fa-solid fa-car-side" style = "color:#FFFFFF"></i>   

    </div>
    <div class="list-name-car-block">
      <h1 class="list-name-car-block__text">Name</h1>
      ${await (await getWinners()).name}
    </div>
    <div class="list-count-win-block">
      <h1 class="list-count-win-block__text">Wins</h1>
    </div>
    <div class="list-best-time-block">
      <h1 class="list-best-time-block__text">Best Time</h1>
    </div>
  </div>
  `
  changePage()
}
export const renderGarage = async (e) => {
  document.querySelector('.content').innerHTML = `
<div class="block-cars">
  <div class="create-car for-input">
      <input type="text" name="" id="create-name">
      <input type="color" id = "create-color" value = "#ffffff">
      <button type="button" id= "create">CREATE</button>
  </div>
  <div class="update-cars for-input">
      <input type="text" name="" id="update-name">
      <input type="color" id="update-color" value = "#ffffff">
      <button type="button" id = "update">UPDATE</button>
  </div>
</div>
<div class="block-control">
<button class="race">RACE</button>
<button class="reset">RESET</button>
<button class="generate-cars">GENERATE CARS</button>
</div>
<h2 class="header_text"></h2>
<div class="block-page">
  <h2 class = "page_text">Page № 1</h2>
  <button class="prev-page">PREV</button>
  <button class="next-page">NEXT</button>
</div>

<div class="garage">
${showCars()}
</div>
`
await funcRace()
await funcStopRace()
changePage()
}
export const showCar = async (name,color,id) => { 
  document.querySelector('.garage').innerHTML +=  `
<div class = "car-card">
  <div class="car-control">
    <button class="select" id="${id}">SELECT</button>
    <button class="remove" id="${id}">REMOVE</button>
    <span class="car-name">${name}</span>
  </div>
  <div class="car" id = "car${id}">
    <div class="block-engine">
        <button class="engine-work" id = "${id}">A</button>
        <button class="engine-nowork" id = "${id}">B</button>
    </div>
    <i class="fa-solid fa-car-side" style = "color:${color}"></i>

  </div>
    <div class="block-road">
      <hr class="road">
      <div class = "flag"></div>
    </div>
</div>
`


const started = document.querySelectorAll('.engine-work');
started.forEach((el)=>el.addEventListener('click',async()=>{
  race(el.id)
}))
const stopped = document.querySelectorAll('.engine-nowork');
stopped.forEach((el)=>el.addEventListener('click',async()=>{
  resetRace(el.id)
}))
}
export const funcRace = async () =>{
  const raceAllBtn = document.querySelector('.race');
  raceAllBtn.addEventListener('click',async(e)=>{
    console.log("HERE");
    let page = await getPage()
    const arrId = (await getCars(page)).items
    for(let el of arrId){
      race(el.id)
    }
  })
}

export const funcStopRace = async () =>{
  const raceStopBtn = document.querySelector('.reset')
  raceStopBtn.addEventListener('click',async(e)=>{
    let page = await getPage()
    const arrId = (await getCars(page)).items
    for(let el of arrId){
      resetRace(el.id)
    }
  })
}


export const showCars = async(page) => {
  if(document.querySelector('.page_text')){
    page = document.querySelector('.page_text').innerHTML.slice(-2)
  }
  let res = await getCars(page)
  document.querySelector('.garage').innerHTML = '';
  for(let el of res.items){
      await showCar(el.name,el.color,el.id)
  }
  document.querySelector('.header_text').innerHTML = `Garage (${res.count})`;
}



