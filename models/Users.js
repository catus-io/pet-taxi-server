const jwt = require('jsonwebtoken')
const { MongoClient } = require('mongodb')
const url = 'mongodb://catus:catus1!@ds021016.mlab.com:21016/pettaxi'
const dbName = 'pettaxi'
const colName = 'users'

const findUserOne = object => {
  return MongoClient.connect(url, { useNewUrlParser: true })
  .then(client => {
    const col = client.db(dbName).collection(colName);
    try {
      return col.findOne(object)
    }
    finally {
      client.close()
    }
  })
}
const insertUser = user => {
  return MongoClient.connect(url, { useNewUrlParser: true })
  .then(client => {
    const col = client.db(dbName).collection(colName);
    try {
      return col.insertOne(user)
    }
    finally {
      client.close()
    }
  })
}

// token
const createToken = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        _id: user._id
      },
      'should be create token',
      {
        expiresIn: '7d',
        issuer: 'CATUS',
        subject: 'auth'
      },
      (err, token) => {
        if(err) reject(err);
        resolve(token);
      }
    )
  })
}

const validateToken = (req, res, next) => {
  const token = req.headers['authorization']
  jwt.verify(token, 'should be create token', (err, decoded) => {
    if(err) res.status(403).json({code: 403})
    req.decoded = decoded
    next()
  })
}
export { findUserOne, insertUser, createToken, validateToken}