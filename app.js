//selectors 
const goalInput = document.querySelector('.goal-input');
const goalButton = document.querySelector('.goal-button');
const goalList = document.querySelector('.goal-list'); //append all the goals to the goal list 

//event listeners 
goalButton.addEventListener('click', addGoal);
goalList.addEventListener('click', deleteCheck); 

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
        goal.remove();
    }  

    //check mark 
    if(item.classList[0] === 'complete-btn'){ 
        const goal = item.parentElement;
        goal.classList.toggle('completed');  
    }
}