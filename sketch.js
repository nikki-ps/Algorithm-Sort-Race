/*------------------------------------------------------------------------------------
CPSC-335-03-Project_2-Sort-Race

Created By: Nicole Serna, Zach Serna
Date: 3/25/2021

Description: a "Sort Race". Which compares the speed of 4 sorts,
measuring how well they can handle sorting a pseudo-random hexadecimal string
of size 16. Once the hexadecimal string has been sorted, it will then be rotated
once by shifting the 0 index element all the way to the end, pushing all the 
other elements in the array one forward in the array.The Sorts include:
Selection Sort, Gold's Pore Sort, Quick Sort and the Merge Sort. Continues rotating
until it has completed a full lap, at which point the program ends.


Note: If you want to test specific hex string, remove all other
hex strings from "sampleArrays".

--------------------------------------------------------------------------------------*/





//Sample hexadecimal inputs provided in rubric
const sampleArrays = [
  "05CA62A7BC2B6F03",
  "065DE66B71F040BA",
  "0684FB89C3D5754E",
  "07C9A2D18D3E4B65",
  "09F48E7862ED2616",
  "1FAB3D47905FC286",
  "286E1AD0342D7859",
  "30E530BC4786AF21",
  "328DE47C65C10BA9",
  "34F2756FD18E90BA",
  "90BA34F07E56F180",
  "D7859286E2FD0342"
];

//Initial set up of Canvas and Sort arrays
function setup() {

  //Randomly selects a hex string from sampleArrays and then assigns it to arrInput
  //This is then assigned to current sort, which keeps track of which rotation we are on
  //Initializes rotationNumber to keep track of which rotation number we are on.
  arrInput = random(sampleArrays);
  currentSort = split(arrInput, '');
  arrayLength = arrInput.length;
  rotationNumber = 1;

  //Selection Sort Globals. . . 
  S_Sort_Arr = split(arrInput, '');
  S_Sort_iSelect = 0;
  S_Sort_Sorted = false;
  Select_Sort = 1;

  //GoldsPore Sort Globals. . .
  GP_Sort_Arr = split(arrInput, '');
  GP_Sort_Sorted = false;

  //Quick Sort Globals. . .
  Q_Sort_Arr = split(arrInput, '');
  Q_Sort_partitionStack = [0, arrInput.length - 1];
  Q_Sort_Sorted = false;
  Quick_Sort = 3;


  //Merge Sort Globals. . .
  M_Sort_Arr = split(arrInput, '');
  M_Sort_Sorted = false;
  Merge_Current_Size = 1;
  Merge_Sort = 4;


  //Canvas Initialization
  grid = {
    width: 75,
    height: 50,
    cell_size: 15
  };

  //Creates Canvas and Sets up Display of sort names
  createCanvas(grid.width * grid.cell_size, grid.height * grid.cell_size);
  //creates grid for Selection Sort
  column_Grids(0, 17, 0, 237);
  //creates grid for Gold's Poresort
  column_Grids(18, 35, 267, 506);
  //creates grid for Quick Sort
  column_Grids(36, 53, 538, 776);
  //creates grid for Merge Sort
  column_Grids(55, 72, 822, 1062);

  textSize(20);
  //text to display which rotation we are currently on.
  text("Rotation Number: ", 29 * grid.cell_size, 400);
  text(rotationNumber, 40 * grid.cell_size, 400);

  fill(0);
  textSize(15);
  textAlign(LEFT, TOP);
  text("Selection Sort", 0, 0);
  text("Gold's Poresort", 18 * grid.cell_size, 0);
  text("Quicksort", 36 * grid.cell_size, 0);
  text("Mergesort", 55 * grid.cell_size, 0);
  frameRate(1);

  //Sets initial location for sorts to display
  currentRow = 2;
  S_Sort_Display(S_Sort_Arr);
  GP_Sort_Display(GP_Sort_Arr);
  Q_Sort_Display(Q_Sort_Arr);
  M_Sort_Display(M_Sort_Arr);
  //flag to know whether screen has been reset
  resetRan = false;
}

//Main looping function
function draw() {
  //Iterates current row to proper position of next line
  ++currentRow;
  //check if all the sorts have completed sorting
  if (S_Sort_Sorted && GP_Sort_Sorted && Q_Sort_Sorted && M_Sort_Sorted) {

    //rotate the function
    currentSort = (sortRotation(currentSort));

    //check if the array has completed a full lap and we are done
    if (compareArrays(currentSort)) {
      noLoop();
      //display text to indicate process is done
      textSize(20);
      fill(0);
      text("Final Rotation Sorted :)", 28.6 * grid.cell_size, 415)
    } else {
      //assign newly rotated sort to all sorts
      S_Sort_Arr = currentSort.slice(0);
      GP_Sort_Arr = currentSort.slice(0);
      Q_Sort_Arr = currentSort.slice(0);
      M_Sort_Arr = currentSort.slice(0);
      //reset Quick Sort Partition Stack
      Q_Sort_partitionStack = [0, arrInput.length - 1];
      //resets Merge Sort Current Size
      Merge_Current_Size = 1;

      //set all the sorted statuses to false
      S_Sort_Sorted = false;
      GP_Sort_Sorted = false;
      Q_Sort_Sorted = false;
      M_Sort_Sorted = false;


      //runs a function to reset the screen for the new rotation 
      resetScreen();
    }

  }
  //checks to see if the screen has been reset in the current 
  //iteration of the draw function; if it has been reset,
  //the sort functions are not called.
  if (!resetRan) {
    //checks if Selection Sort has finished
    if (!Sort_isSorted(S_Sort_Arr, Select_Sort)) {
      S_Sort_Step();
      S_Sort_Display(S_Sort_Arr);
      S_Sort_iSelect++;

      if (S_Sort_iSelect == 15) {
        S_Sort_iSelect = 0;
      }
    }

    //Checks if GoldsPore Sort has finished
    if (!GP_Sort_Sorted) {
      GP_Sort_Step();
      if (!GP_Sort_Sorted)
        GP_Sort_Display(GP_Sort_Arr);
    }
    if (!Q_Sort_Sorted && !Sort_isSorted(Q_Sort_Arr, Quick_Sort)) {
      Q_Sort_Step();
      if (!Q_Sort_Sorted)
        Q_Sort_Display(Q_Sort_Arr);
    }
    if (!M_Sort_Sorted && !Sort_isSorted(M_Sort_Arr, Merge_Sort)) {
      M_Sort_Step();
      M_Sort_Display(M_Sort_Arr);
    }
  }
  //sets flag back to false for next iteration of draw()
  resetRan = false;
}
//Goes through a single pass/step of the Selection sort
function S_Sort_Step() {

  //minIndex keeps track of the index of the smallest element
  var minIndex = S_Sort_iSelect;

  //Loops through array finding index of smallest element
  for (var j = S_Sort_iSelect; j < arrInput.length; j++) {
    if (S_Sort_Arr[j] < S_Sort_Arr[minIndex]) {
      minIndex = j;
    }
  }
  //swaps the elements of the minIndex with the iSelect/currentStep index
  var tempSelect = S_Sort_Arr[S_Sort_iSelect];
  S_Sort_Arr[S_Sort_iSelect] = S_Sort_Arr[minIndex];
  S_Sort_Arr[minIndex] = tempSelect;

}

//Goes through a single pass/step of the GoldsPore sort
function GP_Sort_Step() {
  //Assume array is sorted, like Bubble Sort
  GP_Sort_Sorted = true;

  //First,Even half pass, i = 0
  for (let i = 0; i + 1 < arrInput.length; i += 2) {
    //compare pair in case of necessary swap
    if (GP_Sort_Arr[i + 1] < GP_Sort_Arr[i]) {
      let tempGold = GP_Sort_Arr[i];
      GP_Sort_Arr[i] = GP_Sort_Arr[i + 1];
      GP_Sort_Arr[i + 1] = tempGold;

      //swap occurred so program needs another iteration
      GP_Sort_Sorted = false;
    }
  }

  //Second,odd half pass, i = 1
  for (let i = 1; i + 1 < arrInput.length; i += 2) {
    //compare pair in case of necessary swap
    if (GP_Sort_Arr[i + 1] < GP_Sort_Arr[i]) {
      let tempGold = GP_Sort_Arr[i];
      GP_Sort_Arr[i] = GP_Sort_Arr[i + 1];
      GP_Sort_Arr[i + 1] = tempGold;

      //swap occurred so program needs another iteration
      GP_Sort_Sorted = false;
    }
  }
}

//Goes through a single pass/step of the Quick sort
function Q_Sort_Step() {
  if (Q_Sort_partitionStack.length == 0) {
    Q_Sort_Sorted = true;
  }
  //variable to keep track of how many sublists we began with on THIS pass 
  //(divided by two for start and end of list)
  numSublists = Q_Sort_partitionStack.length / 2;



  while (numSublists != 0) {

    //use shift to create start and end of sublist, and allow for future sublists to be sorted
    start = Q_Sort_partitionStack.shift();
    end = Q_Sort_partitionStack.shift();

    //Calls partition function to find desired pivot index
    pivot = Q_Sort_Partition(start, end);

    //check if elems exist on LHS of pivot
    if (pivot - 1 > start) {
      Q_Sort_partitionStack.push(start);
      Q_Sort_partitionStack.push(pivot - 1);
    }

    //check if elems exist on RHS of pivot
    if (pivot + 1 < end) {
      Q_Sort_partitionStack.push(pivot + 1);
      Q_Sort_partitionStack.push(end);
    }
    numSublists--;
  }
}


//Partition function of quick sort, by default picks RHS/end of list as pivot, 
//Moves all elements less than pivot to left and all elements greater than pivot to right
function Q_Sort_Partition(start, end) {

  //assigns pivot
  pivot = Q_Sort_Arr[end];

  //keeps track of the index where elements will be placed if they are greater than pivot
  lhs = start - 1;


  for (let i = start; i <= end - 1; i++) {
    //compare current elem with pivot, if larger, place on RHS by swapping 
    if (Q_Sort_Arr[i] <= pivot) {
      lhs++;
      var tempQuick = Q_Sort_Arr[lhs];
      Q_Sort_Arr[lhs] = Q_Sort_Arr[i];
      Q_Sort_Arr[i] = tempQuick;

      //iterate rhs so next elem is placed in proper position
    }

  }

  //once sublist has been iterated through, swap pivot
  var tempQuick2 = Q_Sort_Arr[lhs + 1];
  Q_Sort_Arr[lhs + 1] = Q_Sort_Arr[end];
  Q_Sort_Arr[end] = tempQuick2;

  //returns index of pivot, now in proper location
  return lhs + 1;


}


//Goes through a single pass of the Merge Sort
function M_Sort_Step() {

  //Manages the size of our sublists
  //If we ever have sublists of size 16, we know we are done
  if (Merge_Current_Size == 16) {
    M_Sort_Sorted = true;
  }
  //Otherwisae, we have not completed sorting and need to continue
  else {

    //Variable to keep track of the start of LHS sublist
    var left_Start;

    //iterates through list and combines sublists that are next to one another,
    //one pass will double the size of the current sublists until we have one fully sorted list
    for (left_Start = 0; left_Start < (arrayLength - 1); left_Start += 2 * Merge_Current_Size) {

      //functions as the end of the LHS list, mid + 1 is starting index of RHS list
      var middle = Math.min(left_Start + Merge_Current_Size - 1, arrayLength - 1);

      //RHS end index
      var rhs_End = Math.min(left_Start + 2 * Merge_Current_Size - 1, arrayLength - 1);

      //Calls the merger function to combine the two sublists into a single sorted list,
      //Organized to sort in ascending order
      M_Sort_Merger(left_Start, middle, rhs_End);
    }
    Merge_Current_Size = 2 * Merge_Current_Size;
  }
}

//Merger function. Combines 2 smaller sorted lists into 1 larger sorted list
function M_Sort_Merger(lhs_s, mid, rhs_e) {

  //variables. . .
  var lhsIndex; //How far we're into left sublist     
  var rhsIndex; //How far we're into right sublist   
  var newArrIndex; //how far we're intom new list   
  var f_half = mid - lhs_s + 1; //size left side list
  var s_half = rhs_e - mid; //size of right side list

  //temporary arrays to hold left and right sublists
  let leftTemp = [f_half];
  let rightTemp = [s_half];


  //assigns values into left temp array
  for (lhsIndex = 0; lhsIndex < f_half; lhsIndex++) {
    leftTemp[lhsIndex] = M_Sort_Arr[lhs_s + lhsIndex];
  }

  //ditto for right temp array
  for (rhsIndex = 0; rhsIndex < s_half; rhsIndex++) {
    rightTemp[rhsIndex] = M_Sort_Arr[mid + 1 + rhsIndex];
  }

  //sets to zero to begin comparing two sublists
  lhsIndex = 0;
  rhsIndex = 0;
  newArrIndex = lhs_s;

  //compares front index of each list, smaller elem is placed into new list
  //we then move to next elem on sublist that had smaller element
  while (lhsIndex < f_half && rhsIndex < s_half) {
    if (leftTemp[lhsIndex] <= rightTemp[rhsIndex]) {
      M_Sort_Arr[newArrIndex] = leftTemp[lhsIndex];
      lhsIndex++;
    } else {
      M_Sort_Arr[newArrIndex] = rightTemp[rhsIndex];
      rhsIndex++;
    }
    newArrIndex++;
  }
  //once one sublist has been exhausted of resources, add remaining elements of the other sublist
  //onto the new list
  while (lhsIndex < f_half) {
    M_Sort_Arr[newArrIndex] = leftTemp[lhsIndex];
    lhsIndex++;
    newArrIndex++;
  }

  while (rhsIndex < s_half) {
    M_Sort_Arr[newArrIndex] = rightTemp[rhsIndex];
    rhsIndex++;
    newArrIndex++;
  }
}

//Displays Selection sort
function S_Sort_Display(arr) {
  fill('red');
  for (let index = 0; index < 16; ++index)
    text(arr[index], index * grid.cell_size, currentRow * grid.cell_size);
}


//Displays GoldsPore sort
function GP_Sort_Display(arr) {
  fill('blue');
  for (let ind = 0; ind < 16; ++ind)
    text(arr[ind], (ind + 18) * grid.cell_size, currentRow * grid.cell_size);
}

//Displays QuickSort
function Q_Sort_Display(arr) {
  fill('black');
  for (let ind = 0; ind < 16; ++ind)
    text(arr[ind], (ind + 36) * grid.cell_size, currentRow * grid.cell_size);
}

function M_Sort_Display(arr) {
  fill('green');
  for (let ind = 0; ind < 16; ++ind)
    text(arr[ind], (ind + 55) * grid.cell_size, currentRow * grid.cell_size);
}

//function to check if selection sort is done sorting
function Sort_isSorted(a, sort) {
  //if not done sorting, set to false
  for (var indexSelect = 0; indexSelect < a.length - 1; indexSelect++) {
    if (a[indexSelect] > a[indexSelect + 1]) {
      return false;
    }
  }
  //if done sorting, set to true
  if (sort == 1)
    S_Sort_Sorted = true;
  if (sort == 3)
    Q_Sort_Sorted = true;
  if (sort == 4)
    M_Sort_Sorted = true;
  return true;
}


//Compares Current Array to the original array to see if we are done with the sort race
function compareArrays(a) {
  for (var k = 0; k < a.length; k++) {
    if (a[k] != arrInput[k]) {
      return false;
    }
  }
  return true;
}


/*Rotates every element in the array up 1 elem, 
pushing the 0 index element to the last index*/

function sortRotation(arr) {
  //creating temp to hold first elem
  var i = 0;
  let temp = arr[i];

  for (i; i < arr.length - 1; i++) {
    arr[i] = arr[i + 1];
  }

  arr[i] = temp;

  return arr;

}

function resetScreen() {
  //clears the screen and re-sets up the canvas
  clear();
  fill(0);

  //incrememnts rotation number as we have moved on to next rotation.
  rotationNumber++;
  //text to display which rotation we are currently on.
  textSize(20);
  text("Rotation Number: ", 29 * grid.cell_size, 384.5);
  text(rotationNumber, 40 * grid.cell_size, 384.5);


  //displays name of sort
  textSize(15);
  text("Selection Sort", 0, 0);
  text("Gold's Poresort", 18 * grid.cell_size, 0);
  text("QuickSort", 36 * grid.cell_size, 0);
  text("Mergesort", 55 * grid.cell_size, 0);

  //creates grid for Selection Sort
  column_Grids(0, 17, 0, 237);
  //creates grid for Gold's Poresort
  column_Grids(18, 35, 267, 506);
  //creates grid for Quick Sort
  column_Grids(36, 53, 538, 776);
  //creates grid for Merge Sort
  column_Grids(55, 72, 822, 1062);
  currentRow = 2;
  //displays the newly rotated string...
  S_Sort_Display(S_Sort_Arr);
  GP_Sort_Display(GP_Sort_Arr);
  Q_Sort_Display(Q_Sort_Arr);
  M_Sort_Display(M_Sort_Arr);
  //flags that a reset of the canvas has occured.
  resetRan = true;
}

function column_Grids(v_start, v_end, h_start, h_end) {
  //Vertical lines
  for (i = v_start; i < v_end; i++) {
    line((grid.cell_size * i) - 3, 1.9 * grid.cell_size, (grid.cell_size * i) - 3, 20.8 * grid.cell_size);
  }
  //Horizontal lines
  for (i = 0; i < 20; i++) {
    line(h_start, ((i + 2) * grid.cell_size) - 2, h_end, ((i + 2) * grid.cell_size) - 2);
  }
}