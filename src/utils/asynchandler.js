const asynchandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((error) => next(error));
    }
}

    export default asynchandler;






















// const asynchandler =(fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next);
        
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message || 'Internal Server Error',
//             stack: process.env.NODE_ENV === 'production' ? null : error.stack   
//         })
//     }
// }

