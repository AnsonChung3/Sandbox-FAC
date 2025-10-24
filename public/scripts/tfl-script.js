const data = [
    'Apple',
    'Banana',
    'Cherry',
    'Grape',
    'Mango',
    'Orange',
    'Strawberry',
];
const input = document.getElementById('search-box');
const suggestionsBox = document.getElementById('suggestions');

input.addEventListener('input', () => {
    const query = input.value.toLowerCase();
    suggestionsBox.innerHTML = '';

    if (query === '') {
        suggestionsBox.style.display = 'none';
        return;
    }

    const matches = data.filter((item) => item.toLowerCase().includes(query));

    if (matches.length > 0) {
        suggestionsBox.style.display = 'block';
        matches.forEach((match) => {
            const div = document.createElement('div');
            div.classList.add('suggestion');
            div.textContent = match;
            div.addEventListener('click', () => {
                input.value = match;
                suggestionsBox.style.display = 'none';
            });
            suggestionsBox.appendChild(div);
        });
    } else {
        suggestionsBox.style.display = 'none';
    }
});

document.getElementById('btn-4').addEventListener('click', () => {
    const val = document.getElementById('search-box').value;
    fetch(`/default/custom-text/${val}`);
    console.log('check terminal');
});

function addContentToDisplayArea(content) {
    const displayArea = document.getElementById('display-area');
    content.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        displayArea.appendChild(listItem);
    });
}
document.getElementById('btn-3').addEventListener('click', () => {
    fetch('/tfl/meta-line-stop-points')
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            // localStorage.setItem('tfl_lines', JSON.stringify(data));
            addContentToDisplayArea(data);
        })
        .catch((err) => console.log(err));
});
document.getElementById('btn-2').addEventListener('click', () => {
    fetch('/tfl/meta-lines')
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            localStorage.setItem('tfl_meta_tube_line_id', JSON.stringify(data));
            addContentToDisplayArea(data);
        })
        .catch((err) => console.log(err));
});
document.getElementById('btn-1').addEventListener('click', () => {
    fetch('/tfl/meta')
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            localStorage.setItem('tfl_meta_nodeName', JSON.stringify(data));
            addContentToDisplayArea(data);
        })
        .catch((err) => console.log(err));
});
