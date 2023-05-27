async function saveproduct(event) {
    event.preventDefault();
    try {
    let productname = event.target.productname.value;
    let productprice = event.target.productprice.value;
    let finalprice = document.getElementById("totalvalue");
    finalprice.value = parseInt(finalprice.value) + parseInt(productprice);

    let data = {
        productname,
        productprice
    };
        await axios.post("https://crudcrud.com/api/ead6dddf4a1a4c68b87db07b7bd8e8f2/product_list", data)
    } catch {
        alert("Sorry!!! Not able to store the data.")
    }

    let perentelement = document.getElementById("product-list");
    perentelement.innerHTML = "";

    
        let data = await axios.get("https://crudcrud.com/api/ead6dddf4a1a4c68b87db07b7bd8e8f2/product_list")
        for (let i = 0; i < data.data.length; i++) {
            showonscreen(data.data[i]);
        
    } 

    async function showonscreen(data) {
        let perentelement = document.getElementById("product-list");
        let childelement = document.createElement('li');
        childelement.className = "list-group-item";
        let text = document.createTextNode(`Name of product is ${data.productname} and Price of product is ${data.productprice}`);
        childelement.appendChild(text);

        let deletbtn = document.createElement("input");
        deletbtn.type = "button";
        deletbtn.className = "btn btn-danger";
        deletbtn.style = "margin-left: 5px";
        deletbtn.value = "Remove Product"
        deletbtn.onclick = removeproduct;

        async function removeproduct() {
            try {
                perentelement.removeChild(childelement);
                finalprice.value = parseInt(finalprice.value) - parseInt(data.productprice);
                await axios.delete(`https://crudcrud.com/api/ead6dddf4a1a4c68b87db07b7bd8e8f2/product_list/${data._id}`);
            } catch {
                alert("Sorry!!! Not able to remove from server");
            }
        }
        childelement.appendChild(deletbtn);
        perentelement.appendChild(childelement);
    }
}




window.onload = async function () {
    let perentelement = document.getElementById("product-list");
    perentelement.innerHTML = "";
    let finalprice = document.getElementById("totalvalue");
    finalprice.value = 0;

    try {
        var data = await axios.get("https://crudcrud.com/api/ead6dddf4a1a4c68b87db07b7bd8e8f2/product_list")
    } catch {
        alert("Not able to show data.")
    }

    for (let i = 0; i < data.data.length; i++) {
        showonscreen(data.data[i]);
        finalprice.value = parseInt(finalprice.value) + parseInt(data.data[i].productprice);
    }

    async function showonscreen(data) {
        let childelement = document.createElement('li');
        childelement.className = "list-group-item";
        let text = document.createTextNode(`Name of product is ${data.productname} and Price of product is ${data.productprice}`);
        childelement.appendChild(text);

        let deletbtn = document.createElement("input");
        deletbtn.type = "button";
        deletbtn.className = "btn btn-danger";
        deletbtn.style = "margin-left: 5px";
        deletbtn.value = "Remove Product"
        deletbtn.onclick = removeproduct;
        
        async function removeproduct() {
            perentelement.removeChild(childelement);
            finalprice.value = parseInt(finalprice.value) - parseInt(data.productprice);
            try {
                await axios.delete(`https://crudcrud.com/api/ead6dddf4a1a4c68b87db07b7bd8e8f2/product_list/${data._id}`);
            } catch {
                alert("Sorry!!! Not able to remove from server");
            }
        }
        childelement.appendChild(deletbtn);
        perentelement.appendChild(childelement);
    }
};