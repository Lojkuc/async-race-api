import { getCars, selectCar } from "./api"
export const renderBody = async (e) => {
  document.body.innerHTML = `
<div class = "pages">
  <button class="to-garage">TO GARAGE</button>
  <button class="to-winners">TO WINNERS</button>
</div>
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
<div class="garage">
</div>
`
}
export const showCar = async (name,color,id) => { 
  document.querySelector('.garage').innerHTML +=  `
<div class = "car-card">
  <div class="car-control">
    <button class="select" id="${id}">SELECT</button>
    <button class="remove" id="${id}">REMOVE</button>
    <span class="car-name">${name}</span>
  </div>
  <div class="car">
    <div class="block-engine">
        <button class="engine-work">A</button>
        <button class="engine-nowork">B</button>
    </div>
    <i class="fa-solid fa-car-side" style = "color:${color}"></i>

  </div>
    <div class="block-road">
      <hr class="road">
      <div class = "flag"></div>
    </div>
</div>
`
}
export const showCars = async() => {
  let res = await getCars()
  document.querySelector('.garage').innerHTML = '';
  for(let el of res.items){
    showCar(el.name,el.color,el.id)
  }
  const headerText = document.querySelector('.header_text');
  headerText.innerHTML = `Garage (${res.count})`
}