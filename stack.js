
let toastContainer = null;

let allColorBox = document.querySelector(`.all-color-box`);
let copySound = new Audio(`assets/sound.mp3`);

let saveToCustomBtn = document.getElementById(`save-to-custom`);
let allCustomBox = document.querySelector(`.all-custom-box`);

 let hexInput = document.getElementById(`input-hex`);


window.addEventListener(`load`,function (){
    main();

    
    displayColorBoxes(allColorBox, defaultPresetColors);
    
    let custoColor = localStorage.getItem(`custom-color`);

    if(custoColor){
     const actualArray =  JSON.parse(custoColor);

        displayColorBoxes(allCustomBox, actualArray );

    } 
})

// global scope

const randomBtn = document.querySelector(`.ran`);


let colorDisplay = document.getElementsByClassName(`display`)
let radiosButton = document.querySelectorAll(`input[name="color-mode"]`);
let copyToClipBtn = document.getElementById(`copy-to-clipboard`);


const bgFileInput = document.getElementById(`bg-file-input`);
const bgFileInputBtn = document.getElementById(`bg-file-input-btn`);
const bgFileDeleteBtn = document.getElementById(`bg-file-delete-btn`);
const imgDisplay = document.getElementById(`img-display`);
const  imageControllerDiv = document.querySelector(`.controller-part`);

// Select all box ------------

let bgSize =  document.getElementById(`bg-size`);
let bgRepeat = document.getElementById(`bg-repeat`);
let bgPosition =  document.getElementById(`bg-position`);
let bgAttachment =  document.getElementById(`bg-attachment`);

// BACKGROUND CONTROLLER EVENT LISTENER ------------

    bgSize.addEventListener(`change`,function(event){

        document.body.style.backgroundSize = event.target.value;
    })

    bgRepeat.addEventListener(`change`,function(event){
         document.body.style.backgroundRepeat = event.target.value;
    })
    
    bgPosition.addEventListener(`change`,function(event){
          document.body.style.backgroundPosition = event.target.value;
    })

    bgAttachment.addEventListener(`change`,function(event){
         document.body.style.backgroundAttachment = event.target.value; 
    })




// BACKGROUND CONTROLLER FUNCTION ----------------




// global scope


bgFileInputBtn.addEventListener(`click`,function(){
    bgFileInput.click();
})

bgFileInput.addEventListener(`change`,function(event){
    let file = event.target.files[0];
   let actualPhoto =  URL.createObjectURL(file);

    imgDisplay.style.backgroundImage = `url(${actualPhoto})`;
    document.body.style.background = `url(${actualPhoto})`;
    bgFileDeleteBtn.style.pointerEvents =`visible`;
    bgFileDeleteBtn.style.opacity = `1`;
    imageControllerDiv.style.pointerEvents = `visible`;
    imageControllerDiv.style.opacity = `1`;
   
})

bgFileDeleteBtn.addEventListener(`click`,function(){

    imgDisplay.style.backgroundImage = ``;
    document.body.style.background = ``;
    bgFileDeleteBtn.style.pointerEvents =`none`;
    bgFileDeleteBtn.style.opacity = `0.4`;
    imageControllerDiv.style.pointerEvents = `none`;
    imageControllerDiv.style.opacity = `0.5`;
    bgFileInput.value = null;
})




randomBtn.addEventListener(`click`,function(){

    let DeciColorObj = generateColorDecimal();

    updateColorCode(DeciColorObj);

 
   
})


function main(){

    let sliderRed = document.getElementById(`slider-red`);
    let sliderGreen = document.getElementById(`slider-green`);
    let sliderBlue = document.getElementById(`slider-blue`);
    
    let callbackFunAllcolor = workColorSliders(sliderRed,sliderGreen,sliderBlue);
    
sliderRed.addEventListener(`change`,callbackFunAllcolor);
sliderGreen.addEventListener(`change`,callbackFunAllcolor);
sliderBlue.addEventListener(`change`,callbackFunAllcolor);
}






// PROBLEM .........


copyToClipBtn.addEventListener(`click`, handleCopyToClipboard )






function handleCopyToClipboard (){


   
    let inputRGB = document.getElementById(`input-rgb`);


   let mode = getCheckedValueFromRadios(radiosButton);

//  if(mode === null){
//     throw new Error(`Invalid Radio Input`)
//  }


 if(toastContainer !== null){

    toastContainer.remove();
    toastContainer = null;
 }




 if(mode === 'hex'){

     let inputHex = document.getElementById(`input-hex`);

   let hexInputValue =  inputHex.value;

   if(hexInputValue && isValidHex(hexInputValue)){

    navigator.clipboard.writeText(`#${hexInputValue}`);

    generateToastMessage(`#${hexInputValue} copied`);
    copySound.play();
    copySound.volume = 0.3;
   }
   else{
    alert(`Invalid Hex Code`);
   }
   
 }
 else{
   const RgbInputValue =  inputRGB.value;

   if(RgbInputValue){

    navigator.clipboard.writeText(RgbInputValue);
    generateToastMessage(`${RgbInputValue} copied`);
    copySound.play();
    copySound.volume = 0.3;
   }
   else{
    alert(`Invalid RGB Code`);
   }
   
 }

}




function getCheckedValueFromRadios (nodes){

    let checkedValue = null;

    for(let checkButton of nodes){

        if(checkButton.checked){
            checkedValue = checkButton.value;
        }
    }
    return checkedValue;
}


// PROBLEM .........



function workColorSliders(para1,para2, para3){

   return function(){

    const DeciColObj = {
        red: parseInt(para1.value),
        green :parseInt(para2.value),
        blue : parseInt(para3.value)
    }
    
    updateColorCode(DeciColObj);
   }
    
}


let inputHex = document.getElementById(`input-hex`);

inputHex.addEventListener(`keyup`,function(e){

        let hexColor=  e.target.value; 
        
       let sto =  isValidHex(hexColor);
       
       
       if(hexColor){
       
       inputHex.value = hexColor.toUpperCase();
       
       if(sto){
        
        let DeciObj = HexToDecimal(hexColor);
        updateColorCode(DeciObj);
       }
       
       }
       

})

function HexToDecimal (hex){

    let red = parseInt(hex.slice(0,2),16);
    let green = parseInt(hex.slice(2,4),16);
    let blue = parseInt(hex.slice(4),16);

    return {red,green,blue};
}


function updateColorCode (color){
// 
    // pureHexColor
    // pureRgbColor

    const hexColor = createHexColor(color);
    const rgbColor = createRGBColor(color);


    colorDisplay = document.getElementById(`color-display`).style.backgroundColor = `#${hexColor}`;
    // document.getElementById(`hex-radio`).value = hexColor;
    // document.getElementById(`rgb-radio`).value = rgbColor;
    document.getElementById(`input-hex`).value = hexColor;
    document.getElementById(`input-rgb`).value = rgbColor;
    document.getElementById(`red-label`).innerText = color.red;
    document.getElementById(`green-label`).innerText= color.green;
    document.getElementById(`blue-label`).innerText= color.blue;
    document.getElementById(`slider-red`).value = color.red;
    document.getElementById(`slider-green`).value = color.green;
    document.getElementById(`slider-blue`).value = color.blue;
  

}

// function 1

function generateColorDecimal(){

    let red = Math.floor(Math.random()*255);
    let green = Math.floor(Math.random()*255);
    let blue = Math.floor(Math.random()*255);

    return {red, green, blue};
}

// function 2
function createHexColor({red,green,blue}){


 function getTwoCode(para1){

    let hex = para1.toString(16);
    let ok = (hex.length !== 2) ? `0${hex}`:hex ;
    return ok;
 }

 return `${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`.toUpperCase();
 
   
}
// function 3
function createRGBColor ({red,green,blue}){

     return `rgb(${red},${green},${blue})`;
     
}





function generateToastMessage (msg){

    toastContainer = document.createElement(`div`);
    toastContainer.innerText = msg;
    toastContainer.className =`divC slide-in`;

    let mainContainer = document.querySelector(`.container`);

    mainContainer.appendChild(toastContainer);

    toastContainer.addEventListener(`click`,function(){

        toastContainer.classList.remove(`slide-in`);
        toastContainer.classList.add(`slide-out`);

        toastContainer.addEventListener(`animationend`,function(){
            toastContainer.remove();
            toastContainer = null;
        })
    })
    
}



let defaultPresetColors = [`#3E43BF`,`#E00789`,`#79A039`,`#DC0F0D`,`#F9D471`,`#9D804C`,`#31CED2`,`#D29B2C`, `#05FE6E`,`#E1842E`,`#8225BB`,`#F770F9`,`#2D6A44`,`#2E051E`];


// let customColors = new Array(20);
let customColors = [];





function displayColorBoxes(parent, colors){

    
    colors.forEach((color)=>{
        
        if(isValidHex(color.slice(1))){
            const colorBox = generateColorBox(color);
            parent.appendChild(colorBox);
        }
    })

}

function removeChildren (parent){
    let child = parent.lastElementChild;

    while(child){
        parent.removeChild(child);
        child = parent.lastElementChild;
    }
}

function generateColorBox (color){

   const div = document.createElement(`div`);
   div.className = `color-box`;
   div.style.backgroundColor = color;
   div.setAttribute(`data-color`,color);

   return div;
}





allCustomBox.addEventListener(`click`, copyColorBoxes);
allColorBox.addEventListener(`click`, copyColorBoxes);


function copyColorBoxes(event){

    
    let child = event.target;

    if(child.className === `color-box`){

        let dataColor = child.getAttribute(`data-color`);

        navigator.clipboard.writeText(dataColor);
        copySound.play();
        copySound.volume = 0.3;

        if(toastContainer !== null){

            toastContainer.remove();
            toastContainer = null;
         } 
         generateToastMessage(`Preset ${dataColor} is copied!`);
    }
}


saveToCustomBtn.addEventListener(`click`,handleSaveToCustomBtn(allCustomBox,hexInput));






function handleSaveToCustomBtn (allCustomBoxPara, inputHexPara){

return function (){

    let color = `#${inputHexPara.value}`;
    let searchItem = customColors.includes(color);

    if(searchItem){
        alert(`Already in your list`);
        return;
    }
    customColors.unshift(color);

    if(customColors.length > 10){
        customColors = customColors.slice(0,10);
    }

    let stoHexColorArray = JSON.stringify(customColors);
    localStorage.setItem(`custom-color`, stoHexColorArray);

    removeChildren(allCustomBoxPara);
    displayColorBoxes(allCustomBoxPara,customColors );

    if(toastContainer !== null){

        toastContainer.remove();
        toastContainer = null;
     }
    generateToastMessage(`Added your custom color`);
    copySound.play();
    copySound.volume = 0.3;
}
}





let imgRemoveBtn = document.getElementById(`remove-btn`);

imgRemoveBtn.addEventListener(`click`,function(){

    allCustomBox.removeChild(allCustomBox.lastElementChild);
   let custoColor = localStorage.getItem(`custom-color`);
   let actualArr = JSON.parse(custoColor);

  let finalArray = actualArr.slice(0,-1);
  let finalJson = JSON.stringify(finalArray);

  localStorage.setItem(`custom-color`,finalJson);
    
})





function isValidHex (color){

    if(color.length !== 6) return false;
    
   return /^[0-9a-f]{6}/i.test(color);


}





// let favFood = [`chiken`,`mutton`,`biriyani`,`lobster`];


// favFood.forEach((cw ,zp ,hp)=>{

//     console.log(cw, zp, hp)
// })

// let arr2 = [5,10,15,20,30];

// arr2.forEach((val)=>{

//     console.log(`${val} is show`);
// })

// const person = {

//     name:`sumit`,
//     skills: [`programming`, `educator`],
//     book: { name:`Ekhono likhinai`},
//     alive : true,
//     disease :null 
// };

// let tot = JSON.stringify(person);

// console.log(tot);



// let json1 = '{"name":"John", "birth":"2001-08-30", "city":"New York"}';


// let myWork = JSON.parse(json1, function(key, value){

//    if(key === `birth`){
//     return new Date(value);

//    }return value;
// });

// console.log(myWork)


// let obj = {name:`John`, age:30, city:`New York`};


// let test = JSON.stringify(obj);

// console.log(test)


// let bio = {name:`Bibek`, age:21, eyeColor:`Black`};

// let test = JSON.stringify(bio, function(key, value){

//     if(key === `name`){
//         return `Mohadeb`;

//     }return value;
// });

// console.log(test)



// let food = [`apple`,`tomato`,`mango`,`lemon`];

// let test = food.slice(0,-1);
// console.log(test)