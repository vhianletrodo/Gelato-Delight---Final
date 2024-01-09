productConfig();
showUser();
generateProductId();
checkadmin();

function productConfig(){

	let itemList = document.getElementById('cbo-product-list');
	const gelatoData = JSON.parse( localStorage.getItem('gelatoData') );

	let optionHTML = '';
 optionHTML += '<option>-- Select One --</option>';

  for (i = 0; i < gelatoData.gelato.length; i++) {
    optionHTML += '<option value="'+gelatoData.gelato[i]['product_id']+'">('+gelatoData.gelato[i]['product_id']+') '+gelatoData.gelato[i]['item_name'] + '</option>';
  }

  if(itemList){
    itemList.innerHTML = optionHTML;
  }

}

function showProduct(e){
	let productId = e.value;

 const gelatoDataString = localStorage.getItem('gelatoData');
 const gelatoData = JSON.parse(gelatoDataString);
 const product = gelatoData.gelato.find(item => item.product_id == productId);

 let prdct_item = document.getElementById("item-product-name");
 let btn = document.getElementById("save-prdct-config");
 let cn_price = document.getElementById("edit-cn_price");
 let cp_price = document.getElementById("edit-cp_price");
 let cn_rcvd_item = document.getElementById("cn_qty").value = 0;
 let cp_rcvd_item = document.getElementById("cp_qty").value = 0;
 let allergens = document.querySelectorAll('input[type="radio"][name="e-product_allergens"]');
 let bestseller = document.querySelectorAll('input[type="radio"][name="product_bestseller"]');

 if(product){
 	prdct_item.innerHTML = product.item_name;
 	cn_price.value = product.cone;
 	cp_price.value = product.cup;

  allergens.forEach(function(radioButton) {
	  if (radioButton.value === product.allergens) {
	   radioButton.checked = true;
	  }
  });

  bestseller.forEach(function(radioButton) {
	  if (radioButton.value === product.best_seller) {
	   radioButton.checked = true;
	  }
  });

  btn.setAttribute("data-code", productId);

	 if(product.item_hide=='y'){
	 	document.getElementById("item-hide").checked = true;
	 }else{
	 	document.getElementById("item-hide").checked = false;
	 }

	 if(product.item_sold=='y'){
	 	document.getElementById("item-soldout").checked = true;
	 }else{
	 	document.getElementById("item-soldout").checked = false;
	 }

 }else{
 	prdct_item.innerHTML = '';
 	cn_price.value = '';
 	cp_price.value = '';
 	btn.setAttribute("data-code", '');
 	document.getElementById("item-hide").checked = false;
 	document.getElementById("item-soldout").checked = false;

  allergens.forEach(function(radioButton) {
 		radioButton.checked = false;
  });

		bestseller.forEach(function(radioButton) {
	  radioButton.checked = false;
  });

 	console.log("Product not available");
 }

}

function saveConfig(e){
	let productId = e.getAttribute("data-code");
	const gelatoDataString = localStorage.getItem('gelatoData');
	const gelatoData = JSON.parse(gelatoDataString);
	const product = gelatoData.gelato.findIndex(item => item.product_id == productId);

	let msg = document.getElementById("config-return-msg");
	
  if (product !== -1) {

		let cn_price = document.getElementById("edit-cn_price").value;
	 let cp_price = document.getElementById("edit-cp_price").value;
	 let allergens = document.querySelectorAll('input[type="radio"][name="e-product_allergens"]');
	 let bestseller = document.querySelectorAll('input[type="radio"][name="product_bestseller"]');
	 let cn_rcvd_item = document.getElementById("cn_qty").value;
	 let cp_rcvd_item = document.getElementById("cp_qty").value;

	 let hide = document.getElementById("item-hide").checked;
	 let hid = '';
	 if(hide == true){
	 	hid = "y";
	 }else{
	 	hid = "n";
	 }

	 let soldout = document.getElementById("item-soldout").checked;
	 let sold = '';
	 if(soldout == true){
	 	sold = "y";
	 }else{
	 	sold = "n";
	 }


   gelatoData.gelato[product].cone = cn_price;
   gelatoData.gelato[product].cup = cp_price;

	  allergens.forEach(function(radioButton) {
		  if (radioButton.checked == true) {
		   gelatoData.gelato[product].allergens = radioButton.value
		  }
	  });

	  bestseller.forEach(function(radioButton) {
		  if (radioButton.checked == true) {
		   gelatoData.gelato[product].best_seller = radioButton.value
		  }
	  });

	  gelatoData.gelato[product].item_hide = hid;
	  gelatoData.gelato[product].item_sold = sold;

	  //CN
	  if(cn_rcvd_item>0){
		  let cnAvailable = gelatoData.gelato[product].variants[0].cn[0].available;
		 	gelatoData.gelato[product].variants[0].cn[0].received = cn_rcvd_item;
		 	gelatoData.gelato[product].variants[0].cn[0].available = parseInt(cnAvailable) + parseInt(cn_rcvd_item);
	  }

	  //CP
	  if(cp_rcvd_item>0){
		  let cpAvailable = gelatoData.gelato[product].variants[0].cp[0].available;
		 	gelatoData.gelato[product].variants[0].cp[0].received = cp_rcvd_item;
		 	gelatoData.gelato[product].variants[0].cp[0].available = parseInt(cpAvailable) + parseInt(cp_rcvd_item);
	  }

	  localStorage.setItem('gelatoData', JSON.stringify(gelatoData));
	  //console.log(gelatoData);

	  msg.innerHTML = '<div class="bg-success text-center mb-2 text-white p-1">Product Configuration Updated!</div>';
  }else{
  	msg.innerHTML = '<div class="bg-danger text-center mb-2 text-white p-1">Product Configuration update Failed!</div>';
  }

  // Apply fade-out effect after a delay of 2 seconds (2000 milliseconds)
  setTimeout(() => {
    msg.style.transition = 'opacity 0.5s'; // Apply transition effect
    msg.style.opacity = '0'; // Fade out the div
  }, 1500);

  setTimeout(() => {
    msg.style.cssText = '';
    msg.innerHTML = '';
  }, 2000);

  document.getElementById('cbo-product-list').innerHTML = '';
  document.getElementById("item-product-name").innerHTML = '';
		document.getElementById("edit-cn_price").value = '';
	 document.getElementById("edit-cp_price").value = '';
	 let allergens = document.querySelectorAll('input[type="radio"][name="e-product_allergens"]');
	 let bestseller = document.querySelectorAll('input[type="radio"][name="product_bestseller"]');
	 document.getElementById("cn_qty").value = '';
	 document.getElementById("cp_qty").value = '';

	  allergens.forEach(function(radioButton) {
		  if (radioButton.checked == true) {
		   radioButton.checked=false;
		  }
	  });

	  bestseller.forEach(function(radioButton) {
		  radioButton.checked=false;
	  });

	  document.getElementById("item-hide").checked = false;
	  document.getElementById("item-soldout").checked = false;

  productConfig();

}



// Function to get the most recent product ID 
function generateProductId() {
const gelatoDataString = localStorage.getItem('gelatoData');
const gelatoData = JSON.parse(gelatoDataString);
let productID = document.getElementById('add_product_id');

  let maxProductId = 0;

  // Loop through existing gelatoData to find the highest product_id
  gelatoData.gelato.forEach(item => {
    const currentId = parseInt(item.product_id.slice(-3)); // Extract the numerical part
    if (currentId > maxProductId) {
      maxProductId = currentId;
    }
  });

  // Increment the highest product_id by 1 and format it
  const nextProductId = '2023111400' + ('' + (maxProductId + 1)).slice(-3);

  if(productID){
  	productID.value=nextProductId;
  }
}


function addProduct(){
	const gelatoDataString = localStorage.getItem('gelatoData');
	const gelatoData = JSON.parse(gelatoDataString);

	let msg = document.getElementById('add-return-msg');

	let productID = document.getElementById('add_product_id').value;
	let productName = document.getElementById('add_product_name').value;
	let cnPrice = document.getElementById('add_cn_price').value;
	let cpPrice = document.getElementById('add_cp_price').value;


	let newGelatoItem = {
	  "product_id": productID,
	  "item_name": productName,
	  "img": "",
	  "cone": cnPrice,
	  "cup": cpPrice,
	  "item_hide": "y",
	  "item_sold": "",
	  "best_seller": "",
	  "allergens": "",
	  "variants": [{
	    "cp": [{
	      "received": "0",
	      "withdraw": "0",
	      "available": "0"
	    }],
	    "cn": [{
	      "received": "0",
	      "withdraw": "0",
	      "available": "0"
	    }]
	  }]
	}

	if(productID && productName && cnPrice && cpPrice){
		gelatoData.gelato.push(newGelatoItem);
		//console.log(gelatoData);
		localStorage.setItem('gelatoData', JSON.stringify(gelatoData));
		document.getElementById('cbo-product-list').innerHTML='';
		productConfig();

			document.getElementById('add_product_id').value = '';
			document.getElementById('add_product_name').value = '';
			document.getElementById('add_cn_price').value = '';
			document.getElementById('add_cp_price').value = '';
			generateProductId();
	}
}

function uploadImage() {
  const clientId = '689bb282194a5a7'; // Replace with your Imgur Client ID
  const fileInput = document.getElementById('product_image');
  const file = fileInput.files[0];

    if (!file) {
        console.error('No file selected.');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
            Authorization: `Client-ID ${clientId}`,
        },
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.data && data.data.link) {
            const fileUrl = data.data.link;
            console.log(`File uploaded successfully! URL: ${fileUrl}`);
            document.getElementById('output').innerHTML = `<a href="${fileUrl}" target="_blank">View Uploaded Image</a>`;
        } else {
            console.error('Failed to upload file.');
            document.getElementById('output').innerHTML = 'Failed to upload file.';
        }
    })
    .catch(error => {
        console.error('Error uploading file:', error);
        document.getElementById('output').innerHTML = 'Error uploading file.';
    });
	  


}

/*
 * Repeated Functions
 *
 */

function showUser(){
  const currentUser = sessionStorage.getItem('currentUser');
  if (currentUser) {
    const parsedArray = JSON.parse(currentUser);

    if(document.getElementById('currentUser-name')){
      document.getElementById('currentUser-name').innerText = parsedArray[0]['name'];
    }
    if(document.getElementById('rcpt-user')) {
      document.getElementById('rcpt-user').innerText = parsedArray[0]['name'];
    }
    
    //document.getElementById('dashboard-name').innerText = parsedArray[0]['name'] + " " + parsedArray[0]['lastname'];

    generateImage(parsedArray[0]['name'], parsedArray[0]['lastname']);

  } else {
    console.log('No data found in sessionStorage.');
  }
  
}

function generateImage(firstName, lastName) {
  // Get the first letters of the first name and last name
  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();

  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = 100; // Set canvas width
  canvas.height = 100; // Set canvas height

  // Get the drawing context
  const ctx = canvas.getContext('2d');

  // Set background color (optional)
  ctx.fillStyle = '#f0f0f0'; // Set background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set text properties
  ctx.font = '48px Arial'; // Set font size and family
  ctx.fillStyle = '#333'; // Set text color
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw initials on the canvas
  ctx.fillText(initials, canvas.width / 2, canvas.height / 2);

  // Convert the canvas to an image URL
  const imageURL = canvas.toDataURL(); // Get data URL of the canvas

  // Get the existing image element by ID
  const userImage = document.getElementById('userImage');

  // Set the generated image URL as the source for the existing image element
  userImage.src = imageURL;
}


/* Side navigation */ 
const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),

  modeText = body.querySelector(".mode-text");
  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
  });


function logout(){
  sessionStorage.clear();
  window.location.href = "../index.html";
  console.log("logout");
}

function checkadmin(){
  const currentUser = sessionStorage.getItem('currentUser');
  if (currentUser) {
    const parsedArray = JSON.parse(currentUser);
    
    if(parsedArray[0]['authority']==1){
      document.getElementById("admin-only").style.display = 'block';
	  document.getElementById("admin-only2").style.display = 'block';
    }else{
      document.getElementById("admin-only").style.display = 'none';
	  document.getElementById("admin-only2").style.display = 'none';
    }

    //console.log(parsedArray[0]['authority']);

  } else {
    console.log('No data found in sessionStorage.');
  }
}