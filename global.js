window._mfq = window._mfq || [];
(function () {
    var mf = document.createElement("script");
    mf.type = "text/javascript"; mf.async = true;
    mf.src = "//cdn.mouseflow.com/projects/4594fc3a-a857-4d48-9ddf-2d5430c3ace5.js";
    document.getElementsByTagName("head")[0].appendChild(mf);
})();

//addTag("head", "script", "jquery-3.4.1.min.js");
addTag("head", "link", "https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.3/dist/semantic.min.css", "stylesheet");
addTag("head", "script", "https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.3/dist/semantic.min.js");

function addTag(tagParent, tag, tagSRChref, tagRel = "") {
    var tagParent = document.getElementsByTagName(tagParent)[0];
    var tag = document.createElement(tag);
    tag.rel = tagRel;
    tag.href = tagSRChref;
    tag.src = tagSRChref;
    tagParent.appendChild(tag);
};

function jobNumberToNSModal() {
    $(".modal").empty();
    document.getElementById("button-order-status").innerHTML = "YOU CLICKED ME!";
    let jobNumber = document.getElementById("input-job-number").value;
    alert("Hello you entered " + jobNumber + " as your job number.");
    document.getElementById('input-job-number').value = "";
    $(".modal").append('<i class="close icon"></i><div class="header">Order Status</div><ul style="list-style: none;"><p class="OrderStatusInformation">Order Numbers</p><li>JOB NUMBER</li><li>TRANSACTION NUMBER</li><li>PO NUMBER</li><li>ORDER DATE</li><li>CUSTOMER</li><br><p class="OrderStatusInformation">Cost Summary</p><li>SUBTOTAL</li><li>TAX TOTAL</li><li>ESTIMATED SHIPPING COST</li><li>HANDLING COST</li><li>TOTAL</li><br><p class="OrderStatusInformation">Shipping Information</p><li>SHIP TO:</li><li>SHIPPING CARRIER</li><li>SHIPPING METHOD</li><li>SHIP DATE</li><li>SCHEDULED ARRIVAL DATE</li><li>CHARGE SHIPPING TO:</li><li>RECIPIENT SHIPPING</li><li>CUSTOMER SHIPPING</li><li>ESTIMATED SHIPPING COST</li><li>TOTAL LESS SHIPPING & HANDLING COST</li><br><p class="OrderStatusInformation">Imprint Information</p><li>APPROVAL EMAIL</li><li>Production Setup</li><li>IMPRINT TYPE</li><li>IMPRINT SIZING</li><li>Special Instructions</li><li>PACKING</li><br><p class="OrderStatusInformation">Item Information</p><li>ITEM ORDERED</li><li>UNITS</li><li>DESCRIPTION</li><li>PRICE LEVEL</li><li>NET COST</li><li>AMOUNT</li><li>TAX CODE</li><li>TAX RATE</li><li>ORDER PRIORITY</li><li>PMS COLOR</li></ul><div class="actions"><div class="ui red deny button">Close</div></div>');
    $('.ui.modal')
        .modal('show');
};

document.querySelector("#button-order-status1").addEventListener("click", function(event) {
    window.location.href = "https://www.distributorcentral.com/preview/DD6F3DD9-FD1B-4041-80EE-A1B8342A5240/p/order-status";
    event.preventDefault();
}, false);


testGETRequest = "https://webhook.site/a0a05b64-a102-459b-b71a-2def0f0a3027"
$(".orderStatusButton").click(function(){
  $.get(testGETRequest, function(data, status){
    //var obj = JSON.parse(data);
    
    console.log("Data: " + data + "\nStatus: " + status);
    //console.log (dataJSON)
    
      $(".modal").empty();
    document.getElementById("button-order-status").innerHTML = "YOU CLICKED ME!";
    let jobNumber = document.getElementById("input-job-number").value;
    alert("Hello you entered " + jobNumber + " as your job number.");
    document.getElementById('input-job-number').value = "";
   //$(".modal").append('<i class="close icon"></i><div class="header">Order Status</div><ul style="list-style: none;"><p class="OrderStatusInformation">Order Numbers:'+obj.name+'</p><li>JOB NUMBER</li><li>TRANSACTION NUMBER</li><li>PO NUMBER</li><li>ORDER DATE</li><li>CUSTOMER</li><br><p class="OrderStatusInformation">Cost Summary</p><li>SUBTOTAL</li><li>TAX TOTAL</li><li>ESTIMATED SHIPPING COST</li><li>HANDLING COST</li><li>TOTAL</li><br><p class="OrderStatusInformation">Shipping Information</p><li>SHIP TO:</li><li>SHIPPING CARRIER</li><li>SHIPPING METHOD</li><li>SHIP DATE</li><li>SCHEDULED ARRIVAL DATE</li><li>CHARGE SHIPPING TO:</li><li>RECIPIENT SHIPPING</li><li>CUSTOMER SHIPPING</li><li>ESTIMATED SHIPPING COST</li><li>TOTAL LESS SHIPPING & HANDLING COST</li><br><p class="OrderStatusInformation">Imprint Information</p><li>APPROVAL EMAIL</li><li>Production Setup</li><li>IMPRINT TYPE</li><li>IMPRINT SIZING</li><li>Special Instructions</li><li>PACKING</li><br><p class="OrderStatusInformation">Item Information</p><li>ITEM ORDERED</li><li>UNITS</li><li>DESCRIPTION</li><li>PRICE LEVEL</li><li>NET COST</li><li>AMOUNT</li><li>TAX CODE</li><li>TAX RATE</li><li>ORDER PRIORITY</li><li>PMS COLOR</li></ul><div class="actions"><div class="ui red deny button">Close</div></div>');
    $('.ui.modal')
        .modal('show');
  });
});


