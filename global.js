var netsuiteURL = "https://4976131-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=391&deploy=1&compid=4976131_SB1&h=bc0412cde19c51afd168";
var corsHerokuURL = "https://cors-anywhere.herokuapp.com/";

$("#button-order-status-modal").click(function () {
    $.getJSON(corsHerokuURL + netsuiteURL, jobNumberOBJ(), function (success, textStatus, jqXHR) {
        console.log(success);
        console.log(textStatus);
        console.log(jqXHR);
        $(".modal").empty();
        document.getElementById('input-job-number').value = "";
        $(".modal").append(modal(jqXHR));
        $('.ui.modal')
            .modal('show');
    });
});

document.querySelector("#button-order-status-page").addEventListener("click", function (event) {
    var jobNumber = document.getElementById("input-job-number").value
    window.location.href = buildOrderStatusURL(jobNumber);
    event.preventDefault();
}, false);

function jobNumberOBJ() {
    let jobNumber={
        jobNumber: document.getElementById("input-job-number").value
    } ;
    return jobNumber;
};

function buildOrderStatusURL(jobNumber) {
    var builtURL = "https://www.distributorcentral.com/preview/DD6F3DD9-FD1B-4041-80EE-A1B8342A5240/p/order-status?job-number=" + jobNumber;
    return builtURL;
};

function modal(data) {
    var modalString =
        '<i class="close icon"></i>\
<div class="header">Order Status</div>\
<ul style="list-style: none;">\
    <p class="OrderStatusInformation">Order Numbers:</p>\
    <li>JOB NUMBER</li>\
    <li>TRANSACTION NUMBER</li>\
    <li>PO NUMBER</li>\
    <li>ORDER DATE</li>\
    <li>CUSTOMER:</li>\
    <br>\
    <p class="OrderStatusInformation">Cost Summary</p>\
    <li>SUBTOTAL</li>\
    <li>TAX TOTAL</li>\
    <li>ESTIMATED SHIPPING COST</li>\
    <li>HANDLING COST</li>\
    <li>TOTAL</li>\
    <br>\
    <p class="OrderStatusInformation">Shipping Information</p>\
    <li>SHIP TO:</li>\
    <li>SHIPPING CARRIER</li>\
    <li>SHIPPING METHOD</li>\
    <li>SHIP DATE</li>\
    <li>SCHEDULED ARRIVAL DATE</li>\
    <li>CHARGE SHIPPING TO:</li>\
    <li>RECIPIENT SHIPPING</li>\
    <li>CUSTOMER SHIPPING</li>\
    <li>ESTIMATED SHIPPING COST</li>\
    <li>TOTAL LESS SHIPPING & HANDLING COST</li>\
    <br>\
    <p class="OrderStatusInformation">Imprint Information</p>\
    <li>APPROVAL EMAIL</li>\
    <li>Production Setup</li>\
    <li>IMPRINT TYPE</li>\
    <li>IMPRINT SIZING</li>\
    <li>Special Instructions</li>\
    <li>PACKING</li>\
    <br>\
    <p class="OrderStatusInformation">Item Information</p>\
    <li>ITEM ORDERED</li>\
    <li>UNITS</li>\
    <li>DESCRIPTION</li>\
    <li>PRICE LEVEL</li>\
    <li>NET COST</li>\
    <li>AMOUNT</li>\
    <li>TAX CODE</li>\
    <li>TAX RATE</li>\
    <li>ORDER PRIORITY</li>\
    <li>PMS COLOR</li>\
</ul>\
<div class="actions">\
    <div class="ui red deny button">Close</div>\
</div>'
    return modalString;
};

console.log(document.querySelectorAll('.displaynone .dcLoginCartBarName').innerText);