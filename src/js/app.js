import checkImg from '../images/check_true.png';

const ul = document.getElementsByClassName('tickets')[0];
const newTicket = document.getElementsByClassName('new_ticket')[0];
const cancelNewTicket = document.getElementById('cancel_new_ticket');
const acceptNewTicket = document.getElementById('accept_new_ticket');
const formNewTicket = document.getElementsByClassName('modal_new_ticket')[0];
const formChangeTiket = document.getElementsByClassName('change_ticket')[0];
const cancelChangeTicket = document.getElementById('cancel_change_ticket');
const acceptChangeTicket = document.getElementById('accept_change_ticket');
const formDeleteTicket = document.getElementsByClassName('delete_ticket')[0];
const cancelDeleteTicket = document.getElementById('cancel_delete_ticket');
const acceptDeleteTicket = document.getElementById('accept_delete_ticket');

cancelDeleteTicket.onclick = function (e) {
  e.preventDefault();
  formDeleteTicket.classList.toggle('hidden');
};

cancelChangeTicket.onclick = function (e) {
  e.preventDefault();
  formChangeTiket.classList.toggle('hidden');
};

newTicket.onclick = function (e) {
  e.preventDefault();
  formNewTicket.classList.toggle('hidden');
};

cancelNewTicket.onclick = function (e) {
  e.preventDefault();
  formNewTicket.classList.toggle('hidden');
};

acceptNewTicket.onclick = function (e) {
  e.preventDefault();
  const xhrNewTicket = new XMLHttpRequest();
  xhrNewTicket.open('POST', 'http://localhost:8080/?method=createTicket');
  const formData = new FormData(formNewTicket);
  xhrNewTicket.send(formData);
  formNewTicket.reset();
  formNewTicket.classList.toggle('hidden');
  window.location.reload();
};

const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:8080/?method=allTickets');
xhr.send();
xhr.addEventListener('load', () => {
  if (xhr.status >= 200 && xhr.status < 300) {
    const data = JSON.parse(xhr.responseText);
    data.forEach((ticket) => {
      const li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML = `<div class="check"><img src="${checkImg}" alt="Сделано"></div><span class="spanName">${ticket.name}</span><span>${ticket.created}</span><button class="change">Редактировать</button><button class="delete">Удалить</button><div class="description"></div><span class="hidden id">${ticket.id}</span>`;
      const image = li.getElementsByTagName('img')[0];
      if (!ticket.status) {
        image.remove();
      }
    });

    const btnsEdit = document.getElementsByClassName('change');
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', () => {
        formChangeTiket.classList.toggle('hidden');
        const inputName = formChangeTiket.querySelectorAll('input')[0];
        const currentLi = btn.closest('li');
        const spanName = currentLi.querySelector('.spanName');
        inputName.value = spanName.textContent;
        acceptChangeTicket.addEventListener('click', (e) => {
          e.preventDefault();
          spanName.textContent = inputName.value;
          formChangeTiket.classList.toggle('hidden');
          formChangeTiket.reset();
        });
      });
    });

    const btnsDelete = document.getElementsByClassName('delete');
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', () => {
        formDeleteTicket.classList.toggle('hidden');
        const currentLi = btn.closest('li');
        acceptDeleteTicket.addEventListener('click', (e) => {
          e.preventDefault();
          formDeleteTicket.classList.add('hidden');
          formDeleteTicket.reset();
          currentLi.remove();
        });
      });
    });

    const tickets = document.getElementsByTagName('li');
    tickets.forEach((ticket) => {
      ticket.addEventListener('click', () => {
        const ticketID = ticket.querySelector('.id');
        const xhrDescription = new XMLHttpRequest();
        xhrDescription.open('GET', `http://localhost:8080/?method=ticketById&id=${ticketID.textContent}`);
        xhrDescription.send();
        xhrDescription.addEventListener('load', () => {
          if (xhrDescription.status >= 200 && xhrDescription.status < 300) {
            try {
              const dataTicket = JSON.parse(xhrDescription.responseText);
              console.log(dataTicket);
              const currentLiDescription = ticket.querySelector('.description');
              currentLiDescription.textContent = dataTicket.description;
            } catch (e) {
              console.error(e);
            }
          }
        });
      });
    });
  }
});
