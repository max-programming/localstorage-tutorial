// DOM Elements
const studentForm = document.getElementById('studentForm');
const studentsContainer = document.querySelector('.students');
const nameInput = studentForm['name'];
const ageInput = studentForm['age'];
const rollInput = studentForm['roll'];

const EDIT_ICON = `<svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>`;

/* 
{
  name: '',
  age: number,
  roll: number
}
*/

const students = JSON.parse(localStorage.getItem('students')) || [];

const addStudent = (name, age, roll) => {
  students.push({
    name,
    age,
    roll,
  });

  localStorage.setItem('students', JSON.stringify(students));

  return { name, age, roll };
};

const createStudentElement = ({ name, age, roll }) => {
  // Create elements
  const studentDiv = document.createElement('div');
  const studentName = document.createElement('h2');
  const studentAge = document.createElement('p');
  const studentRoll = document.createElement('p');
  const btnsDiv = document.createElement('div');
  const editButton = document.createElement('button');

  btnsDiv.className = 'btns-div';
  editButton.className = 'edit-btn';
  // Fill the content
  studentName.innerText = 'Student name: ' + name;
  studentAge.innerText = 'Student age: ' + age;
  studentRoll.innerText = 'Student roll: ' + roll;
  editButton.innerHTML = EDIT_ICON;

  // Add to the DOM
  btnsDiv.append(editButton);
  studentDiv.append(studentName, studentAge, studentRoll, btnsDiv);
  studentsContainer.appendChild(studentDiv);

  studentsContainer.style.display = students.length === 0 ? 'none' : 'flex';
};

studentsContainer.style.display = students.length === 0 ? 'none' : 'flex';

students.forEach(createStudentElement);

studentForm.onsubmit = e => {
  e.preventDefault();

  const newStudent = addStudent(
    nameInput.value,
    ageInput.value,
    rollInput.value
  );

  createStudentElement(newStudent);

  nameInput.value = '';
  ageInput.value = '';
  rollInput.value = '';
};
