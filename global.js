var netsuiteURL = "https://4976131-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=391&deploy=1&compid=4976131_SB1&h=bc0412cde19c51afd168";
var corsHerokuURL = "https://cors-anywhere.herokuapp.com/";

$("#button-order-status-modal").click(function () {
    $(".horizontalCards").empty();
    $("#loader").empty();
    $("#header_modal").empty();
    $("#loader").append(
        '<div class="ui segment"><div class="ui active dimmer" style="height:400px;"><div class="ui massive text loader">Loading</div></div><p></p><p></p><p></p></div>');
    $('.ui.modal')
        .modal('show');
    $.getJSON(corsHerokuURL + netsuiteURL, jobNumberOBJ(), function (data, textStatus, jqXHR) {
        console.log(data);
        $("#header_modal").append("Welcome " + entity(data));
        $(".horizontalCards").empty();
        document.getElementById('input-job-number').value = "";
        $("#loader").empty();
        var appending = [appendOrderNumbers(data), appendCostSummary(data), appendShippingInformation(data), appendStatus(data), status(data)];
        appending.forEach(element => $(".horizontalCards").append(element));
    });
});

function entity(data) {
    var entity = "";
    var str = data.data[0].entity;
    var pattern = /(^\S+\s)/g;
    var entityname = str.replace(pattern, "");
    entity = '<p>' + entityname + '</p>'
    return entity;
};

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
        entity = '<p><b>Customer:</b> ' + entityname + '</p><hr>'
    }
    if (valuePresent(data.data[0].tranid)) {
        tranid = '<p><b>Order Number:</b> ' + data.data[0].tranid + '</p><hr>'
    }
    if (valuePresent(data.data[0].otherrefnum)) {
        otherrefnum = '<p><b>PO Number:</b>' + data.data[0].otherrefnum + '</p><hr>'
    }
    if (valuePresent(data.data[0].saleseffectivedate)) {
        saleseffectivedate = '<p><b>Order Date:</b> ' + data.data[0].saleseffectivedate + '</p><hr>'
    }
    var card =
        '<div class="card" style="width: 400px; font-size:1.5em; margin: 1em 1em 0.5em 1em;">\
    <div class="content">\
        <i class="list alternate outline icon right floated" style="font-size: 1.9em;"></i>\
        <div class="header">\
        Order Numbers\
        </div>\
        <div class="meta">\
            <br>\
        </div>\
        <div class="extra content">\
            <div class="description">'
        + entity
        + tranid
        + otherrefnum
        + saleseffectivedate +
        '</div>\
        </div>\
    </div>\
    <div class="extra content">\
    </div>\
</div>'
    return card;
};

function appendCostSummary(data) {
    var subtotal = "";
    var taxtotal = "";
    var shippingcost = "";
    var handlingcost = "";
    var total = "";

    if (valuePresent(data.data[0].subtotal)) {
        subtotal = '<p><b>Subtotal:</b> $' + data.data[0].subtotal + '</p> <hr>'
    }
    if (valuePresent(data.data[0].taxtotal)) {
        taxtotal = '<p><b>Tax Total:</b> $' + data.data[0].taxtotal + '</p> <hr>'
    }
    if (valuePresent(data.data[0].shippingcost)) {
        shippingcost = '<p><b>Estimated Shipping Cost:</b> $' + data.data[0].shippingcost + '</p> <hr>'
    }
    if (valuePresent(data.data[0].handlingcost)) {
        handlingcost = '<p><b>Handling Cost:</b> $' + data.data[0].handlingcost + '</p> <hr>'
    }
    if (valuePresent(data.data[0].total)) {
        total = '<p><b>Total:</b> $' + data.data[0].total + '</p> <hr>'
    }
    var card =
        '<div class="card" style="width: 400px; font-size:1.5em; margin: 1em 1em 0.5em 1em;">\
    <div class="content">\
        <i class="dollar sign icon right floated" style="font-size: 1.9em;"></i>\
        <div class="header">\
        Cost Summary\
        </div>\
        <div class="meta">\
            <br>\
        </div>\
        <div class="extra content">\
            <div class="description">'
        + subtotal
        + taxtotal
        + shippingcost
        + handlingcost
        + total +
        '</div>\
        </div>\
    </div>\
    <div class="extra content">\
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
        var address = data.data[0].shipaddress.replace(/\n/g, '<br>')
        var shipaddress = '<p><b>Ship To:</b> ' + address + '</p> <hr>'
    }
    if (valuePresent(data.data[0].carrier)) {
        if (data.data[0].carrier.toLowerCase() == "ups") {
            var carrier = '<p><b>Shipping Carrier:</b> <i  style="font-size: 2.5em;" class="ups icon"></i> </p>  <hr> '
        }
        else if (data.data[0].carrier.toLowerCase() == "fedex") {
            var carrier = '<p style="display:inline"><b> Shipping Carrier:</b> </p> <i style="font-size: 2.5em;" class="fedex icon"></i> <hr>'
        }
        else {
            var carrier = '<p><b>Shipping Carrier:</b> ' + data.data[0].carrier + '</p><hr> '
        }

    }
    if (valuePresent(data.data[0].shipmethod)) {
        shipmethod = '<p><b>Shipping Method:</b> ' + data.data[0].shipmethod + '</p> <hr>'
    }
    if (valuePresent(data.data[0].shipdate)) {
        shipdate = '<p><b>Shipping Date:</b> ' + data.data[0].shipdate + '</p> <hr>'
    }
    if (valuePresent(data.data[0].scheduled_custbody_lp_shipping_arrival_date)) {
        custbody_lp_shipping_arrival_date = '<p><b>Estimated Arrival Date:</b> ' + data.data[0].scheduled_custbody_lp_shipping_arrival_date + '</p> <hr>'
    }
    if (valuePresent(data.data[0].shippingcost)) {
        shippingcost = '<p><b>Estimated Shipping Cost:</b> $' + data.data[0].shippingcost + '</p> <hr>'
    }


    var card =
        '<div class="card" style="width: 400px; font-size:1.5em; margin: 1em 1em 0.5em 1em;">\
    <div class="content">\
        <i class="shipping fast icon right floated" style="font-size: 1.9em;"></i>\
        <div class="header">\
            Shipping Information\
        </div>\
        <div class="meta">\
            <br>\
        </div>\
        <div class="extra content">\
            <div class="description">'
        + shipaddress
        + carrier
        + shipmethod
        + shipdate
        + custbody_lp_shipping_arrival_date
        + shippingcost +
        '</div>\
        </div>\
    </div>\
    <div class="extra content">\
    </div>\
</div>'
    return card;
};

function appendStatus(data) {
    var custbody_lp_status_stock = "";
    var custbody_lp_status_artwork_setup = "";
    var custbody_lp_status_payment = "";
    var custbody_lp_status_approval_request = "";
    var custbody_lp_approval_request = "";

    if (valuePresent(data.data[0].custbody_lp_status_artwork_setup)) {
        //1 completed 2 processing 3 revisiong 4 issue 5 transferred 6 pending transfer
        switch (data.data[0].custbody_lp_status_artwork_setup) {
            case "1":
                custbody_lp_status_artwork_setup = '<p><b>Artwork Status:</b></p>\<p> Artwork is complete</p><hr>'//dont show
                break;
            case "2":
                custbody_lp_status_artwork_setup = '<p><b>Artwork Status:</b></p>\<p> Artwork being processed</p><hr>'//dont show
                break;
            case "3":
                custbody_lp_status_artwork_setup = '<p><b>Artwork Status:</b></p>\<p> ArtWork being revised</p><hr>'
                break;
            case "4":
                custbody_lp_status_artwork_setup = '<p><b>Artwork Status:</b></p>\<p> Artwork issues</p><hr>'
                break;
            case "5":
                custbody_lp_status_artwork_setup = '<p><b>Artwork Status:</b></p>\<p> transferred</p><hr>'//dont show
                break;
            case "6":
                custbody_lp_status_artwork_setup = '<p><b>Artwork Status:</b></p>\<p> pending transfer</p><hr>'//dont show
                break;
            default:
        };
    }

    if (valuePresent(data.data[0].custbody_lp_status_stock)) {
        //1 stock:available 2 stock:issue:unresolved 3 stock:issue resolved
        switch (data.data[0].custbody_lp_status_stock) {
            case "1":
                custbody_lp_status_stock = '<p><b>Stock Status:<b></p> <p> We have the stock to fulfill your order.</p><hr>'//dont show
                break;
            case "2":
                custbody_lp_status_stock = '<p><b>Stock Status:<b></p> <p> We have unresolved stock issues.</p><hr>'
                break;
            case "3":
                custbody_lp_status_stock = '<p><b>Stock Status:<b></p> <p> We have resolved stock issues</p><hr>'//dont show
                break;
            default:
        };
    }

    if (valuePresent(data.data[0].custbody_lp_status_payment)) {
        //1 netterms 2 on file 3 received 4 pending request 5 pending response 6 no entity 7 credit card
        switch (data.data[0].custbody_lp_status_artwork_setup) {
            case "1":
                custbody_lp_status_payment = '<p><b>Payment Status:</b></p> <p> Net Terms</p><hr>'
                break;
            case "2":
                custbody_lp_status_payment = '<p><b>Payment Status:</b></p> <p> On File</p><hr>'
                break;
            case "3":
                custbody_lp_status_payment = '<p><b>Payment Status:</b></p> <p> Received</p><hr>'
                break;
            case "4":
                custbody_lp_status_payment = '<p><b>Payment Status:</b></p> <p> Pending Request</p><hr>'
                break;
            case "5":
                custbody_lp_status_payment = '<p><b>Payment Status:</b></p> <p> Pending Response</p><hr>'
                break;
            case "6":
                custbody_lp_status_payment = '<p><b>Payment Status:</b></p> <p> No entity</p><hr>'
                break;
            case "7":
                custbody_lp_status_payment = '<p><b>Payment Status:</b></p> <p> Credit Card</p><hr>'
                break;
            default:
        };
    }
    if (valuePresent(data.data[0].custbody_lp_status_approval_request)) {
        //1 approved 2 revision requsted 3 pending request 4 pending response
        switch (data.data[0].custbody_lp_status_approval_request) {
            case "1":
                custbody_lp_status_approval_request = '<p><b>Approval Status:</b></p><p> Approved</p><hr>' //dont show
                break;
            case "2":
                custbody_lp_status_approval_request = '<p><b>Approval Status:</b></p><p> Revision Requested</p><hr>'
                break;
            case "3":
                custbody_lp_status_approval_request = '<p><b>Approval Status:</b></p> <p> Pending Request</p><hr>'
                break;
            case "4":
                custbody_lp_status_approval_request = '<p><b>Approval Status:</b></p> <p>Pending Response</p><hr>'
                break;
            default:
        };
    }

    if (valuePresent(data.data[0].custbody_lp_approval_request)) {
        custbody_lp_approval_request =
            '<p style="display:inline-block;padding-right:10px;">Approval Link: </p>\<div class="positive ui button">\
                <a style="color: white;"; href="'+ data.data[0].custbody_lp_approval_request + '">Art Approval Request</a>\
             </div>\
        <hr>'
    };

    var card =
        '<div class="card" style="width: 400px; font-size:1.5em; margin: 1em 1em 0.5em 1em;">\
    <div class="content">\
        <i class="tasks icon right floated" style="font-size: 1.9em;"></i>\
        <div class="header">\
            Order Status\
        </div>\
        <div class="meta">\
            <br>\
        </div>\
        <div class="extra content">\
            <div class="description">'
        + custbody_lp_status_stock
        + custbody_lp_status_artwork_setup
        + custbody_lp_status_payment
        + custbody_lp_status_approval_request
        + custbody_lp_approval_request +
        '</div>\
        </div>\
    </div>\
    <div class="extra content"></div>\
</div>'
    return card;
};

function status(data) {
    var status = "Order is Pending";

    if (valuePresent(data.data[0].status.text_status)) { status = data.data[0].status.text_status };
    var card =
        '<div class="card" style="width: 400px; font-size:1.5em; margin: 1em 1em 0.5em 1em;">\
    <div class="content">\
        <i class="tasks icon right floated" style="font-size: 1.9em;"></i>\
        <div class="header">\
            Status\
        </div>\
        <div class="meta">\
            <br>\
        </div>\
        <div class="extra content">\
            <div class="description">'
        + status +
        '</div>\
        </div>\
    </div>\
    <div class="extra content"></div>\
</div>'
    return card;
};