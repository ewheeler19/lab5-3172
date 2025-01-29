function calculateNumberGrade(){
   let table = document.getElementById('gradeTable');
   let grade1 = document.getElementById('grade1');
   let grade2 = document.getElementById('grade2');
   let grade3 = document.getElementById('grade3');
   let grade4 = document.getElementById('grade4');

   let rows = table.rows;
   let cols = table.cols;

   for(let i = 1; i < rows.length - 2; i++){
        numberGrade += rows[i];
    }
}