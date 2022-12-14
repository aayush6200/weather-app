
const ondataSubmit=(event)=>{
  
    let prev=document.getElementById('city-name').value
    let current=`api.openweathermap.org/data/2.5/weather?q=${prev}&units=imperial&appid=47cfb06e0063e10689dc2ba19412e7b4`
    let hourly=`api.openweathermap.org/data/2.5/forecast?q=${prev}&units=imperial&appid=47cfb06e0063e10689dc2ba19412e7b4`
   
    document.getElementById('citycondition').innerText=prev+"'s"+' Condition'

    let myWeatherData=new Array()  ///weather data for current hours
    let myDataForDay=new Array()  //weather data for a day
    let myDataForDays=new Array()  //weather data for next four days
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let myDays=new Array();

    const myWeather=async()=>{
        let data= await fetch('https://'+current)
        let response= await data.json()
        let myObj={ 
            visible:response.visibility,                                         //stores  data for a  particular time of day
            avetemp:response.main.temp,
            temp_max:response.main.temp_max,
            temp_min:response.main.temp_min,
            description:response.weather[0].description,
            iconId:response.weather[0].icon,
            sunrise:response.sys.sunrise,
            sunset:response.sys.sunset

        }
        
        if (myWeatherData.length<1){
        myWeatherData.push(myObj)}
    }

    myWeather().then(res=>{
        let sunrise=myWeatherData[0].sunrise;
        sunrise=(new Date(sunrise*1000)).getHours()+':'+(new Date(sunrise*1000)).getMinutes()+':'+(new Date(sunrise*1000)).getSeconds()
        let sunset=(myWeatherData[0].sunset)
        sunset=(new Date(sunset*1000)).getHours()+':'+(new Date(sunset*1000)).getMinutes()+':'+(new Date(sunset*1000)).getSeconds()

        let img=document.createElement('img')
        let myUrl=  `openweathermap.org/img/wn/${myWeatherData[0].iconId}.png`
        let srcs= "http://"+myUrl
        document.querySelector('img').src=srcs
        document.getElementById('average-temp').innerText=myWeatherData[0].avetemp
        document.getElementById('weather-description').innerText= myWeatherData[0].description
        document.getElementById('visible').innerText='visibility: '+myWeatherData[0].visible+'m'
        document.getElementById('max').innerText='max-temp: '+myWeatherData[0].temp_max
        document.getElementById('rise').innerText='Rise: '+sunrise
        document.getElementById('set').innerText='Set: '+sunset

    }).catch(error=>{
        console.log(`Hey you have an error=> ${error}`)
    })

    mydataForDays=async()=>{
        let data=await fetch('https://'+hourly)
        let response=await data.json()
        console.log(response)
        for (let i=0;i<40;i++){
            if ((new Date(response.list[i].dt_txt)).getHours()==12){
                myDays.push(days[new Date(response.list[i].dt_txt).getDay()])
                let myObj={
                    avetemp:response.list[i].main.feels_like,
                    maxtemp:response.list[i].main.temp_max,
                    description:response.list[i].weather[0].description,
                    iconId:response.list[i].weather[0].icon


                    
                }
                myDataForDays.push(myObj)
            }
        }
        console.log(myDays)
        
    }

    mydataForDays().then(res=>{
        //creating a  table on html
        myDays.forEach((day,index)=>{
            document.getElementById(`${index}`).innerText=day;
            document.getElementById('photo-'+index).innerText=''
            document.getElementById('temp-'+index).innerText=myDataForDays[index].avetemp
            let img=document.createElement('img')
            img.src= "http://"+`openweathermap.org/img/wn/${myDataForDays[index].iconId}.png`
            document.getElementById('photo-'+index).appendChild(img)
            document.getElementById('max_temp-'+index).innerText=myDataForDays[index].maxtemp
            document.getElementById('des-'+index).innerText=myDataForDays[index].description
            
        })

        
    }).catch(error=>{
        console.log('error')
        console.log(error)
    })
    

}




