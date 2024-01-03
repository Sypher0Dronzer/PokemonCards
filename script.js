const typeColors = 
{
    "rock":     '#BBAB67',
    "ghost":    '#6767BB',
    "steel":    '#AAABBA',
    "water":    '#3398FE',
    "grass":    '#50a425',
    "psychic":  '#FE5499',
    "ice":      '#67CCFE',
    "dark":     '#775544',
    "fairy":    '#EF99EF',
    "normal":   '#A9A998',
    "fighting": '#C12239',
    "flying":   '#8898FE',
    "poison":   '#AB5499',
    "ground":   '#DCBB54',
    "bug":      '#ABBA22',
    "fire":     '#FF4422',
    "electric": '#dfb624',
    "dragon":   '#7667EE'
}


let card=document.querySelector('#card')
let name=document.querySelector('#name')
let id=document.querySelector('#id')
let sprite=document.querySelector('.sprite')
let typeBox=document.getElementById('type-box')
let weight=document.querySelector('.weight')
let height=document.querySelector('.height')
let ability=document.querySelector('.ability')
let barColor = document.querySelectorAll('.inner-bar')
let highlightedText = document.querySelectorAll('.highlighted-text');
let pkmonTheme= document.querySelector(':root')
let hp= document.querySelector('.hp')
let abilities= document.querySelector('.abilities')
// let type2= document.querySelector('.type2')
let type2 = document.getElementById("unique2");
// console.log(type2.style);
// type2.style.backgroundColor="blue";
console.log("hellp \n world");
let abilityBox= document.querySelector('.abilities-box')

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


async function pokemonData(pkmon) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pkmon}`;  
    let response = await fetch(url);
    let data = await response.json();

    let typeHTML=``;
    let abilityHTML=``;
    name.innerHTML=capitalizeFirstLetter(data.name)
    id.innerHTML=`#${data.id.toString().padStart(3, '0')}`
    height.innerHTML= `${Number(data.height)/10} m`
    weight.innerHTML= `${Number(data.weight)/10} kg`
    sprite.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`
    // changing the card theme
    let typeColor=typeColors[data.types[0].type.name];
    pkmonTheme.style.setProperty('--Pokemon-Type-Theme', `${typeColor}`);
    if(data.types.length>1){
      let type2Color=typeColors[data.types[1].type.name];
      pkmonTheme.style.setProperty('--Pokemon-Type-Type-2-Theme', `${type2Color}`);
    }


    data.stats.forEach(obj=>{
        console.log(obj.stat.name)
    })
    data.types.forEach((e,index) => {
        let typeName=e.type.name
        typeHTML+=`<div class="type${index+1}" id="unique${index+1}" >${capitalizeFirstLetter(typeName)}</div>`
    });
    typeBox.innerHTML=typeHTML;
    console.log(typeof(typeColors[data.types[1].type.name]));

    data.abilities.forEach((e)=>{
 //---------------------------------------------------------     
      abilityHTML+=`<h4 class="abilities">${capitalizeFirstLetter(e.ability.name)}</h4>`

    })
    abilityBox.innerHTML=abilityHTML;

    
  }
  pokemonData("blaziken")


  let getPokemon = document.getElementById('getPokemon');
  getPokemon.addEventListener('click',()=>{
    search()
  })
  window.addEventListener('keydown',(e)=>{
    if(e.key =="Enter"){
        search()
    }
  })
  function search(){
    let searchName=document.querySelector('.searchPokemon').value
    searchName= searchName.toLowerCase()
    pokemonData(searchName)

  }