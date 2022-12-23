const url = "https://dummyjson.com/users";

const box1 = document.querySelector(".box_1");
const box2 = document.querySelector(".box_2");
const box3 = document.querySelector(".box_3");
const show_box_1_btn = document.querySelector(".show_box_1");
const show_box_2_btn = document.querySelector(".show_box_2");
const show_box_3_btn = document.querySelector(".show_box_3");

async function httpsRequest(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function userCard(user) {
  const card = document.createElement("div");
  const firstName = document.createElement("p");
  const lastName = document.createElement("p");
  const maidenName = document.createElement("p");
  const age = document.createElement("p");

  card.classList.add("userCard");

  firstName.innerText = `Firstname: ${user.firstName}`;
  lastName.innerText = `Lastname: ${user.lastName}`;
  maidenName.innerText = `Maidelname: ${user.maidenName}`;
  age.innerText = `Age: ${user.age}`;

  card.append(firstName, lastName, maidenName, age);

  return card;
}

function render(url) {

  httpsRequest(url).then((data) => {
    let users = data.users
    let usersAgeLess25 = users.filter(user => user.age <= 25)
    let usersAgeLess35 = users.filter(user => user.age > 25 && user.age <= 35)
    let usersAgeMore35 = users.filter(user => user.age > 35)

    function showMore(arr, count, box) {
        arr.forEach((user, i) => {
            if (i < count) box.append(userCard(user))
        });
    }

    showMore(usersAgeLess25, count = 3, box1)
    showMore(usersAgeLess35, count = 3, box2)
    showMore(usersAgeMore35, count = 3, box3)


    function clickToShow(arr, box) {
            let count = box.childElementCount += 3
            box.innerHTML = ''
            showMore(arr, count, box)
    }

    show_box_1_btn.onclick = () => clickToShow(usersAgeLess25, box1)
    show_box_2_btn.onclick = () => clickToShow(usersAgeLess35, box2)
    show_box_3_btn.onclick = () => clickToShow(usersAgeMore35, box3)
    

  });
}

render(url);
