'use strict';

import mongoose from 'mongoose';

var PaymentSchema = new mongoose.Schema({
    name: String,
    info: String,
    avatar: String,
    image: String,
    index: Number
    
});

export default mongoose.model('Payment', PaymentSchema);
