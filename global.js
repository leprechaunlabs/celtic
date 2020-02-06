var netsuiteURL = "https://4976131-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=391&deploy=1&compid=4976131_SB1&h=bc0412cde19c51afd168";
var corsHerokuURL = "https://cors-anywhere.herokuapp.com/";

$("#button-order-status-modal").click(function () {
    $.getJSON(corsHerokuURL + netsuiteURL, jobNumberOBJ(), function (data, textStatus, jqXHR) {
        console.log(data);
        //console.log(jqXHR);
        $(".modal").empty();
        document.getElementById('input-job-number').value = "";
        var appending = [appendOrderNumbers(data), appendCostSummary(data), appendShippingInformation(data), appendImprintInformation(data), appendItemInformation(data)];
        appending.forEach(element => $(".modal").append(element));
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

function appendOrderNumbers(data) {
    var card = '<div class="ui card" style="margin:20px;">\
    <div class="content">\
        <div class="header">Order Numbers</div>\
    </div>\
    <div class="content">\
        <div class="ui small feed">\
            <div class="event">\
                <div class="content">\
                    <div class="summary">\
                        <ul class="ui sub header" style="list-style: none;">\
                        <li>CUSTOMER:<p>'+ data.data[0].customer + '</p></li>\
                        <li>JOB NUMBER:<p>'+ data.data[0].job_number + '</p></li>\
                        <li>PO NUMBER<p>'+ data.data[0].po_number + '</p></li>\
                        <li>ORDER DATE<p>'+ data.data[0].order_date + '</p></li>\
                        </ul>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
</div>';
    return card;
};

function appendCostSummary(data) {
    var card = '<div class="ui card" style="margin:20px;">\
    <div class="content">\
        <div class="header">Cost Summary</div>\
    </div>\
    <div class="content">\
        <div class="ui small feed">\
            <div class="event">\
                <div class="content">\
                    <div class="summary">\
                        <ul class="ui sub header" style="list-style: none;">\
                        <li>SUBTOTAL<p>'+ data.data[0].subtotal + '</p></li>\
            			<li>TAX TOTAL<p>'+ data.data[0].tax_total + '</p></li>\
            			<li>ESTIMATED SHIPPING COST<p>'+ data.data[0].estimated_shipping_cost + '</p></li>\
           				<li>HANDLING COST<p>'+ data.data[0].handling_cost + '</p></li>\
            			<li>TOTAL<p>'+ data.data[0].total + '</p></li>\
                        </ul>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
</div>';
    return card;
};

function valuePresent(field) {
    if (field == "" || field ==null) {
        return false;
    }
    return true;
}

function appendShippingInformation(data) {
    var ship_to;
    var shipping_carrier;
    var shipping_method;
    var ship_date;
    var arrival_date;
    var shipping_cost;

    if (valuePresent(data.data[0].ship_to)) {
        var ship_to = '<li>SHIP TO:<p>'+data.data[0].ship_to+'</p></li>'
    }
    if (valuePresent(data.data[0].shipping_carrier)) {
        var shipping_carrier = '<li>SHIPPING CARRIER<p>'+data.data[0].shipping_carrier+'</p></li>'
    }
    if (valuePresent(data.data[0].shipping_method)) {
        shipping_method = '<li>SHIPPING METHOD<p>'+data.data[0].shipping_method+'</p></li>'
    }
    if (valuePresent(data.data[0].ship_date)) {
        ship_date = '<li>SHIP DATE<p>'+data.data[0].ship_date+'</p></li>'
    }
    if (valuePresent(data.data[0].scheduled_arrival_date)) {
        arrival_date = '<li>SHIP DATE<p>'+data.data[0].scheduled_arrival_date+'</p></li>'
    }
    if (valuePresent(data.data[0].estimated_shipping_cost)) {
        shipping_cost = '<li>ESTIMATED SHIPPING COST<p>'+data.data[0].estimated_shipping_cost+'</p></li>'
    }
     
    var card = '<div class="ui card" style="margin:20px;">\
    <div class="content">\
        <div class="header">Shipping Information</div>\
    </div>\
    <div class="content">\
        <div class="ui small feed">\
            <div class="event">\
                <div class="content">\
                    <div class="summary">\
                        <ul class="ui sub header" style="list-style: none;">'+ship_to
                         + shipping_carrier
                         + shipping_method
                         + ship_date
                         + arrival_date
                         + shipping_cost+
                    '</div >\
                </div >\
            </div >\
        </div >\
    </div >\
</div > ';
    return card;
};

function appendImprintInformation(data) {
    var card = '<div class="ui card" style="margin:20px;">\
    <div class="content">\
        <div class="header">Imprint Information</div>\
    </div>\
    <div class="content">\
        <div class="ui small feed">\
            <div class="event">\
                <div class="content">\
                    <div class="summary">\
                        <ul class="ui sub header" style="list-style: none;">\
                        <li>APPROVAL EMAIL</li><li>Production Setup</li>\
                        <li>IMPRINT TYPE</li><li>IMPRINT SIZING</li>\
                        <li>Special Instructions</li><li>PACKING</li>\
                        </ul>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
</div>';
    return card;
};

function appendItemInformation(data) {
    var card = '<div class="ui card" style="margin:20px;">\
    <div class="content">\
        <div class="header">Item Information</div>\
    </div>\
    <div class="content">\
        <div class="ui small feed">\
            <div class="event">\
                <div class="content">\
                    <div class="summary">\
                        <ul class="ui sub header" style="list-style: none;">\
                            <li>JOB NUMBER</li>\
                            <li>TRANSACTION NUMBER</li>\
                            <li>PO NUMBER</li>\
                            <li>ORDER DATE</li>\
                            <li>CUSTOMER</li>\
                        </ul>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
</div>';
    return card;
};









console.log(document.querySelectorAll('.displaynone .dcLoginCartBarName')[0].innerText);