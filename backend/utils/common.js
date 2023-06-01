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
                .catch((err) => { handleCatch(err, res, 500, next) })
        }
        else {
            throw new Error ("Request Body is empty")
        }
    }
    catch (err) { handleCatch(err, res, 400, next) }

}

export const getAll = (res, next, model, query = {}, message = 'Result') => {
    model.find(query)
        .then((response) => {
            if (response.length == 0) { throw new Error (`${message} Not Found`) }
            else {
                res.status(200).json({
                    success: true,
                    count: response.length,
                    response
                })
            }
        })
        .catch((err) => { handleCatch(err, res, 404, next) })
}

export const getById = (id, res, next, model, message = 'Result') => {
    model.findById(id)
        .then((response) => {
            if (!response) { throw new Error (`${message} Not Found`) }
            else {
                res.status(200).json({
                    success: true,
                    response
                })
            }
        })
        .catch((err) => {
            handleCatch(err, res, 404, next)
    });
}

export const deleteById = (id, res, next, model, message = 'Result') => {
    model.findByIdAndDelete(id)
        .then((response) => {
            if (!response) { throw new Error (`${message} Not Found`) }
            res.status(200).json({
                success: true,
                Message: `${message} Deleted Successfully`
            })
        })
        .catch((err) => { handleCatch(err, res, 404, next) })
}


export const updateById = (req, res, next, model, message = 'Result', inject = null) => {
    try {
        if (req.body.createdAt) {
            throw new Error ('You can not update the creation time')
        }
        if (Object.keys(req.body).length <= 0) {

            throw new Error ("Already Up to date!")
        }
        model.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
            .then((response) => {
                if (!response) {
                    throw new Error (`${message} Not Found`);
                }
                if (inject) inject();
                res.status(200).json({
                    success: true,
                    Message: `${message} Updated Successfully`
                })
            })
            .catch((err) => { handleCatch(err, res, 404, next) })
    }
    catch (err) { handleCatch(err, res, 400, next) }
}

export const deleteInBulk = (res, next, model, query, message = "Result") => {
    model.deleteMany(query)
        .then((response) => {
            if (!response.deletedCount) throw new Error (`No ${message} exists`)
            res.status(200).json({
                success: true,
                count: response.length,
                message: `${message} Deleted Successfully`
            })
        })
        .catch((err) => { handleCatch(err, res, 404, next) })

}
export const checkIsExistAndCreate = (req, res, next, id, findInModel, createForModel, message = "Result") => {
    findInModel.findById(id)
        .then((response) => {
            if (!response) {throw new Error (`${message} not Found`);}
            createNew(req, res, next, createForModel);
        })
        .catch((err) => { handleCatch(err, res, 404, next) })

}

export const handleCatch = (err, res, statusCode, next) => {
    next({err, statusCode})
}