//selectors 
const goalInput = document.querySelector('.goal-input');
const goalButton = document.querySelector('.goal-button');
const goalList = document.querySelector('.goal-list'); //append all the goals to the goal list 
const filterOption = document.querySelector('.filter-goals');

//event listeners 
document.addEventListener('DOMContentLoaded', getgoals); 
goalButton.addEventListener('click', addGoal);
goalList.addEventListener('click', deleteCheck); 
filterOption.addEventListener('input', filterGoals);

//functions 
function addGoal(e) {
    //Prevent form from submitting - browser refreshses 
    e.preventDefault(); 

    //goal div 
    const goalDiv = document.createElement("div"); 
    goalDiv.classList.add("goal");

    //create list that we will add to div 
    const newGoal = document.createElement("li"); 
    newGoal.innerText = goalInput.value; 
    newGoal.classList.add("goal-item"); 
    goalDiv.appendChild(newGoal);

    //Add goal  to local storage 
    saveLocalGoals(goalInput.value);

    //Check mark button for adding a task 
    const completedButton = document.createElement('button'); 
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn'); 
    goalDiv.appendChild(completedButton); 

    //Trash button for inner HTML 
    const trashButton = document.createElement('button'); 
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn'); 
    goalDiv.appendChild(trashButton);

    goalList.appendChild(goalDiv);

    //Clear the input value after adding to list 
    goalInput.value = ""; 
}

function deleteCheck(e){ 
    const item = e.target; 

    //delete goal - rather than removing item, we can remove the parent
    if(item.classList[0] === 'trash-btn'){ 
        const goal = item.parentElement; 

        //Animation - waits til transition finishes to execute this function
        goal.classList.add("fall");
        removeLocalgoals(goal);
        goal.addEventListener("transitionend", function(){
            goal.remove(); 
        });
    }  

    //check mark 
    if(item.classList[0] === 'complete-btn'){ 
        const goal = item.parentElement;
        goal.classList.toggle('completed');  
    }
}

function filterGoals(e) { 
    const goals = goalList.childNodes; 

    goals.forEach(function(goal) { 
        if (goal.nodeType === Node.ELEMENT_NODE) { 
            switch(e.target.value) { 
                case "all": 
                    goal.style.display = 'flex'; 
                    break; 
                case "completed": 
                    if(goal.classList.contains("completed")) { 
                        goal.style.display = 'flex'; 
                    } else { 
                        goal.style.display = "none"; 
                    }
                    break; 
                case "uncompleted": 
                    if(goal.classList.contains("completed")) { 
                        goal.style.display = "none"; 
                    } else { 
                        goal.style.display = "flex"; 
                    }
                    break; 
            }
        }
    })
}

function saveLocalGoals(goal) { 
    let goals; 

    if(localStorage.getItem('goals') === null) { 
        goals = []; 
    } else { 
        goals = JSON.parse(localStorage.getItem('goals')); 
    }

    //whatever is passed is used in the array 
    goals.push(goal); 
    localStorage.setItem('goals', JSON.stringify(goals)); 
}

function getgoals() { 
    let goals; 
    if(localStorage.getItem('goals') === null) { 
        goals = []; //create empty array 
    }else { 
        goals = JSON.parse(localStorage.getItem('goals'));
        //get goals from localStorage 
    }

    //getting the list items 
    goals.forEach(function(goal){ 
        const goalDiv = document.createElement("div"); 
    goalDiv.classList.add("goal"); 


    //Add new goal to the list then append to the div 
    const newgoal = document.createElement('li'); 
    newgoal.innerText = goal;
    newgoal.classList.add('goal-item');
    goalDiv.appendChild(newgoal); 

    //Check mark button for adding a task 
    const completedButton = document.createElement('button'); 
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn'); 
    goalDiv.appendChild(completedButton); 

    //Trash button for inner HTML 
    const trashButton = document.createElement('button'); 
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn'); 
    goalDiv.appendChild(trashButton);

    //adding the div with the list item and 2 buttons to the list 
    goalList.appendChild(goalDiv); 
    })

}

function removeLocalgoals(goal) { 
    let goals; 
    if(localStorage.getItem('goals') === null) { 
            goals = []; //create empty array 
        }else { 
            goals = JSON.parse(localStorage.getItem('goals'));
            //get goals from localStorage 
        }
        //locate the goals to be removed 
        const goalsIndex = goal.children[0].innerText;
        //remove that one goal item 
        goals.splice(goals.indexOf(goalsIndex), 1);
        //update localStorage 
        localStorage.setItem('goals', JSON.stringify(goals));
}