import express from 'express'
import { 
    addGradeToBenefits,
    createGradeBenefits, 
    deleteGradeBenefits, 
    getAllGradeBenefits,
    getGradeBenefitsByGradeId,
    getGradeBenefitsById,
    updateGradeBenefits 
} 
from '../controllers/gradeBenefits.js';


export const gradeBenefitsRoute = express.Router();

// Get all grade benefits by organization
gradeBenefitsRoute.get('/benefits/organization/:id', getAllGradeBenefits);

// Get all grade benefits by grade
gradeBenefitsRoute.get('/benefits/grade/:id', getGradeBenefitsByGradeId);

// Create grade benefits
gradeBenefitsRoute.post('/benefits/create', createGradeBenefits);

// Update grade benefits
gradeBenefitsRoute.put('/benefits/update/:id', updateGradeBenefits);

// Delete grade benefits
gradeBenefitsRoute.delete('/benefits/delete/:id', deleteGradeBenefits);

//get GradeBenefits by Id 
gradeBenefitsRoute.get('/benefits/:id', getGradeBenefitsById).put(addGradeToBenefits);


