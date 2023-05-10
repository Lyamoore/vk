"use script";

class Reservation {
  constructor(tower, floor, room, date, time, comment) {
    this.tower = tower;
    this.floor = floor;
    this.room = room;
    this.date = date;
    this.time = time;
    this.comment = comment;
  }
}

function createTowerPick(container) {
  const towers = ["A", "B"];

  const box = `<div class="form__towerPick form__pick wrap">
  <select class="form__towerPick__menu form__pick__menu" ></select>
  <p>tower</p>
  </div>`;
  container.insertAdjacentHTML("beforeend", box);

  const $select = container.querySelector(".form__towerPick__menu");

  towers.forEach((item) => {
    const elem = `<option> ${item} </option>`;
    $select.insertAdjacentHTML("beforeend", elem);
  });

  $select.value = "";
}

function createFloorPick(container) {
  const initialFloor = 3;
  const finalFloor = 27;

  const box = `<div class="form__floorPick form__pick wrap">
  <select class="form__floorPick__menu form__pick__menu"></select>
  <p>floor</p>
  </div>`;
  container.insertAdjacentHTML("beforeend", box);

  const $select = container.querySelector(".form__floorPick__menu");

  for (let i = initialFloor; i <= finalFloor; i++) {
    const elem = `<option> ${i} </option>`;
    $select.insertAdjacentHTML("beforeend", elem);
  }

  $select.value = "";
}

function createRoomPick(container) {
  const initialRoom = 1;
  const finalRoom = 10;

  const box = `<div class="form__roomPick form__pick wrap">
  <select class="form__roomPick__menu form__pick__menu"></select>
  <p>room</p>
  </div>`;
  container.insertAdjacentHTML("beforeend", box);

  const $select = container.querySelector(".form__roomPick__menu");

  for (let i = initialRoom; i <= finalRoom; i++) {
    const elem = `<option> ${i} </option>`;
    $select.insertAdjacentHTML("beforeend", elem);
  }

  $select.value = "";
}

function createDaT(container) {
  const dateAndTime = `<div class="form__dateAndTime__one">
  <p>Date and start time</p>
  <input type="datetime-local" class="form__dateAndTime__date" />
  </div>`;
  const endTime = `<div class="form__dateAndTime__two">
  <p>End time</p>
  <input type="time" class="form__dateAndTime__end_time"/>
  </div>`;

  const box = `<div class="form__dateAndTime wrap"></div>`;
  container.insertAdjacentHTML("beforeend", box);

  const $div = container.querySelector(".form__dateAndTime");
  $div.insertAdjacentHTML("beforeend", dateAndTime);
  $div.insertAdjacentHTML("beforeend", endTime);
}

function createTextArea(container) {
  const textArea = `<p>Your requests</p>
  <textarea class="form__comment__requests"></textarea>`;

  const box = `<div class="form__comment wrap"></div>`;
  container.insertAdjacentHTML("beforeend", box);

  const $div = container.querySelector(".form__comment");
  $div.insertAdjacentHTML("afterbegin", textArea);
}

function createButtons(container) {
  const sendBtn = `<button class="form__buttons__sendBtn form__buttons__btn">Send</button>`;
  const delBtn = `<button class="form__buttons__delBtn form__buttons__btn">Clear</button>`;

  const box = `<div class="form__buttons wrap"></div>`;
  container.insertAdjacentHTML("beforeend", box);

  const $div = container.querySelector(".form__buttons");
  $div.insertAdjacentHTML("afterbegin", sendBtn);
  $div.insertAdjacentHTML("afterbegin", delBtn);
}

function createForm() {
  const $body = document.body;

  const box = `<form action="" class="form"> </form>`;
  $body.insertAdjacentHTML("afterbegin", box);

  const $form = document.querySelector(".form");
  return $form;
}

function btnsActions(e) {
  if (e.target.tagName == "BUTTON") {
    e.preventDefault();

    const tower = e.currentTarget.querySelector(".form__towerPick__menu");
    const floor = e.currentTarget.querySelector(".form__floorPick__menu");
    const room = e.currentTarget.querySelector(".form__roomPick__menu");
    const dateAndTime = e.currentTarget.querySelector(
      ".form__dateAndTime__date"
    ).value;
    const date = dateAndTime.slice(0, dateAndTime.indexOf("T"));
    const startTime = dateAndTime.slice(
      dateAndTime.indexOf("T") + 1,
      dateAndTime.length
    );
    const endTime = e.currentTarget.querySelector(
      ".form__dateAndTime__end_time"
    );
    const comment = e.currentTarget.querySelector(".form__comment__requests");

    if (e.target.className.includes("form__buttons__delBtn")) {
      tower.value = "";
      floor.value = "";
      room.value = "";
      e.currentTarget.querySelector(".form__dateAndTime__date").value = "";
      endTime.value = "";
      comment.value = "";
    }

    if (e.target.className.includes("form__buttons__sendBtn")) {
      const arrCheck = [];
      arrCheck.push(
        tower.value,
        floor.value,
        room.value,
        date,
        startTime,
        endTime.value
      );

      if (arrCheck.includes("")) {
        alert("Fill out all the basic fields, please");
      } else {
        const reserv = new Reservation(
          tower.value,
          floor.value,
          room.value,
          date,
          `${startTime} - ${endTime.value}`,
          comment.value
        );

        console.log(JSON.stringify(reserv));
      }
    }
  }
}

function buildAll() {
  const $form = createForm();

  createTowerPick($form);
  createFloorPick($form);
  createRoomPick($form);
  createDaT($form);
  createTextArea($form);
  createButtons($form);

  $form.addEventListener("click", btnsActions);
}

buildAll();
