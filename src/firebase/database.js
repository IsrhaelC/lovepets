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
