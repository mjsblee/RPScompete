//Declare Variables 

var activePlayer, oppPlayer, scores, roundChoices;

//Call reset Function
reset();

//eventListener for btns(Selection)
document.querySelector('#rock').addEventListener('click', selectBtn.bind(this, 1, 3));
document.querySelector('#paper').addEventListener('click', selectBtn.bind(this, 2, 1));
document.querySelector('#scissor').addEventListener('click', selectBtn.bind(this, 3, 2));

document.querySelector('.btn-new').addEventListener('click', reset);


function selectBtn(choice, weak){
    //1.assign the choice to the picture
    document.querySelector('#result-img-' + activePlayer).src = 'img/rps-'+ choice +'.png';
    roundChoices[activePlayer] = choice;

    //2.reset things that have done
    document.querySelector('#result-name-0').classList.remove('win'); //Remove win tag
    document.querySelector('#result-name-1').classList.remove('win'); //Remove win tag

    document.querySelector('#result-name-0').style.opacity = '0';
    document.querySelector('#result-name-1').style.opacity = '0';

    //3.set a winning Score
    // Set Winning Score
    var input = document.querySelector('.final-score').value;
    var winningScore;

    if (input) {
        winningScore = input;
    } else {
        winningScore = 15;
    }
    //
    
    //IF choices (1.oppPlayer made a choice    2.oppPlayer hasn't made a choice)
    if(roundChoices[oppPlayer] !== 0){
        //Reveal the result
        document.querySelector('#result-0').classList.add('result-appear');
        document.querySelector('#result-1').classList.add('result-appear');
        
        document.querySelector('#cover-0').classList.add('disappear');
        document.querySelector('#cover-1').classList.add('disappear');
        


        //Check who won (1.activePlayer wins 2. ties 3.loses(*oppPlayer wins) )
        if(roundChoices[oppPlayer] === weak){

            scored(activePlayer);
            
            if(scores[activePlayer] >= winningScore){
                setTimeout(winner.bind(this, activePlayer), 1500);
            }else{
                nextAppear();
                setTimeout(whoGoesNext.bind(this, activePlayer), 1000);
                document.querySelector('.next').addEventListener('click', clickNext);
            }
            


        }else if(roundChoices[oppPlayer] === roundChoices[activePlayer]){
            //1. tie tag
            document.querySelector('#result-name-' + activePlayer).textContent = 'TIE';
            document.querySelector('#result-name-' + oppPlayer).textContent = 'TIE';

            document.querySelector('#result-name-' + activePlayer).style.opacity = '1';
            document.querySelector('#result-name-' + oppPlayer).style.opacity = '1';

            nextAppear();

            setTimeout(whoGoesNext.bind(this, activePlayer), 1000);
            
        }else{
            
            scored(oppPlayer);

            if (scores[oppPlayer] >= winningScore) {
                setTimeout(winner.bind(this, oppPlayer), 1500);
            } else {
                nextAppear();
                setTimeout(whoGoesNext.bind(this, oppPlayer), 1000);
                document.querySelector('.next').addEventListener('click', clickNext);
            }

            
        }




    }else{
        //next turn
        nextPlayer();
    }
}


function coverAppear() {
    document.querySelector('#cover-0').classList.remove('disappear');
    document.querySelector('#cover-1').classList.remove('disappear');
}


function winner(player) {
    document.querySelector('.btn-wrapper').style.display = 'none';

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    whoGoesNext(player);

    document.querySelector('#name-' + player).textContent = 'Winner';
    document.querySelector('#name-' + player).style.animation = 'winnerColor 1s linear infinite';
}

function clickNext(){
    document.querySelector('#result-0').classList.remove('result-appear');
    document.querySelector('#result-1').classList.remove('result-appear');

    document.querySelector('.next').classList.remove('next-appear');
    document.querySelector('.btn-wrapper').style.display = 'block';

    coverAppear();

}
function whoGoesNext(winner){
    activePlayer = winner;
    activePlayer === 0? oppPlayer = 1 : oppPlayer = 0;
    roundChoices = [0,0];

    document.querySelector('.player-'+ activePlayer +'-panel').classList.add('active');
    
}

function nextAppear(){
    document.querySelector('.next').classList.add('next-appear');
    document.querySelector('.btn-wrapper').style.display = 'none';

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

}


function scored(player){
    //1.put up the score
    scores[player]++;
    document.querySelector('#score-' + player).textContent = scores[player];

    //2. Win! Tag
    document.querySelector('#result-name-' + player).textContent = 'WIN';
    document.querySelector('#result-name-' + player).style.opacity = '1';
    document.querySelector('#result-name-' + player).classList.add('win');
}


function nextPlayer(){
    //1. toggle the active class for both players
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //2. change activePlayer and oppPlayer
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    oppPlayer === 1? oppPlayer = 0 : oppPlayer =1;

}


function reset(){
    //1. reset all the scores
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';

    //2. hide all the result bars

    // document.querySelector('#result-0').style.display = 'none';
    // document.querySelector('#result-1').style.display = 'none';

    //3. set scores, activePlayer && oppPlayer + active class on player1
    scores = [0, 0];
    activePlayer = 0;
    oppPlayer = 1;
    roundChoices = [0, 0];

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('#name-0').style.animation = '';
    document.querySelector('#name-1').style.animation = '';

    document.querySelector('#result-0').classList.remove('result-appear');
    document.querySelector('#result-1').classList.remove('result-appear');

    document.querySelector('.next').classList.remove('next-appear');

    coverAppear();

    document.querySelector('.btn-wrapper').style.display = 'block';

    document.querySelector('.final-score').value = '';
    
}