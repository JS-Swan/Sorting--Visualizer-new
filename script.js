const n=35;
const array=[];
init();
let audioCtx=null;

function playNote(freq){
    if(audioCtx==null){
        audioCtx=new (
            AudioContext  ||
            webkitAudioContext ||
            window.webkitAudioContext
        )();
    }
    const dur=0.1;
    const osc=audioCtx.createOscillator();
    osc.frequency.value=freq;
    osc.start();
    osc.stop(audioCtx.currentTime+dur);
    const node=audioCtx.createGain();
    node.gain.value=0.1;
    node.gain.linearRampToValueAtTime(
        0, audioCtx.currentTime+dur
    );
    osc.connect(node);
    node.connect(audioCtx.destination);
}
function init(){
    for(let i=0;i<n;i++){
        array[i]=Math.random();
    }
    showBars();
}
// play() function
function play(sortingAlgorithm) {
    const copy = [...array];
    let moves;
  
    switch (sortingAlgorithm) {
      case 'bubbleSort':
        moves = bubbleSort(copy);
        break;
      case 'insertionSort':
        moves = insertionSort(copy);
        break;
      case 'selectionSort':
        moves = selectionSort(copy);
        break;
      case 'quickSort':
        moves = quickSort(copy);
        break;
      default:
        console.error('Invalid sorting algorithm');
        return;
    }
    animate(moves);
  }
  let speed = 40; // Default speed

  function changeSpeed() {
      const speedSelect = document.getElementById("speed");
      speed = Number(speedSelect.value);
  }
  
  // ...
  
  function animate(moves) {
      if (moves.length == 0) {
          showBars();
          return;
      }
      const move = moves.shift();
      const [i, j] = move.indices;
  
      if (move.type == "swap") {
          [array[i], array[j]] = [array[j], array[i]];
      }
      playNote(200 + array[i] * 500);
      playNote(200 + array[j] * 500);
      showBars(move);
      setTimeout(function () {
          animate(moves);
      }, speed);
  }
  
function bubbleSort(array){
    const moves=[];
    do{
        var swapped=false;
        for(let i=1;i<array.length;i++){
           moves.push({indices:[i-1,i],type:"comp"});
            if(array[i-1]>array[i]){
                swapped=true;
                moves.push({indices:[i-1,i],type:"swap"});
                [array[i-1],array[i]]=[array[i],array[i-1]];
            }
        }
    }while(swapped);
    return moves;
}

function showBars(move) {
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
      const bar = document.createElement("div");
      bar.style.height = array[i] * 100 + "%";
      bar.classList.add("bar");
      
      if (move && move.indices.includes(i)) {
        bar.style.backgroundColor = move.type == "swap" ? "red" : "blue";
      }
      
      container.appendChild(bar);
    }
  }
  

// Modified by me Chat GPT

function insertionSort(array) {
    const moves = [];
    for (let i = 1; i < array.length; i++) {
        moves.push({ indices: [i - 1, i], type: "comp" });
        let j = i;
        while (j > 0 && array[j - 1] > array[j]) {
            moves.push({ indices: [j - 1, j], type: "swap" });
            [array[j - 1], array[j]] = [array[j], array[j - 1]];
            j--;
        }
    }
    return moves;
}

function selectionSort(array) {
    const moves = [];
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            moves.push({ indices: [j, minIndex], type: "comp" });
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            moves.push({ indices: [minIndex, i], type: "swap" });
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
    }
    return moves;
}
// Quick Sort
function quickSort(array) {
    const moves = [];
    quickSortHelper(array, 0, array.length - 1, moves);
    return moves;
}

function quickSortHelper(array, low, high, moves) {
    if (low < high) {
        const pivotIndex = partition(array, low, high, moves);
        quickSortHelper(array, low, pivotIndex - 1, moves);
        quickSortHelper(array, pivotIndex + 1, high, moves);
    }
}

function partition(array, low, high, moves) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        moves.push({ indices: [j, high], type: "comp" });
        if (array[j] <= pivot) {
            i++;
            moves.push({ indices: [i, j], type: "swap" });
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    moves.push({ indices: [i + 1, high], type: "swap" });
    [array[i + 1], array[high]] = [array[high], array[i + 1]];

    return i + 1;
}
// End of Quick sort

  
  

