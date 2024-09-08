const container = document.getElementById(`container`);
const blockCount = 8; 
const delay = 1000;
const rootStyles = getComputedStyle(document.documentElement);

//BubbleSort code:

async function bubbleSort(){
    document.documentElement.style.setProperty('--minHeight','500px');
    createArray(blockCount);
    const blocks = container.children;
    const ogColor = blocks[0].style.borderColor;
    
    for(let i=0; i<blockCount; i++){
        for(let j=0; j<blockCount-i-1; j++){
            const block1 = blocks[j];
            const block2 = blocks[j+1];
            block1.style.borderColor='#e74c3c';
            block2.style.borderColor='#e74c3c';
            await new Promise(resolve => setTimeout(resolve, 1000));

            if(parseInt(block1.textContent) > parseInt(block2.textContent)){
                swap(block1,block2);
                await new Promise(resolve => setTimeout(resolve, 2000));

            }
            block1.style.borderColor=ogColor;
            block2.style.borderColor=ogColor;
            
        }
    }
}

function createArray(blockCount){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
    for(let i=0; i<blockCount; i++){
        const value = Math.floor(Math.random()*100)+10;
        const block = document.createElement(`span`);
        block.textContent = value;
        block.setAttribute("id", `span${i}`);
        container.appendChild(block);
    }
}

async function swap(div1, div2) {
    document.documentElement.style.setProperty('--swapDist','60px');
    div1.classList.add("slideInRight");
    div2.classList.add("slideInLeft");
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    const temp = div1.textContent;
    div1.textContent = div2.textContent;
    div2.textContent = temp;
    div1.classList.remove("slideInRight");
    div2.classList.remove("slideInLeft");   
}


//selectionSort Exclusive Code:

function createArraySlc(){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
    for(let i=0; i<blockCount; i++){
        const val = Math.floor(Math.random()*100)+10;
        const block = document.createElement(`span`);
        const value = document.createElement(`div`);
        value.textContent=val;
        const index = document.createElement(`div`);
        index.style.color = "#adff2f";
        index.textContent=i;
        block.setAttribute("id", `span${i}`);
        container.appendChild(block);
        block.appendChild(value);
        block.appendChild(index);

    }
}

async function selectionSort(){
    document.documentElement.style.setProperty('--minHeight','200px');

    createArraySlc();
    const block = document.createElement(`span`);
    block.textContent = "Min";
    block.setAttribute("id", "min");
    container.appendChild(document.createElement("br"));
    container.appendChild(block);


    const blocks = container.children;
    const ogColor = blocks[0].style.borderColor;
    
    for(let i=0; i<blockCount; i++){
        let min = i;
        let block1 = blocks[min];
        let slide=0;

        block1.style.borderColor = `#e74c3c`;

        await new Promise(resolve => setTimeout(resolve, 500));
        slide = slidePixels(i);
        document.documentElement.style.setProperty('--minSlide',`${slide}px`);

        const textBlock = document.querySelector(`#span${i} > div:nth-child(2)`);

        textBlock.classList.add("newMinimum");
        await new Promise(resolve => setTimeout(resolve, 1800));
        block.textContent = parseInt(i);
        await new Promise(resolve => setTimeout(resolve, 201));
        textBlock.classList.remove("newMinimum");
        let minimum = blocks[i].textContent.slice(0,-1);

        for(let j=i+1; j<blockCount; j++){
            
            let block2 = blocks[j];
            block2.style.borderColor = `#0000ff`;
            await new Promise(resolve => setTimeout(resolve, 500));
            const textBlockj = document.querySelector(`#span${j} > div:nth-child(2)`);


            if(minimum > parseInt(block2.textContent.slice(0,-1))){

                minimum = block2.textContent.slice(0,-1);
                
                //pixels setter:
                slide = slidePixels(j);
                document.documentElement.style.setProperty('--minSlide',`${slide}px`);
                //animations: 
                textBlockj.classList.add("newMinimum");
                await new Promise(resolve => setTimeout(resolve, 1800));
                block.textContent = parseInt(textBlockj.textContent);
                await new Promise(resolve => setTimeout(resolve, 201));
                textBlockj.classList.remove("newMinimum");
                //coding part
                min = j;
            }
            block2.style.borderColor = ogColor;
        }

       if(min != i){
            //swapAnimation
            const element1 = document.querySelector(`#span${i} > div:nth-child(1)`);
            const element2 = document.querySelector(`#span${min} > div:nth-child(1)`);
            
            swapAnimation(element1, element2, (min-i)*60,"whiteSmoke");
            await new Promise(resolve => setTimeout(resolve, 2000));

            
            const temp = parseInt(document.getElementById(`span${min}`).childNodes[0].textContent);
            document.getElementById(`span${min}`).childNodes[0].textContent = parseInt(document.getElementById(`span${i}`).childNodes[0].textContent);
            document.getElementById(`span${i}`).childNodes[0].textContent = temp;
            await new Promise(resolve => setTimeout(resolve, 500));

        }       
        block1.style.borderColor = ogColor;
    }

}
async function swapAnimation(element1 , element2, pixNo, og){

    document.documentElement.style.setProperty('--swapDist',`${pixNo}px`);
    element1.style.color = "#ffff00";
    element2.style.color = "#ffff00";

    element1.classList.add("slideInRight");
    element2.classList.add("slideInLeft");
    await new Promise(resolve => setTimeout(resolve, 2000));

    element1.style.color = og;
    element2.style.color = og;

    element1.classList.remove("slideInRight");
    element2.classList.remove("slideInLeft");
    
}

function slidePixels(indici){
    let mid = Math.floor((blockCount-1) / 2);
    let pixels = 0;

    if (blockCount % 2 == 0) {
        pixels = 30;
        if (mid == indici-1) {return -pixels;}
            else if (mid == indici) {return pixels;} 
            else {
            pixels = pixels + Math.abs((mid - indici) * 60);
            if (indici < mid) {return pixels;} 
            else {return -(pixels - 60);}
        }
    } else {
        
        if (mid == indici) { return 0;} 
        else {
            pixels = pixels + Math.abs((mid - indici) * 60);
            if (indici < mid) { return pixels;}
             else { return -pixels;}
        }
    }
}


// InsertionSort code: 

async function insertionSort(){
    document.documentElement.style.setProperty('--minHeight','500px');
    createArray(blockCount);
    const blocks = container.children;
    const ogColor = blocks[0].style.borderColor;
    let j=0;
    let shifts=0;
    for(let i=1; i<blockCount; i++){

        j = i-1;
        shifts=0;
        let block1 = blocks[i];
        block1.style.borderColor = "#e74c3c";
        blocks[j].style.borderColor = "#0000ff";
        block1.classList.add("dragDown");
        await new Promise(resolve => setTimeout(resolve, 1500));


        while(j>=0 && parseInt(block1.textContent) < parseInt(blocks[j].textContent)){
            blocks[j].style.borderColor = "#0000ff";
            blocks[j].classList.add("shiftRight");
            await new Promise(resolve => setTimeout(resolve, 1000));
            blocks[j].style.borderColor = ogColor;
            j--;
            shifts++;
        }
        if(j>=0){ blocks[j].style.borderColor = ogColor; }

        shifts = shifts * 60;
        document.documentElement.style.setProperty('--x',`${shifts}px`);
        block1.classList.add("restingPosition");
        await new Promise(resolve => setTimeout(resolve, 2000));

        j=0;
        while(j<blockCount){
            blocks[j].classList.remove("shiftRight");
            j++;
        }
        block1.classList.remove("dragDown");
        block1.classList.remove("restingPosition");
        block1.style.borderColor = ogColor;

        //actual sorting algorithm: start
        j=i-1;
        let key = parseInt(block1.textContent);
        while(j>=0 && key < parseInt(blocks[j].textContent)){
            blocks[j+1].textContent = blocks[j].textContent;
            j--;
        }
        blocks[j+1].textContent = key;
    }
}


// MergeSort Code #P.A.I.N

async function mergeSort(){
    document.documentElement.style.setProperty('--minHeight','200px');
    createArray(blockCount);
    //container.appendChild(document.createElement('br'));
    await displayInTwoGroups(container);

}
const leftBraces = document.createElement('label');
const rightBraces = document.createElement('label');
leftBraces.textContent = "  {  ";
rightBraces.textContent = "  }  ";
leftBraces.classList.add("brackets");
rightBraces.classList.add("brackets");


async function displayInTwoGroups(container) {
    const spans = Array.from(container.children).filter(child => child.tagName === 'SPAN');
    const midpoint = Math.ceil(spans.length / 2);

    if (spans.length <= 1) {
        return; // Base case: stop recursion when there's only one element
    }

    const firstHalfContainer = document.createElement('div');
    firstHalfContainer.classList.add('half');
    firstHalfContainer.appendChild(leftBraces.cloneNode(true));

    spans.slice(0, midpoint).forEach(span => {
        const clonedSpan = span.cloneNode(true);
        firstHalfContainer.appendChild(clonedSpan);
    });
    firstHalfContainer.appendChild(rightBraces.cloneNode(true));



    const secondHalfContainer = document.createElement('div');
    secondHalfContainer.classList.add('half');


    secondHalfContainer.appendChild(leftBraces.cloneNode(true));

    spans.slice(midpoint).forEach(span => {
        const clonedSpan = span.cloneNode(true);
        secondHalfContainer.appendChild(clonedSpan);
        //secondHalfContainer.appendChild(document.createTextNode(' '));
    });
    
    secondHalfContainer.appendChild(rightBraces.cloneNode(true));

    

    container.appendChild(document.createElement('br'));
    container.appendChild(firstHalfContainer);
    container.appendChild(secondHalfContainer);
    
    // Recursively call displayInTwoGroups for each half
    await displayInTwoGroups(firstHalfContainer);
    await displayInTwoGroups(secondHalfContainer);
}



