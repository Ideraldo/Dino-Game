const dino = document.querySelector('.dino')
const background = document.querySelector('.background')

let isJumping = false;
let position = 0

let divBotao = document.getElementById("divBotao")

let stateCreateCactus = false

let cactiHaveBeenRemoved = false;
let botao = document.getElementById("botao")

let containerPrincipal = document.getElementById("containerPrincipal")

function startGame() {
    containerPrincipal.removeChild(divBotao)
    // botao.parentNode.removeChild(botao)
    stateCreateCactus = true
    createCactus();
}



//Checks if the user pressed the space bar
function handleKeyDown(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump()
        }
    }
}

function jump() {

    isJumping = true;

    let upInterval = setInterval(function () {
        if (position >= 150) {
            clearInterval(upInterval)

            //Down
            let downInterval = setInterval(function () {
                if (position <= 0) {
                    clearInterval(downInterval)
                    isJumping = false;
                } else {
                    position -= 20
                    dino.style.bottom = position + 'px'
                }
            }, 20)
        } else {
            //Up
            position += 20
            dino.style.bottom = position + 'px'
        }
    }, 20)
}

function createCactus() {
    if (stateCreateCactus) {
        const cactus = document.createElement('div')
        let cactusPosition = 1000
        let randomTime = Math.random() * 2000

        cactus.classList.add('cactus')
        cactus.style.left = 1000 + 'px'
        background.appendChild(cactus)

        let leftInterval = setInterval(function () {
            if (cactusPosition < -60) {
                clearInterval(leftInterval)
                background.removeChild(cactus)
            } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
                //Game over
                clearInterval(leftInterval)
                background.removeChild(cactus)
                endGame()
                // document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>'
            } else {
                cactusPosition -= 10;
                cactus.style.left = cactusPosition + 'px'
            }
        }, 20)

        setTimeout(createCactus, randomTime)

    } else {

    }
}

// FIX HERE TO END ( RESTART GAME PART)

function callStartGame() {
    playAgain = document.getElementById("divBotao")
    // containerPrincipal.removeChild(playAgain)
    playAgainButton = document.getElementById("playAgainButton")
    playAgain.removeChild(playAgainButton)


    cactiHaveBeenRemoved = false;
    stateCreateCactus = true;
    startGame()
}

function endGame() {
    if (!cactiHaveBeenRemoved) {
        let playAgain = document.createElement("div")
        playAgain.classList = 'playAgain'
        playAgain.id = 'divBotao'
        playAgain.innerHTML = "<h1> Game Over </h1>"
        containerPrincipal.appendChild(playAgain)



        let playAgainButton = document.createElement("button")
        // playAgainButton.setAttribute('onclick', 'callStartGame()')
        playAgainButton.classList = 'botao inicio'
        playAgainButton.id = 'playAgainButton'
        playAgainButton.setAttribute('type', 'button')
        playAgainButton.appendChild(document.createTextNode('Play Again'))


        playAgain.appendChild(playAgainButton)              
        
        cactiHaveBeenRemoved = true;
        stateCreateCactus = false
    }

}




document.addEventListener('keydown', handleKeyDown)