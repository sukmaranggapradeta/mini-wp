function ErrHandling(err, req, res, next){
    switch (err.name){
        case 'ValidationError':
            res.status(400).json(err.message)
            break;
        case 'loginFailed':
            res.status(400).json('email/password wrong!')
            break;
        default:
            res.status(500).json(err)
    }
}

module.exports = ErrHandling