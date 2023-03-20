var crud = 'https://crudcrud.com/api/58bf10f4a9a64873a14a08694bad1f8b' + '/storeManagement/';

window.onload = () => {
    axios.get(crud)
    .then( (res) => {
        const stock = res.data;
        for(let i=0; i<stock.length; i++) {
            setValueInUi(stock[i], stock[i]._id);
        }
    })
    .catch( (err) => {
        console.log(err);
    });
}

function addToList(event) {
    event.preventDefault();
    const candyName = event.target.candyName.value;
    const description = event.target.description.value;
    const price = event.target.price.value;
    const quantity = event.target.quantity.value;
    
    
    let obj = {
        candyName,
        description,
        price,
        quantity
    };
    
    axios.post(crud, obj)
    .then( (choco) => {
        const chocolate = choco.data;
        setValueInUi(obj, chocolate._id);
    })
    .catch( (err) => {
        console.error(err);
    });
}




    

function setValueInUi(obj, id) {
    var parentElement = document.getElementById('stocks');
    var childElement = document.createElement('li');

    var btn1 = document.createElement('button');
    var btn2 = document.createElement('button');
    var btn3 = document.createElement('button');
    var del = document.createElement('button');

    btn1.className = 'soldButton';
    btn2.className = 'soldButton';
    btn3.className = 'soldButton';
    del.className = 'soldButton';

    btn1.textContent = 'Sold 1';
    btn2.textContent = 'Sold 2';
    btn3.textContent = 'Sold 3';
    del.textContent = 'Delete';

    btn1.type = 'button';
    btn2.type = 'button';
    btn3.type = 'button';

    btn1.onclick = () => {
        obj.quantity -= 1;
        axios.put(crud + id, obj)
        .then( (res) => {

            console.log(res);
            if(obj.quantity >= 1){
                parentElement.removeChild(childElement);
                setValueInUi(obj, id);
            }else {
                del.click();
            }
        })
        .catch( (err) => {
            console.log(err);
        });
    }
    var error = document.getElementById('error');
    btn2.onclick = () => {
        if(obj.quantity == 1) {
            error.textContent = 'There is only one chocolate left!!!';
            setTimeout( () => {
                error.remove();
            }, 4000);   
        }else if(obj.quantity >= 2) {
            obj.quantity -= 2;
            axios
            .put(crud + id, obj)
            .then( (res) =>{
                console.log(res);
                parentElement.removeChild(childElement);
                if(obj.quantity >= 1){
                    setValueInUi(obj, id);
                }else {
                    del.click();
                } 
            })
            .catch( (err) => {
                console.log(err);
            });
              
        }
        
    }

    btn3.onclick = () => {
        if(obj.quantity == 1) {
            error.textContent = 'There is only one chocolate left!!!';
            setTimeout( () => {
                error.remove();
            }, 4000);   
        }else if(obj.quantity == 2) {
            error.textContent = 'There is only Two chocolate left!!!';
            setTimeout( () => {
                error.remove();
            }, 4000);   
        }else if(obj.quantity >= 3) {
            obj.quantity -= 3;
            axios
            .put(crud + id, obj)
            .then( (res) =>{
                console.log(res);
                parentElement.removeChild(childElement);
                if(obj.quantity >= 1){
                    setValueInUi(obj, id);
                }else {
                    del.click();
                } 
            })
            .catch( (err) => {
                console.log(err);
            });  
        }
    }


    del.onclick = () => {
        axios.delete(crud + id)
        .then( (res) => {
            console.log(res);
            parentElement.removeChild(childElement);
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    childElement.textContent = 'Name: '+obj.candyName+'  Description: '+obj.description+'  Price: '+obj.price+'  Quantity: '+obj.quantity;
    childElement.appendChild(btn1);
    childElement.appendChild(btn2);
    childElement.appendChild(btn3);
    childElement.appendChild(del);
    parentElement.appendChild(childElement);

}
