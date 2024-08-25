function handleFormSubmit(event){
    event.preventDefault()
    //fetching the input data 
    const userDetails={
       username :event.target.username.value,
       email:event.target.email.value,
       phone:event.target.phone.value
    }
    //post requset
    axios
    .post("https://crudcrud.com/api/80d7aad262484abc9407bb43604a38ec/todo",
        userDetails)
        .then((response)=> displayUserOnScreen(response.data))
        .catch((err)=>{
            document.body.innerHTML=document.body.innerHTML+"<h4>Something Mystery</h4>"
            console.log(err)
        });
    
    //clearing the output
    document.getElementById("username").value="";
    document.getElementById("phone").value="";
    document.getElementById("email").value="";
    //document.body.innerHTML
    }
//get requset
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/80d7aad262484abc9407bb43604a38ec/todo")
    .then((response)=>{
        console.log(response)
        for(var i=0;i<response.data.length;i++)
        {
            displayUserOnScreen(response.data[i])
        }
    })
})

    // display user on screen
    function displayUserOnScreen(userDetails){
        const userItem=document.createElement("li")
        // assign the iD
        userItem.id=userDetails._id
        userItem.appendChild(
            document.createTextNode(
                `${userDetails.username}-${userDetails.email}-${userDetails.phone}`
            )
        )
        //creating delete button
        const deleteBtn=document.createElement("button")
        deleteBtn.appendChild(document.createTextNode("Delete"))
        userItem.appendChild(deleteBtn)
        // creating edit button
        const editBtn=document.createElement("button")
        editBtn.appendChild(document.createTextNode("Edit"))
        userItem.appendChild(editBtn)
        // delete button functinality
        deleteBtn.addEventListener("click" ,function(event){
            axios.delete(`https://crudcrud.com/api/80d7aad262484abc9407bb43604a38ec/todo/${userDetails._id}`)
            .then((res)=>{
                displayUserOnScreen(res.data)
                    userList.removeChild(event.target.parentElement)
        })
                .catch((err)=>console.log(err));
            })
        
        // edit button functinality
        editBtn.addEventListener("click",function(event){
            localStorage.removeItem(userDetails)
            document.getElementById("username").value=userDetails.username;
            document.getElementById("phone").value=userDetails.phone;
            document.getElementById("email").value=userDetails.email;
            axios.delete(`https://crudcrud.com/api/80d7aad262484abc9407bb43604a38ec/todo/${userDetails._id}`)
            .then((res)=>{
                displayUserOnScreen(res.data)
                    userList.removeChild(event.target.parentElement)
        })
                .catch((err)=>console.log(err));
            
        })
        const userList=document.querySelector("ul")
        userList.appendChild(userItem)
    }

    
