const createToDoHeading = () => {
  const toDoList = document.getElementById("toDoList")
  const heading = document.createElement("h2")
  heading.id = "toDoListHeading"
  heading.appendChild(document.createTextNode("To-Do List"))
  toDoList.parentElement.insertBefore(heading, toDoList)
}

const removeToDoHeading = () => {
  const heading = document.getElementById("toDoListHeading")
  heading.parentElement.removeChild(heading)
}

const createCompletedHeading = () => {
  const completedList = document.getElementById("completedList")
  const heading = document.createElement("h2")
  heading.id = "completedListHeading"
  heading.appendChild(document.createTextNode("Completed List"))
  completedList.parentElement.insertBefore(heading, completedList)
}

const removeCompletedHeading = () => {
  const heading = document.getElementById("completedListHeading")
  heading.parentElement.removeChild(heading)
}

const handleToDoClick = (id) => () => {
  // Get the list item
  const item = document.getElementById(id)
  // Get the lists
  const toDoList = document.getElementById("toDoList")
  const completedList = document.getElementById("completedList")
  // If checked, move the item to the completed list
  if (item.checked) {
    completedList.appendChild(item.parentElement)
    if (!document.getElementById("completedListHeading"))
      createCompletedHeading()
    if (toDoList.getElementsByTagName("li").length === 0) removeToDoHeading()
  } else {
    // Otherwise, move it back to the to-do list
    toDoList.appendChild(item.parentElement)
    if (!document.getElementById("toDoListHeading")) createToDoHeading()
    if (completedList.getElementsByTagName("li").length === 0)
      removeCompletedHeading()
  }
}

function submitToDo() {
  // Create a new list item
  const newItem = document.createElement("li")
  // Get relevant elements
  const input = document.getElementById("toDoTaskInput")
  const button = document.getElementById("addButton")
  const toDoList = document.getElementById("toDoList")

  // Get number of list items
  const itemCount = toDoList.getElementsByTagName("li").length

  // Create a checkbox element
  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  checkbox.id = "toDoItem" + itemCount
  checkbox.onclick = handleToDoClick(checkbox.id)

  // Set its content
  newItem.appendChild(checkbox)
  newItem.appendChild(document.createTextNode(input.value))

  // Append it to the list
  toDoList.appendChild(newItem)
  // Clear the input field
  input.value = ""
  // Disable the button
  button.disabled = true

  // Add heading above list if it doesn't exist
  if (!document.getElementById("toDoListHeading")) createToDoHeading()
}

function disableButton() {
  // Get the input field and the button
  const input = document.getElementById("toDoTaskInput")
  const button = document.getElementById("addButton")
  // Disable the button if the input field is empty
  button.disabled = input.value === ""
}

// Event listener for form submission
document
  .getElementById("toDoForm")
  .addEventListener("submit", function (event) {
    // Prevent the default form submission
    event.preventDefault()
    // Add the to-do
    submitToDo()
  })
document
  .getElementById("toDoTaskInput")
  .addEventListener("input", disableButton)
