const indexCtrl = {};

indexCtrl.renderIndex = (req, res) =>{
    res.render('index' , {
        userName: req.session.name,
    })
};
indexCtrl.renderEstudiar = (req, res) =>{

    res.render('estudiar' , {
        userName: req.session.name,
    }) // pomodoro timer
};

module.exports = indexCtrl;