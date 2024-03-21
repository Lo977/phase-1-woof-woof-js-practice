document.addEventListener("DOMContentLoaded", () => {
  fetchAllDogs();

  const toggleBtn = document.getElementById("good-dog-filter");
  const dogBar = document.querySelector("#dog-bar");
  const dogInfo = document.querySelector("#dog-info");
  const allDogs = [];

  function fetchAllDogs() {
    fetch("http://localhost:3000/pups")
      .then((res) => res.json())
      .then((dogData) =>
        dogData.forEach((dog) => {
          renderDogs(dog);
          allDogs.push(dog);
        })
      );
  }

  toggleBtn.addEventListener("click", () => {
    filterDogs();
  });
  function filterDogs() {
    if (toggleBtn.textContent === "Filter good dogs: OFF") {
      toggleBtn.textContent = "Filter good dogs:ON";
      dogBar.innerHTML = "";
      const goodDogs = allDogs.filter((dog) => dog.isGoodDog === true);
      goodDogs.forEach((dog) => renderDogs(dog));
    } else if ((toggleBtn.textContent = "Filter good dogs:ON")) {
      toggleBtn.textContent = "Filter good dogs: OFF";
      dogBar.innerHTML = "";
      allDogs.forEach((dog) => renderDogs(dog));
    }
  }

  function renderDogs(dog) {
    const span = document.createElement("span");
    span.innerText = dog.name;
    dogBar.appendChild(span);

    span.addEventListener("click", () => {
      dogInfo.innerHTML = "";

      const img = document.createElement("img");
      const name = document.createElement("h2");
      img.src = dog.image;
      name.textContent = dog.name;

      const statusBtn = document.createElement("button");

      dog.isGoodDog === true
        ? (statusBtn.innerHTML = "Change to bad dog!")
        : (statusBtn.innerHTML = "Change to good dog!");

      dogInfo.append(img, name, statusBtn);

      statusBtn.addEventListener("click", () => {
        // console.log(dog.isGoodDog);
        // console.log(!dog.isGoodDog);

        fetch(`http://localhost:3000/pups/${dog.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isGoodDog: !dog.isGoodDog }),
        })
          .then((res) => res.json())
          .then((dogData) => {
            statusBtn.innerText === "Change to good dog!"
              ? (statusBtn.innerText = "Change to bad dog!")
              : (statusBtn.innerText = "Change to good dog!");
          });
      });
    });
  }
});
