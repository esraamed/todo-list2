var inputs=document.getElementById('inputs');
var btns=document.getElementById("btns");
var spinner=document.getElementById("spinner");

btns.addEventListener("click",function(){
    
    var data={
        title:inputs.value,
        apiKey:"66d8c11960a208ee1fdd4f8d"
    }
    
        addtask(data);
    
   
})
async function addtask(data){
    var send=await fetch('https://todos.routemisr.com/api/v1/todos',{
        method:'post',
        body:JSON.stringify(data),
        headers:{'content-type':'application/json'}
    })
    var recive= await send.json();
    if(recive.message=='success'){
        alltasks()
    }
    console.log(recive);
    
}
//ليه اديت object لل function
async function alltasks(){
    
    var all=await fetch('https://todos.routemisr.com/api/v1/todos/66d8c11960a208ee1fdd4f8d');
    var tasks=await all.json();
    console.log(tasks);
    if(tasks.message=="success"){
        spinner.classList.add('d-none')
        
        display(tasks.todos)
    }
   
    
}
alltasks()
function display(all){
    var cartona=``;
    for(i=0;i<all.length;i++){
        cartona+=`  <div class="task w-75 mx-auto  rounded-2 d-flex align-items-center justify-content-between text-center py-2 mb-3  ${ all[i].completed ? 'bg-danger' : ''}">
              <div class="item1">
                <p class="m-0 ps-3 fs-6 ${ all[i].completed ? 'text-decoration-line-through' : ''}"> ${all[i].title}</p>
              </div>
              <div class="item2">
                <i onclick="marktask('${all[i]._id}')" class="fa-regular fa-circle-check fs-4  me-2  ${ all[i].completed ? 'd-none' : ''}"></i>
                <i onclick="deletetask('${all[i]._id}')"   class="fa-solid fa-trash me-2 fs-4  delete" ></i> 
              </div>
            </div>`
    }
    document.getElementById('demo').innerHTML=cartona;
}
async function deletetask(id){
    var send=await fetch('https://todos.routemisr.com/api/v1/todos',{
        method:'delete',
        body:JSON.stringify({
            todoId: id
        }),
        headers:{'content-type':'application/json'}
    })
    var recive= await send.json();
    if(recive.message=='success'){
        alltasks()
    }
    console.log(recive);}

    async function marktask(id){
        var send=await fetch('https://todos.routemisr.com/api/v1/todos',{
            method:'put',
            body:JSON.stringify({
                todoId: id
            }),
            headers:{'content-type':'application/json'}
        })
        var recive= await send.json();
        if(recive.message=='success'){
            alltasks()
        }
        console.log(recive);}

