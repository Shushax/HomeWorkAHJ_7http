const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:7070/?method=allTickets');
xhr.send();
xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
        try {
            console.log(xhr.responseText);
        } catch (e) {
            console.error(e);
        }
    }
});