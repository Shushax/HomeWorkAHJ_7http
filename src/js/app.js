const form = document.forms[0];
form.onsubmit = function(e) {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    let formData = new FormData(form);
    xhr.open('POST', 'http://localhost:8080/?method=createTicket');
    xhr.send(formData);
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Работает!');
        }
    }
}