import { database } from './firebase';

const petUid = Math.floor(Math.random() * 1000) + 1;
const msgUid = Math.floor(Math.random() * 1000) + 1;

//user actions
export const writeUserData = (userId, nickname, name, email, nascimento, endereco, hasShelter, avatarURL) =>
database.ref('users/' + userId).set({
  uid: userId,
  name: name,
  nickname: nickname,
  email: email,
  nascimento: nascimento,
  endereco: endereco,
  hasShelter: hasShelter,
  shelterUid: "none",
  avatarURL: avatarURL
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
      hasShelter: snapshot.val().hasShelter,
      shelterUid: snapshot.val().shelterUid,
      avatarURL: snapshot.val().avatarURL
    }
    localStorage.setItem('currentUser', JSON.stringify(userLoggedObj));
  });
}

export const getUser = (uid) => {
  return database.ref('/users/' + uid).once('value');
}

export const allUsers = () => {
  return database.ref('/users/').once('value');
}

//messages actions
export const sendMessage = (userUid, shelterUid, petUid, message, date, isRead, nameFrom) =>
database.ref('messages/' + msgUid).set({
  to: userUid,
  from: shelterUid,
  petUid: petUid,
  message: message,
  date: date,
  isRead: isRead,
  nameFrom: nameFrom,
  uid: msgUid
});

export const getMessages = (uid) => {
  return database.ref('/messages/').once('value').then((snapshot) => {
    var messages = [];
    snapshot.forEach(function(child) {
      messages.push(child.val());
    })
    localStorage.setItem('messages', JSON.stringify(messages));
  });
}

//pet actions
export const writePetData = (shelterUid, shelterName, name, descricao, age, gender, type, size, avatarURL, dataCadastro, shortDesc) =>
database.ref('pets/' + petUid).set({
  petUid: petUid,
  shelterUid: shelterUid,
  shelterName: shelterName,
  name: name,
  descricao: descricao,
  age: age,
  gender: gender,
  type: type,
  size: size,
  imageURL: avatarURL,
  dataCadastro: dataCadastro,
  shortDesc: shortDesc,
  adotado: "false",
  visible: "false"
});

export const allPets = () => {
  return database.ref('/pets/').once('value');
}

//utils
export const updateData = (updates) =>
database.ref().update(updates);

//shelter data
export const writeShelterData = (userId, name, age, endereco, qtdPetsFind, qtdPetsAdopters, qtdPetsCurrent, qtdColaboradores, adminUid) =>
  database.ref('shelters/' + userId).set({
    uid: userId,
    name: name,
    age: age,
    endereco: endereco,
    qtdPetsFind: qtdPetsFind,
    qtdPetsAdopters: qtdPetsAdopters,
    qtdPetsCurrent: qtdPetsCurrent,
    qtdColaboradores: qtdColaboradores,
    adminUid: adminUid
});

export const shelter = (uid) => {
  return database.ref('/shelters/' + uid).once('value').then((snapshot) => {
    var shelter = {
      uid: snapshot.val().uid,
      age: snapshot.val().age,
      bairro: snapshot.val().bairro,
      cidade:snapshot.val().cidade,
      endereco: snapshot.val().endereco,
      estado: snapshot.val().estado,
      name: snapshot.val().name,
      number: snapshot.val().number,
      qtdColaboradores: snapshot.val().qtdColaboradores,
      qtdPetsAdopters: snapshot.val().qtdPetsAdopters,
      qtdPetsCurrent: snapshot.val().qtdPetsCurrent,
      qtdPetsFind: snapshot.val().qtdPetsFind
    }
    localStorage.setItem('shelter', JSON.stringify(shelter));
  });
}
