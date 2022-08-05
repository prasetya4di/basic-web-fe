let todo = new Map();
let clickedId = null;
let currentId = 1;

(() => {
  let todoFormModal = document.getElementById("todoModal")

  todoFormModal.addEventListener('show.bs.modal', event => {
    // Button that triggered the modal
    const button = event.relatedTarget
    // Extract info from data-bs-* attributes
    const idTodo = button.getAttribute('data-bs-whatever')
    if (idTodo != null) {
      let mTodo = todo.get(idTodo)
      clickedId = idTodo
      $("#name").val(mTodo.name)
      $("#todoDate").val(mTodo.date)
      $("#description").val(mTodo.description)
    }
  })
  $("#btnSave").on("click", function () {
    saveTodo();
  })
})()

function saveTodo() {
  if (validateForm()) {
    let todoId = clickedId ?? currentId
    let name = $("#name").val()
    let date = $("#todoDate").val()
    let description = $("#description").val()
    todo.set(todoId, {
      id: todoId,
      name: name,
      date: date,
      description: description
    })
    clickedId == null ? currentId++ : clickedId = null
    updateTodoList(todo.get(todoId))
    $("#todoModal").modal('toggle')
  }
}

function validateForm() {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')
  let isValid = true
  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        isValid = false
      }

      form.classList.add('was-validated')
    }, false)
  })
  return isValid
}

function updateTodoList(todo) {
  let idTodo = todo.id
  let todoCard = "<div class=\"col-3\" id=\"" + idTodo + "\">\n" +
      "            <div class=\"card\">\n" +
      "                <div class=\"card-body\">\n" +
      "                    <h5 class=\"card-title\" id=\"title-" + idTodo + "\">" + todo.name + "</h5>\n" +
      "                    <h6 class=\"card-subtitle mb-2 text-muted\" id=\"date-" + idTodo + "\">" + todo.date + "</h6>\n" +
      "                    <p class=\"card-text\" id=\"" + idTodo + "\">" + todo.description + "</p>\n" +
      "                    <div class=\"hstack gap-1\">\n" +
      "                        <button class=\"btn btn-success col-6\" type=\"button\" data-bs-target=\"#todoModal\" data-bs-toggle=\"modal\" data-bs-whatever=\"" + idTodo + "\">\n" +
      "                            <i aria-hidden=\"true\" class=\"fa fa-pencil\"></i> Edit\n" +
      "                        </button>\n" +
      "                        <button class=\"btn btn-danger col-6\" type=\"button\" data-bs-target=\"#todoModal\" data-bs-toggle=\"modal\">\n" +
      "                            <i aria-hidden=\"true\" class=\"fa fa-trash\"></i> Delete\n" +
      "                        </button>\n" +
      "                    </div>\n" +
      "                </div>\n" +
      "            </div>\n" +
      "        </div>"
  $("#listTodo").append(todoCard)
}