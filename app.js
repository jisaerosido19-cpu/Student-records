const students = [
  { id: 1, name: "Mark Anthony Talisic", year: 2, course: "BSIT", grades: [87, 91, 85], enrolled: true },
  { id: 2, name: "Jessa Mae Cabahug", year: 1, course: "BSIT", grades: [93, 89, 94], enrolled: true },
  { id: 3, name: "Christian Jay Olano", year: 3, course: "BSIT", grades: [82, 86, 80], enrolled: false },
  { id: 4, name: "Mary Grace Panugan", year: 2, course: "BEED", grades: [90, 88, 92], enrolled: true },
  { id: 5, name: "John Paul Dela Cruz", year: 1, course: "BSIT", grades: [88, 90, 87], enrolled: true },
  { id: 6, name: "Anna Marie Reyes", year: 2, course: "BEED", grades: [91, 93, 89], enrolled: true },
  { id: 7, name: "Michael James Santos", year: 3, course: "BSIT", grades: [79, 83, 81], enrolled: false },
  { id: 8, name: "Sarah Jane Mendoza", year: 1, course: "BSED", grades: [92, 95, 94], enrolled: true },
  { id: 9, name: "Robert John Garcia", year: 2, course: "BSIT", grades: [85, 84, 88], enrolled: true },
  { id: 10, name: "Jenny Rose Bautista", year: 3, course: "BEED", grades: [87, 90, 89], enrolled: true },
  { id: 11, name: "Joseph Daniel Fernandez", year: 1, course: "BSIT", grades: [], enrolled: true },
  { id: 12, name: "Maria Theresa Lim", year: 2, course: "BSED", grades: [89, 91, 90], enrolled: true },
  { id: 13, name: "James Patrick Aquino", year: 3, course: "BSIT", grades: [81, 85, 83], enrolled: false },
  { id: 14, name: "Catherine Joy Villanueva", year: 1, course: "BEED", grades: [94, 92, 95], enrolled: true },
  { id: 15, name: "Richard Paul Castillo", year: 2, course: "BSIT", grades: [86, 88, 85], enrolled: true },
  { id: 16, name: "Grace Ann Navarro", year: 3, course: "BSED", grades: [90, 88, 91], enrolled: true },
  { id: 17, name: "Kevin Ray Torres", year: 1, course: "BSIT", grades: [78, 82, 80], enrolled: false },
  { id: 18, name: "Angelica Joy Reyes", year: 2, course: "BEED", grades: [92, 94, 93], enrolled: true },
  { id: 19, name: "Jason Lee Domingo", year: 3, course: "BSIT", grades: [84, 86, 82], enrolled: true },
  { id: 20, name: "Kristine May Salazar", year: 1, course: "BSED", grades: [91, 89, 92], enrolled: true },
  { id: 21, name: "Ronald Jay Ramos", year: 2, course: "BSIT", grades: [83, 85, 87], enrolled: true },
  { id: 22, name: "Diana Rose Pascual", year: 3, course: "BEED", grades: [88, 90, 91], enrolled: true },
  { id: 23, name: "Edwin Mark Gonzales", year: 1, course: "BSIT", grades: [80, 79, 82], enrolled: false },
  { id: 24, name: "Evelyn Joy Mercado", year: 2, course: "BSED", grades: [93, 91, 94], enrolled: true },
  { id: 25, name: "Felix John Rivera", year: 3, course: "BSIT", grades: [85, 83, 86], enrolled: true },
  { id: 26, name: "Glenda Ann Cortez", year: 1, course: "BEED", grades: [89, 92, 90], enrolled: true },
  { id: 27, name: "Harold James Figueroa", year: 2, course: "BSIT", grades: [87, 89, 88], enrolled: true },
  { id: 28, name: "Ivy Rose Miranda", year: 3, course: "BSED", grades: [90, 93, 91], enrolled: true },
  { id: 29, name: "Joel David Chavez", year: 1, course: "BSIT", grades: [82, 84, 81], enrolled: true },
  { id: 30, name: "Karen Joy Atienza", year: 2, course: "BEED", grades: [91, 93, 92], enrolled: true }
];

function getAverageGrade(student) {
  if (!student.grades || student.grades.length === 0) return 0;
  return student.grades.reduce((sum, grade) => sum + grade, 0) / student.grades.length;
}

function getTopStudents(students, n) {
  if (n < 0) throw new Error("Number of students cannot be negative.");
  if (!Array.isArray(students)) return [];
  return [...students]
    .map(s => ({ ...s, averageGrade: getAverageGrade(s) }))
    .sort((a, b) => b.averageGrade - a.averageGrade)
    .slice(0, n);
}

function groupByCourse(students) {
  if (!Array.isArray(students)) return {};
  return students.reduce((groups, student) => {
    const course = student.course || "Unknown";
    if (!groups[course]) groups[course] = [];
    groups[course].push({ ...student });
    return groups;
  }, {});
}

function getEnrolledCount(students) {
  if (!Array.isArray(students)) return { enrolled: 0, notEnrolled: 0 };
  return students.reduce(
    (count, student) => {
      student.enrolled ? count.enrolled++ : count.notEnrolled++;
      return count;
    },
    { enrolled: 0, notEnrolled: 0 }
  );
}

function findStudent(students, name) {
  if (!Array.isArray(students) || !name) return null;
  const searchName = name.toLowerCase().trim();
  const found = students.find(s => s.name.toLowerCase() === searchName);
  return found ? { ...found } : null;
}

function getCourseAverages(students) {
  const grouped = groupByCourse(students);
  return Object.entries(grouped)
    .map(([course, courseStudents]) => {
      const avgs = courseStudents.map(s => getAverageGrade(s)).filter(a => a > 0);
      const averageGrade = avgs.length > 0 ? avgs.reduce((s, v) => s + v, 0) / avgs.length : 0;
      return { course, averageGrade };
    })
    .sort((a, b) => b.averageGrade - a.averageGrade);
}

function exportSummary(students) {
  if (!Array.isArray(students) || students.length === 0) {
    return { totalStudents: 0, overallAverage: 0, topPerformingStudent: null, breakdownByCourse: [] };
  }
  const allGrades = students.flatMap(s => s.grades || []).filter(g => typeof g === 'number');
  const overallAverage = allGrades.length > 0 ? allGrades.reduce((s, g) => s + g, 0) / allGrades.length : 0;
  const topStudents = getTopStudents(students, 1);
  return {
    totalStudents: students.length,
    overallAverage,
    topPerformingStudent: topStudents[0] || null,
    breakdownByCourse: getCourseAverages(students)
  };
}

function filterByYear(students, year) {
  if (!Array.isArray(students) || typeof year !== 'number') return [];
  return students.filter(s => s.year === year).map(s => ({ ...s }));
}

function sortByName(students) {
  if (!Array.isArray(students)) return [];
  return [...students].sort((a, b) => a.name.localeCompare(b.name));
}

function main() {
  console.log("============================================================");
  console.log("           STUDENT RECORDS DATA PROCESSOR");
  console.log("============================================================");

  console.log("\n[1] TOTAL STUDENTS");
  console.log("    Count:", students.length);

  console.log("\n[2] OVERALL AVERAGE GRADE");
  const summary = exportSummary(students);
  console.log("    Average:", summary.overallAverage.toFixed(2));

  console.log("\n[3] ENROLLMENT STATUS");
  const enrollment = getEnrolledCount(students);
  console.log("    Enrolled:   ", enrollment.enrolled);
  console.log("    Not Enrolled:", enrollment.notEnrolled);

  console.log("\n[4] TOP 5 PERFORMING STUDENTS");
  try {
    getTopStudents(students, 5).forEach((s, i) => {
      console.log(    ${i + 1}. ${s.name} — ${s.averageGrade.toFixed(2)});
    });
  } catch (err) {
    console.log("    Error:", err.message);
  }

  console.log("\n[5] AVERAGE GRADE BY COURSE");
  getCourseAverages(students).forEach(c => {
    console.log(    ${c.course}: ${c.averageGrade.toFixed(2)});
  });

  console.log("\n[6] FIND STUDENT EXAMPLE");
  const found = findStudent(students, "Jessa Mae Cabahug");
  console.log(found ?     Found: ${found.name} | ${found.course} | Year ${found.year} : "    Student not found");

  console.log("\n[7] COMPLETE SUMMARY OBJECT");
  console.log(JSON.stringify(summary, null, 2));

  console.log("\n============================================================");
  console.log("REPORT COMPLETE — All requirements met!");
  console.log("============================================================");
}

main();