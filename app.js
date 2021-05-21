const inputButton = document.querySelector('.inputField input');

const addBtn = document.querySelector('.inputField button');

const todoList = document.querySelector('.todoList');

const clrBtn = document.querySelector('.footer button');

//onkeyupevent

inputButton.onkeyup = () => {
	let userValue = inputButton.value;
	if(userValue.trim() != 0){
		addBtn.classList.add('active');
	} else {
		addBtn.classList.remove('active');
	}
}

showTasks();

//On clicking + button

addBtn.onclick = () => {
	let userValue = inputButton.value;
	let getLocalStorageData = localStorage.getItem("New Todo");
	if(getLocalStorageData == null){
		listArray = [];
	} else {
		listArray = JSON.parse(getLocalStorageData);
	}
	listArray.push(userValue);
	localStorage.setItem("New Todo", JSON.stringify(listArray));	
	showTasks();
	addBtn.classList.remove('active');
}

function showTasks() {
	let getLocalStorageData = localStorage.getItem("New Todo");
	if(getLocalStorageData == null){
		listArray = [];
	} else {
		listArray = JSON.parse(getLocalStorageData);
	}
	const pendingTasksNumb = document.querySelector(".pendingTasks");
	pendingTasksNumb.textContent = listArray.length;
	if(listArray.length > 0){
		clrBtn.classList.add('active');
	} else {
		clrBtn.classList.remove('active');
	}
	let newLiTag = "";
	listArray.forEach((element, index) => {
		// statements
		newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
	});
	todoList.innerHTML = newLiTag;
	inputButton.value = '';
}

function deleteTask(index){
	let getLocalStorageData = localStorage.getItem("New Todo");
	listArray = JSON.parse(getLocalStorageData);
	listArray.splice(index, 1);
	localStorage.setItem("New Todo", JSON.stringify(listArray));
	showTasks();
}

clrBtn.onclick = () => {
	listArray = [];
	localStorage.setItem("New Todo", JSON.stringify(listArray));
	showTasks();
}

