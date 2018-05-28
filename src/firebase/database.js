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
    localStorage.userUid = uid;
    localStorage.userLogged = "true";
    localStorage.userName = snapshot.val().name;
    localStorage.userNickname = snapshot.val().nickname;
    localStorage.userEmail = snapshot.val().email;
    localStorage.userNascimento = snapshot.val().nascimento;
    localStorage.userEndereco = snapshot.val().endereco;
    localStorage.userNumber = snapshot.val().number;
    localStorage.userBairro = snapshot.val().bairro;
    localStorage.userCidade = snapshot.val().cidade;
    localStorage.userEstado = snapshot.val().estado;
  });
}
