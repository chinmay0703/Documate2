import mongoose from 'mongoose';

const paragraphSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['paragraph', 'heading', 'bulletListItem', 'numberedListItem', 'table', 'image'],
    },
    props: {
        textColor: {
            type: String,
            required: true,
        },
        backgroundColor: {
            type: String,
            required: true,
        },
        textAlignment: {
            type: String,
            required: true,
        },
        level: {
            type: Number, 
        },
        url: {
            type: String,
        },
        caption: {
            type: String,
        },
        width: {
            type: Number,
        },
    },
    content: [{
        type: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        styles: {
            type: mongoose.Schema.Types.Mixed,
        },
    }],
    children: {
        type: [],
        default: [],
    },
    table: {
        type: {
            type: String,
            enum: ['tableContent'],
        },
        rows: [{
            cells: [{
                content: [{
                    type: String,
                    required: true,
                }],
                styles: {
                    type: mongoose.Schema.Types.Mixed,
                },
            }],
        }],
    },
});

const ParagraphModel = mongoose.model('Paragraph', paragraphSchema);
export default ParagraphModel;
