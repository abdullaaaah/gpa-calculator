let courses = []
let options = ["Assignment", "Quiz", "Tutorial Activity", "Lab", "Midterm", "Exam"]
var marks_in_courses = {}

gpa_scale = {
  0.0: range(0, 49),
  0.7: range(50, 52),
  1.0: range(53, 56),
  1.3: range(57, 59),
  1.7: range(60, 62),
  2.0: range(63, 66),
  2.3: range(67, 69),
  2.7: range(70, 72),
  3.0: range(73, 76),
  3.3: range(77, 79),
  3.7: range(80, 84),
  3.9: ['-', '-'],
  4.0: range(85, 100)
  }

  gpa_scale.order = [0, 0.7, 1, 1.3, 1.7, 2, 2.3, 2.7, 3, 3.3, 3.7, 3.9, 4.0]


/* messages */
let status_msg = {
  // >= 3.3
  good: "Good job! <span class='emoji'>&#128515;</span> </br> Your academic performance is great this semester.",
  // >= 2.0
  okay: "You got this! <span class='emoji'>&#128578;</span> </br> Your academic performance is okay this semester.",
  // < 2.0
  bad: "Are you even trying? <span class='emoji'>&#128545;</span> </br> Your academic performance is horrible this semester.",
  // === 0
  none: "Welcome to SemTrack! <span class='emoji'>&#128063;</span> <span class='emoji'>&#x1F973;</span> </br> Add a course to begin tracking your academic performance."
}

/* this function return the approprirate message based on your gpa */
let get_status_msg = function()
{
  let cgpa = calculate_cgpa(marks_in_courses)

  if (cgpa >= 3.3) return status_msg.good
  else if (cgpa >= 2.0) return status_msg.okay
  else if (cgpa > 0) return status_msg.bad
  else return status_msg.none
}
