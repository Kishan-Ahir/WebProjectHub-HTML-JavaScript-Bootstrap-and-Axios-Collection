// Get DOM elements
let button = document.getElementById("submit");
let ul = document.getElementById("product-list");

// Event listeners
button.addEventListener("click", savedata);
ul.addEventListener("click", removeproduct);
ul.addEventListener("click", editproduct);
window.addEventListener("load", showdata);

// Save data to the server
function savedata(event) {
  event.preventDefault();
  let clientname = document.getElementById("name").value;
  let clientemail = document.getElementById("email").value;
  let clientphone = document.getElementById("Phone").value;

  let details = {
    clientname,
    clientemail,
    clientphone,
  };

  axios
    .post("https://crudcrud.com/api/ead6dddf4a1a4c68b87db07b7bd8e8f2/data", details)
    .then(() => {
      showdata();
    })
    .catch((err) => {
      alert(err);
    });
}

// Display data on the screen
function showonscreen(data) {
  let li = document.createElement("li");
  li.className = "list-group-item";

  // Create a text node with data
  li.appendChild(
    document.createTextNode(
      `Name is ${data.clientname}. Email address is ${data.clientemail}. Phone number is ${data.clientphone}.`
    )
  );

  // Create delete button
  let deletbtn = document.createElement("button");
  deletbtn.className = "btn btn-danger delete";
  deletbtn.style = "margin-left:5px"
  deletbtn.textContent = "X";

  // Create edit button
  let editbtn = document.createElement("button");
  editbtn.className = "btn btn-dark edit";
  editbtn.style = "margin-left:10px";
  editbtn.textContent = "Edit";

  // Append buttons to the list item
  li.appendChild(editbtn);
  li.appendChild(deletbtn);
  ul.appendChild(li);

  // Set data-id attribute for the list item
  li.setAttribute("data-id", data._id);
}

// Remove a product from the list
function removeproduct(event) {
  if (event.target.classList.contains("delete")) {
    let li = event.target.parentNode;
    let id = li.getAttribute("data-id");
    ul.removeChild(li);
    axios.delete(`https://crudcrud.com/api/ead6dddf4a1a4c68b87db07b7bd8e8f2/data/${id}`);
  }
}

// Edit a product in the list
function editproduct(event) {
  if (event.target.classList.contains("edit")) {
    let li = event.target.parentNode;
    let id = li.getAttribute("data-id");
    let clientname = li.textContent.split(" is ")[1].split(".")[0];
    let clientemail = li.textContent.split(" is ")[2].split(". ")[0];
    let clientphone = li.textContent.split(" is ")[3].split(".")[0];

    // Populate form fields with existing data
    document.getElementById("name").value = clientname;
    document.getElementById("email").value = clientemail;
    document.getElementById("Phone").value = clientphone;

    // Remove the list item from the screen and delete from the server
    ul.removeChild(li);
    axios.delete(`https://crudcrud.com/api/ead6dddf4a1a4c68b87db07b7bd8e8f2/data/${id}`);
  }
}

// Fetch and display data from the server
function showdata() {
  ul.innerHTML = "";
  axios
    .get("https://crudcrud.com/api/ead6dddf4a1a4c68b87db07b7bd8e8f2/data")
    .then((response) => {
      let data = response.data;
      for (let i = 0; i < data.length; i++) {
        showonscreen(data[i]);
      }
    })
    .catch((err) => {
      alert(err);
    });
}