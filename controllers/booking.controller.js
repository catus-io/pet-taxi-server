import request from 'request'

const searchAddr = (req, res) => {
  console.log('good job!')
  const { addr } = req.body

  console.log('address : ', addr)
  request.post({
    url:'http://www.juso.go.kr/addrlink/addrLinkApi.do', 
    form: 
      { confmKey:'U01TX0FVVEgyMDE5MDEyMDIxMTk1MTEwODQ1OTc=', currentPage: 1, countPerPage: 300, keyword: addr, resultType: 'json' }
    }, 
    function(err,httpResponse,body) {  
      if(err) console.log(err)
      const parsedBody = JSON.parse(body)
      const juso = parsedBody.results.juso
      res.json(juso)
    })
}
const create = (req, res) => {
  const token = req.headers['authorization'] || req.params.token
  console.log(req.body)
  console.log('token : ', token)
  res.json({status: 1})
}

export { searchAddr, create }