var netsuiteURL = "https://4976131-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=391&deploy=1&compid=4976131_SB1&h=bc0412cde19c51afd168";
var corsHerokuURL = "https://cors-anywhere.herokuapp.com/";

$("#button-order-status-modal").click(function () {
    $.getJSON(corsHerokuURL + netsuiteURL, jobNumberOBJ(), function (data, textStatus, jqXHR) {
        console.log(data);
        //console.log(jqXHR);
        $(".horizontalCards").empty();
        document.getElementById('input-job-number').value = "";
        var appending = [appendOrderNumbers(data), appendCostSummary(data), appendShippingInformation(data), appendStatus(data),];
        appending.forEach(element => $(".horizontalCards").append(element));
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
    let jobNumber = {
        jobNumber: document.getElementById("input-job-number").value
    };
    return jobNumber;
};

function buildOrderStatusURL(jobNumber) {
    var builtURL = "https://www.distributorcentral.com/preview/DD6F3DD9-FD1B-4041-80EE-A1B8342A5240/p/order-status?jobNumber=" + jobNumber;
    return builtURL;
};
function valuePresent(field) {
    if (field == "" || field == null) {
        return false;
    }
    return true;
}

function appendOrderNumbers(data) {
    var entity = "";
    var tranid = "";
    var otherrefnum = "";
    var saleseffectivedate = "";

    if (valuePresent(data.data[0].entity)) {
        var str = data.data[0].entity;
        var pattern = /(^\S+\s)/g;
        var entityname = str.replace(pattern, "");
        entity = '<li>entity:<p>' + entityname + '</p></li>'
    }
    if (valuePresent(data.data[0].tranid)) {
        tranid = '<li>JOB NUMBER:<p>' + data.data[0].tranid + '</p></li>'
    }
    if (valuePresent(data.data[0].otherrefnum)) {
        otherrefnum = '<li>PO NUMBER<p>' + data.data[0].otherrefnum + '</p></li>'
    }
    if (valuePresent(data.data[0].saleseffectivedate)) {
        saleseffectivedate = '<li>ORDER DATE<p>' + data.data[0].saleseffectivedate + '</p></li>'
    }
    var card =
        '<div class="card"  style="margin-top: 30px;" >\
        <div class="image">\
            <img src="https://cdn.onlinewebfonts.com/svg/img_226626.png">\
        </div>\
        <div class="content">\
            <div class="header">Order Numbers</div>\
            <div class="meta">\
                <a></a>\
            </div>\
            <div class="description">\
                <ul class="ui sub header" style="list-style: none;">'
        + entity
        + tranid
        + otherrefnum
        + saleseffectivedate +
        '</ul>\
            </div>\
        </div>\
    </div>';
    return card;
};

function appendCostSummary(data) {
    var subtotal = "";
    var taxtotal = "";
    var shippingcost = "";
    var handlingcost = "";
    var total = "";

    if (valuePresent(data.data[0].subtotal)) {
        subtotal = '<li>subtotal<p>' + data.data[0].subtotal + '</p></li>'
    }
    if (valuePresent(data.data[0].taxtotal)) {
        taxtotal = '<li>TAX total<p>' + data.data[0].taxtotal + '</p></li>'
    }
    if (valuePresent(data.data[0].shippingcost)) {
        shippingcost = '<li>ESTIMATED SHIPPING COST<p>' + data.data[0].shippingcost + '</p></li>'
    }
    if (valuePresent(data.data[0].handlingcost)) {
        handlingcost = '<li>HANDLING COST<p>' + data.data[0].handlingcost + '</p></li>'
    }
    if (valuePresent(data.data[0].total)) {
        total = '<li>total<p>' + data.data[0].total + '</p></li>'
    }
    var card =
        '<div class="card" style="margin-top: 30px;">\
        <div class="image">\
            <img src="https://image.flaticon.com/icons/png/512/126/126249.png">\
        </div>\
        <div class="content">\
            <div class="header">Cost Summary</div>\
            <div class="meta">\
                <a></a>\
            </div>\
            <div class="description">\
                <ul class="ui sub header" style="list-style: none;">'
        + subtotal
        + taxtotal
        + shippingcost
        + handlingcost
        + total +
        '</ul>\
            </div>\
        </div>\
    </div>';
    return card;
};


function appendShippingInformation(data) {
    var shipaddress = "";
    var carrier = "";
    var shipmethod = "";
    var shipdate = "";
    var custbody_lp_shipping_arrival_date = "";
    var shippingcost = "";

    if (valuePresent(data.data[0].shipaddress)) {
        var shipaddress = '<li>SHIP TO:<p>' + data.data[0].shipaddress + '</p></li>'
    }
    if (valuePresent(data.data[0].carrier)) {
        var carrier = '<li>SHIPPING CARRIER<p>' + data.data[0].carrier + '</p></li>'
    }
    if (valuePresent(data.data[0].shipmethod)) {
        shipmethod = '<li>SHIPPING METHOD<p>' + data.data[0].shipmethod + '</p></li>'
    }
    if (valuePresent(data.data[0].shipdate)) {
        shipdate = '<li>SHIP DATE<p>' + data.data[0].shipdate + '</p></li>'
    }
    if (valuePresent(data.data[0].scheduled_custbody_lp_shipping_arrival_date)) {
        custbody_lp_shipping_arrival_date = '<li>SHIP DATE<p>' + data.data[0].scheduled_custbody_lp_shipping_arrival_date + '</p></li>'
    }
    if (valuePresent(data.data[0].shippingcost)) {
        shippingcost = '<li>ESTIMATED SHIPPING COST<p>' + data.data[0].shippingcost + '</p></li>'
    }


    var card =
        '<div class="card" style="margin-top: 30px;">\
        <div class="image">\
            <img src="https://cdn.onlinewebfonts.com/svg/img_412338.png">\
        </div>\
        <div class="content">\
            <div class="header">Shipping Information</div>\
            <div class="meta">\
                <a></a>\
            </div>\
            <div class="description">\
                <ul class="ui sub header" style="list-style: none;">'
        + shipaddress
        + carrier
        + shipmethod
        + shipdate
        + custbody_lp_shipping_arrival_date
        + shippingcost +
        '</ul>\
            </div>\
        </div>\
    </div>';
    return card;
};

function appendStatus(data) {
    //shipping

    //1 job hold == job issues or entity request
    //2 stock status == Stock:Available or Stock:issue:unresolved or stock:issue:resolved
    //3 artwork setup status == completed or processing or revising or issue or transferred or pending or transfer
    //4 approval request status == revision requested or pending request or pending response
    //5 payment status == net terms or on file or received or pending request or pending response

    //6 disclaimer about shipping dates and delays per revisions
    //7 Awaiting review text about this status, link to job preview page , info on billing 
    //8 Qued for printing
    //9 qued for revison 
    //10 stock issue
    //11 art issue

    /*
    <custbody_lp_custbody_lp_status_approval_request_request>4</custbody_lp_custbody_lp_status_approval_request_request> production is approval request status list and value 1 approved 2 revision requsted 3 pending request 4 pending response
    <custbody_lp_custbody_lp_status_artwork_setup_setup>1</custbody_lp_custbody_lp_status_artwork_setup_setup> production is artwork setup status list and 1 completed 2 processing 3 revisiong 4 issue 5 transferred 6 pending transfer
    <custbody_lp_custbody_lp_status_payment>5</custbody_lp_custbody_lp_status_payment> productio is payment status list and values 1 netterms 2 on file 3 received 4 pending request 5 pending response 6 no entity 7 credit card 
    <custbody_lp_custbody_lp_status_stock>1</custbody_lp_custbody_lp_status_stock> production is stock status and values 1 stock:available 2 stock:issue:unresolved 3 stock:issue resolved 
    */

    var custbody_lp_status_stock = "";
    var custbody_lp_status_artwork_setup = "";
    var custbody_lp_status_payment = "";
    var custbody_lp_status_approval_request = "";


    if (valuePresent(data.data[0].custbody_lp_status_stock)) {
        //1 stock:available 2 stock:issue:unresolved 3 stock:issue resolved
        switch (data.data[0].custbody_lp_status_stock) {
            case "1":
                custbody_lp_status_stock = '<li>STATUS STOCK<p> We have the stock to fulfill your order. </p></li>'
                break;
            case "2":
                custbody_lp_status_stock = '<li>STATUS STOCK<p> We have unresolved stock issues. If</p></li>'
                break;
            case "3":
                custbody_lp_status_stock = '<li>STATUS STOCK<p> We have resolved stock issues</p></li>'
                break;
            default:
        };
    }
    if (valuePresent(data.data[0].custbody_lp_status_artwork_setup)) {
        //1 completed 2 processing 3 revisiong 4 issue 5 transferred 6 pending transfer
        switch (data.data[0].custbody_lp_status_artwork_setup) {
            case "1":
                custbody_lp_status_artwork_setup = '<li>STATUS ARTWORK<p>Artwork is complete</p></li>'
                break;
            case "2":
                custbody_lp_status_artwork_setup = '<li>STATUS ARTWORK<p>Artwork being processed</p></li>'
                break;
            case "3":
                custbody_lp_status_artwork_setup = '<li>STATUS ARTWORK<p>ArtWork being revised</p></li>'
                break;
            case "4":
                custbody_lp_status_artwork_setup = '<li>STATUS ARTWORK<p>Artwork issues</p></li>'
                break;
            case "5":
                custbody_lp_status_artwork_setup = '<li>STATUS ARTWORK<p>transferred</p></li>'
                break;
            case "6":
                custbody_lp_status_artwork_setup = '<li>STATUS ARTWORK<p>pending transfer</p></li>'
                break;
            default:
        };
    }
    if (valuePresent(data.data[0].custbody_lp_status_payment)) {
        //1 netterms 2 on file 3 received 4 pending request 5 pending response 6 no entity 7 credit card
        switch (data.data[0].custbody_lp_status_artwork_setup) {
            case "1":
                custbody_lp_status_payment = '<li>STATUS PAYMENT<p>Net Terms</p></li>'
                break;
            case "2":
                custbody_lp_status_payment = '<li>STATUS PAYMENT<p>On File</p></li>'
                break;
            case "3":
                custbody_lp_status_payment = '<li>STATUS PAYMENT<p>Received</p></li>'
                break;
            case "4":
                custbody_lp_status_payment = '<li>STATUS PAYMENT<p>Pending Request</p></li>'
                break;
            case "5":
                custbody_lp_status_payment = '<li>STATUS PAYMENT<p>Pending Response</p></li>'
                break;
            case "6":
                custbody_lp_status_payment = '<li>STATUS PAYMENT<p>No entity</p></li>'
                break;
            case "7":
                custbody_lp_status_payment = '<li>STATUS PAYMENT<p>Credit Card</p></li>'
                break;
            default:
        };
    }
    if (valuePresent(data.data[0].custbody_lp_status_approval_request)) {
        //1 approved 2 revision requsted 3 pending request 4 pending response
        switch (data.data[0].custbody_lp_status_approval_request) {
            case "1":
                custbody_lp_status_approval_request = '<li>STATUS APPROVAL<p>Approved</p></li>'
                break;
            case "2":
                custbody_lp_status_approval_request = '<li>STATUS APPROVAL<p>Revision Requested</p></li>'
                break;
            case "3":
                custbody_lp_status_approval_request = '<li>STATUS APPROVAL<p>Pending Request</p></li>'
                break;
            case "4":
                custbody_lp_status_approval_request = '<li>STATUS APPROVAL<p>Pending Response</p></li>'
                break;
            default:
        };
    }


    var card =
        '<div class="card" style="margin-top: 30px;">\
        <div class="image">\
            <img src="https://cdn.onlinewebfonts.com/svg/img_148079.png">\
        </div>\
        <div class="content">\
            <div class="header">Status of Order</div>\
            <div class="meta">\
                <a></a>\
            </div>\
            <div class="description">\
                <ul class="ui sub header" style="list-style: none;">'
        + custbody_lp_status_stock
        + custbody_lp_status_artwork_setup
        + custbody_lp_status_payment
        + custbody_lp_status_approval_request +
        '</ul>\
            </div>\
        </div>\
    </div>';
    return card;
};

console.log(document.querySelectorAll('.displaynone .dcLoginCartBarName')[0].innerText);