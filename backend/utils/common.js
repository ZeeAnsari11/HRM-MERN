
export const createNew = (req, res, next, model) => {
    model.create(req.body)
        .then((response) => {
            res.status(201).json({
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

export const getAll = (req, res, next, model) => {
    model.find()
        .then((response) => {
            if (!response) {
                throw (" Nothing Found");
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

export const getById = (req, res, next, model) => {
    model.findById(req.params.id)
        .then((response) => {
            if (!response) {
                throw (" Nothing Found");
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

export const deleteById = (req, res, next, model) => {
    model.findByIdAndDelete(req.params.id)
    .then((response) => {
        res.status(201).json({
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
        if (!req.body) throw "Already Up to date!";
        model.findByIdAndUpdate(req.params.id, req.body)
        .then((response) => {
            res.status(200).json({
                success: true,
                Message : "Updated Successfully"
            })
        })
        .catch((error) => {
            res.status(401).json({
                success: false,
                error: error
            })
        })
    
}