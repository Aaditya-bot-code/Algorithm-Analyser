
console.log("Sorting Visualizer is connected!");

const arrayContainer = document.getElementById("array-container");
const keyDisplay = document.getElementById("key-display");

let array = [50, 100, 150, 80, 120];

const generateButton = document.getElementById("generate-array");
const bubbleSortButton = document.getElementById("bubble-sort");
const selectionSortButton = document.getElementById("selection-sort");
const insertionSortButton = document.getElementById("insertion-sort");

// Render array bars and highlight positions
function renderArray(
    values,
    highlightedIndices = [],
    minIndex = -1,
    sortedCount = 0,
    initialIndex = -1,
    highlightColor = "#f97316",
    holeIndex = -1
) {
    arrayContainer.innerHTML = "";

    values.forEach(function(value, index) {
        const bar = document.createElement("div");

        bar.style.height = (index === holeIndex ? 30 : value) + "px";
        bar.style.width = "30px";
        if (index === holeIndex) {
            bar.style.backgroundColor = "transparent";
            bar.style.border = "3px dashed #eab308";
        }
        else if (index < sortedCount) {
            bar.style.backgroundColor = "green";
        }
        else if (index === minIndex) {
            bar.style.backgroundColor = "#eab308";
        }
        else if (highlightedIndices.includes(index)) {
            bar.style.backgroundColor = highlightColor;
        }
        else {
            bar.style.backgroundColor = "#38bdf8";
        }
        if(index !== holeIndex){
        bar.style.border = index === initialIndex
            ? "3px solid green"
            : "3px solid transparent";
        }
        bar.style.boxSizing = "border-box";
        bar.textContent = index === holeIndex ? "" : value;
        bar.style.color = "black";
        bar.style.textAlign = "center";
        bar.style.borderRadius = "5px 5px 0 0";
        bar.style.fontSize = "12px";
        bar.style.fontWeight = "bold";

        arrayContainer.appendChild(bar);
    });
}

renderArray(array);

// Delay helper
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate a new random array
generateButton.addEventListener("click", function() {
    array = [];

    for (let i = 0; i < 5; i++) {
        const value = Math.floor(Math.random() * 200) + 20;
        array.push(value);
    }

    renderArray(array);
});

// Disable and enable all buttons during sorting
function setButtonsDisabled(disabled) {
    generateButton.disabled = disabled;
    bubbleSortButton.disabled = disabled;
    selectionSortButton.disabled = disabled;
    insertionSortButton.disabled = disabled;
}

// Bubble Sort
async function bubbleSort(value) {
    const n = value.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {

            renderArray(value, [j, j + 1]);
            await sleep(500);

            if (value[j] > value[j + 1]) {
                let temp = value[j];
                value[j] = value[j + 1];
                value[j + 1] = temp;

                renderArray(value, [j, j + 1]);
                await sleep(500);
            }
        }
    }

    return value;
}

// Bubble Sort button
bubbleSortButton.addEventListener("click", async function() {
    setButtonsDisabled(true);

    const sortedArray = await bubbleSort(array);

    renderArray(sortedArray, [], -1, sortedArray.length);

    setButtonsDisabled(false);
});

// Selection Sort
async function selectionSort(value) {
    const n = value.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {

            // Show current comparison, minimum and initial position
            renderArray(value, [j], minIndex, i, i, "#3b82f6");
            await sleep(500);

            if (value[j] < value[minIndex]) {
                minIndex = j;

                // Highlight the newly discovered minimum
                renderArray(value, [j], minIndex, i, i, "#3b82f6");
                await sleep(500);
            }
        }

        // Swap the minimum element with position i
        let temp = value[minIndex];
        value[minIndex] = value[i];
        value[i] = temp;

        // Show the sorted portion
        renderArray(value, [], -1, i + 1);
        await sleep(500);
    }

    return value;
}

// Selection Sort button
selectionSortButton.addEventListener("click", async function() {
    setButtonsDisabled(true);

    const sortedArray = await selectionSort(array);

    renderArray(sortedArray, [], -1, sortedArray.length);

    setButtonsDisabled(false);
});

async function insertionSort(value) {
    const n = value.length;

    for (let i = 1; i < n; i++) {

        let key = value[i];
        let j = i - 1;

        // Display the key being held
        keyDisplay.textContent = "Key: " + key;

        // Show the empty position where the key was picked
        renderArray(value, [], -1, i, -1, "#f97316", i);
        await sleep(700);

        while (j >= 0 && value[j] > key) {

            // Highlight the element being compared with the key
            renderArray(value, [j], -1, i, -1, "#f97316", j + 1);
            await sleep(700);

            // Shift the larger element one position right
            value[j + 1] = value[j];

            renderArray(value, [j + 1], -1, i, -1, "#3b82f6", j);
            await sleep(700);

            j--;
        }

        // Insert the key into the empty position
        value[j + 1] = key;

        keyDisplay.textContent = "Inserted: " + key;

        renderArray(value, [], -1, i + 1);
        await sleep(700);
    }

    keyDisplay.textContent = "Sorting Complete!";
    return value;
}
insertionSortButton.addEventListener("click", async function(){
    setButtonsDisabled(true);

    const sortedArray = await insertionSort(array);

    renderArray(sortedArray, [], -1, sortedArray.length);

    setButtonsDisabled(false);
})