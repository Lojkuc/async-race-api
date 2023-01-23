import './assets/styles/style.scss';
import { renderGarage,renderHeader } from './components/UI';
import { showCars } from './components/UI';
import { createCar } from './components/api';
import { updateCar } from './components/api';
import { generateCar } from './components/utils';

renderHeader()
renderGarage()
const createButton = document.querySelector('#create')
createButton.addEventListener('click',createCar)

const updateButton = document.querySelector('#update')
updateButton.addEventListener('click',updateCar)

const generateButton = document.querySelector('.generate-cars')
generateButton.addEventListener('click',async ()=>{
  await generateCar()
  showCars()
});





