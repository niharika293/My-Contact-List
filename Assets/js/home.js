console.log("My Script is loaded!!");
// Now Handle CSS through JS to handle the height of form 
var add_contact =$("#btn_add");
var form_area = $("#Contact_form");
var form_height;

// add_contact.click(function(){
//     // form_area[0].css('margin-top','7%');
//     form_area[0].style.marginTop="50px";
//     console.log("Form called.");
// });
function addContacts(){
    // form_area[0].style.marginTop="10%!important";
    form_area[0].style.setProperty('margin-top','10%','important');
}