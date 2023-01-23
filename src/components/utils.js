import { showCars } from "./UI";
import { getCars } from "./api";

export const randomColor = () => {
  let r = Math.floor(Math.random() * (256)).toString(16);
  let g = Math.floor(Math.random() * (256)).toString(16);
  let b = Math.floor(Math.random() * (256)).toString(16);
  if(r.length == 1){
    r = r.repeat(2)
  }
  if(g.length == 1){
    g = g.repeat(2)
  }
  if(b.length == 1){
    b = b.repeat(2)
  }
  let color = '#' + r + g + b
  return color;
}


export const randomNameCar = () => {
  let arr = ['Автокам',
  'Бронто',
  'ГАЗ',
  'Ё-мобиль',
  'ЗАЗ',
  'ЗИЛ',
  'ЗиС',
  'ИЖ',
  'Канонир',
  'Комбат',
  'ЛуАЗ',
  'Москвич',
  'СМ',
  'ТагАЗ',
  'УАЗ',
  'Эксклюзив',
  'AC',
  'Acura',
  'Adler',
  'Alfa Romeo',
  'Alpina',
  'Alpine',
  'AM General',
  'AMC',
  'Ariel',
  'Aro',
  'Asia',
  'Aston Martin',
  'Audi',
  'Austin',
  'Autobianchi',
  'Bajaj',
  'Baltijas Dzips',
  'Batmobile',
  'Beijing',
  'Bentley',
  'Bertone',
  'Bilenkin',
  'Bitter',
  'BMW',
  'Borgward',
  'Brabus',
  'Bricklin',
  'Brilliance',
  'Bristol',
  'Bufori',
  'Bugatti',
  'Buick',
  'BYD',
  'Byvin',
  'Cadillac',
  'Callaway',
  'Carbodies',
  'Caterham',
  'Changan',
  'ChangFeng',
  'Chery',
  'Chevrolet',
  'Chrysler',
  'Citroen',
  'Cizeta',
  'Coggiola',
  'Dacia',
  'Dadi',
  'Daewoo2',
  'Daihatsu',
  'Daimler',
  'Datsun',
  'De Tomaso',
  'Delage',
  'DeLorean',
  'Derways',
  'DeSoto',
  'Dodge',
  'DongFeng',
  'Doninvest',
  'Donkervoort',
  'DS',
  'E-Car',
  'Eagle',
  'Eagle Cars',
  'Ecomotors',
  'Excalibur',
  'FAW',
  'Ferrari',
  'Fiat',
  'Fisker',
  'Ford',
  'Foton',
  'FSO',
  'Fuqi',
  'Geely',
  'Genesis',
  'Geo',
  'GMC',
  'Gonow',
  'Gordon',
  'Great Wall',
  'Hafei',
  'Haima',
  'Hanomag',
  'Haval',
  'Hawtai',
  'Hindustan',
  'Hispano-Suiza',
  'Holden',
  'Honda',
  'HuangHai',
  'Hudson',
  'Hummer',
  'Hyundai',
  'Infiniti',
  'Innocenti',
  'Invicta',
  'Iran Khodro',
  'Isdera',
  'Isuzu',
  'JAC',
  'Jaguar',
  'Jeep',
  'Jensen',
  'JMC',
  'Kia',
  'Koenigsegg',
  'KTM AG',
  'Lamborghini',
  'Lancia',
  'Land Rover',
  'Landwind',
  'Lexus',
  'Lifan',
  'Lincoln',
  'Lotus',
  'LTI',
  'Luxgen',
  'Mahindra',
  'Marcos',
  'Marlin',
  'Marussia',
  'Maruti',
  'Maserati',
  'Maybach',
  'Mazda',
  'McLare1',
  'Mega',
  'Mercedes-Benz',
  'Mercury',
  'Metrocab',
  'MG',
  'Microcar',
  'Minelli',
  'MINI',
  'Mitsubishi',
  'Mitsuoka',
  'Morgan',
  'Morris',
  'Nissan',
  'Noble',
  'Oldsmobile',
  'Opel',
  'Osca',
  'Packard',
  'Pagani',
  'Panoz',
  'Perodua',
  'Peugeot',
  'PGO',
  'Piaggio',
  'Plymouth',
  'Pontiac',
  'Porsche',
  'Premier',
  'Proton',
  'PUCH',
  'Puma',
  'Qoros',
  'Qvale',
  'Ravon',
  'Reliant',
  'Renaissance',
  'Renault',
  'Rezvani',
  'Rimac',
  'Rolls-Royce',
  'Ronart',
  'Rover',
  'Saab',
  'Saleen',
  'Santana',
  'Saturn',
  'Scion',
  'SEAT',
  'Shanghai Maple',
  'ShuangHuan',
  'Skoda',
  'Smart',
  'Soueast',
  'Spectre',
  'Spyker',
  'SsangYong',
  'Steyr',
  'Subaru',
  'Suzuki',
  'Talbot',
  'TATA',
  'Tatra',
  'Tazzari',
  'Tesla',
  'Think',
  'Tianma',
  'Tianye',
  'Tofas',
  'Toyota',
  'Trabant',
  'Tramontana',
  'Triumph',
  'TVR',
  'Ultima',
  'Vauxhall',
  'Vector',
  'Venturi',
  'Volkswagen',
  'Volvo',
  'Vortex',
  'W.Motors',
  'Wanderer',
  'Wartburg',
  'Westfield',
  'Wiesmann',
  'Willys',
  'Xin Kai',
  'Zastava',
  'Zenos',
  'Zenvo',
  'Zibar',
  'Zotye',
  'ZX']

  return arr[Math.floor(Math.random() * arr.length)]
}

export const generateCar = async () => {
  let res = []
  let count = 0;
  while(count<100){
    res.push({
      name:randomNameCar(),
      color:randomColor(),
    })
    count++
  }
  let response;
  let arr = [];
  for(let el of res){
    response = fetch('http://127.0.0.1:3000/garage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(el)
    });
    arr.push(response)
  }
  await Promise.all(arr)
}


export const changePage = async () => {
const pageNumber = document.querySelector('.page_text')
const nextPage = document.querySelector('.next-page')
const prevPage = document.querySelector('.prev-page')
let page = 1;
nextPage.onclick = async function() {
  let res = await getCars(++page)
  if(res.items.length>0){
    page
    pageNumber.innerHTML = `Page № ${page}`
    showCars(page);
  }
}
prevPage.onclick = async function() {
  if(page>1){
  --page
  }
  let res = await getCars(page)
  pageNumber.innerHTML = `Page № ${page}`
  console.log(page);
  showCars(page);
}
}