export const hello = (async (req, res) => {
    res.status(200).json({ message: 'HEllo' });
})