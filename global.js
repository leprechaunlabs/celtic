var netsuiteURL = "https://4976131-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=391&deploy=1&compid=4976131_SB1&h=bc0412cde19c51afd168";
var corsHerokuURL = "https://cors-anywhere.herokuapp.com/";

$("#button-order-status-modal").click(function () {
    $.getJSON(corsHerokuURL + netsuiteURL, jobNumberOBJ(), function (data, textStatus, jqXHR) {
        console.log(data);
        //console.log(jqXHR);
        $(".modal").empty();
        document.getElementById('input-job-number').value = "";
        var appending = [appendOrderNumbers(data), appendCostSummary(data), appendShippingInformation(data), appendStatus(data), ];
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
function valuePresent(field) {
    if (field == "" || field ==null) {
        return false;
    }
    return true;
}

function appendOrderNumbers(data) {
    var customer="";
    var job_number="";
    var po_number="";
    var order_date="";
    
    if (valuePresent(data.data[0].customer)) {
        customer = '<li>CUSTOMER:<p>'+ data.data[0].customer + '</p></li>'
    }
    if (valuePresent(data.data[0].job_number)) {
        job_number = '<li>JOB NUMBER:<p>'+ data.data[0].job_number + '</p></li>'
    }
    if (valuePresent(data.data[0].po_number )) {
        po_number = '<li>PO NUMBER<p>'+ data.data[0].po_number + '</p></li>'
    }
    if (valuePresent(data.data[0].order_date)) {
        order_date = '<li>ORDER DATE<p>'+ data.data[0].order_date + '</p></li>'
    }

    var card = '<div class="ui card" style="margin:20px;">\
    <div class="content">\
        <div class="header">Order Numbers</div>\
    </div>\
    <div class="content">\
        <div class="ui small feed">\
            <div class="event">\
                <div class="content">\
                    <div class="summary">\
                        <ul class="ui sub header" style="list-style: none;">'
                        +customer
                        +job_number
                        +po_number
                        +order_date+
                        '</ul>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
</div>';
    return card;
};

function appendCostSummary(data) {
    var subtotal="";
    var tax_total="";
    var estimated_shipping_cost="";
    var handling_cost="";
    var total="";
    
    if (valuePresent(data.data[0].subtotal)) {
        subtotal = '<li>SUBTOTAL<p>'+ data.data[0].subtotal + '</p></li>'
    }
    if (valuePresent(data.data[0].tax_total)) {
        tax_total = '<li>TAX TOTAL<p>'+ data.data[0].tax_total + '</p></li>'
    }
    if (valuePresent(data.data[0].estimated_shipping_cost )) {
        estimated_shipping_cost = '<li>ESTIMATED SHIPPING COST<p>'+ data.data[0].estimated_shipping_cost + '</p></li>'
    }
    if (valuePresent(data.data[0].handling_cost)) {
        handling_cost = '<li>HANDLING COST<p>'+ data.data[0].handling_cost + '</p></li>'
    }
    if (valuePresent(data.data[0].total )) {
        total = '<li>TOTAL<p>'+ data.data[0].total + '</p></li>'
    }
    

    var card = '<div class="ui card" style="margin:20px;">\
    <div class="content">\
        <div class="header">Cost Summary</div>\
    </div>\
    <div class="content">\
        <div class="ui small feed">\
            <div class="event">\
                <div class="content">\
                    <div class="summary">\
                        <ul class="ui sub header" style="list-style: none;">'
                        +subtotal
                        +tax_total
                        +estimated_shipping_cost
                        +handling_cost
                        +total+
                        '</ul>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
</div>';
    return card;
};


function appendShippingInformation(data) {
    var ship_to="";
    var shipping_carrier="";
    var shipping_method="";
    var ship_date="";
    var arrival_date="";
    var shipping_cost="";

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

function appendStatus(data) {
    //shipping

    //1 job hold == job issues or customer request
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
    <custbody_lp_status_approval_request>4</custbody_lp_status_approval_request> production is approval request status list and value 1 approved 2 revision requsted 3 pending request 4 pending response
    <custbody_lp_status_artwork_setup>1</custbody_lp_status_artwork_setup> production is artwork setup status list and 1 completed 2 processing 3 revisiong 4 issue 5 transferred 6 pending transfer
    <custbody_lp_status_payment>5</custbody_lp_status_payment> productio is payment status list and values 1 netterms 2 on file 3 received 4 pending request 5 pending response 6 no customer 7 credit card 
    <custbody_lp_status_stock>1</custbody_lp_status_stock> production is stock status and values 1 stock:available 2 stock:issue:unresolved 3 stock:issue resolved 
    */

    var status_stock=""; 
    var status_artwork="";
    var status_payment="";
    var status_approval=""; 
   
    
    if (valuePresent(data.data[0].status_stock )) {
        status_stock = '<li>STATUS STOCK<p>'+ data.data[0].status_stock + '</p></li>'
    }
    if (valuePresent(data.data[0].status_artwork)) {
        status_artwork = '<li>STATUS ARTWORK<p>'+ data.data[0].status_artwork + '</p></li>'
    }
    if (valuePresent(data.data[0].status_payment)) {
        status_payment = '<li>STATUS PAYMENT<p>'+ data.data[0].status_payment+ '</p></li>'
    }
    if (valuePresent(data.data[0].status_approval)) {
        status_approval = '<li>STATUS APPROVAL<p>'+ data.data[0].status_approval+ '</p></li>'
    }
   
    var card = '<div class="ui card" style="margin:20px;">\
    <div class="content">\
    <div class="header">Status of Order</div>\
    </div>\
    <div class="content">\
        <div class="ui small feed">\
            <div class="event">\
                <div class="content">\
                    <div class="summary">\
                        <ul class="ui sub header" style="list-style: none;">'
                            +status_stock
                            +status_artwork
                            +status_payment
                            +status_approval+
                        '</ul>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
</div>';
    return card;
};









console.log(document.querySelectorAll('.displaynone .dcLoginCartBarName')[0].innerText);