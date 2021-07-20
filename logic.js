const tasks = [];
const taskbars = document.querySelectorAll('.taskbar');
const taskcreate = document.getElementById('taskspace');
const tasksToBeDone = [];
const tasksInProgress = [];
const doneTasks = [];
taskcreate.addEventListener('dragover', dragOver);
taskcreate.addEventListener('dragenter', dragEnter);
taskcreate.addEventListener('dragleave', dragLeave);
taskcreate.addEventListener('drop', dragDrop);
var counter = 0;

const taskspace = document.getElementById('taskspace');
var taskspaceheight = taskspace.offsetHeight;
var taskheight = 54;
function createTask(){
    let taskname = document.getElementById('task_description').value; 
    if(taskspaceheight/(taskheight * tasks.length) < 1.2){
        window.alert('No more tasks can be added.');
    }else{
        if(taskname.length == 0){
            window.alert('Name your task please...');
        }else{
            document.getElementById('task_description').value = "";
            let newtask = document.createElement('div'); 
            let deletetask = document.createElement('div');
            deletetask.classList.add('deletetask');
            newtask.classList.add('task');
            newtask.textContent = taskname;
            newtask.draggable = "true";
            tasks.push(newtask);
            console.log(newtask);
            const taskbar = document.getElementById('taskspace');
            taskbar.append(newtask);
            newtask.addEventListener('dragstart', dragStart);
            newtask.addEventListener('dragend', dragEnd);
            counter++;
            deletetask.addEventListener('click', ()=>{
                console.log('hehe');
            })
            
        }
    }
}

function dragStart(){
    this.classList.add('hold');
    setTimeout(()=>{
        this.classList.add('hidden');
    },0);
    console.log(`started dragging ${this.innerHTML}`)
}


function dragEnd(){
    this.classList.remove('hold');
    this.classList.remove('hidden');
    console.log(`ended dragging ${this.innerHTML}`)
}


for(const item of taskbars){
    item.addEventListener('dragover', dragOver);
     item.addEventListener('dragenter', dragEnter);
     item.addEventListener('dragleave', dragLeave);
     item.addEventListener('drop', dragDrop);
}


function dragOver(e){
    e.preventDefault();
    console.log(`dragged over ${this.innerHTML}`)
}

function dragEnter(e){
    e.preventDefault();
    this.classList.add('hovered')
    console.log(`entering ${this.innerHTML}`)
}

function dragLeave(){
    this.classList.remove('hovered');
    console.log(`left ${this.innerHTML}`)
}

function dragDrop(){
    console.log(`dropped at ${this.innerHTML}`);
    var current = document.getElementsByClassName('hold').item(this);
    console.log(current);
    this.append(current);
    this.classList.remove('hovered');
    if(this.id === "tasks_to_be_done"){
        current.classList.remove('in_progress','done');
        current.classList.add('to_be_done');
        counter--;
        tasksToBeDone.push(current);
        if(counter<0){
            counter = 0;
        }  
    }else if(this.id === "tasks_in_progress"){
        current.classList.remove('done', 'to_be_done');
        current.classList.add('in_progress');
        counter--;
        tasksInProgress.push(current);
        if(counter<0){
            counter = 0;
        }
    }else if(this.id === "taskspace"){
        current.classList.remove('done', 'in_progress','to_be_done');
        counter++;
    }
    else{
        current.classList.remove('to_be_done');
        current.classList.remove('in_progress');
        current.classList.add('done');
        counter--;
        doneTasks.push(current);
        if(counter<0){
            counter = 0;
        }
    }
}

