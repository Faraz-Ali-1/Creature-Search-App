const input = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const elementType_1 = document.getElementById("type-1");
const elementType_2 = document.getElementById("type-2");
const sp_Name = document.getElementById("sp-name");
const sp_Desc = document.getElementById("sp-desc");
const table = document.getElementById("table");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const speed = document.getElementById("speed");
const sp_Attack = document.getElementById("special-attack");
const sp_Defense = document.getElementById("special-defense");
const video = document.getElementById("video");
const monsterAudio = document.getElementById("monster-audio");


const apiUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creatures/";

const types = [
    "fire", "water", "electric", "grass", "ice", "poison", "ground", 
    "flying", "psychic", "bug", "rock", "ghost", "dragon", 
    "dark", "steel", "fairy"
]

const names = [
"pyrolynx",
"aquoroc",
"voltadon",
"floraspine",
"cryostag",
"terradon",
"emberapod",
"lunaclaw",
"quillquake",
"mystifin",
"dracilume",
"thornaconda",
"frostbyte",
"graviboa",
"zephyreon",
"brontogale",
"shadeelisk",
"titanule",
"faegis"
]

const fetchCreatureData = async () => {

    monsterAudio.play();

    const dynUrl =  `https://rpg-creature-api.freecodecamp.rocks/api/creature/${input.value}`;
    try{
        const res = await fetch(dynUrl);
        const data = await res.json();
        // console.log(data);

        creatureName.innerText = data.name;

        names.forEach(name => {
            creatureName.classList.remove(name);
        });

        const getName = names.find(name => {
            return data.name.toLowerCase() === name;
        });

        if(getName){
            creatureName.classList.add(getName);
        }

        // console.log(getName);

        weight.innerText = `Weight: ${data.weight}`;
        height.innerText = `Height: ${data.height}`;

        if(data.types[0].name === "fire"){
            elementType_1.classList.add("fire");
        }
        if(data.types.length > 1){
            elementType_1.innerText = data.types[0].name;
            elementType_2.innerText = data.types[1].name;
            
            const getType = types.filter(type => {
                if(data.types[0].name === type){
                    elementType_1.classList.add(type);
                }else{
                    elementType_1.classList.remove(type);
                }
                if(data.types[1].name === type){
                      elementType_2.classList.add(type);
                } else{
                    elementType_2.classList.remove(type);
                }

            });
            // console.log(getType);
        } else{
            elementType_1.innerText = data.types[0].name;
            elementType_2.innerText = "";

            const getType = types.filter(type => {
                if(data.types[0].name === type){
                    elementType_1.classList.add(type);
                }else{
                    elementType_1.classList.remove(type);
                    elementType_2.classList.remove(type);
                }
            });
        }


        sp_Name.innerText = data.special.name;
        sp_Desc.innerText = data.special.description;
        hp.innerText = data.stats[0].base_stat;
        attack.innerText = data.stats[1].base_stat;
        defense.innerText = data.stats[2].base_stat;
        speed.innerText = data.stats[5].base_stat;
        sp_Attack.innerText = data.stats[3].base_stat;
        sp_Defense.innerText = data.stats[4].base_stat;

    } catch (err){
        alert("Creature not found");
    }
}



input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        fetchCreatureData();
    } 
});
searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    fetchCreatureData();
});