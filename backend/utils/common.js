
export const createNew = (req, res, next, model) => {
    try {
        if (Object.keys(req.body).length > 0) {
            model.create(req.body)
                .then((response) => {
                    res.status(200).json({
                        success: true,
                        response
                    })
                })
                .catch((err) => { handleCatch(err, res, 401, next) })
        }
        else {
            throw "Request Body is empty"
        }
    }
    catch (err) { handleCatch(err, res, 401, next) }

}

export const getAll = (res, next, model, query = {}, message = 'Result') => {
    model.find(query)
        .then((response) => {
            if (response.length == 0) { throw (`${message} Not Found`) }
            else {
                res.status(200).json({
                    success: true,
                    count: response.length,
                    response
                })
            }
        })
        .catch((err) => { handleCatch(err, res, 401, next) })
}

export const getById = (id, res, next, model, message = 'Result') => {
    model.findById(id)
        .then((response) => {
            if (!response) { throw (`${message} Not Found`) }
            else {
                res.status(200).json({
                    success: true,
                    response
                })
            }
        })
        .catch((err) => { handleCatch(err, res, 401, next) })
}

export const deleteById = (id, res, next, model, message = 'Result') => {
    model.findByIdAndDelete(id)
        .then((response) => {
            if (!response) { throw (`${message} Not Found`) }
            res.status(200).json({
                success: true,
                Message: `${message} Deleted Successfully`
            })
        })
        .catch((err) => { handleCatch(err, res, 401, next) })
}


export const updateById = (req, res, next, model, message = 'Result', inject = null) => {
    try {
        if (req.body.createdAt) {
            throw 'You can not update the creation time'
        }
        if (Object.keys(req.body).length <= 0) {

            throw "Already Up to date!"
        }
        model.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
            .then((response) => {
                if (!response) {
                    throw (`${message} Not Found`);
                }
                if (inject) inject();
                res.status(200).json({
                    success: true,
                    Message: `${message} Updated Successfully`
                })
            })
            .catch((err) => { handleCatch(err, res, 401, next) })
    }
    catch (err) { handleCatch(err, res, 401, next) }
}

export const deleteInBulk = (res, next, model, query, message = "Result") => {
    model.deleteMany(query)
        .then((response) => {
            if (!response.deletedCount) throw `No ${message} exists`
            res.status(200).json({
                success: true,
                count: response.length,
                message: `${message} Deleted Successfully`
            })
        })
        .catch((err) => { handleCatch(err, res, 401, next) })

}
export const checkIsExistAndCreate = (req, res, next, id, findInModel, createForModel, message = "Result") => {
    findInModel.findById(id)
        .then((response) => {
            if (!response) throw `${message} not Found`;
            createNew(req, res, next, createForModel);
        })
        .catch((err) => { handleCatch(err, res, 401, next) })

}

export const handleCatch = (err, res, statusCode, next) => {
    res.status(statusCode).json({
        success: false,
        error: err
    })
}