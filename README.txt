CPSC-335-03-PROJECT_2
BY:		SuperTeam
TEAM MEMBERS:	Zach Serna, Nicole Serna


INTRO:

We have designed a "Sort Race". Which compares the speed of 4 sorts,
measuring how well they can handle sorting a pseudo-random hexadecimal string
of size 16. Once the hexadecimal string has been sorted, it will then be rotated
once by shifting the 0 index element all the way to the end, pushing all the 
other elements in the array one forward in the array.The Sorts include:
Selection Sort, Gold's Pore Sort, Quick Sort and the Merge Sort. The Sort Race will
allow each Sort a "pass", a single iteration of the sortwhich will then be 
displayed to the monitor. The program keeps track of which rotation we
are currently on, displaing this number below the sorts. 
Once all the sorting algorithms have completed, the program will finish.


CONTENTS:

1. Sort_Race_HTML.html
2. p5.js
3. p5.sound.min.js
4. sketch.js
5. style.css
6. README.txt (you are here!)
7. sample_execution.jpg
8. Runtime Analysis


EXTERNAL REQUIREMENTS:

1. A browser that can support both HTML and Java Script

SETUP/INSTALLATION:

1. Open a browser that can support both html and JavaScript (Chrome should suffice).

2. place the  Sort_Race_HTML file into the browser by dragging it into the browser.

3.  Execute.


FEATURES:


SORTS:

The 4 Sorts "competing" in the Sort Race

1. Selection Sort

2. Gold's Pore Sort 

3. Quick Sort

4. Merge Sort


Note: To properly display the Merge sort and Quick sort, we use an non-recursive iteration
of these sorts.

SORT COMPONENTS:
Each sort has individual components attached to it, allowing each sort to keep track
of which pass it is currently on as well as other important statistics.
These components include:

currentRow: Keeps track of the row the string will be displayed to.

rotationNumber: keeps track of which rotation we are on for display

sampleArrays: holds provided sample hex strings for random selection

arrInput: The original selected hex string that will be sorted

currentSort: The current rotation of the hex string we are on

Select_Sort: used for the isSorted function to see which sort we are checking
to see if it has completed sorting. (1: Select,2: GoldsPore,3: Quick,4: Merge)


GENERAL COMPONENTS:

(sort)_Sort_Arr: The hexadecimal string currently being sorted by the respective Sort

(sort)_Sort_Sorted: Keeps track of whether or not the string is done sorting.


UNIQUE COMPONENTS:

Quick Sort:
Q_Sort_partitionStack: keeps track of the start and end of the sublists that
need to be sorted. When it is empty we have finished sorting.




SORT RACE: 

Each sort will undergo one pass which will then be displayed onto the screen under
the respective sort's name. If the displayed string reach the bottom of the screen,
the screen will be wiped, allowing for more strings to be displayed at the top.This
will continue until each sorting algorithm has sorted the algorithm which will then
rotate the algorithm. The algorithm will continue to rotate until it rotates to its
starting position. 

RESET:
When all the sorts have finished sorting the current rotation, the screen/ canvas are reset
and the hexadecimal string is rotated. This will continue until the string is rotated back
to its original form. There should be 16 total rotations as the size of the hex string is 16.
When 16 rotations have been complete, we are fully done and the program ends.


BUGS: None!



















