let task = document.querySelector("#input")
let ul;
let li;
let box;
let checkbox;
let val = "";
let todolist = [];
let get;
let getarray;

task.addEventListener('change',()=>{
    val = task.value   
})

document.addEventListener('keydown',(e)=>{
    if(e.code=='Enter'){
        add()
    }
})

function render(){
    ul = document.querySelector("#list")
    ul.innerHTML=""
    get = localStorage.getItem('todo')
    getarray = JSON.parse(get)
    for(let i=0; i<getarray.length; i++){
        let newel = document.createElement('li');
        newel.classList= "mycheck"
        ul.prepend(newel);
        let newele = document.createElement('input')
        newele.type = "checkbox"
        if(getarray[i].status=='pending'){
            newel.classList.add("uncompleted")
        }
        else{
            newel.classList.add("completed")  
            newele.setAttribute("checked","true")
        }
        newele.id = "check"
        newel.appendChild(newele)
        let newelem = document.createElement('LABEL')    
        newelem.innerHTML= getarray[i].text
        newel.appendChild(newelem)
        task.value=""
        val=""
    }
    operation();
}
render();

function add(){
  if(val==""){
      let er = document.createElement('p')
      er.innerHTML="Invalid Entry"
      ul.prepend(er)
      setTimeout(()=>{
          let msg = document.querySelectorAll('p')
          for(i=0; i<msg.length; i++){
              msg[i].remove()
          }

      },1000)
  }
  else{ 
        get = localStorage.getItem('todo')
        getarray = JSON.parse(get)
        if(getarray){
            getarray.push({text:val,status:'pending'})
            localStorage.setItem('todo',JSON.stringify(getarray))
        }
        else{
            todolist.push({text:val,status:'pending'})
            localStorage.setItem('todo',JSON.stringify(todolist))
        }
       render();
       
}}

function operation(){
    box = document.querySelectorAll('input[type="checkbox"]')
    for (let j=0; j<box.length; j++){
        li = document.querySelectorAll('li')  
        box[j].addEventListener('click',(e)=>{
        box[j].completed = e.target.checked;
        let find = box[j].parentElement.lastElementChild.innerHTML
        if (box[j].completed) {
            li[j].classList.add("completed");
            li[j].classList.remove("uncompleted");
                for(let k=0; k<getarray.length; k++){
                    if(getarray[k].text == find){
                        getarray[k].status='done';
                        localStorage.setItem('todo',JSON.stringify(getarray))
                    }
                }                            
        } 
        else {
            li[j].classList.add("uncompleted");
            li[j].classList.remove("completed");
            for(let k=0; k<getarray.length; k++){
                if(getarray[k].text == find){
                    getarray[k].status='pending';
                    localStorage.setItem('todo',JSON.stringify(getarray))
                }
                }         
        }
        })
    }

}

function rem(){
    get = localStorage.getItem('todo')
    getarray = JSON.parse(get)
    for(let l=0; l<getarray.length; l++){
        if(getarray[l].status=='done'){
            getarray.splice(l,1);
            localStorage.setItem('todo',JSON.stringify(getarray))
            get = localStorage.getItem('todo')
            getarray = JSON.parse(get)
            l--
        }
    }
    render();
}

