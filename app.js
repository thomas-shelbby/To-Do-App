// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEL0tLVokTDjcDVIPHAuKATZN1KKapCKE",
    authDomain: "todo-app-9619b.firebaseapp.com",
    databaseURL: "https://todo-app-9619b-default-rtdb.firebaseio.com",
    projectId: "todo-app-9619b",
    storageBucket: "todo-app-9619b.appspot.com",
    messagingSenderId: "87550916906",
    appId: "1:87550916906:web:a1c31cc00f45fe8e300653"
};

let todoItems = [];

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);

    firebase.database().ref('todos').on('value', function (data) {
        let dataReturned = data.val();
        for (var item in dataReturned) {
            let obj = todoItems.find(o => o.key === dataReturned[item].key);
            if (!obj) {
                todoItems.push({ key: dataReturned[item].key, value: dataReturned[item].value })
                createTodo(dataReturned[item].key, dataReturned[item].value);
            }
        }
        // console.log(todoItems)
    })
}
// firebase.database().ref('test').push({
// 	name: 'test2',
// 	roll: '786'
// })

// let list = document.getElementById("List")


// // let lis = document.getElementById("deleteAll")







// function createTodo(key, value) {

//     // Making "Li" List Tag

//     let li = document.createElement("li")
//     let text = document.createTextNode(value)
//     li.appendChild(text)

//     // Create Edit Button

//     let Edit = document.createElement("button")
//     let Edit_text = document.createTextNode("Edit")
//     Edit.setAttribute("Class", "border border-0 p-2 mb-1 px-3 ms-3 rounded-pill bg-primary text-white fw-600 me-3")
//     // Edit.setAttribute("onclick", function (){ Edit(this, key); })
//     Edit.onclick = function () {
//         edittodoitem(this, key);
//     };

//     Edit.appendChild(Edit_text)
//     li.appendChild(Edit)

//     // Create Delete Button

//     let create_delete = document.createElement("button")
//     let delete_text = document.createTextNode("Delete")
//     create_delete.setAttribute("Class", "border border-0 p-2 px-3 rounded-pill text-bg-danger fw-600")
//     // create_delete.setAttribute("onclick", "deleteItem(this)")
//     create_delete.onclick = function () {
//         deleteTodoItems(this, key);
//     };
//     create_delete.appendChild(delete_text)
//     li.appendChild(create_delete)


//     list.appendChild(li)
// }

// // Send message Button

// function sendmessage() {
//     let Input = document.getElementById("Input")
//     let database = firebase.database().ref('todos')
//     let key = database.push().key
//     let todo = {
//         value: Input.value,
//         key: key
//     }
//     database.child(key).set(todo)

//     Input.value = ""
// }

// // Delete button

// function deleteTodoItems(del, key) {
//     del.parentNode.remove()
//     firebase.database().ref('todos/' + key).remove()
// }

// // All Items Delete Button

// function deleteAllItems() {
//     list.innerHTML = ""
//     firebase.database().ref('todos/').remove()
// }

// // Edit Todo Button

// function edittodoitem(button, key) {
//     let editValue = prompt("Enter Your Value", button.parentNode.firstChild.nodeValue)
//     console.log(editValue);
//     console.log(key);

//     if (editValue !== null) {
//         button.parentNode.firstChild.nodeValue = editValue;



//         firebase.database().ref('todos/' + key).update({ value: editValue }, (error) => {
//             if (error) {
//                 console.log('The write failed...' + error);
//             } else {
//                 console.log('Data updated successfully!');
//             }
//         });
//     }
// }

let list = document.getElementById("List");

function createTodo(key, value) {
    let li = document.createElement("li");
    let text = document.createTextNode(value);
    li.appendChild(text);
    // list.innerHTML = ""

    let Edit = document.createElement("button");
    let Edit_text = document.createTextNode("Edit");
    Edit.setAttribute("Class", "border border-0 p-2 mb-1 px-3 ms-3 rounded-pill bg-primary text-white fw-600 me-3");
    Edit.onclick = function () {
        edittodoitem(this, key);
    };
    Edit.appendChild(Edit_text);
    li.appendChild(Edit);

    let create_delete = document.createElement("button");
    let delete_text = document.createTextNode("Delete");
    create_delete.setAttribute("Class", "border border-0 p-2 px-3 rounded-pill text-bg-danger fw-600");
    create_delete.onclick = function () {
        deleteTodoItems(this, key);
    };
    create_delete.appendChild(delete_text);
    li.appendChild(create_delete);


    list.appendChild(li);
}

function sendmessage() {
    let Input = document.getElementById("Input");
    let database = firebase.database().ref('todos');
    let key = database.push().key;
    let todo = {
        value: Input.value,
        key: key
    };
    database.child(key).set(todo);

    Input.value = "";
}

function deleteTodoItems(del, key) {
    del.parentNode.remove();
    firebase.database().ref('todos/' + key).remove();
}

function deleteAllItems() {
    list.innerHTML = "";
    firebase.database().ref('todos/').remove();
}

function edittodoitem(button, key) {
    let editValue = prompt("Enter Your Value", button.parentNode.firstChild.nodeValue);
    if (editValue !== null) {
        button.parentNode.firstChild.nodeValue = editValue;
        firebase.database().ref('todos/' + key).update({ value: editValue }, (error) => {
            if (error) {
                console.log('The write failed...' + error);
            } else {
                console.log('Data updated successfully!');
            }
        });
    }
}