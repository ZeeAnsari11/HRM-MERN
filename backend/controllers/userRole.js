import { UserRoleModel } from "../models/userRoleSchema.js";
import { checkIsExistAndCreate, getAll, getById, handleCatch, updateById } from "../utils/common.js";
import { OrganizationModel } from "../models/organizationSchema.js";

export const createUserRole = (req, res, next) => {
    try {
        if (req.body.unique_id) throw "unique_id is not required";
        req.body.unique_id = (req.body.organization + (req.body.type).toLowerCase())
        checkIsExistAndCreate(req, res, next, req.body.organization, OrganizationModel, UserRoleModel, 'User Role');
    }
    catch (err) { handleCatch(err, res, 401, next) }
}

export const getAllUserRolesByOrganizationId = (req, res, next) => {
    getAll(res, next, UserRoleModel, { organization: req.params.id }, 'User Role');
}

export const updateUserRoleById = (req, res, next) => {
    try {
        if (req.body.organization || req.body.unique_id) throw "You can not change the organization or unique id of any user role.";
        if (req.body.type) {
            UserRoleModel.findById(req.params.id)
            .then((role=>{
               if(!role) throw "User Role not exist that you want to update.";
                req.body.unique_id = (role.organization + (req.body.type).toLowerCase())
                updateById(req, res, next, UserRoleModel, 'User Role');
            }))
            .catch(err=> {handleCatch(err, res, 410 ,next)})
        }
        else{
            updateById(req, res, next, UserRoleModel, 'User Role');
        }
        
    }
    catch (err) { handleCatch(err, res, 401, next) }
}

export const getUserRoleById = (req, res, next) => {
    getById(req.params.id, res, next, UserRoleModel, 'User Role');
}

export const deleteAllUserRolesByOrganizationId = (orgId) => {
    UserRoleModel.deleteMany({ organization: orgId })
        .then(() => {
            process.exit(0);
        })
        .catch((error) => handleCatch(error, res, 401, next))
}
