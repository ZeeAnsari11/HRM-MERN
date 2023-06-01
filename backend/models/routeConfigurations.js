import mongoose from "mongoose";

const routeConfigurationsSchema = new mongoose.Schema({
    routeName: {
        type: String,
        required: true
    },
    permissions: {
        type: Array,
        enum: {
            values: [
                'Admin',
                'Manager',
                'User'
            ],
            messsage: 'Please Select Leave Type'
        }
    },
    createdAt: {
        type: Date,
        required: true
    }
})

export const RouteConfigurationsModel = mongoose.model('RouteConfigurations', routeConfigurationsSchema, 'Route Configurations Collection')