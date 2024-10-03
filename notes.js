function handleFormSubmit(event) {
    event.preventDefault();
  
    // Access form data correctly
    const userDetails = {
      title: event.target.title.value,
      desc: event.target.desc.value, // Accessing textarea value
    };
  
    // Send post request to save the note
    axios
      .post(
        "https://crudcrud.com/api/5da6e4e38370424dbf67f5d2e0e605c2/NotesData",
        userDetails
      )
      .then((response) => {
        displayUserOnScreen(response.data); // Display the added note
        updateNoteCount(); 
      })
      .catch((error) => console.log(error));
  
    // Clear the form fields
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    // Fetch and display existing notes when page loads
    axios
      .get("https://crudcrud.com/api/5da6e4e38370424dbf67f5d2e0e605c2/NotesData")
      .then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          displayUserOnScreen(response.data[i]);
        }
        updateNoteCount(); 
      })
      .catch((error) => console.log(error));
  });
  
  function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
      document.createTextNode(`${userDetails.title} - ${userDetails.desc}`)
    );
  
    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);
  
    // Create edit button
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);
  
    const userList = document.querySelector("ul");
    userList.appendChild(userItem);
  
    // Delete functionality
    deleteBtn.addEventListener("click", function () {
      axios
        .delete(
          `https://crudcrud.com/api/5da6e4e38370424dbf67f5d2e0e605c2/NotesData/${userDetails._id}`
        )
        .then(() => {
          userList.removeChild(userItem); // Remove from the screen
          console.log(`User with ID ${userDetails._id} deleted successfully`);
          updateNoteCount(); 
        })
        .catch((error) => console.log(error));
    });
  
    // Edit functionality
    editBtn.addEventListener("click", function () {
      document.getElementById("title").value = userDetails.title;
      document.getElementById("desc").value = userDetails.desc;
  
      currentUserId = userDetails._id;
  
      // Remove the note for editing purposes
      axios
        .delete(
          `https://crudcrud.com/api/5da6e4e38370424dbf67f5d2e0e605c2/NotesData/${userDetails._id}`
        )
        .then(() => {
          userList.removeChild(userItem);
          updateNoteCount();
          console.log(`User with ID ${userDetails._id} deleted for editing`);
        })
        .catch((error) => console.log(error));
    });
  }
  function updateNoteCount() {
    axios
      .get("https://crudcrud.com/api/5da6e4e38370424dbf67f5d2e0e605c2/NotesData")
      .then((response) => {
        const noteCount = response.data.length; // Calculate total notes
        document.getElementById("note-count").textContent = noteCount; // Display count
      })
      .catch((error) => console.log(error));
  }  