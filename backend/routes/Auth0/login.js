function login(email, password, callback) {
  const bcrypt = require('bcrypt');
  const MongoClient = require('mongodb').MongoClient;
  const client = new MongoClient('mongodb+srv://ujjawalsidhpura:'+configuration.MONGO_PASSWORD+'@cluster0.57jak.mongodb.net/MaintenancePro?retryWrites=true&w=majority');

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db('MaintenancePro');
    const users = db.collection('Users');

    users.findOne({ email: email }, function (err, user) {
      if (err || !user) {
        client.close();
        return callback(err || new WrongUsernameOrPasswordError(email));
      }

      bcrypt.compare(password, user.password, function (err, isValid) {
        client.close();

        if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));

        return callback(null, {
            user_id: user._id.toString(),
            nickname: user.nickname,
            email: user.email
          });
      });
    });
  });
}