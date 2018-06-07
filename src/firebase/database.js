import { database } from './firebase';

export const writeUserData = (userId, nickname, name, email, nascimento, endereco, number, bairro, cidade, estado, hasShelter) =>
  database.ref('users/' + userId).set({
    name: name,
    nickname: nickname,
    email: email,
    nascimento: nascimento,
    endereco: endereco, 
    number: number, 
    bairro: bairro, 
    cidade: cidade, 
    estado: estado,
    hasShelter: hasShelter
});

const petUid = Math.floor(Math.random() * 1000) + 1;

export const writePetData = (shelterUid, name, descricao, age, gender, type, size, avatarURL, dataCadastro) =>
  database.ref('pets/' + petUid).set({
    shelterUid: shelterUid,
    name: name,
    descricao: descricao,
    age: age,
    gender: gender,
    type: type,
    size: size,
    imageURL: avatarURL,
    dataCadastro: dataCadastro
});

export const updateUserData = (updates) =>
  database.ref().update(updates);

export const writeShelterData = (userId, name, age, endereco, number, bairro, cidade, estado, qtdPetsFind, qtdPetsAdopters, qtdPetsCurrent, qtdColaboradores) =>
  database.ref('shelters/' + userId).set({
    name: name,
    age: age,
    endereco: endereco, 
    number: number, 
    bairro: bairro, 
    cidade: cidade, 
    estado: estado, 
    qtdPetsFind: qtdPetsFind,
    qtdPetsAdopters: qtdPetsAdopters,
    qtdPetsCurrent: qtdPetsCurrent,
    qtdColaboradores: qtdColaboradores
});

export const userLogged = (uid) => {
  return database.ref('/users/' + uid).once('value').then((snapshot) => {
    localStorage.userLogged = "true";
    localStorage.userUid = uid;
    var userLoggedObj = {
      uid: uid,
      name: snapshot.val().name,
      nickname: snapshot.val().nickname,
      email: snapshot.val().email,
      nascimento: snapshot.val().nascimento,
      endereco: snapshot.val().endereco,
      number: snapshot.val().number,
      bairro: snapshot.val().bairro,
      cidade: snapshot.val().cidade,
      estado: snapshot.val().estado,
      hasShelter: snapshot.val().hasShelter
    }
    localStorage.setItem('currentUser', JSON.stringify(userLoggedObj));
  });
}
