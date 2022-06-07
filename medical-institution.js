function getDateTime() {
	return new Date().toLocaleString();
}

function randomDate(start, end) {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
}
class Patient {
	doctor = "";
	myAppointments = [];
	constructor(name, surname, healthCardNumber, JMBG) {
		this.name = name;
		this.surname = surname;
		this.healthCardNumber = healthCardNumber;
		this.JMBG = JMBG;
		Logger.logCreationOfPatient(this);
	}

	chooseDoctor(doctor) {
		this.doctor = doctor;
		Logger.logChosenDoctor(doctor);
		this.chooseDoctor = function () {};
	}

	addAppointment(appointment) {
		this.myAppointments.concat(appointment);
	}
}

class Doctor {
	constructor(name, surname, specialization) {
		this.name = name;
		this.surname = surname;
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
			`${patient.name} ${patient.surname} with health card number ${patient.healthCardNumber} and Unique ID ${patient.JMBG} was just created and added to the database.`
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
	constructor(doctor, patient, type, date, time) {
		this.doctor = doctor;
		this.patient = patient;
		this.type = type;
		this.date = date;
		this.time = time;
		doctor.scheduleAppointment(this);
		patient.addAppointment(this);
	}
	finalMedicalExaminationType = "";

	typesOfMedicalExaminations = {
		"blood pressure": ["upper value", "lower value", "pulse"],
		"blood sugar level": ["value", "last meal"],
		"cholesterol level": ["value", "last meal"],
	};

	doMedicalExamination() {
		Logger.logTheStart();
		switch (this.type) {
			case "blood pressure":
				this.finalMedicalExaminationType =
					this.typesOfMedicalExaminations["blood pressure"];
				break;
			case "blood sugar level":
				this.finalMedicalExaminationType =
					this.typesOfMedicalExaminations["blood sugar level"];
				break;
			case "cholesterol level":
				this.finalMedicalExaminationType =
					this.typesOfMedicalExaminations["cholesterol level"];
				break;
		}

		if (this.type === "blood pressure") {
			this.finalMedicalExaminationType[0] = `Upper value: ${
				Math.random() * 150
			}`;
			this.finalMedicalExaminationType[1] = `Lower value: ${
				Math.random() * 60
			}`;
			this.finalMedicalExaminationType[2] = `Pulse: ${Math.random() * 100}`;
		} else {
			this.finalMedicalExaminationType[0] = `Value: ${Math.random() * 200}`;
			this.finalMedicalExaminationType[1] = `Last meal: ${randomDate(
				new Date(2012, 0, 1),
				new Date()
			)}`;
		}

		console.log(
			`Patient ${this.patient.name} ${this.patient.surname} has had a medical examination for ${this.type}. The results are: \n ${this.finalMedicalExaminationType}. \n Date of the examination: ${this.date}. Doctor ${this.doctor.name} was assigned to this patient.`
		);
		Logger.finishAppointment(this.patient, this.doctor);
	}
}

let doctorOne = new Doctor("Milan", "Milanovic", "kardiologija");
let patientOne = new Patient("Dragan", "Draganovic", 1, 1);
let patientTwo = new Patient("Milica", "Milic", 2, 2);

patientOne.chooseDoctor(doctorOne);
patientTwo.chooseDoctor(doctorOne);

doctorOne.addPatients(patientOne);
doctorOne.addPatients(patientTwo);

let appointmentOne = new MedicalExamination(
	doctorOne,
	patientOne,
	"cholesterol level",
	"22/2/2022",
	"10:00"
);

appointmentOne.doMedicalExamination();

let appointmentTwo = new MedicalExamination(
	doctorOne,
	patientOne,
	"blood sugar level",
	"25/2/2022",
	"09:00"
);

appointmentTwo.doMedicalExamination();

let appointmentThree = new MedicalExamination(
	doctorOne,
	patientTwo,
	"blood pressure",
	"11/1/2022",
	"11:11"
);
appointmentThree.doMedicalExamination();
