import express from 'express'
import { createTimeSlot, getTimeSlotById, getTimeSlotsByOrganizationId, updateTimeSlotById} from '../controllers/timeSlots.js';

export const timeSlotsRoute = express.Router();

timeSlotsRoute.route('/time-slot/new').post(createTimeSlot);
timeSlotsRoute.route('/time-slot/:id').put(updateTimeSlotById).get(getTimeSlotById);
timeSlotsRoute.route('/time-slot/organization/:id').get(getTimeSlotsByOrganizationId);