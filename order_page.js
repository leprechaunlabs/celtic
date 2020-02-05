
window.addEventListener("load", function () {
    $("#orderStatusDisplayID").empty();
    $.getJSON(corsHerokuURL+netsuiteURL, {"jobNumber":getQueryVariable("job-number")}, function (data, textStatus, jqXHR) {
        console.log(data);
        //console.log(textStatus);
        var appending = [appendOrderNumbers(data), appendCostSummary(data), appendShippingInformation(data), appendImprintInformation(data), appendItemInformation(data)];
        appending.forEach(element => $("#orderStatusDisplayID").append(element));
    });   
});

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

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
                        <li>CUSTOMER:<p>'+data.message[0].customer+'</p></li>\
                        <li>JOB NUMBER:<p>'+data.message[0].job_number+'</p></li>\
                        <li>PO NUMBER<p>'+data.message[0].po_number+'</p></li>\
                        <li>ORDER DATE<p>'+data.message[0].order_date+'</p></li>\
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
                        <li>SUBTOTAL</li>\
            			<li>TAX TOTAL</li>\
            			<li>ESTIMATED SHIPPING COST</li>\
           				<li>HANDLING COST</li>\
            			<li>TOTAL</li>\
                        </ul>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
</div>';
    return card;
};

function appendShippingInformation(data) {
    var card = '<div class="ui card" style="margin:20px;">\
    <div class="content">\
        <div class="header">Shipping Information</div>\
    </div>\
    <div class="content">\
        <div class="ui small feed">\
            <div class="event">\
                <div class="content">\
                    <div class="summary">\
                        <ul class="ui sub header" style="list-style: none;">\
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
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
</div>';
    return card;
};

function appendImprintInformation() {
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

function appendItemInformation() {
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
