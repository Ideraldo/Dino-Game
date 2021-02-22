function startGame() {

    // const dino = document.querySelector('.dino')
    // const background = document.querySelector('.background')
    let isJumping = false;
    let position = 0

    //Cria div dino e o background
    const background = document.createElement("div")
    


    //Changes dino's and background's opacities
    function changeOpacity() {
        if (dino.style.opacity == 0 && background.style.opacity == 0) {
            dino.style.opacity = 1
            background.style.opacity = 1
        }
    }
    changeOpacity()


    //Checks whether the user is pressing the space bar
    function handleKeyDown(event) {
        if (event.keyCode === 32 && !isJumping) {
            jump()
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

        function gameOver() {
            clearInterval(leftInterval)
            background.removeChild(cactus)
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>'
            //Criar botao de play again
            function createButton() {
                var btn = document.createElement('BUTTON')
                var lbl = document.createTextNode("PLAY AGAIN")
                btn.appendChild(lbl)
                btn.onclick = startGame()
                document.body.appendChild(btn);
            }
            createButton()

        }

        const cactus = document.createElement('div')
        let cactusPosition = 1000
        let randomTime = Math.random() * 6000

        cactus.classList.add('cactus')
        cactus.style.left = 1000 + 'px'
        background.appendChild(cactus)

        let leftInterval = setInterval(function () {
            if (cactusPosition < -60) {
                clearInterval(leftInterval)
                background.removeChild(cactus)
            } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
                gameOver()
            } else {
                cactusPosition -= 10;
                cactus.style.left = cactusPosition + 'px'
            }

        }, 20)

        setTimeout(createCactus, randomTime)
    }

    createCactus();
    document.addEventListener('keyup', handleKeyDown)
}

// startGame()