import { PermissionsModel } from "../models/permissions.js"
import { handleCatch } from "../utils/common.js"
export const permissionsMiddlewre = (req, res, next) => {
    try {
        if (req.headers['key'] == "createOrganization") next();

        else if (req.headers['organization'] && req.headers['key'] && req.headers['role']) {
            PermissionsModel.find({ key: req.headers['key'], organization: req.headers['organization'] })
                .then((permissionObject) => {
                    if (permissionObject.length == 0) {
                        let notFound = new Error("There is no permission against that key")
                        notFound.statusCode = 404
                        throw notFound;
                    }
                    if (permissionObject[0].permission.includes(req.headers['role'])) {
                        next();
                    }
                    else {
                        let notAuthorized = new Error("You are not authorized for this route")
                        notAuthorized.statusCode = 403;
                        throw notAuthorized;
                    }
                })
                .catch((err) => {
                    handleCatch(err, res, err.statusCode || 400, next);
                })
        }
        else {
            throw new Error("invalid body for authorization")
        }
    }
    catch (err) {
        handleCatch(err, res, err.statusCode || 400, next);
    }
}
