const { Schema, model } = require("mongoose");

const CarSchema = new Schema(
{
    car_name: {
        type: String,
        required: true,
        trim: true
    },

    model: {
        type: String,
        required: true,
        trim: true
    },

    year: {
        type: Number,
        required: true
    },

    color: {
        type: String,
        required: true
    },

    distance: {
        type: Number,
        required: true
    },

    gearbox: {
        type: String,
        enum: ["Manual", "Avtomat"],
        required: true
    },

    description: {
        type: String,
        trim: true
    },
    car_image: {
        type: String
    },

    price: {
        type: Number,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    category_id: {
        type: Schema.Types.ObjectId, 
        ref: "Category",
        required: true
    }

},
{
    versionKey: false,
    timestamps: true
});

module.exports = model("cars", CarSchema);