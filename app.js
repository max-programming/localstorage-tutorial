import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import { nanoid } from 'https://cdn.skypack.dev/nanoid';

// DOM Elements
const studentForm = document.getElementById('studentForm');
const studentsContainer = document.querySelector('.students');
const nameInput = studentForm['name'];
const ageInput = studentForm['age'];
const rollInput = studentForm['roll'];

const EDIT_ICON = `<svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>`;
const DELETE_ICON = `<svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`;

/* 
{
  name: '',
  age: number,
  roll: number
}
*/

const getStudents = () => {
  const students = JSON.parse(localStorage.getItem('students')) || [];
  return students;
};

nameInput.focus();

const deleteStudent = id => {
  const studentsLC = getStudents();
  const students = studentsLC.filter(student => student.id !== id);
  localStorage.setItem('students', JSON.stringify(students));
  document.getElementById(id).remove();
  studentsContainer.style.display = students.length === 0 ? 'none' : 'flex';
};

const addStudent = (name, age, roll) => {
  const students = getStudents();
  const id = nanoid();
  students.push({
    id,
    name,
    age,
    roll,
  });

  localStorage.setItem('students', JSON.stringify(students));

  return { id, name, age, roll };
};

const createStudentElement = ({ id, name, age, roll }) => {
  const students = getStudents();
  // Create elements
  const studentDiv = document.createElement('div');
  const studentName = document.createElement('h2');
  const studentAge = document.createElement('p');
  const studentRoll = document.createElement('p');
  const btnsDiv = document.createElement('div');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  studentDiv.id = id;
  btnsDiv.className = 'btns-div';
  editButton.className = 'edit-btn';
  deleteButton.className = 'delete-btn';
  editButton.onclick = () => (location.href = `/edit.html?id=${id}`);
  deleteButton.onclick = () => deleteStudent(id);
  // Fill the content
  studentName.innerText = 'Student name: ' + name;
  studentAge.innerText = 'Student age: ' + age;
  studentRoll.innerText = 'Student roll: ' + roll;
  editButton.innerHTML = EDIT_ICON;
  deleteButton.innerHTML = DELETE_ICON;

  // Add to the DOM
  btnsDiv.append(editButton, deleteButton);
  studentDiv.append(studentName, studentAge, studentRoll, btnsDiv);
  studentsContainer.prepend(studentDiv);

  studentsContainer.style.display = students.length === 0 ? 'none' : 'flex';
};

const students = getStudents();
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
  confetti({ particleCount: 150 });

  nameInput.value = '';
  ageInput.value = '';
  rollInput.value = '';
  nameInput.focus();
};
