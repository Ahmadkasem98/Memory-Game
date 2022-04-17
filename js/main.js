document.querySelector(".control-buttons span").onclick = function() {
  let yourName = prompt("Whats Your Name?");
 
  if (yourName == null || yourName == ""){
      document.querySelector(".name span").innerHTML= "Unknown";
  }
  else {
      document.querySelector(".name span").innerHTML= yourName;
  }
  document.querySelector(".control-buttons").remove();

  document.getElementById('start').play();
  countUp();
};
var timer;
var ele =document.getElementById('timer');
console.log(typeof(ele));
function countUp(){
    var sec=0;
    let counter = setInterval(() => {
    ele.innerHTML = '00:'+sec;
    sec++; 
    if(sec == '10'){
        blocks.forEach((block ) => {
            if(block.classList.contains('has-match')){
                block.classList.remove('has-match')
            };
            clearInterval(counter);
            document.getElementById('end').play();
            setTimeout(countUp,3000);
        });
        
    } 
    },1000);
}

   


// Effect Duration
let duration = 1000;

// Select Blocks Container
let blockContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game blocks
let blocks = Array.from(blockContainer.children);

// Create Rande of keys
// plan A
// let orderRange = [...Array(blocks.length).keys()];

// plan B
let orderRange =Array.from((Array(blocks.length).keys()));
console.log(orderRange);
Shuffle(orderRange);
console.log(orderRange);

// Add order Css Property To Game Blocks
blocks.forEach((block,index) => {
    block.style.order = orderRange[index];

    // Add Click Event
    block.addEventListener('click',function (){

    // Trigger The Flip Block Function
        flipBlock(block);
    });

});

// Flip Block Function
function flipBlock(selectedBlock){

    // Add Class is-Flipped
    selectedBlock.classList.add('is-flipped');

    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // if There's Two Selected Blocks 
    if (allFlippedBlocks.length === 2){
     
        // stop Clicking Function
        stopClicking();
        // Check Matched Block Function
        checkMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);
    }
     
}

// Stop Clicking Function
function stopClicking(){

    // Add class No Clicking on Main Container 
    blockContainer.classList.add('no-clicking');
    
    setTimeout(() => {
        
        // Remove Class No Clicking After The Duration
        blockContainer.classList.remove('no-clicking');
    },duration);
    
}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();

    }else {
        triesElement.innerHTML = Number(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        },duration);

        document.getElementById('lose').play();
    }
}




// Shuffle Function
function Shuffle(array) {
    // setting Var
    let current =array.length,
    temp,
    random;

    while(current > 0) {
        // Get Random Number
        random = Math.floor(Math.random() * current);

        // Decrease length By one
        current--;

        // [1] Save Current Element in Stash
        temp = array[current];

        // [2] Current Element = Random Element
        array[current] = array[random];

        // [3] Random Element = Get Element From Stash
        array[random] = temp;
    }
    return array;
}
