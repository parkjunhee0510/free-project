let temperature = document.getElementById('temperature');
let description = document.getElementById('description');
let recImg = document.getElementById('rec-img');

document.addEventListener('DOMContentLoaded', () => {
    navigator.geolocation.getCurrentPosition(success);
});
const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
};
const getWeather = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    ).then((res) => res.json())
    .then((result) => {

        console.log(result); //==> coord뜨게 하는거 
        temperature.innerText = result.main.temp;
        // place.innerText = result.name;       위치 
        description.innerText = result.weather[0].description;
        // icon.innerText = result.weather[0].icon;     날씨 아이콘


        const randomImages = [      //랜덤 이미지 배열
            "../image/beerimage.jpg",
            "../image/global1.jpg",
            "../image/star.jpg",
            "../image/test1.gif"
            //추가 이미지 넣기
          ];

        if (result.weather[0].id >= 500 & result.weather[0].id < 600){         //날씨 비올 때
            recImg.src = "../image/splash.jpg";
        }
        else if (result.weather[0].id >= 600 & result.weather[0].id < 650){     //눈 올 때
            recImg.src = "../image/cass.jpg"
        }
        else if(result.weather[0].id == 800){   //맑을 때
            recImg.src = "../image/beer.png"
        }
        else if(result.weather[0].id >= 700 & result.weather[0].id < 750){   //안개 또는 황사
            recImg.src = "../image/dark.jpg"
        }
        else if((result.weather[0].id >= 750 && result.weather[0].id <1000) || result.weather[0].id <= 500){
            const randomIndex = Math.floor(Math.random() * randomImages.length);//랜덤 이미지 선택
            recImg.src = randomImages[randomIndex];
        };

    });
};
const API_KEY = 'c42567981060250eca0448a64d21fde6';


// recImg.src = "../image/splash.jpg";
//날씨 확인하는 법 >>> 콘솔object > weather > id번호, main, description 확인