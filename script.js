const form = document.getElementById('student-form')
const tableBody = document.getElementById('students-table')
const resetBtn = document.getElementById('reset-btn')
const submitBtn = document.getElementById('submit-btn')

let students = []
let editIndex = null

form.addEventListener('submit', e => {
  e.preventDefault()

  const student = {
    name: form.name.value.trim(),
    father: form.father.value.trim(),
    gpa: form.gpa.value.trim(),
    class: form.class.value.trim(),
    course: form.course.value.trim(),
    email: form.email.value.trim()
  }

  if (editIndex === null) {
    students.push(student)
  } else {
    students[editIndex] = student
    editIndex = null
    submitBtn.textContent = 'Add Student'
  }

  renderTable()
  form.reset()
})

resetBtn.addEventListener('click', () => {
  form.reset()
  editIndex = null
  submitBtn.textContent = 'Add Student'
})

function renderTable() {
  tableBody.innerHTML = ''
  students.forEach((stu, i) => {
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td>${stu.name}</td>
      <td>${stu.father}</td>
      <td>${stu.gpa}</td>
      <td>${stu.class}</td>
      <td>${stu.course}</td>
      <td>${stu.email}</td>
      <td>
        <button class="btn btn-sm btn-primary me-1" onclick="editStudent(${i})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteStudent(${i})">Delete</button>
      </td>
    `
    tableBody.appendChild(tr)
  })
}

function editStudent(i) {
  const stu = students[i]
  form.name.value = stu.name
  form.father.value = stu.father
  form.gpa.value = stu.gpa
  form.class.value = stu.class
  form.course.value = stu.course
  form.email.value = stu.email
  editIndex = i
  submitBtn.textContent = 'Update Student'
}

function deleteStudent(i) {
  students.splice(i, 1)
  renderTable()
}

window.editStudent = editStudent
window.deleteStudent = deleteStudent
