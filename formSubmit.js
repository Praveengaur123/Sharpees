function handleFormSubmit(event){
    event.preventDefault()
    //fetching the input data 
    const userDetails={
       username :event.target.username.value,
       email:event.target.email.value,
       phone:event.target.phone.value
    }
    axios
    .post("https://crudcrud.com/api/0637a81530f743679663fe723e0d8f1d/todos",
        userDetails)
        .then((response)=> displayUserOnScreen(response.data))
        .catch((err)=>console.log(err));
    //clearing the output
    document.getElementById("username").value="";
    document.getElementById("phone").value="";
    document.getElementById("email").value="";
    
}

    // display user on screen
    function displayUserOnScreen(userDetails){
        const userItem=document.createElement("li")
        userItem.appendChild(
            document.createTextNode(
                `${userDetails.username}-${userDetails.email}-${userDetails.phone}`
            )
        )
        const deleteBtn=document.createElement("button")
        deleteBtn.appendChild(document.createTextNode("Delete"))
        userItem.appendChild(deleteBtn)

        const editBtn=document.createElement("button")
        editBtn.appendChild(document.createTextNode("Edit"))
        userItem.appendChild(editBtn)

        deleteBtn.addEventListener("click" ,function(event){
            userList.removeChild(event.target.parentElement)
            localStorage.removeItem(userDetails.email)
        })
        editBtn.addEventListener("click",function(event){
            userList.removeChild(event.target.parentElement)
            localStorage.removeItem(userDetails.email)
            document.getElementById("username").value=userDetails.username;
            document.getElementById("phone").value=userDetails.phone;
            document.getElementById("email").value=userDetails.email;
        })

        const userList=document.querySelector("ul")
        userList.appendChild(userItem)
    }
