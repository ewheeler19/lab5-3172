// Define an array of student data with their grades for 4 courses
const studentsList = [
    { fullName: 'Ethan', scores: [90, 91, undefined, 85] },
    { fullName: 'Jack', scores: [76, 92, 89, 99], courseDetails: [
        [[83, 94, 89], [100, 91], [72, 84]],  // Course 1
        [[92, 100, 88], [85, 100], [100, 100]],  // Course 2
        [[91, 88, 92], [88, 90], [92, 95]],  // Course 3
        [[100, 87, 90], [88, 80], [90, 90]]   // Course 4
    ] },
    { fullName: 'Ariela', scores: [100, 99, 100, undefined] },
    { fullName: 'Reid', scores: [80, undefined, 91, 88] },
    { fullName: 'Luke', scores: [70, 75, 83, 95], courseDetails: [
        [[77, 85, 92], [91], [79, 89]],  // Course 1
        [[81, 70, 93], [96], [76, 87]],  // Course 2
        [[78, 95, 88], [72, 84], [90, 94]],  // Course 3
        [[93, 86, 77], [91, 98], [79, 75]]   // Course 4
    ] },
    { fullName: 'Matt', scores: [91, 95, 93, 97] },
    { fullName: 'Thomas', scores: [92, 41, 40, 49], courseDetails: [
        [[91, 74, 80], [99], [89, 78]],  // Course 1
        [[94, 83, 76], [88], [85, 90]],  // Course 2
        [[77, 96, 71], [92, 79], [82, 87]],  // Course 3
        [[93, 88, 95], [84, 76], [91, 98]]   // Course 4        
    ] },
    { fullName: 'Ian', scores: [80, 90, 100, 90] }
];

// A utility function to calculate average score from an array of grades
function computeAverage(gradesArray) {
    let sum = 0;
    let count = 0;

    gradesArray.forEach(grade => {
        if (grade !== undefined) {
            sum += grade;
            count++;
        }
    });

    return count > 0 ? Math.round(sum / count) : 0;
}

// Function to calculate and return letter grade based on numeric average
function getGradeLetter(numericAverage) {
    if (numericAverage >= 90) return 'A+';
    if (numericAverage >= 85) return 'A';
    if (numericAverage >= 80) return 'A-';
    if (numericAverage >= 77) return 'B+';
    if (numericAverage >= 73) return 'B';
    if (numericAverage >= 70) return 'B-';
    if (numericAverage >= 65) return 'C+';
    if (numericAverage >= 60) return 'C';
    if (numericAverage >= 55) return 'C-';
    if (numericAverage >= 50) return 'D';
    return 'F';
}

// Function to compute weighted average for a single course (assignments, quizzes, exams)
function calculateCourseWeightedAverage(assignments, quizzes, exams) {
    const avgAssignments = computeAverage(assignments);
    const avgQuizzes = computeAverage(quizzes);
    const avgExams = computeAverage(exams);

    // Apply weights (assignments: 30%, quizzes: 20%, exams: 50%)
    const weightedAssignments = avgAssignments * 0.3;
    const weightedQuizzes = avgQuizzes * 0.2;
    const weightedExams = avgExams * 0.5;

    return Math.round(weightedAssignments + weightedQuizzes + weightedExams);
}

// Function to render the main gradebook page dynamically
function renderGradebook() {
    console.log("Rendering gradebook...");

    studentsList.forEach((student, index) => {
        console.log(`Processing student: ${student.fullName}`);
        const avg = computeAverage(student.scores);
        const letterGrade = getGradeLetter(avg);

        // Populate the table for each student's courses, average grade, and letter grade
        student.scores.forEach((score, i) => {
            const cellId = `g${i + 1}-${index + 1}`;
            const cell = document.getElementById(cellId);
            if (cell) {
                cell.textContent = score !== undefined ? score : '-';
            } else {
                console.error(`Element with ID ${cellId} not found.`);
            }
        });

        const avgCell = document.getElementById(`avg${index + 1}`);
        const lgCell = document.getElementById(`lg${index + 1}`);
        if (avgCell && lgCell) {
            avgCell.textContent = avg;
            lgCell.textContent = letterGrade;
        } else {
            console.error(`Elements for student ${student.fullName} not found.`);
        }
    });

    // Log student data to the console
    console.log("Student Data:", studentsList);
}

// Function to display detailed grades for a specific student
function renderStudentDetails() {
    console.log("Rendering student details...");

    const urlParams = new URLSearchParams(window.location.search);
    const studentName = urlParams.get('student');
    const student = studentsList.find(s => s.fullName.toLowerCase() === studentName?.toLowerCase());

    if (!student) {
        console.error(`Student "${studentName}" not found.`);
        return;
    }

    console.log(`Found student: ${student.fullName}`);
    document.getElementById('studentName').textContent = student.fullName;

    if (student.courseDetails) {
        student.courseDetails.forEach((course, courseIndex) => {
            const [assignments, quizzes, exams] = course;

            // Display assignments, quizzes, and exam grades
            document.getElementById(`course${courseIndex + 1}-assignments`).textContent = assignments.join(", ");
            document.getElementById(`course${courseIndex + 1}-quizzes`).textContent = quizzes.join(", ");
            document.getElementById(`course${courseIndex + 1}-exams`).textContent = exams.join(", ");

            // Calculate and display weighted average for the course
            const courseWeightedAvg = calculateCourseWeightedAverage(assignments, quizzes, exams);
            document.getElementById(`course${courseIndex + 1}-weighted`).textContent = courseWeightedAvg;
        });

        // Calculate overall weighted average across all courses
        let totalWeightedAvg = 0;
        student.courseDetails.forEach(course => {
            const [assignments, quizzes, exams] = course;
            totalWeightedAvg += calculateCourseWeightedAverage(assignments, quizzes, exams);
        });

        const overallAvg = Math.round(totalWeightedAvg / student.courseDetails.length);
        document.getElementById('overall-average').textContent = overallAvg;
    } else {
        console.log(`No course details found for ${student.fullName}`);
    }

    // Log detailed student data to the console
    console.log("Detailed Grades for:", student);
}

// Event listener to load the gradebook on the main page
document.addEventListener('DOMContentLoaded', renderGradebook);

// Event listener to load student details based on the URL query parameter
document.addEventListener('DOMContentLoaded', renderStudentDetails);