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

const appointmentReasons = [
  "Amternity/Parental Checkup",
  "Pedriatic Consultation",
  "General Checkup",
  "Fever"
]

const doctorSpecializations = ["Cardiologist", "Dermatologist", "Neurologist", "Orthopedic", "Pediatrician", "Psychiatrist", "Gynecologist", "Oncologist", "Radiologist", "Dentist", "ENT Specialist", "Ophthalmologist", "General Surgeon", "Urologist", "Nephrologist", "Endocrinologist", "Gastroenterologist", "Pulmonologist", "Physician"];

const doctorDepartments = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology", "Psychiatry", "Gynecology", "Oncology", "Radiology", "Dentistry", "ENT", "Ophthalmology", "General Surgery", "Urology", "Nephrology", "Endocrinology", "Gastroenterology", "Pulmonology", "Emergency Medicine", "Anesthesiology", "Pathology"];

const symptoms = [
  "Fever",
  "Cough",
  "Cold",
  "Headache",
  "Muscle Pain",
  "Fatigue",
  "Sore Throat",
  "Joint Pain",
  "Nausea",
  "Vomiting",
  "Diarrhea",
  "Shortness of Breath",
  "Chest Pain",
  "Dizziness",
  "Loss of Appetite",
  "Runny Nose",
  "Body Ache",
  "Back Pain",
  "Abdominal Pain",
  "Rash",
  "Chills",
  "Sweating",
  "Weakness",
  "Anxiety",
  "Insomnia",
  "Swelling",
  "Numbness",
  "Blurred Vision",
  "Ear Pain"
];

const tests = [
  "Blood Test",
  "Complete Blood Count (CBC)",
  "Liver Function Test (LFT)",
  "Kidney Function Test (KFT)",
  "Thyroid Function Test (TFT)",
  "Urine Test",
  "Blood Sugar (Fasting)",
  "Blood Sugar (PP)",
  "HbA1c",
  "Lipid Profile",
  "ECG",
  "X-Ray",
  "CT Scan",
  "MRI Scan",
  "Ultrasound",
  "Vitamin D Test",
  "Vitamin B12 Test",
  "COVID-19 Test",
  "Dengue Test (NS1/IgG/IgM)",
  "Malaria Test",
  "HIV Test",
  "Pregnancy Test",
  "Allergy Test",
  "Stool Test",
  "Echocardiogram (ECHO)",
  "Blood Pressure Measurement",
  "Pulse Oximetry",
  "Pap Smear",
  "PSA Test",
  "Bone Density Test (DEXA)"
];

const frequencies = [
  "0-0-0",
  "0-0-1",
  "0-1-0",
  "0-1-1",
  "1-0-0",
  "1-0-1",
  "1-1-0",
  "1-1-1"
];




export { bloodGroup, bloodGroups, doctorDepartments, doctorSpecializations,appointmentReasons ,symptoms,tests,frequencies};

