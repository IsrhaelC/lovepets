import { database } from './firebase';

export const writeUserData = (userId, nickname, name, email, nascimento, endereco, number, bairro, cidade, estado) =>
  database.ref('users/' + userId).set({
    name: name,
    nickname: nickname,
    email: email,
    nascimento: nascimento,
    endereco: endereco, 
    number: number, 
    bairro: bairro, 
    cidade: cidade, 
    estado: estado
  });

export const userLogged = (uid) => {
  return database.ref('/users/' + uid).once('value').then(function(user) {
  var currentUser = {
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      nascimento: user.nascimento,
      endereco: user.endereco,
      number: user.number,
      bairro: user.bairro,
      cidade: user.cidade,
      estado: user.estado
    }
  });
}
