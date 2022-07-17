const editStudentForm = document.getElementById('editStudentForm');
const params = location.href.split('?')[1];
const studentId = params.split('=')[1];
const nameInput = editStudentForm['name'];
const ageInput = editStudentForm['age'];
const rollInput = editStudentForm['roll'];

const replaceStudent = updatedStudent => {
  const { students, currentStudentIndex } = getStudents();
  students[currentStudentIndex] = updatedStudent;
  localStorage.setItem('students', JSON.stringify(students));
};

const getStudents = () => {
  const students = JSON.parse(localStorage.getItem('students'));
  const currentStudent = students.find(
    student => student.id.toString() === studentId
  );
  const currentStudentIndex = students.indexOf(currentStudent);
  return {
    students,
    currentStudent,
    currentStudentIndex,
  };
};

const { currentStudent } = getStudents();

nameInput.value = currentStudent.name;
ageInput.value = currentStudent.age;
rollInput.value = currentStudent.roll;

editStudentForm.onsubmit = e => {
  e.preventDefault();

  const updatedStudent = {
    id: studentId,
    name: nameInput.value,
    age: ageInput.value,
    roll: rollInput.value,
  };

  replaceStudent(updatedStudent);
  location.href = '/';
};
