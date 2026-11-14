const Appointment = require("../models/Appointment");
const Therapist = require("../models/Therapist");
const TherapistAvailability = require("../models/TherapistAvailability");

const createAppointment = async (req, res) => {
    try {
        const {
            therapistId,
            clientName,
            clientEmail,
            clientPhone,
            appointmentDate,
            startTime,
            endTime,
            notes
        } = req.body;

        if (
            !therapistId ||
            !clientName ||
            !clientEmail ||
            !appointmentDate ||
            !startTime ||
            !endTime
        ) {
            return res.status(400).json({
                success: false,
                message: "Required appointment details are missing"
            });
        }

        if (
            !/^\d{4}-\d{2}-\d{2}$/.test(appointmentDate) ||
            !/^\d{2}:\d{2}$/.test(startTime) ||
            !/^\d{2}:\d{2}$/.test(endTime)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid date or time format"
            });
        }

        const date = new Date(`${appointmentDate}T00:00:00.000Z`);

        if (
            Number.isNaN(date.getTime()) ||
            date.toISOString().slice(0, 10) !== appointmentDate ||
            date <= new Date(new Date().toISOString().slice(0, 10))
        ) {
            return res.status(400).json({
                success: false,
                message: "Please select a valid future appointment date"
            });
        }

        const timeToMinutes = (time) => {
            const [hours, minutes] = time.split(":").map(Number);

            if (hours > 23 || minutes > 59) {
                return -1;
            }

            return hours * 60 + minutes;
        };

        const startMinutes = timeToMinutes(startTime);
        const endMinutes = timeToMinutes(endTime);

        if (
            startMinutes < 0 ||
            endMinutes < 0 ||
            startMinutes >= endMinutes
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment time range"
            });
        }

        const therapist = await Therapist.findById(therapistId);

        if (!therapist) {
            return res.status(404).json({
                success: false,
                message: "Therapist not found"
            });
        }

        const therapistAvailability =
            await TherapistAvailability.findOne({
                therapist: therapistId
            });

        if (!therapistAvailability) {
            return res.status(400).json({
                success: false,
                message: "Therapist availability not configured"
            });
        }

        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];

        const selectedDay = days[date.getUTCDay()];

        const dayAvailability =
            therapistAvailability.availability.find(
                (item) => item.day === selectedDay
            );

        if (!dayAvailability || !dayAvailability.isAvailable) {
            return res.status(400).json({
                success: false,
                message: "Therapist is unavailable on this day"
            });
        }

        const validSlot = dayAvailability.slots.some((slot) => {
            return (
                startMinutes >= timeToMinutes(slot.startTime) &&
                endMinutes <= timeToMinutes(slot.endTime)
            );
        });

        if (!validSlot) {
            return res.status(400).json({
                success: false,
                message: "Selected time is outside therapist availability"
            });
        }

        const existingAppointments = await Appointment.find({
            therapist: therapistId,
            appointmentDate: date,
            status: { $ne: "cancelled" }
        });

        const hasConflict = existingAppointments.some((appointment) => {
            const existingStart = timeToMinutes(appointment.startTime);
            const existingEnd = timeToMinutes(appointment.endTime);

            return (
                startMinutes < existingEnd &&
                endMinutes > existingStart
            );
        });

        if (hasConflict) {
            return res.status(409).json({
                success: false,
                message: "This appointment time is already booked"
            });
        }

        const appointment = await Appointment.create({
            therapist: therapistId,
            clientName,
            clientEmail,
            clientPhone,
            appointmentDate: date,
            startTime,
            endTime,
            notes
        });

        res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            appointment
        });

    } catch (error) {
        console.error("Create Appointment Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({
            therapist: req.user.id
        }).sort({ appointmentDate: 1, startTime: 1 });

        res.status(200).json({
            success: true,
            count: appointments.length,
            appointments
        });

    } catch (error) {
        console.error("Get Appointments Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["confirmed", "cancelled", "completed"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment status"
            });
        }

        const appointment = await Appointment.findOneAndUpdate(
            {
                _id: req.params.id,
                therapist: req.user.id
            },
            {
                $set: { status }
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Appointment status updated successfully",
            appointment
        });

    } catch (error) {
        console.error("Update Appointment Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    createAppointment,
    getMyAppointments,
    updateAppointmentStatus
};