function getDateTime() {
	return new Date().toLocaleString();
}

function randomDate(start, end) {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
}

class Person {
	constructor(name, surname) {
		if (this.constructor === Person) {
			throw new Error("Abstract class Person cannot be instantiated!");
		}
		this.name = name;
		this.surname = surname;
	}
}
class Patient extends Person {
	constructor(name, surname, healthCardNumber, jmbg) {
		super(name, surname);
		this.healthCardNumber = healthCardNumber;
		this.jmbg = jmbg;
		Logger.logCreationOfPatient(this);
	}
	doctor = "";
	myAppointments = [];

	chooseDoctor(doctor) {
		this.doctor = doctor;
		Logger.logChosenDoctor(doctor);
		this.chooseDoctor = function () {};
	}

	addAppointment(appointment) {
		this.myAppointments.concat(appointment);
	}
}

class Doctor extends Person {
	constructor(name, surname, specialization) {
		super(name, surname);
		this.specialization = specialization;
		Logger.logCreationOfDoctor(this);
	}
	patients = [];
	appointments = [];

	addPatients(patient) {
		this.patients.concat(patient);
		Logger.logAddingPatient(patient, this);
	}

	scheduleAppointment(appointment) {
		this.appointments.concat(appointment);
		Logger.logAppointment(appointment.patient, this);
	}
}
class Logger {
	static logCreationOfPatient(patient) {
		console.log(
			getDateTime(),
			`${patient.name} ${patient.surname} with health card number ${patient.healthCardNumber} and Unique ID ${patient.jmbg} was just created and added to the database.`
		);
	}
	static logCreationOfDoctor(doctor) {
		console.log(
			getDateTime(),
			`${doctor.name} ${doctor.surname} who is a specialist in ${doctor.specialization} was just created and added to the database.`
		);
	}
	static logChosenDoctor(doctor) {
		console.log(
			getDateTime(),
			`You have chosen doctor ${doctor.name} ${doctor.surname}`
		);
	}
	static logAddingPatient(patient, doctor) {
		console.log(
			getDateTime(),
			`${patient.name} ${patient.surname} was added to dr ${doctor.name} patient list`
		);
	}
	static logAppointment(patient, doctor) {
		console.log(
			getDateTime(),
			`Doctor ${doctor.name} ${doctor.surname} has scheduled medical appointment with ${patient.name} ${patient.surname}.`
		);
	}
	static logTheStart() {
		console.log(getDateTime(), "The medical examination has started.");
	}
	static finishAppointment(patient, doctor) {
		console.log(
			getDateTime(),
			`${patient.name} ${patient.surname} has finished the appointment with ${doctor.name} ${doctor.surname}`
		);
	}
}

class MedicalExamination {
	constructor(doctor, patient, date, time) {
		if (this.constructor === MedicalExamination) {
			throw new Error(
				"Abstract class MedicalExamination cannot be instantiated!"
			);
		}
		this.doctor = doctor;
		this.patient = patient;
		this.date = date;
		this.time = time;
		doctor.scheduleAppointment(this);
		patient.addAppointment(this);
	}
	doMedicalExamination() {}
}
class BloodPressureExamination extends MedicalExamination {
	constructor(doctor, patient, date, time) {
		super(doctor, patient, date, time);
		this.typeOfExamination = "blood pressure test";
	}

	doMedicalExamination() {
		Logger.logTheStart();

		let results = [
			`Upper value: ${Math.random() * 150}, 
         Lower value: ${Math.random() * 60}, 
         Pulse: ${Math.random() * 100}`,
		];

		console.log(
			`Patient ${this.patient.name} ${
				this.patient.surname
			} has had a medical examination for ${
				this.typeOfExamination
			}. The results are: ${results.map(
				(result) => result
			)}. \n Date of the examination: ${this.date}. Doctor ${
				this.doctor.name
			} was assigned to this patient.`
		);
		Logger.finishAppointment(this.patient, this.doctor);
	}
}

class BloodSugarLevelExamination extends MedicalExamination {
	constructor(doctor, patient, date, time) {
		super(doctor, patient, date, time);
		this.typeOfExamination = "blood sugar level";
	}

	doMedicalExamination() {
		Logger.logTheStart();

		let results = [
			`Value: ${Math.random() * 200},
         Last meal: ${randomDate(new Date(2012, 0, 1), new Date())}`,
		];

		console.log(
			`Patient ${this.patient.name} ${
				this.patient.surname
			} has had a medical examination for ${
				this.typeOfExamination
			}. The results are: ${results.map(
				(result) => result
			)}. \n Date of the examination: ${this.date}. Doctor ${
				this.doctor.name
			} was assigned to this patient.`
		);
		Logger.finishAppointment(this.patient, this.doctor);
	}
}

class CholesterolLevelExamination extends BloodSugarLevelExamination {
	constructor(doctor, patient, date, time) {
		super(doctor, patient, date, time);
		this.typeOfExamination = "cholesterol level";
	}
}

let doctorOne = new Doctor("Milan", "Milanovic", "kardiologija");
let patientOne = new Patient("Dragan", "Draganovic", 1, 1);
let patientTwo = new Patient("Milica", "Milic", 2, 2);

patientOne.chooseDoctor(doctorOne);
patientTwo.chooseDoctor(doctorOne);

doctorOne.addPatients(patientOne);
doctorOne.addPatients(patientTwo);

let appointmentOne = new BloodPressureExamination(
	doctorOne,
	patientOne,
	"22/2/2022",
	"10:00"
);

appointmentOne.doMedicalExamination();

let appointmentTwo = new BloodSugarLevelExamination(
	doctorOne,
	patientOne,
	"25/2/2022",
	"09:00"
);

appointmentTwo.doMedicalExamination();

let appointmentThree = new CholesterolLevelExamination(
	doctorOne,
	patientTwo,
	"11/1/2022",
	"11:11"
);

appointmentThree.doMedicalExamination();
