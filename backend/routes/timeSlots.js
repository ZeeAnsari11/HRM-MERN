import { createTimeSlot, deleteTimeSlotById, getTimeSlotById, getTimeSlotsByOrganizationId, updateTimeSlotById } from '../controllers/timeSlots.js';

import express from 'express'

export const timeSlotsRoute = express.Router();

timeSlotsRoute.route('/time-slot/new').post(createTimeSlot);
timeSlotsRoute.route('/time-slot/:id').put(updateTimeSlotById).get(getTimeSlotById).delete(deleteTimeSlotById);
timeSlotsRoute.route('/time-slot/organization/:id').get(getTimeSlotsByOrganizationId);