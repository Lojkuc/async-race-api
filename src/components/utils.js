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
  let arr = ["BMW","Volkswagen",'Opel',"Mazda","Nissan","Porche","Mersedes","Volvo","Tesla"]
  let arr2 = ["Mondeo","Model S","Passat","Astra","Logan","M3","200","Polo","RX7","Jetta"]
  return arr[Math.floor(Math.random() * arr.length)]+" "+arr2[Math.floor(Math.random() * arr2.length)]
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