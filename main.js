const wrapper=document.querySelector(".wrapper");
inputPart=wrapper.querySelector(".input-part");

infoTxt=inputPart.querySelector(".info-txt");
console.log(infoTxt);

inputField=inputPart.querySelector("input");
console.log(inputField)
locationBtn=inputPart.querySelector("button");
wIcon=document.querySelector("weather-part img");
console.log(wIcon);
arrowBack=wrapper.querySelector("header i")
let api;

inputField.addEventListener("keyup",e=>{
   if(e.key=="Enter" && inputField.value !=""){
    RequestApi(inputField.value); 
    console.log(inputField.value);
   } 
});
locationBtn.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError);

    }else{
      alert("your browser not support geolocation api");  
    }
});

function onSuccess(position){
    const {latitude,longitude}=position.coords;
    api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=ebcdc15c47dcb97a67313688b7359cc5`
    fetchData();
}

function onError(error){
    infoTxt.innerText=error.message;
     infoTxt.classList.add("pending");
    console.log(error);
}

function RequestApi(city){
     api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ebcdc15c47dcb97a67313688b7359cc5`;
     fetchData();
}

function fetchData(){
    infoTxt.innerText="getting weather details..."
     infoTxt.classList.add("pending");
     fetch(api).then(response=>response.json()).then(result=>weatherDetails(result));

}
function weatherDetails(info){
    infoTxt.classList.replace("pending","error");
    if(info.cod=="404"){
        infoTxt.innerText=`${inputField.value} is not a valid city name `;
    }else{
        const city=info.name;
        const country=info.sys.country;
        const {description,id}=info.weather[0];
        const {feel_like,humidity,temp}=info.main;

        


         wrapper.querySelector(".temp .numb").innerText=temp;
         wrapper.querySelector(".weather").innerText=description;
wrapper.querySelector(".location span").innerText=`${city},${country};`
         wrapper.querySelector(".temp .numb-2").innerText=feel_like;
         wrapper.querySelector(".humidity span").innerText=`${humidity}%`;
        infoTxt.classList.remove("pending","error");
        wrapper.classList.add("active");
        console.log(info);
    }
    
}
arrowBack.addEventListener("click",()=>{
    wrapper.classList.remove("active")
});
    

