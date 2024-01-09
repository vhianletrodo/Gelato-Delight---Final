currentTime();
showUser();
generateTransID();
checkadmin();
currentDate();
userInfo();
recentAddUser();
recentNoticeUser();
addNoticeUser();
addWarningUser();
recentWarningUser();
noticeDetails();
showGelato();
//console.log(currentPath);


var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// Time
function currentTime() {
  let date = new Date(); 
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";
      
  if(hh > 12){
    session = "PM";
  }

  hh = (hh < 10) ? "0" + hh : hh;
  mm = (mm < 10) ? "0" + mm : mm;
  ss = (ss < 10) ? "0" + ss : ss;

  let time = hh + ":" + mm + ":" + ss + " " + session;
  //let time = hh + ":" + mm + ":" + ss;

  if(document.getElementById("clock")){
    document.getElementById("clock").innerText = time; 

    if(document.getElementById("rcpt-timestamp")){
      document.getElementById("rcpt-timestamp").innerText = time;
    }

    let t = setTimeout(function(){ currentTime() }, 1000); 
  }
}

function currentDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = mm + '/' + dd + '/' + yyyy;

  if(document.getElementById('rcpt-date')){
    document.getElementById('rcpt-date').innerText = formattedToday;
  }
  if(document.getElementById('header-date')){
    document.getElementById('header-date').innerText = formattedToday;
  }

}

//Edited 1
function showGelato(){
  const jsonProducts = localStorage.getItem('gelatoData');
  //console.log("show gelato function - test");

  // Get the HTML element to display products
  const productList = document.getElementById('product-list-gelato');

  if(jsonProducts){
    const gelatoProducts = JSON.parse(jsonProducts);
    //console.log(gelatoProducts.gelato);

    let productHTML = '';

    gelatoProducts.gelato.forEach(product => { 

      const formattedCone = parseFloat(product.cone).toFixed(2);
      const formattedCup = parseFloat(product.cup).toFixed(2);

      let hidden = product.item_hide;
      let soldout = product.item_sold;
      let addclass = '';
      let soldoutClass = '';

      if(hidden=="y"){
        addclass = " display-none";
      }else{
        addclass = "";
      }

      if(soldout=="y"){
        soldoutClass = " soldout";
      }else{
        soldoutClass = "";
      }

      // Create HTML string for each product
      productHTML += '<div id="'+product.product_id+'" class="col position-relative'+ addclass + soldoutClass +'">';
      productHTML += '<div class="card position-relative" onclick="passData(this);" data-bs-toggle="modal" data-bs-target="#order-modal" data-code="'+product.product_id+'" data-item="'+product.item_name+'" data-cp-price="'+product.cup+'" data-cn-price="'+product.cone+'" data-img="./image/gelato/'+product.img+'">';
      
      if(product.best_seller == 'y'){
        productHTML += '<span class="best-seller-badge" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Best Seller"><i class="bi bi-patch-check-fill"></i></span>';
      }

      productHTML += '<img src="./image/gelato/'+product.img+'" class="card-img-top" alt="'+product.item_name+'">';
      productHTML += '<div class="card-footer">';
      productHTML += '<h5 class="card-title text-truncate">'+product.item_name+'</h5>';
        productHTML += '<div class="card-text">';
        productHTML += '<ul class="list-unstyled mb-0">';

        for (const variant in product.variants[0]) {
          const available = product.variants[0][variant][0].available;
          let vartxt = '';
          let varprice = '';
          let addclass = '';
          if(variant=='cn'){
            vartxt = 'Cone';
            varprice = formattedCone;
          }else{
            vartxt = 'Cup';
            varprice = formattedCup;
          }

          if(available <= 10){
            addclass = 'text-danger';
          }else if( available >= 11 && available <= 20 ){
            addclass = 'text-warning';
          }else{
            addclass = 'text-success';
          }

          productHTML += '<li class="d-flex justify-content-between align-items-center"><span class="fw-bold">'+vartxt+': <strong class="'+addclass+'">('+available+')</strong></span><span>₱ '+varprice+'</span></li>';
        }

          /*productHTML += '<li class="d-flex justify-content-between align-items-center"><span>Cup: ()</span><span>₱ '+formattedCup+'</span></li>';
          productHTML += '<li class="d-flex justify-content-between align-items-center"><span>Cone: ()</span><span>₱ '+formattedCone+'</span></li>';*/
        
        productHTML += '</ul>';
        productHTML += '</div>'; // End Card Text

      productHTML += '</div>'; // End Card Footer
      productHTML += '</div>'; // End Card

      if(product.allergens == 'y'){
        productHTML += '<button type="button" style="" class="btn-card-float btn btn-secondary btn-warning" data-bs-toggle="popover" title="Allergens" data-bs-content="Contains Peanuts and Hazelnuts"><i class="fa-solid fa-triangle-exclamation"></i></button>';
      }

      productHTML += '</div>';
    });

    if(productList){
      productList.innerHTML = productHTML;
    }
    

  }else{
    // Fetch JSON data
    fetch('./js/json/products.json')
      .then(response => response.json())
      .then(data => {
        // Access the 'gelato' array from the JSON data
        const gelatoProducts = data.gelato;

        let productHTML = '';

        // Converting the products.json as localStorage
        localStorage.setItem('gelatoData', JSON.stringify(data));
        //console.log(JSON.stringify(data));

        gelatoProducts.forEach(product => {     
        
          const formattedCone = parseFloat(product.cone).toFixed(2);
          const formattedCup = parseFloat(product.cup).toFixed(2);

          // Create HTML string for each product
          productHTML += '<div id="'+product.product_id+'" class="col position-relative'+ addclass + soldoutClass +'">';
          productHTML += '<div class="card position-relative" onclick="passData(this);" data-bs-toggle="modal" data-bs-target="#order-modal" data-item="'+product.item_name+'" data-cp-price="'+product.cup+'" data-cn-price="'+product.cone+'" data-img="./image/gelato/'+product.img+'">';
          
          if(product.best_seller == 'y'){
            productHTML += '<span class="best-seller-badge" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Best Seller"><i class="bi bi-patch-check-fill"></i></span>';
          }

          productHTML += '<img src="./image/gelato/'+product.img+'" class="card-img-top" alt="'+product.item_name+'">';
          productHTML += '<div class="card-footer">';
          productHTML += '<h5 class="card-title text-truncate">'+product.item_name+'</h5>';
            productHTML += '<div class="card-text">';
            productHTML += '<ul class="list-unstyled mb-0">';

            for (const variant in product.variants[0]) {
              const available = product.variants[0][variant][0].available;
              let vartxt = '';
              let varprice = '';
              let addclass = '';

              if(variant=='cn'){
                vartxt = 'Cone';
                varprice = formattedCone;
              }else{
                vartxt = 'Cup';
                varprice = formattedCup;
              }

              if(available <= 10){
                addclass = 'text-danger';
              }else if( available >= 11 && available <= 20 ){
                addclass = 'text-warning';
              }else{
                addclass = 'text-success';
              }

              productHTML += '<li class="d-flex justify-content-between align-items-center"><span class="fw-bold">'+vartxt+': <strong class="'+addclass+'">('+available+')</strong></span><span>₱ '+varprice+'</span></li>';
            }

            productHTML += '</ul>';
            productHTML += '</div>'; // End Card Text
   
          productHTML += '</div>'; // End Card Footer
          productHTML += '</div>'; // End Card

          if(product.allergens == 'y'){
            productHTML += '<button type="button" style="" class="btn-card-float btn btn-secondary btn-warning" data-bs-toggle="popover" title="Allergens" data-bs-content="Contains Peanuts and Hazelnuts"><i class="fa-solid fa-triangle-exclamation"></i></button>';
          }

          productHTML += '</div>';
        });

        productList.innerHTML = productHTML;
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }

}


/* Side navigation */ 
const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),

  modeText = body.querySelector(".mode-text");
  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
  });


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

function generateTransID(){
  //window.localStorage.removeItem('transactionid');
  //var transactionid = '';
  var transactionid = localStorage.getItem("transactionid");
  let orderNum = document.getElementById('order-number');
  let orderTNum = document.getElementById('rcpt-transnum');
  const zeroPad = (num, places) => String(num).padStart(places, '0');

  let transID = '';
  if(transactionid){
    transID = parseFloat(transactionid);
  }else{
    transID = 1;
    localStorage.setItem("transactionid", transID);
  }

  if(orderNum){
    orderNum.innerText = zeroPad(transID, 4);
    orderTNum.innerText = zeroPad(transID, 4);
  }
}

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


function userInfo(){
  const currentUser = sessionStorage.getItem('currentUser');
  const parsedArray = JSON.parse(currentUser);
  let employeeDetails = document.getElementById('employee-details');

  let ed = '';
  let auth = '';

  if(parsedArray[0]['authority']==1){
    auth = "Administrator";
  }else{
    auth = "Cashier";
  }

  ed = '<li><span class="fw-bold">Employee ID:</span> <span>'+ parsedArray[0]['employeeid'] +'</span></li>';
  ed += '<li><span class="fw-bold">Name:</span> <span class="text-capitalize">'+ parsedArray[0]['name'] + ' ' + parsedArray[0]['lastname'] + '</span></li>';
  ed += '<li><span class="fw-bold">Role:</span> <span>'+ auth +'</span></li>';

  if(employeeDetails){
    employeeDetails.innerHTML = ed;
  }
}


function generatePass() {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';
 
    for (let i = 1; i <= 12; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
 
        pass += str.charAt(char)
    }

    document.getElementById('txtpassword').value = pass;
}

const form = document.getElementById('frm-adduser');

function addUser(){
  let name = document.getElementById('txtname').value
  let lastname = document.getElementById('txtlastname').value
  let pwd = document.getElementById('txtpassword').value
  let role = document.getElementById('cbo-role').value

  let employeeid = localStorage.getItem('employeeid');
  let empID = '';
  if(employeeid){
    empID = parseInt(employeeid) + 1;
  }else{
    empID = 5;
  }

  const zeroPad = (num, places) => String(num).padStart(places, '0');
  const localStorageUser = JSON.parse( localStorage.getItem('localUsers') );
    const addnoticeMsg = document.getElementById('add-return-msg');

  const userArr = [
    {
      "employeeid" : "wd92p-" + zeroPad(empID, 3),
      "name" : name,
      "lastname" : lastname,
      "password" : pwd,
      "authority" : role,
    }
  ];

  if(userArr && name && lastname && pwd && role){

  let userArray = '';

    if(localStorageUser){
      userArray = userArr.concat(localStorageUser);
    }else{
      userArray = userArr;
    }

    localStorage.setItem('localUsers', JSON.stringify(userArray));
    localStorage.setItem('employeeid', empID);

    document.getElementById('recent-added-users').innerHTML = '';
    document.getElementById('cbo-employee').innerHTML = '';
    document.getElementById('cbo-employee-warning').innerHTML = '';
    
    recentAddUser();
    addNoticeUser();
    addWarningUser();

    document.getElementById('txtname').value = '';
    document.getElementById('txtlastname').value = '';
    document.getElementById('txtpassword').value = '';
    document.getElementById('cbo-role').value = '';

    if(addnoticeMsg){
      addnoticeMsg.innerHTML = '<div class="bg-success text-center mb-2 text-white p-1">User Added Successfully!</div>';
    }

  } else{
    addnoticeMsg.innerHTML = '<div class="bg-danger text-center mb-2 text-white p-1">User Added Failed!</div>';
  }

  // Apply fade-out effect after a delay of 2 seconds (2000 milliseconds)
  setTimeout(() => {
    addnoticeMsg.style.transition = 'opacity 0.5s'; // Apply transition effect
    addnoticeMsg.style.opacity = '0'; // Fade out the div
  }, 1500);
  
  setTimeout(() => {
    addnoticeMsg.style.cssText = '';
    addnoticeMsg.innerHTML = '';
  }, 2000);
}


function recentAddUser(){
  const localStorageUser = JSON.parse( localStorage.getItem('localUsers') );
  let x = 0;
  let recentAdd = '';
  let auth = '0';
  let recentAddHTML = document.getElementById('recent-added-users');

  recentAdd += '<div class="row">';
  recentAdd += '<div class="col-sm-3 fw-bold">ID</div>';
  recentAdd += '<div class="col-sm-5 fw-bold">Name</div>';
  recentAdd += '<div class="col-sm-3 fw-bold">Role</div>';
  recentAdd += '</div>';

  if(localStorageUser){
    while (x < localStorageUser.length) {

    if(localStorageUser[x]['authority']==1){
      auth = "Admin";
    }else{
      auth = "Cashier";
    }

      recentAdd += '<div class="row">';
      recentAdd += '<div class="col-sm-3">' + localStorageUser[x]['employeeid'] + '</div>';
      recentAdd += '<div class="col-sm-5">' + localStorageUser[x]['name'] + ' ' + localStorageUser[x]['lastname'] + '</div>';
      recentAdd += '<div class="col-sm-3">' + auth + '</div>';
      recentAdd += '</div>';
      //console.log(localStorageUser[x]['employeeid']);
      x++;
    }

    if(recentAddHTML){
      document.getElementById('recent-added-users').innerHTML = recentAdd;
    }
  }
  
}


function recentAddNotice(){
  const notice = JSON.parse( localStorage.getItem('noticeData') );
  let recentAddHTML = document.getElementById('recent-added-users');
  const userArray = JSON.parse( localStorage.getItem('localUsers') );

  if(notice){
    while (x < notice.length) {
      recentAdd += '<div class="row">';
      recentAdd += '<div class="col-sm-3">' + localStorageUser[x]['employeeid'] + '</div>';
      recentAdd += '<div class="col-sm-5">' + localStorageUser[x]['name'] + ' ' + localStorageUser[x]['lastname'] + '</div>';
      recentAdd += '<div class="col-sm-3">' + auth + '</div>';
      recentAdd += '</div>';
      //console.log(localStorageUser[x]['employeeid']);
      x++;
    }
    if(recentAddHTML){
      document.getElementById('recent-added-users').innerHTML = recentAdd;
    }
  }
  
}


function addNoticeUser(){
  let addEmployee = document.getElementById('cbo-employee');
  const userArray = JSON.parse( localStorage.getItem('localUsers') );

  let addEmployeeHTML = '';
  addEmployeeHTML += '<option>-- Select One --</option>';
  for (i = 0; i < userArray.length; i++) {
    addEmployeeHTML += '<option value="'+userArray[i]['employeeid']+'">('+userArray[i]['employeeid']+') '+userArray[i]['name']+ ' ' + userArray[i]['lastname'] + '</option>';
  }

  if(addEmployee){
    addEmployee.innerHTML = addEmployeeHTML;
  }

}

function addnotice(){
  const notices = JSON.parse( localStorage.getItem('noticeData') );
  let empId = document.getElementById('cbo-employee').value;
  let noticeTxt = document.getElementById('notice-msg').value;
  const noticeMsg = document.getElementById('notice-return-msg');
  
  const currentDate = new Date();

  // Get the individual components of the date
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so adding 1
  const day = String(currentDate.getDate()).padStart(2, '0');
  const year = currentDate.getFullYear();

  // Create the formatted date string in MM/DD/YYYY format
  const formattedDate = `${month}/${day}/${year}`;

  const noticeArr = [{ 
    "employeeid" : empId,
    "context" : noticeTxt,
    "date" : formattedDate,
  }];

  if(empId && noticeTxt){
    if(notices){
      let notice = notices.concat(noticeArr);
      localStorage.setItem('noticeData', JSON.stringify(notice));
    }else{
      localStorage.setItem('noticeData', JSON.stringify(noticeArr));
    }
    
    if(noticeMsg && empId && noticeTxt){
      noticeMsg.innerHTML = '<div class="bg-success text-center mb-2 text-white p-1">Notice Added Successfully!</div>';
    }else{
      noticeMsg.innerHTML = '<div class="bg-danger text-center mb-2 text-white p-1">Notice Added Failed!</div>';
    }
  } else {
    noticeMsg.innerHTML = '<div class="bg-danger text-center mb-2 text-white p-1">Notice Added Failed!</div>';
  }

  document.getElementById('recent-notice-users').innerHTML = '';
  recentNoticeUser();
  document.getElementById('cbo-employee').value = '';
  document.getElementById('notice-msg').value = '';

  // Apply fade-out effect after a delay of 2 seconds (2000 milliseconds)
  setTimeout(() => {
    noticeMsg.style.transition = 'opacity 0.5s'; // Apply transition effect
    noticeMsg.style.opacity = '0'; // Fade out the div
  }, 1500);

  setTimeout(() => {
    noticeMsg.style.cssText = '';
    noticeMsg.innerHTML = '';
  }, 2000);

}

function recentNoticeUser(){
  const noticeUser = JSON.parse( localStorage.getItem('noticeData') );
  const localStorageUser = JSON.parse( localStorage.getItem('localUsers') );

  let recentNoticeHTML = document.getElementById('recent-notice-users');
  let recentAdd = '';

  recentAdd += '<div class="row">';
  recentAdd += '<div class="col-sm-5 fw-bold">Name</div>';
  recentAdd += '<div class="col-sm-3 fw-bold">Notice</div>';
  recentAdd += '<div class="col-sm-3 fw-bold">Date</div>';
  recentAdd += '</div>';

  //console.log(localStorageUser);

  let x = 0;
  if(noticeUser){
    while (x < noticeUser.length) {
      recentAdd += '<div class="row">';
      recentAdd += '<div class="col-sm-5">' + getInfoById(noticeUser[x]['employeeid']).name + ' ' + getInfoById(noticeUser[x]['employeeid']).lastname + '</div>';
      recentAdd += '<div class="col-sm-3">' + noticeUser[x]['context'] + '</div>';
      recentAdd += '<div class="col-sm-3">' + noticeUser[x]['date'] + '</div>';
      recentAdd += '</div>';
      //console.log(localStorageUser[x]['employeeid']);
      x++;
    }

    if(recentNoticeHTML){
      recentNoticeHTML.innerHTML = recentAdd;
    }
  }

  if(recentNoticeHTML){
    recentNoticeHTML.innerHTML = recentAdd;
  }
}


function getInfoById(employeeId) {
  const userArr = JSON.parse( localStorage.getItem('localUsers') );
  const user = userArr.find(user => user.employeeid === employeeId);
  return user;
}


function addWarningUser(){
  let addEmployee = document.getElementById('cbo-employee-warning');
  const userArray = JSON.parse( localStorage.getItem('localUsers') );

  let addEmployeeHTML = '';
  addEmployeeHTML += '<option>-- Select One --</option>';
  for (i = 0; i < userArray.length; i++) {
    addEmployeeHTML += '<option value="'+userArray[i]['employeeid']+'">('+userArray[i]['employeeid']+') '+userArray[i]['name']+ ' ' + userArray[i]['lastname'] + '</option>';
  }

  if(addEmployee){
    addEmployee.innerHTML = addEmployeeHTML;
  }

}


function addwarning(){
  const warnings = JSON.parse( localStorage.getItem('warningData') );

  let empId = document.getElementById('cbo-employee-warning').value;
  let warningTxt = document.getElementById('warning-msg').value;
  const warningMsg = document.getElementById('warning-return-msg');
  
  const currentDate = new Date();

  // Get the individual components of the date
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so adding 1
  const day = String(currentDate.getDate()).padStart(2, '0');
  const year = currentDate.getFullYear();

  // Create the formatted date string in MM/DD/YYYY format
  const formattedDate = `${month}/${day}/${year}`;

  const warningArr = [{ 
    "employeeid" : empId,
    "context" : warningTxt,
    "date" : formattedDate,
  }];

  if(empId && warningTxt){
    if(warnings){
      let warning = warnings.concat(warningArr);
      localStorage.setItem('warningData', JSON.stringify(warning));
    }else{
      localStorage.setItem('warningData', JSON.stringify(warningArr));
    }
    
    if(warningMsg && empId && warningTxt){
      warningMsg.innerHTML = '<div class="bg-success text-center mb-2 text-white p-1">Warning Added Successfully!</div>';
    }else{
      warningMsg.innerHTML = '<div class="bg-danger text-center mb-2 text-white p-1">Warning Added Failed!</div>';
    }
  } else {
    warningMsg.innerHTML = '<div class="bg-danger text-center mb-2 text-white p-1">Warning Added Failed!</div>';
  }

  document.getElementById('recent-warning-users').innerHTML = '';
  recentWarningUser();
  document.getElementById('cbo-employee-warning').value = '';
  document.getElementById('warning-msg').value = '';

  // Apply fade-out effect after a delay of 2 seconds (2000 milliseconds)
  setTimeout(() => {
    warningMsg.style.transition = 'opacity 0.5s'; // Apply transition effect
    warningMsg.style.opacity = '0'; // Fade out the div
  }, 1500);

  setTimeout(() => {
    warningMsg.style.cssText = '';
    warningMsg.innerHTML = '';
  }, 2000);

}

function recentWarningUser(){
  const warningUser = JSON.parse( localStorage.getItem('warningData') );
  const localStorageUser = JSON.parse( localStorage.getItem('localUsers') );

  let recentWarningHTML = document.getElementById('recent-warning-users');
  let recentAdd = '';

  recentAdd += '<div class="row">';
  recentAdd += '<div class="col-sm-5 fw-bold">Name</div>';
  recentAdd += '<div class="col-sm-3 fw-bold">Warning</div>';
  recentAdd += '<div class="col-sm-3 fw-bold">Date</div>';
  recentAdd += '</div>';

  //console.log(localStorageUser);

  let x = 0;
  if(warningUser){
    while (x < warningUser.length) {
      recentAdd += '<div class="row">';
      recentAdd += '<div class="col-sm-5">' + getInfoById(warningUser[x]['employeeid']).name + ' ' + getInfoById(warningUser[x]['employeeid']).lastname + '</div>';
      recentAdd += '<div class="col-sm-3">' + warningUser[x]['context'] + '</div>';
      recentAdd += '<div class="col-sm-3">' + warningUser[x]['date'] + '</div>';
      recentAdd += '</div>';
      //console.log(localStorageUser[x]['employeeid']);
      x++;
    }

    if(recentWarningHTML){
      recentWarningHTML.innerHTML = recentAdd;
    }
  }

  if(recentWarningHTML){
    recentWarningHTML.innerHTML = recentAdd;
  }
}

function noticeDetails(){
  const currentUser = sessionStorage.getItem('currentUser');
  const parsedArray = JSON.parse(currentUser);

  const noticeUser = JSON.parse( localStorage.getItem('noticeData') );
  let noticeDetails = document.getElementById('notice-details');

  let employeeID = parsedArray[0]['employeeid'];

  let recentAdd = '';

  let x = 0;
  if(noticeUser){
    while (x < noticeUser.length) {
      if(noticeUser[x]['employeeid'] == employeeID){
        recentAdd += '<div class="col-sm-9">' + noticeUser[x]['context'] + '</div>';
        recentAdd += '<div class="col-sm-3">' + noticeUser[x]['date'] + '</div>';
      }
      x++;
      //console.log(localStorageUser[x]['employeeid']);
    }

    if(noticeDetails){
      noticeDetails.innerHTML = recentAdd;
    }
  }
}

warningsDetails();
function warningsDetails(){
  const currentUser = sessionStorage.getItem('currentUser');
  const parsedArray = JSON.parse(currentUser);

  const warningUser = JSON.parse( localStorage.getItem('warningData') );
  let warningDetails = document.getElementById('warnings-details');

  let employeeID = parsedArray[0]['employeeid'];
  //console.log(warningUser);
  let recentAdd = '';

  let x = 0;
  if(warningUser){
    while (x < warningUser.length) {
      if(warningUser[x]['employeeid'] == employeeID){
        recentAdd += '<div class="col-sm-9">' + warningUser[x]['context'] + '</div>';
        recentAdd += '<div class="col-sm-3">' + warningUser[x]['date'] + '</div>';
      }
      x++;
      //console.log(localStorageUser[x]['employeeid']);
    }

    if(warningDetails){
      warningDetails.innerHTML = recentAdd;
    }
  }
}