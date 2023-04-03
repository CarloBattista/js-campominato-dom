/*

Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare 
tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, 
per evitare problemi con l'inizializzazione di git).

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa 
cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.

In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella 
si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti 
(ovvero quando ha rivelato tutte le celle che non sono bombe).

Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato 
su una cella che non era una bomba.

BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

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

        let bombs = generateBomb(valueSelectValue, 16); // Genera le bombe  fino a un massimo di 16 in base al livello scelto
        console.log(bombs)

        const scoreContainer = document.querySelector(".score");
        console.log(scoreContainer)

        let score = 1; // punteggio che parte da 0

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
                // this.classList.toggle("clickedBlue"); // Grazie al this rendo univoco ogni click del BOX
                if(!bombs.includes(i)){
                    this.classList.add("clickedBlue");
                    scoreContainer.innerHTML = `<span class="score">${score++}</span>`;
                } else {
                    this.classList.add("clickedBomb");
                    this.innerHTML = `<i class="fa-solid fa-bomb fa-shake" style="color: #771717;"></i>`;
                }
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

// Funzione per generazione bombe
function generateBomb(difficulty, numberOfBombs){
    let bombs = []; // Array bombe vuoto

    while (bombs.length < numberOfBombs){
        let random = Math.floor(Math.random() * difficulty) + 1;

        if(!bombs.includes(random)){
            bombs.push(random); // Inserisce le bombe dentro l'array
        }
    }

    return bombs
}