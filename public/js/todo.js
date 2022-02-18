var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks
var TasksHolder = document.getElementById("tasks");
let  notes=[];
const host="http://localhost:5000"
//New Task List Item

var createNewTaskElement = function(taskString) {
	//Create List Item
	console.log(taskString,"idddddd")
	var listItem = document.createElement("li");

	//input (checkbox)
	//label
	var label = document.createElement("label");
	//input (text)
	var editInput = document.createElement("input"); // text
	//button.edit
	var editButton = document.createElement("button");
	//button.delete
	var deleteButton = document.createElement("button");

	//Each element needs modifying

	editInput.type = "text";

	editButton.innerText = "Edit";
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";
    deleteButton.id = taskString._id;
	label.innerText = taskString.description;

	//Each element needs appending
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);


	//bind editTask to edit button
	// editButton.onclick = editTask;
editButton.addEventListener('click',function(){
	editTask(taskString,listItem);
})
	//bind deleteTask to delete button
	// deleteButton.onclick = deleteTask;
	deleteButton.addEventListener("click", function() {
		deleteTask(taskString,listItem);
	})
	return listItem;
}

//Add a new task
var addTask =async function() {
    const response = await fetch(`${host}/api/list/addlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({  description: taskInput.value }),
    });
    let note = await response.json();
    // setNotes(notes.concat(note));
    
	console.log("Add task...");
	//Create a new list item with the text from #new-task:
	//Append listItem to incompleteTasksHolder
	
	var listItem = createNewTaskElement(note);
	TasksHolder.appendChild(listItem)
		
	
	taskInput.value = "";
}
var fetchall =async function() {
	
	const response = await fetch(`${host}/api/list/fetchlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
	  const jsonnn = await response.json();
      console.log(jsonnn);
      notes=jsonnn;

      console.log(notes);
	 
	  notes.forEach(element => {
        console.log(element.description);
		var listItem = createNewTaskElement(element);
		TasksHolder.appendChild(listItem)
		//Append listItem to incompleteTasksHolder
	  }
		  
	  );
}

fetchall();
//Edit an existing task
var editTask = async function(obj,listItem) {
	console.log("Edit task...");

    console.log(listItem);
	var editInput = listItem.querySelector("input[type=text");
	var label = listItem.querySelector("label");

	var containsClass = listItem.classList.contains("editMode");

	//if the class of the parent is .editMode
	if (containsClass) {
		//Switch from .editMode
		//label text become the input's value
		label.innerText = editInput.value;
	} else {
		//Switch to .editMode
		//input value becomes the label's text
		editInput.value = label.innerText;
	}

	//Toggle .editMode on the list item
	listItem.classList.toggle("editMode");
   
	const {_id}=obj;
    const response = await fetch(`${host}/api/list/updatelist/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({  description : editInput.value }),
    });
      const jsonn= await response.json();
    console.log(jsonn);  
  

}

//Delete an existing task

var deleteTask = async function(obj,lii) {
	
    const response = await fetch(`${host}/api/list/deletelist/${obj._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = await response.json();
         console.log('del mdg',json)
    //  //console.log("deleting the node"+id);
   
	console.log("Delete task...");
	TasksHolder.removeChild(lii);
}

//Mark a task as complete



//Mark a task as incomplete





// var ajaxRequest = function() {
// 	console.log("AJAX request");
// }

//Set the click handler to the addTask function

addButton.addEventListener("click", addTask);

//addButton.addEventListener("click", ajaxRequest);

//cycle over incompleteTasksHolder ul list items

for (var i = 0; i < TasksHolder.children.length; i++) {
	//bind events to list item's children (taskComplete
}