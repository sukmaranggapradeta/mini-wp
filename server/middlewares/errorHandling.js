function ErrHandling(err, req, res, next){
    switch (err.name){
        case 'ValidationError':
            res.status(400).json(err.message)
            break;
        case 'loginFailed':
            res.status(400).json({ err:'email/password wrong!'})
            break;
        default:
            console.log(err, 'ini error message dari error handling')
            res.status(500).json(err)
            break;
    }
}

module.exports = ErrHandling