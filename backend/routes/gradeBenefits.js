import {
    createGradeBenefits,
    deleteGradeBenefits,
    getAllGradeBenefits,
    getGradeBenefitsByGradeId,
    getGradeBenefitsById,
    updateGradeBenefits
} 
from '../controllers/gradeBenefits.js';

import express from 'express'

export const gradeBenefitsRoute = express.Router();

// Get all grade benefits by organization
gradeBenefitsRoute.get('/benefits/organization/:id', getAllGradeBenefits);

// Get all grade benefits by grade
gradeBenefitsRoute.get('/benefits/grade/:id', getGradeBenefitsByGradeId);

// Create grade benefits
gradeBenefitsRoute.post('/benefits/new', createGradeBenefits);

// Update/delete/get grade benefits
gradeBenefitsRoute.put('/benefits/:id', updateGradeBenefits).delete( deleteGradeBenefits).get( getGradeBenefitsById);



