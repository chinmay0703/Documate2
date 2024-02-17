import mongoose from 'mongoose';
import User from '../model/userModel.js';
import ParagraphModel from '../model/paragraphModel.js';

export const addnotes = async (req, res) => {
    const { email, notetext, namenote } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newParagraphs = [];

        for (const paragraphData of notetext) {
            let newParagraph;

            switch (paragraphData.type) {
                // Inside your switch statement

                case 'image':
                    // Validate image data
                    if (!paragraphData.props || !paragraphData.props.url || !paragraphData.props.textColor) {
                        console.error('Invalid image data:', paragraphData);
                        continue;
                    }
                    newParagraph = new ParagraphModel({
                        id: paragraphData.id,
                        type: 'image',
                        props: paragraphData.props,
                        children: paragraphData.children,
                    });
                    if (!paragraphData.props || !paragraphData.props.url) {
                        console.error('Invalid image data:', paragraphData);
                        continue; // Skip to the next iteration if invalid
                    }

                    break;
                    // Other cases...


                    // Validate image data

                    newParagraph = new ParagraphModel({
                        id: paragraphData.id,
                        type: 'image',
                        props: paragraphData.props,
                        children: paragraphData.children,
                    });
                    break;

                case 'paragraph':
                    // Validate paragraph data
                    if (!paragraphData.props || !paragraphData.props.textColor) {
                        console.error('Invalid paragraph data:', paragraphData);
                        continue; // Skip to the next iteration if invalid
                    }
                    newParagraph = new ParagraphModel({
                        id: paragraphData.id,
                        type: 'paragraph',
                        props: paragraphData.props,
                        content: paragraphData.content,
                        children: paragraphData.children,
                    });
                    break;

                case 'heading':
                    // Validate heading data
                    if (!paragraphData.props || !paragraphData.props.textColor) {
                        console.error('Invalid heading data:', paragraphData);
                        continue; // Skip to the next iteration if invalid
                    }
                    newParagraph = new ParagraphModel({
                        id: paragraphData.id,
                        type: 'heading',
                        props: paragraphData.props,
                        content: paragraphData.content,
                        children: paragraphData.children,
                    });
                    break;

                case 'bulletListItem':
                case 'numberedListItem':
                    // Validate list item data
                    if (!paragraphData.props || !paragraphData.props.textColor) {
                        console.error('Invalid list item data:', paragraphData);
                        continue; // Skip to the next iteration if invalid
                    }
                    newParagraph = new ParagraphModel({
                        id: paragraphData.id,
                        type: paragraphData.type,
                        props: paragraphData.props,
                        content: paragraphData.content,
                        children: paragraphData.children,
                    });
                    break;

                // Add more cases for other types as needed

                default:
                    console.error(`Unknown paragraph type: ${paragraphData.type}`);
                    continue; // Skip to the next iteration for unknown types
            }

            newParagraphs.push(newParagraph);
        }

        user.notes.push({
            title: namenote,
            paragraphs: newParagraphs,
        });

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
