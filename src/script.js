import './assets/styles/style.scss';
import { renderBody } from './components/UI';
import { showCars } from './components/UI';
import { createCar } from './components/api';
import { updateCar } from './components/api';
import { generateCar } from './components/utils';

renderBody()
showCars()

const createButton = document.querySelector('#create')
createButton.addEventListener('click',createCar)

const updateButton = document.querySelector('#update')
updateButton.addEventListener('click',updateCar)

const generateButton = document.querySelector('.generate-cars')
generateButton.addEventListener('click',async ()=>{
  await generateCar()
  await showCars()
});



