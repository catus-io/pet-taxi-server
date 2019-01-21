const { MongoClient } = require('mongodb')
const url = 'mongodb://catus:catus1!@ds021016.mlab.com:21016/pettaxi'
const dbName = 'pettaxi'
const colName = 'users'

const findUserByEmail = email => {
  return MongoClient.connect(url, { useNewUrlParser: true })
  .then(client => {
    const col = client.db(dbName).collection(colName);
    console.log('find:',email)
    try {
      return col.findOne({email: email})
    }
    finally {
      client.close()
    }
  })
}
const insertUser = (email, nickname, password, createdDateAt) => {
  return MongoClient.connect(url, { useNewUrlParser: true })
  .then(client => {
    const col = client.db(dbName).collection(colName);
    try {
      return col.insertOne({email: email, nickname: nickname, password: password, createdDateAt: createdDateAt})
    }
    finally {
      client.close()
    }
  })
}

export { findUserByEmail, insertUser }