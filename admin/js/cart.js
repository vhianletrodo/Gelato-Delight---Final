const orderItemArr = [];
const orderPriceArr = [];
const orderArr = [];
const orderIdArr = [];
const orderListArr = [];

function passData(e){
  //console.log("success -- passdata");

  const item = e.getAttribute("data-item");
  const imgUrl = e.getAttribute("data-img");
  const code = e.getAttribute("data-code");

  //neutralize value of quantity
  document.getElementById('btn-add-order').setAttribute("data-qty", 0);

  let html = '';

  html = '<div class="col-md-2">';
  html += '<span class="modal-image rounded-3 overflow-hidden"><img src="'+imgUrl+'"></span>';
  html += '</div>';
  html += '<div class="col-md-7">';
  html += '<h3 class="mb-0">'+item+'</h3>';


    const cpPrice = e.getAttribute("data-cp-price");
    const cnPrice = e.getAttribute("data-cn-price");


    //console.log(orderListArr);

    if(!orderListArr || orderListArr.length === 0){
      html += '<div class="row">';
        html += '<div class="col-md-4"><label class="h5"><input type="radio" name="gelato-category" onclick="selectCategory(this)" data-cat="CP" data-price="'+cpPrice+'" checked="checked"> Cup:</label></div>';
        html += '<div class="col-md-8"><span class="h5">₱ '+parseFloat(cpPrice).toFixed(2)+'</span></div>';
        html += '<div class="col-md-4"><label class="h5"><input type="radio" name="gelato-category" value="CN" onclick="selectCategory(this)" data-cat="CN" data-price="'+cnPrice+'"> Cone:</label></div>';
        html += '<div class="col-md-8"><span class="h5">₱ '+parseFloat(cnPrice).toFixed(2)+'</span></div>'; 
      html += '</div>';
    }else{

      let hasCP = false;
      let hasCN = false;

      for (const item of orderListArr) {
        const currentItemID = item[3]; 
        const quantity = item[1];

        if (currentItemID === code) {
          if (item.includes("CP")) {
              hasCP = true;
          }
          if (item.includes("CN")) {
              hasCN = true;
          }
        }
      }

    html += '<div class="row">';
      if (hasCP && hasCN) {
        //console.log( `Product ID ${code} has both CP and CN.`);
        html += '<div class="col-md-4 text-muted"><label class="h5"><input type="radio" name="gelato-category" onclick="selectCategory(this)" data-cat="CP" data-price="'+cpPrice+'" disabled> Cup:</label></div>';
        html += '<div class="col-md-8 text-muted"><span class="h5">₱ '+parseFloat(cpPrice).toFixed(2)+'</span></div>';
        html += '<div class="col-md-4 text-muted"><label class="h5"><input type="radio" name="gelato-category" value="CN" onclick="selectCategory(this)" data-cat="CN" data-price="'+cnPrice+'" disabled> Cone:</label></div>';
        html += '<div class="col-md-8 text-muted"><span class="h5">₱ '+parseFloat(cnPrice).toFixed(2)+'</span></div>'; 
      } else if (hasCP) {
        //console.log( `Product ID ${code} has CP only.`);
        html += '<div class="col-md-4 text-muted"><label class="h5"><input type="radio" name="gelato-category" onclick="selectCategory(this)" data-cat="CP" data-price="'+cpPrice+'" disabled> Cup:</label></div>';
        html += '<div class="col-md-8 text-muted"><span class="h5">₱ '+parseFloat(cpPrice).toFixed(2)+'</span></div>';
        html += '<div class="col-md-4"><label class="h5"><input type="radio" name="gelato-category" value="CN" onclick="selectCategory(this)" data-cat="CN" data-price="'+cnPrice+'" checked="checked"> Cone:</label></div>';
        html += '<div class="col-md-8"><span class="h5">₱ '+parseFloat(cnPrice).toFixed(2)+'</span></div>'; 
      } else if (hasCN) {
        //console.log( `Product ID ${code} has CN only.`);
        html += '<div class="col-md-4"><label class="h5"><input type="radio" name="gelato-category" onclick="selectCategory(this)" data-cat="CP" data-price="'+cpPrice+'" checked="checked"> Cup:</label></div>';
        html += '<div class="col-md-8"><span class="h5">₱ '+parseFloat(cpPrice).toFixed(2)+'</span></div>';
        html += '<div class="col-md-4 text-muted"><label class="h5"><input type="radio" name="gelato-category" value="CN" onclick="selectCategory(this)" data-cat="CN" data-price="'+cnPrice+'" disabled> Cone:</label></div>';
        html += '<div class="col-md-8 text-muted"><span class="h5">₱ '+parseFloat(cnPrice).toFixed(2)+'</span></div>'; 
      } else {
        html += '<div class="col-md-4"><label class="h5"><input type="radio" name="gelato-category" onclick="selectCategory(this)" data-cat="CP" data-price="'+cpPrice+'" checked="checked"> Cup:</label></div>';
        html += '<div class="col-md-8"><span class="h5">₱ '+parseFloat(cpPrice).toFixed(2)+'</span></div>';
        html += '<div class="col-md-4"><label class="h5"><input type="radio" name="gelato-category" value="CN" onclick="selectCategory(this)" data-cat="CN" data-price="'+cnPrice+'"> Cone:</label></div>';
        html += '<div class="col-md-8"><span class="h5">₱ '+parseFloat(cnPrice).toFixed(2)+'</span></div>'; 
      }
    html += '</div>';

    //console.log(orderListArr);

    /*html += '<div class="row">';
      html += '<div class="col-md-4"><label class="h5"><input type="radio" name="gelato-category" onclick="selectCategory(this)" data-cat="CP" data-price="'+cpPrice+'" checked="checked"> Cup:</label></div>';
      html += '<div class="col-md-8"><span class="h5">₱ '+parseFloat(cpPrice).toFixed(2)+'</span></div>';
      html += '<div class="col-md-4"><label class="h5"><input type="radio" name="gelato-category" value="CN" onclick="selectCategory(this)" data-cat="CN" data-price="'+cnPrice+'"> Cone:</label></div>';
      html += '<div class="col-md-8"><span class="h5">₱ '+parseFloat(cnPrice).toFixed(2)+'</span></div>'; 
    html += '</div>';*/
    }



  html += '</div>';

  html += '<div class="col-md-3 text-end">';
  html += '<div class="mb-1"><button class="keypad-num" onclick="qtyAdjust(0)"><i class="fa-solid fa-minus"></i></button><span id="modal-qty">0</span><button class="keypad-num" onclick="qtyAdjust(1)"><i class="fa-solid fa-plus"></i></button></div>';
  /*Number Keypad*/
  html += '<button class="keypad-num" onclick="qtyInsert(7,'+code+')">7</button><button class="keypad-num" onclick="qtyInsert(8,'+code+')">8</button><button class="keypad-num" onclick="qtyInsert(9,'+code+')">9</button>';
  html += '<button class="keypad-num" onclick="qtyInsert(4,'+code+')">4</button><button class="keypad-num" onclick="qtyInsert(5,'+code+')">5</button><button class="keypad-num" onclick="qtyInsert(6,'+code+')">6</button>';
  html += '<button class="keypad-num" onclick="qtyInsert(1,'+code+')">1</button><button class="keypad-num" onclick="qtyInsert(2,'+code+')">2</button><button class="keypad-num" onclick="qtyInsert(3,'+code+')">3</button>';
  html += '<button class="keypad-num col-span-2" onclick="qtyInsert(0,'+code+')">0</button>';
  html += '<button class="keypad-num" onclick="qtybackSpace()"><i class="fa-solid fa-delete-left"></i></button>';
  html += '</div>';

  document.getElementById('modal-order-item').innerHTML = html;
  document.getElementById('btn-add-order').setAttribute("data-item", item);
  document.getElementById('btn-add-order').setAttribute("data-img", imgUrl);
  document.getElementById('btn-add-order').setAttribute("data-code", code);
  //check price??
  //document.getElementById('btn-add-order').setAttribute("data-price", '390');

  selectCategory();
}

function qtybackSpace(){
  let currentNumber = document.getElementById("modal-qty");
  if( currentNumber.innerText.slice(0, -1) ){
    let num = currentNumber.innerText.slice(0, -1)
    currentNumber.innerText = num;
    document.getElementById('btn-add-order').setAttribute("data-qty", num);
  }else{
    currentNumber.innerText = 0;
    document.getElementById('btn-add-order').setAttribute("data-qty", 0);
  }
  btnEnabler();
}

let arrayID = 0;
function orderCart(e){
  const item = e.getAttribute("data-item");
  const price = e.getAttribute("data-price");
  const imgUrl = e.getAttribute("data-img");
  const code = e.getAttribute("data-code");
  let qty = e.getAttribute("data-qty");
  const itemCategory = e.getAttribute("data-cat");
  var itemPrice = price * qty;

  const gelatoDataString = localStorage.getItem('gelatoData');
  const gelatoData = JSON.parse(gelatoDataString);
  const product = gelatoData.gelato.find(item => item.product_id == code);
  let cat = itemCategory.toLowerCase();
  const qtyAvailable = product.variants[0][cat][0].available; 

  orderIdArr.push(arrayID);
  orderItemArr.push(item);
  orderPriceArr.push([code, itemPrice, itemCategory]);
  orderArr.push(item, price, imgUrl);
  orderListArr.push([item, qty, price, code, itemCategory]);

  let hasCP = false;
  let hasCN = false;

  for (const item of orderListArr) {
    const currentItemID = item[3]; 
    if (currentItemID === code) {
      if (item.includes("CP")) {
          hasCP = true;
      }
      if (item.includes("CN")) {
          hasCN = true;
      }
    }
  }

  if (hasCP && hasCN) {
    document.getElementById(code).classList.add("disable-prd-items"); 
  }else{
    document.getElementById(code).classList.remove("disable-prd-items"); 
  }

  let addattrib = '';
  if(qty >= qtyAvailable){
    addattrib='disabled';
  }else{
    addattrib='';
  }

  let orderList = document.getElementById('cart-list');
  var html = '<li class="row px-3 py-2">';
        html += '<div class="col-md-2"><span class="cart-img rounded-3"><img src="'+imgUrl+'"></div>';
        html += '<div class="col-md-6"><span class="cart-cat text-primary">'+itemCategory+'</span> <span class="cart-item">'+item+'</span><br>';
        html += '<span class="cart-price"><span class="item-cart-qty"><button class="keypad-num btn btn-danger p-0 btn-minus" onclick="cartQty(this, 0, '+arrayID+', '+price+', '+code+')" data-category="'+itemCategory+'"><i class="fa-solid fa-minus"></i></button> <span class="item-qty">'+qty+'</span> <button class="keypad-num btn btn-success p-0 btn-plus" onclick="cartQty(this, 1, '+arrayID+', '+price+', '+code+')" data-category="'+itemCategory+'" '+addattrib+'><i class="fa-solid fa-plus"></i></button></span> x'+price+'</span></div>';
        html += '<div class="col-md-3 text-end"><span class="cart-item-prc fw-bold h6">₱ <span class="item-qty-price">'+parseFloat(itemPrice).toFixed(2)+'</span></div>';
        html += '<div class="col-md-1 text-end p-0"><button onclick="deleteItem('+i+',this,'+code+',`'+itemCategory+'`)" class="btn btn-danger btn-trash"><i class="fa-regular fa-trash-can"></i></button></div>';
      html += '</li>';

  orderList.innerHTML+=html;

  totalItems();
  costItems();

  i++;
  //console.log(orderIdArr);
}

function totalItems(){
  document.getElementById('total-item').innerText = orderItemArr.length;
}

function costItems(){
  //console.log(orderPriceArr);

  if(orderPriceArr.length===0){
   document.getElementById('total-cost').innerText = "0.00";
   enableCashAmount();
   enableCompleteTrans();
   amountRecount();
  }else{
    
   let totalPrice = 0;
   for (let i = 0; i < orderPriceArr.length; i++) {
     const price = orderPriceArr[i][1]; // Assuming price is at index 1

     if (!isNaN(price)) {
       totalPrice += price;
     }
   }

    document.getElementById('total-cost').innerText = parseFloat(totalPrice).toFixed(2);
    enableCashAmount();
    enableCompleteTrans();
    amountRecount();
    //console.log( parseFloat(sum).toFixed(2) );
  } 
}

function clearCart(){
  let orderList = document.getElementById('cart-list');
  orderList.innerHTML = "";
  orderItemArr.length = 0;
  orderPriceArr.length = 0;
  orderArr.length = 0;
  orderIdArr.length = 0;
  orderListArr.length = 0;deleteItem
  i = 0;
  totalItems();
  costItems();
  
  const elements = document.querySelectorAll('.disable-prd-items');

  // Loop through each element and remove the class
  elements.forEach(element => {
      element.classList.remove('disable-prd-items');
  });
}

function deleteItem(id, e, itemcode, itemCategory){
  let orderList = document.getElementById('cart-list');

  const indexId = orderIdArr.indexOf(id);
  orderIdArr.splice(indexId, 1);
  orderItemArr.splice(indexId, 1);
  orderArr.splice(indexId, 1);
  //orderPriceArr.splice(indexId, 1);
  //orderListArr.splice(indexId, 1);
  removeItemorderListArr(itemcode, itemCategory);
  removeItemByItemCode(itemcode, itemCategory);

  totalItems();
  costItems();
  orderList.removeChild(e.parentElement.parentElement);

  let hasCP = false;
  let hasCN = false;

  for (const item of orderListArr) {
    const currentItemID = item[3]; 
    if (currentItemID === itemcode) {
      if (item.includes("CP")) {
          hasCP = true;
      }
      if (item.includes("CN")) {
          hasCN = true;
      }
    }
  }

  if (hasCP && hasCN) {
    document.getElementById(itemcode).classList.add("disable-prd-items"); 
  }else{
    document.getElementById(itemcode).classList.remove("disable-prd-items"); 
  }
}

function qtyInsert(num, product_id){
  let qty = document.getElementById("modal-qty");

  if(qty.innerHTML==0){
    qty.innerHTML = num;
    document.getElementById('btn-add-order').setAttribute("data-qty", num);
    btnEnabler();
  }else{
    var modalQty = qty.innerHTML + num;
    qty.innerHTML = modalQty.toString().substring(0, 3);
    document.getElementById('btn-add-order').setAttribute("data-qty", modalQty);
    btnEnabler();
  }
}

function qtyAdjust(num) {
  //console.log(num);
  let qty = document.getElementById("modal-qty");

  if(num==0){
    if(qty.innerHTML!=0){
      var itemQty = parseInt(qty.innerHTML) - 1;
      qty.innerHTML = itemQty;
      document.getElementById('btn-add-order').setAttribute("data-qty", itemQty);
      btnEnabler();
    }
  }else{
    var itemQty = parseInt(qty.innerHTML) + 1;
    qty.innerHTML = itemQty;
    document.getElementById('btn-add-order').setAttribute("data-qty", itemQty);
    btnEnabler();
  }

}



function cartQty(event, num, id, price, itemcode){
  let parent = event.parentElement; // target element .item-cart-qty
  let children = parent.querySelector('.item-qty').innerText;
  let plus = parent.querySelector('.btn-plus');
  let minus = parent.querySelector('.btn-minus');
  let itemcat = event.getAttribute("data-category");
  let cat = itemcat.toLowerCase();
  //console.log(children); 

  const gelatoDataString = localStorage.getItem('gelatoData');
  const gelatoData = JSON.parse(gelatoDataString);
  const product = gelatoData.gelato.find(item => item.product_id == itemcode);
  const qtyAvailable = product.variants[0][cat][0].available; 

   // Add qty
   if(children!='' && num==1){
    var totalQty = parseInt(children) + 1;

    if(qtyAvailable >= totalQty){
      var totalPrice = totalQty*price;
      parent.querySelector('.item-qty').innerText = totalQty;
      updatePrice(itemcode, totalPrice, cat);
      updateQuantity(itemcode, totalQty);
      costQtyItems(parent, totalQty*price);

      if(qtyAvailable == totalQty){
       console.log(`Reached Max Quantity for "${product.item_name}"`);
       event.setAttribute("disabled", "disabled");
      }

    }else{
     console.log(`Reached Max Quantity for "${product.item_name}"`);
     event.setAttribute("disabled", "disabled");
    }

   }else{ // Minus qty
     var totalQty = parseInt(children) - 1;
     var totalPrice = totalQty*price;

     plus.removeAttribute("disabled");

     parent.querySelector('.item-qty').innerText = totalQty;
     updatePrice(itemcode, totalPrice, cat);
     updateQuantity(itemcode, totalQty);
     costQtyItems(parent, totalQty*price);

     //console.log(orderPriceArr);

     if(children==1){
       //Remove Item
       let orderList = document.getElementById('cart-list');

       const indexId = orderIdArr.indexOf(id);
       orderIdArr.splice(indexId, 1);
       orderItemArr.splice(indexId, 1);
       orderArr.splice(indexId, 1);

       removeItemorderListArr(itemcode, cat);
       removeItemByItemCode(itemcode, cat);

       //console.log(orderPriceArr);

       costQtyItems(parent, totalQty*price);
       orderList.removeChild(parent.parentElement.parentElement.parentElement);

        let hasCP = false;
        let hasCN = false;

        for (const item of orderListArr) {
          const currentItemID = item[3]; 
          if (currentItemID === itemcode) {
            if (item.includes("CP")) {
                hasCP = true;
            }
            if (item.includes("CN")) {
                hasCN = true;
            }
          }
        }

        if (hasCP && hasCN) {
          document.getElementById(itemcode).classList.add("disable-prd-items"); 
        }else{
          document.getElementById(itemcode).classList.remove("disable-prd-items"); 
        }

     }
   }

  totalItems();
  costItems();
  
}


function updatePrice(itemCode, newPrice, itemCat) {
  let cat = itemCat.toUpperCase();
  //console.log(orderPriceArr);
  // Find the index of the sub-array that contains the specified ItemCode
  //const index = orderPriceArr.findIndex(item => item[0] == itemCode);

/*  if (index !== -1) {
    // If the ItemCode is found, update the quantity
    orderPriceArr[index][1] = newPrice;
    console.log(`Price updated for ItemCode ${itemCode} to ${newPrice}`);
  } else {
    console.log(`ItemCode ${itemCode} not found`);
  }*/

  for (var i = 0; i < orderPriceArr.length; i++){
      // If the ItemCode is found, remove the array at the found index
      var element = orderPriceArr[i];
      if (element[0] == itemCode && element[2]==cat){
        /*console.log(element[0] +'--'+ itemCode);
        console.log(element[2] +'--'+ cat);*/
        orderPriceArr[i][1] = newPrice;
        console.log(`Price updated for ItemCode ${itemCode} with Category ${cat} to ${newPrice}`);
      }else{
        console.log(`ItemCode ${itemCode} with Category ${cat} not found`);
      }
  }

}

function removeItemorderListArr(itemCode, itemCat) {
  let cat = itemCat.toUpperCase();

  //console.log(orderPriceArr);
  for (var i = 0; i < orderPriceArr.length; i++){
      // If the ItemCode is found, remove the array at the found index
      var element = orderPriceArr[i];
      if (element[0] == itemCode && element[2]==cat){
        orderPriceArr.splice(i, 1);
        console.log(`Item with ItemCode ${itemCode} with Category ${cat} removed`);
      }else{
        console.log(`ItemCode ${itemCode} with Category ${cat} not found`);
      }
  }

}



function updateQuantity(itemCode, newQuantity) {
  //console.log(orderListArr);
  // Find the index of the sub-array that contains the specified ItemCode
  const index = orderListArr.findIndex(item => item[3] == itemCode);

  if (index !== -1) {
    // If the ItemCode is found, update the quantity
    orderListArr[index][1] = newQuantity;
    console.log(`Quantity updated for ItemCode ${itemCode} to ${newQuantity}`);
  } else {
    console.log(`ItemCode ${itemCode} not found`);
  }
}

function removeItemByItemCode(itemCode, itemCat) {
  let cat = itemCat.toUpperCase();

  for (var i = 0; i < orderListArr.length; i++){
      var element = orderListArr[i];

      // If the ItemCode is found, remove the array at the found index
      if (element[3] == itemCode && element[4]==cat){
        orderListArr.splice(i, 1);
        //console.log(i);
      }
  }
}

function costQtyItems(event, num){
  //console.log(event);
  let parent = event.parentElement.parentElement.parentElement; // target element <li class="row px-3 py-2">
  let children = parent.querySelector('.item-qty-price');

  children.innerHTML = parseFloat(num).toFixed(2);

  //console.log(parent);
}

function selectCategory(e){
  if(e){
    let price = e.getAttribute("data-price");
    let cat = e.getAttribute("data-cat");

    document.getElementById('btn-add-order').setAttribute("data-cat", cat);
    document.getElementById('btn-add-order').setAttribute("data-price", price);
    btnEnabler();
  }else{
    let r = document.querySelector('input[name="gelato-category"]:checked');
    let price = r.getAttribute("data-price");
    let cat = r.getAttribute("data-cat");

    //console.log("triggered");
    document.getElementById('btn-add-order').setAttribute("data-cat", cat);
    document.getElementById('btn-add-order').setAttribute("data-price", price);
    btnEnabler();
  }

}

function btnEnabler(){
  let btn = document.getElementById('btn-add-order');
  var qty = btn.getAttribute("data-qty");
  var cat = btn.getAttribute("data-cat").toLowerCase();
  var itemcode = btn.getAttribute("data-code");
  let errHandler = document.getElementById("modal-order-error-msg");
  errHandler.innerHTML = '';

  const gelatoDataString = localStorage.getItem('gelatoData');
  const gelatoData = JSON.parse(gelatoDataString);
  const product = gelatoData.gelato.find(item => item.product_id == itemcode);
  const qtyAvailable = product.variants[0][cat][0].available; 

  if(parseInt(qty)>0){
    if( parseInt(qtyAvailable) >= parseInt(qty) ){
      document.getElementById("btn-add-order").disabled = false;
      errHandler.innerHTML = '<h4 class="p-1 bg-success text-white text-center">Quantity Stock Available!</h4>';
    }else{
      document.getElementById("btn-add-order").disabled = true;
      if(errHandler){
        errHandler.innerHTML = '<h4 class="p-1 bg-danger text-white text-center">Excess Quantity!</h4>';
      }
    }
  }else{
    document.getElementById("btn-add-order").disabled = true;
    errHandler.innerHTML = '';
  }
}



function InsrtCash(i){
let currentNumber = document.getElementById("insrt-amnt-txt");

  if(currentNumber.value==0 && i=='00'){
    currentNumber.value = '0';
  }else if(currentNumber.value==0 && i=='0'){
    currentNumber.value = '0';
  }else if(currentNumber.value=='' && i=='00'){
    currentNumber.value = '0';
  }else if(currentNumber.value.includes('.')===true && i=='.'){
    currentNumber.value = currentNumber.value;
  }else{
    if(currentNumber.value==0 && i!='0'){
      currentNumber.value = i;
    }else{
      currentNumber.value += i;
    }
  }

  if(currentNumber.value == '.'){
    currentNumber.value = '0.';
  }

  confirmPaidBtn();
}

function InsrtExactCash(){
  let totalcost = document.getElementById("total-cost").innerText;
  document.getElementById("insrt-amnt-txt").value = totalcost;
  confirmPaidBtn();
  //console.log(totalcost);
}

function InsrtCashCancel(){
  let currentNumber = document.getElementById("insrt-amnt-txt");
  currentNumber.value = '0';

  confirmPaidBtn();
}

function InsrtCashBackSpace() {
  let currentNumber = document.getElementById("insrt-amnt-txt");
  if( currentNumber.value.slice(0, -1) ){
    currentNumber.value = currentNumber.value.slice(0, -1);
  }else{
    currentNumber.value = 0;
  }

  confirmPaidBtn();
}

function denominationCash(bill){
  let currentNumber = document.getElementById("insrt-amnt-txt");
  currentNumber.value =  parseFloat(currentNumber.value) + parseFloat(bill);
  confirmPaidBtn();
}

function confirmPaidBtn(){
  document.getElementById("btn-insert-cash").disabled = true;
  let currentNumber = document.getElementById("insrt-amnt-txt");
  if(parseFloat(currentNumber.value)>=parseFloat(document.getElementById("total-cost").innerText)){
    document.getElementById("btn-insert-cash").disabled = false;
  }else{
    document.getElementById("btn-insert-cash").disabled = true;
  }

  document.getElementById('btn-insert-cash').setAttribute("data-cash", currentNumber.value);
}


function addCash(e){
  const cash = e.getAttribute("data-cash");
  const amount = document.getElementById("total-cost").innerText;
  const change = parseFloat(cash) - parseFloat(amount);

  document.getElementById("total-cash").innerText = parseFloat(cash).toFixed(2);
  document.getElementById("total-change").innerText = parseFloat(change).toFixed(2);
  enableCompleteTrans();
  disablebtn();
}

function amountRecount(){
  const amount = document.getElementById("total-cost").innerText;
  const cash = document.getElementById("total-cash").innerText;
  const change = parseFloat(cash) - parseFloat(amount);

  if(cash > 0){
    if(amount==0){
      document.getElementById("total-cash").innerText = "0.00";
      document.getElementById("total-change").innerText = "0.00";
    }else{
      document.getElementById("total-cash").innerText = parseFloat(cash).toFixed(2);
      document.getElementById("total-change").innerText = parseFloat(change).toFixed(2);
    }
  }
}


function enableCashAmount(){
  const amount = document.getElementById("total-cost").innerText;

  if(parseFloat(amount) >= 1){
    document.getElementById("btn-add-cash-amount").disabled = false;
  }else{
    document.getElementById("btn-add-cash-amount").disabled = true;
  }
}

function enableCompleteTrans(){
  let amount = document.getElementById("total-cost").innerText;
  let cash = document.getElementById("total-cash").innerText;
  let btnCash = document.getElementById("btn-add-cash-amount");

  if(parseFloat(amount).toFixed(2)!="0.00" && parseFloat(cash).toFixed(2)!="0.00"){
    document.getElementById("btn-complete-transaction").disabled = false;
  }else{
    document.getElementById("btn-complete-transaction").disabled = true;
  }  
}

function transComplete(){
  var transactionid = localStorage.getItem("transactionid");
  let orderNum = document.getElementById('order-number');
  let orderList = document.getElementById('rcpt-listing');
  let totalcash = document.getElementById('total-cash').innerText;
  let totalchange = document.getElementById('total-change').innerText;
  const zeroPad = (num, places) => String(num).padStart(places, '0');

  /*let sum = orderPriceArr.reduce((accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue), 0);*/

   let sum = 0;
   for (let i = 0; i < orderPriceArr.length; i++) {
     const price = orderPriceArr[i][1]; // Assuming price is at index 1

     if (!isNaN(price)) {
       sum += price;
     }
   }



  var vat = parseFloat(sum) * 0.12;
  var vatable = parseFloat(sum) - parseFloat(vat);

  document.getElementById('rcpt-vat').innerText = parseFloat(vat).toFixed(2);
  document.getElementById('rcpt-st-vatable').innerText = parseFloat(vatable).toFixed(2);
  document.getElementById('rcpt-total').innerText = parseFloat(sum).toFixed(2);
  document.getElementById('rcpt-cash-tendered').innerText = parseFloat(totalcash).toFixed(2);
  document.getElementById('rcpt-cash-change').innerText = parseFloat(totalchange).toFixed(2);

  let tbl = '';
  let i = 0;

  while (i < orderListArr.length) {
    var total = parseInt(orderListArr[i][2]) * parseInt(orderListArr[i][1]);
    tbl += '<div class="w-100">';
    tbl += '<div class="w-50 pull-left"><h2>'+orderListArr[i][0]+'<br>&nbsp;&nbsp;&nbsp;'+parseFloat(orderListArr[i][2]).toFixed(2)+'</h2><div class="clear"></div></div>';
    tbl += '<div class="w-25 pull-left">'+orderListArr[i][1]+'<div class="clear"></div></div>';
    tbl += '<div class="w-25 pull-left text-end">₱ '+parseFloat(total).toFixed(2)+'<div class="clear"></div></div>';
    tbl += '<div class="clear"></div></div>';
    i++;
  }
  orderList.innerHTML = tbl;

  if(transactionid){
    //console.log(transactionid);
    transID = parseInt(transactionid) + 1;
    transID = parseFloat(transactionid) + parseFloat(1);
    localStorage.setItem("transactionid", transID);
    orderNum.innerText = zeroPad(transID, 4);
  }

  //console.log(orderListArr);
}

//Edited 5
window.addEventListener("afterprint", (event) => {
  var addCartbtn = document.getElementsByClassName("keypad-num"); 
  for (var i = 0; i < addCartbtn.length; i++) { 
    addCartbtn[i].disabled = false;
  }

  var cartTrashbtn = document.getElementsByClassName("btn-trash"); 
  for (var i = 0; i < cartTrashbtn.length; i++) { 
    cartTrashbtn[i].disabled = false;
  }

  var cartClearbtn = document.getElementsByClassName("btn-clear"); 
  for (var i = 0; i < cartClearbtn.length; i++) { 
    cartClearbtn[i].disabled = false;
  }

  //finalizing for inventory
  //orderListArr -> item, qty, price, code, variant;
  let x = 0;

  while (x < orderListArr.length) {
      //console.log(orderListArr[x][0]);
      let variant = orderListArr[x][4].toLowerCase();
      withdrawFromProduct(orderListArr[x][3], variant, orderListArr[x][1])
      x++;
  }

  const gelatoDataString = localStorage.getItem('gelatoData');
  const gelatoData = JSON.parse(gelatoDataString);
  //console.log(gelatoData);

  var itemList = document.getElementById("product-list-gelato").classList.remove("disable-items"); 

  document.getElementById('product-list-gelato').innerHTML = '';

  showGelato();
  
  clearCart();
  console.log("After print");
});


function setTozero(){
  document.getElementById("insrt-amnt-txt").value=0;
}

function disablebtn(){
  var addCartbtn = document.getElementsByClassName("keypad-num"); 
  for (var i = 0; i < addCartbtn.length; i++) { 
      addCartbtn[i].disabled = true;
  }

  var cartTrashbtn = document.getElementsByClassName("btn-trash"); 
  for (var i = 0; i < cartTrashbtn.length; i++) { 
      cartTrashbtn[i].disabled = true;
  }

  var cartClearbtn = document.getElementsByClassName("btn-clear"); 
  for (var i = 0; i < cartClearbtn.length; i++) { 
      cartClearbtn[i].disabled = true;
  }

  var itemList = document.getElementById("product-list-gelato").classList.add("disable-items"); 
}


// Function to withdraw a quantity from a specific product based on product_id and variant
function withdrawFromProduct(productId, variant, withdrawQuantity) {
  // Retrieve the JSON string from localStorage
  const gelatoDataString = localStorage.getItem('gelatoData');
  // Parse the JSON string into a JavaScript object
  const gelatoData = JSON.parse(gelatoDataString);

  // Check if gelatoData and gelato array exist
  if (gelatoData && gelatoData.gelato && Array.isArray(gelatoData.gelato)) {
    // Find the product with the given product_id
    const product = gelatoData.gelato.find(item => item.product_id === productId);

    if (product) {
      // Update the "withdraw" and "available" quantities in the specified variant
      if (product.variants[0] && product.variants[0][variant][0]) {
        const selectedVariant = product.variants[0][variant][0];
        const availableQuantity = parseInt(selectedVariant.available); // Parse available quantity to an integer
        const withdrawQuantityInt = parseInt(withdrawQuantity); // Parse withdraw quantity to an integer

        if (!isNaN(withdrawQuantityInt) && withdrawQuantityInt > 0) {
          if (withdrawQuantityInt <= availableQuantity) {
            selectedVariant.withdraw = (parseInt(selectedVariant.withdraw) + withdrawQuantityInt).toString(); // Update withdraw quantity
            selectedVariant.available = (availableQuantity - withdrawQuantityInt).toString(); // Update available quantity
            console.log(`Withdrawn ${withdrawQuantityInt} from product ${productId} (${variant})`);
          } else {
            console.log('Insufficient available quantity.');
          }
        } else {
          console.log('Invalid withdraw quantity.');
        }
      } else {
        console.log(`Variant "${variant}" not found for the product.`);
      }
    } else {
      console.log(`Product with ID ${productId} not found.`);
    }
  } else {
    console.log('Gelato data or gelato array not found.');
  }

  // Update the data back to localStorage if needed
  localStorage.setItem('gelatoData', JSON.stringify(gelatoData));
}