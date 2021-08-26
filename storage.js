


// firebase.database().ref('users/pakistan').push({
//     name: "ghous",
//     email: "ghous@gmail.com"
// })


// firebase.database().ref('users/pakistan').on('child_added',(data)=>{
//     console.log({...data.val(),key: data.key})
// })



let uploadFiles = (file) => {
    return new Promise((resolve, reject) => {
        let storageRef = firebase.storage().ref(`myfolder/todayImages/${file.name}`);
        let uploading = storageRef.put(file)
        uploading.on('state_changed',
            (snapshot) => {
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                uploading.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    resolve(downloadURL)
                });
            }
        );
    })
}




let saveImage = () => {
    let myFile = document.getElementById("file");
    uploadFiles(myFile.files[0])
    .then((url)=>{
        console.log(url)
    })
    
}


// var obj = {}

// obj.name = "ghous"
// obj.name = "ahmed"