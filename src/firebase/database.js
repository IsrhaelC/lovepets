import { database } from './firebase';

export const writeUserData = (userId, nickname, name, email, nascimento, endereco, hasShelter) =>
  database.ref('users/' + userId).set({
    name: name,
    nickname: nickname,
    email: email,
    nascimento: nascimento,
    endereco: endereco,
    hasShelter: hasShelter
});

export const writeUserDataUpdate = (userId, name, endereco) =>
  database.ref('users/' + userId).set({
    name: name,
    endereco: endereco
});

export const sendMessage = (userUid, shelterUid, petUid, message, date) =>
  database.ref('messages/' + userUid + "/" + shelterUid).set({
    userUid: userUid,
    shelterUid: shelterUid,
    petUid: petUid,
    message: message,
    date: date
});

const petUid = Math.floor(Math.random() * 1000) + 1;

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

export const updateUserData = (updates) =>
  database.ref().update(updates);

export const writeShelterData = (userId, name, age, endereco, qtdPetsFind, qtdPetsAdopters, qtdPetsCurrent, qtdColaboradores) =>
  database.ref('shelters/' + userId).set({
    name: name,
    age: age,
    endereco: endereco,
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

export const shelter = (uid) => {
  return database.ref('/shelters/' + uid).once('value').then((snapshot) => {
    var shelter = {
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

export const allPets = () => {
  return database.ref('/pets/').once('value');
}
