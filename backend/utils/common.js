
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
                .catch((error) => {
                    throw error;
                })
        }
        else {
            throw "Request Body is empty"
        }
    }
    catch (error) {
        res.status(401).json({
            success: false,
            error: error
        })
    }

}

export const getAll = (res, next, model) => {
    model.find()
        .then((response) => {
            if (!response) {
                throw ("Nothing Found");
            }
            else {
                res.status(200).json({
                    success: true,
                    response
                })
            }
        })
        .catch((error) => {
            res.status(401).json({
                success: false,
                error: error
            })
        })
}

export const getById = (id, res, next, model) => {
    model.findById(id)
        .then((response) => {
            if (!response) {
                throw ("Nothing Found");
            }
            else {
                res.status(200).json({
                    success: true,
                    response
                })
            }
        })
        .catch((error) => {
            res.status(401).json({
                success: false,
                error: error
            })
        })
}

export const deleteById = (id, res, next, model) => {
    model.findByIdAndDelete(id)
        .then((response) => {
            res.status(200).json({
                success: true,
                response
            })
        })
        .catch((error) => {
            res.status(401).json({
                success: false,
                error: error
            })
        })
}


export const updateById = (req, res, next, model) => {
    if (Object.keys(req.body).length <= 0) {
        res.status(200).json({
            success: true,
            Message: "Already Up to date!"
        })
    }
    model.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.status(200).json({
                success: true,
                Message: "Updated Successfully"
            })
        })
        .catch((error) => {
            res.status(401).json({
                success: false,
                error: error
            })
        })
}