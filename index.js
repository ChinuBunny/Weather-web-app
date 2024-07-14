//Initializing all elements constants
const temperatureField=document.querySelector('.weather1');
const cityField=document.querySelector('.weather2 p');
const dateField=document.querySelector('.weather2 span');
const emojiField=document.querySelector('.weather3 img');
const weatherField=document.querySelector('.weather3 span');
const searchField=document.querySelector('.searchField');
const form=document.querySelector('form');

let target='delhi';
let apikey='b3b69b5ee2ef4273a8490141230810';
//function to fetch data from weather API
const fetchData=async(target)=>{
    try{
        const url=`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${target}`;
    const response=await fetch(url);
    const data=await response.json();
    //destructure
    const {current:{
        temp_c,condition:{text,icon},},location:{name,localtime},}=data;
    //calling update function 
    updateDom(temp_c,name,localtime,icon,text);

    }
    catch(error){
        alert('Location not found');

    }
};

function updateDom(temp,city,time,emoji,text){
    const exactTime=time.split(" ")[1];
    const exactDate=time.split(" ")[0];
    const exactDay=new Date(exactDate).getDay();
    temperatureField.innerText=temp;
    cityField.innerText=city;
    
    dateField.innerText=`${exactTime}-${getDayFullName(exactDay)}-${exactDate}`
    emojiField.src=emoji;
    weatherField.innerText=text; 
}
fetchData(target);


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    target=searchField.value;
    fetchData(target);
});

function getDayFullName(num){
    switch(num){
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Don't Know"
    }
}

