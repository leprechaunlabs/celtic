window.addEventListener("load", function () {
    //$("#orderStatusDisplayID").append("<div class='ui four column doubling stackable grid container'><div class='row'><div class='column'> '<ul style='list-style: none;'><p class='OrderStatusInformation'>Order Numbers</p><li>JOB NUMBER</li><li>TRANSACTION NUMBER</li><li>PO NUMBER</li><li>ORDER DATE</li><li>CUSTOMER</li><br><p class='OrderStatusInformation'>Cost Summary</p><li>SUBTOTAL</li><li>TAX TOTAL</li><li>ESTIMATED SHIPPING COST</li><li>HANDLING COST</li><li>TOTAL</li><br><p class='OrderStatusInformation'>Shipping Information</p><li>SHIP TO:</li><li>SHIPPING CARRIER</li><li>SHIPPING METHOD</li><li>SHIP DATE</li><li>SCHEDULED ARRIVAL DATE</li><li>CHARGE SHIPPING TO:</li><li>RECIPIENT SHIPPING</li><li>CUSTOMER SHIPPING</li><li>ESTIMATED SHIPPING COST</li><li>TOTAL LESS SHIPPING & HANDLING COST</li><br><p class='OrderStatusInformation'>Imprint Information</p><li>APPROVAL EMAIL</li><li>Production Setup</li><li>IMPRINT TYPE</li><li>IMPRINT SIZING</li><li>Special Instructions</li><li>PACKING</li><br> <p class='OrderStatusInformation'>Item Information</p><li>ITEM ORDERED</li><li>UNITS</li><li>DESCRIPTION</li><li>PRICE LEVEL</li><li>NET COST</li><li>AMOUNT</li><li>TAX CODE</li><li>TAX RATE</li><li>ORDER PRIORITY</li><li>PMS COLOR</li></ul><div class='actions'></div>'</div></div></div>");
//appending.forEach(element=>$("#orderStatusDisplayID").append(element)); 
appending.forEach(element=>$("#orderStatusDisplayID").append(element));

});
var appendOrderNumbers ='<div class="ui card" style="margin:20px;">\
    <div class="content">\
        <div class="header">Order Numbers</div>\
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


var appendCostSummary ='<div class="ui card" style="margin:20px;">\
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


var appendShippingInformation ='<div class="ui card" style="margin:20px;">\
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

var appendImprintInformation ='<div class="ui card" style="margin:20px;">\
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

var appendItemInformation ='<div class="ui card" style="margin:20px;">\
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
var appending = [appendOrderNumbers, appendCostSummary, appendShippingInformation, appendImprintInformation, appendItemInformation];
