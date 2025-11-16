// const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const bloodGroups = [
  { value: "A_POSITIVE", label: "A+" },
  { value: "A_NEGATIVE", label: "A-" },
  { value: "B_POSITIVE", label: "B+" },
  { value: "B_NEGATIVE", label: "B-" },
  { value: "AB_POSITIVE", label: "AB+" },
  { value: "AB_NEGATIVE", label: "AB-" },
  { value: "O_POSITIVE", label: "O+" },
  { value: "O_NEGATIVE", label: "O-" },
];

const bloodGroup:Record<string,string> ={
  A_POSITIVE: "A+" ,
  A_NEGATIVE: "A-" ,
  B_POSITIVE: "B+" ,
  B_NEGATIVE: "B-" ,
  AB_POSITIVE: "AB+",
  AB_NEGATIVE: "AB-",
  O_POSITIVE: "O+" ,
  O_NEGATIVE: "O-" ,
}


const doctorSpecializations = ["Cardiologist", "Dermatologist", "Neurologist", "Orthopedic", "Pediatrician", "Psychiatrist", "Gynecologist", "Oncologist", "Radiologist", "Dentist", "ENT Specialist", "Ophthalmologist", "General Surgeon", "Urologist", "Nephrologist", "Endocrinologist", "Gastroenterologist", "Pulmonologist", "Physician"];

const doctorDepartments = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology", "Psychiatry", "Gynecology", "Oncology", "Radiology", "Dentistry", "ENT", "Ophthalmology", "General Surgery", "Urology", "Nephrology", "Endocrinology", "Gastroenterology", "Pulmonology", "Emergency Medicine", "Anesthesiology", "Pathology"];

export { bloodGroup, bloodGroups, doctorDepartments, doctorSpecializations };

