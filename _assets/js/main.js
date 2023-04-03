/*

Consegna:

L'utente clicca su un bottone che genererà una griglia di gioco quadrata.

Ogni cella ha un numero progressivo, da 1 a 100.

Ci saranno quindi 10 caselle per ognuna delle 10 righe.

Quando l'utente clicca su ogni cella, la cella cliccata si colora di 
azzurro ed emetto un messaggio in console con il numero della cella cliccata.

Bonus:

Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

*/

const btnPlay = document.querySelector(".btn_play"); // Seleziono il bottone Play nel DOM
const message = document.querySelector(".container_message"); // Seleziono il messaggio nel DOM
const r = document.querySelector(":root"); // Seleziono ROOT

let isGridGenerated = false; // Variabile booleana per tenere traccia se la griglia è stata già generata

btnPlay.addEventListener("click", function () {
    game();
});

function game() {
    message.remove() // Il messaggio viene rimosso dal DOM al click del bottone

    btnPlay.innerHTML = "Stai giocando!!"; // Al click del bottone viene cambiato il testo all'interno

    btnPlay.classList.add("btnAnimation"); // Al click del bottone viene aggiunta una classe che gli fa fare un'animazione all'infinito

    if (!isGridGenerated) { // Controlla se la griglia è già stata generata
        isGridGenerated = true; // Variabile impostata su True per indicare che la griglia è stata generata, quindi non andrà a creare più griglie

        const selectLevels = document.querySelector(".levels_Game") // Seleziono nel dom l'input select
        let valueSelectValue = selectLevels.options[selectLevels.selectedIndex].value; // Prende gli elementi value dentro la option
        let valueSelectText = selectLevels.options[selectLevels.selectedIndex].text; // Prende gli elementi text dentro la option
        console.log("Hai impostato il livello su: " + valueSelectText)

        function createDiv(html, classs, text) { // Associo delle richieste alla funzione
            let element = document.createElement(html);

            element.className = classs;

            element.innerText = text; // Inserisco text dentro al div

            return element // Da qui in poi il codice non viene più letto
        };

        const gridList = document.querySelector(".grid_List"); // Seleziono la griglia nel DOM

        for (let i = 1; i <= valueSelectValue; i++) { // Ciclo FOR per far generare un numero da 1 a 100
            const divBox = createDiv("div", "box", i); // Collego la richiesta della funzione a una variabile

            divBox.addEventListener("click", function () { // Al click di ogni elemento BOX gli viene aggiunta una classe che gli aggiunge un Background Color
                this.classList.toggle("clickedBlue"); // Grazie al this rendo univoco ogni click del BOX
            })

            myFunction_set(valueSelectValue)

            gridList.append(divBox) // Stampo in pagina i BOX
        };
    }
}

// Cambio numero box in griglia in base al livello scelto
function myFunction_set(x) {
    x = Math.sqrt(x)

    r.style.setProperty('--gridBox', `repeat(${x}, 1fr)`);
}