const url = 'https://jsonplaceholder.typicode.com/users';

const loadTable = () => {
    $.getJSON(url, (data) => {
        objList = data;
        for (var obj of data) {
            console.log(obj);
            $('#table tbody').append('<tr>...</tr>');
            $('#table tr:last').append(`<td>${obj['id']}</td>`);
            $('#table tr:last').append(`<td>${obj['name']}</td>`);
            $('#table tr:last').append(`<td>${obj['username']}</td>`);
            $('#table tr:last').append(`<td>${obj['address']['city']}</td>`);
            $('#table tr:last').append(`<td>${obj['company']['name']}</td>`);
            const button = `<input id="button${obj['id']}" type="button" `+
                           `value="Edit" onclick="editPage(id);" />`
            $('#table tr:last').append(`<td>${button}</td>`);
        }
    });
}

const editPage = (button) => {
    index = button.substring('button'.length, button.length);
    localStorage.setItem("index", index);
    localStorage.setItem("objList", JSON.stringify(objList));
    window.open('edit.html', "_self");
}

const loadForm = () => {
    index = parseInt(localStorage.getItem("index"));
    document.getElementById("form-title").innerHTML = "Edit User "+index;
}

const patchTable = () => {
    index = parseInt(localStorage.getItem("index"));
    console.log(index);
    objList = JSON.parse(localStorage.getItem("objList"));
    console.log(objList);
    objList[index]['name'] = $('#name');
    objList[index]['username'] = $('#username');
    objList[index]['address']['city'] = $('#city');
    objList[index]['company']['name'] = $('#company');
    localStorage.setItem("objList", JSON.stringify(objList));
    $.ajax({
        url: url + '/' + index,
        type: 'PATCH',
        data: JSON.stringify(objList[index]),
        dataType: 'json',
        error: () => {
            console.log('Error');
            createAlert('alert-danger', 'Update failed!');
        },
        success: () => {
            console.log('success');
            createAlert('alert-success', 'Successfully updated!');
        },
    });
}

const createAlert = (type, msg) => {
    const ahtml = `<div id="alert" class="alert ${type} "><a class=`+
                  `"close" data-dismiss="alert">×</a><span>${msg}</span></div>`;

    $('#alert_placeholder').append(ahtml);    
    setTimeout(() => {$("#alert").remove();}, 2500);
}

