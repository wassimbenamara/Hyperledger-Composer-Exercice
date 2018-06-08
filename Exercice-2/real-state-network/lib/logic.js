/**
 * create an order to purchase
 * @param {org.acme.sintegralabsbc.CreateOrder} purchase - the order to be processed
 * @transaction
 */
function CreateOrder(purchase) {

    purchase.order.buyer = purchase.buyer;
    purchase.order.seller= purchase.seller;
    purchase.order.amount = purchase.amount;
    purchase.order.createdDate = new Date().toISOString();
    purchase.order.status = "Order_Created";

    return getAssetRegistry('org.acme.sintegralabsbc.Order')
        .then(function (assetRegistry) {
            return assetRegistry.update(purchase.order);
        });
}

/**
 * Record a request to purchase
 * @param {org.acme.sintegralabsbc.Buy} purchase - the order to be processed
 * @transaction
 */
function Buy(purchase) {
    
    if (purchase.order.status != "Order_Created"){
    	throw new Error("your order is not created");
    } 

    purchase.order.financeco = purchase.financeco;
    purchase.order.buyer.balance -= purchase.order.amount;
    purchase.order.financeco.balance += purchase.order.amount;
    purchase.order.boughtDate = new Date().toISOString();
    purchase.order.status = "Purchased";

    return getAssetRegistry('org.acme.sintegralabsbc.Order')
        .then(function (assetRegistry) {
            return assetRegistry.update(purchase.order);
        }).then(function () {
            return getParticipantRegistry('org.acme.sintegralabsbc.Buyer')
        }).then (function (buyerRegistry) {
            return buyerRegistry.update(purchase.order.buyer);
        }).then(function () {
            return getParticipantRegistry('org.acme.sintegralabsbc.FinanceCo')
        }).then (function (financeCoRegistry) {
            return financeCoRegistry.update(purchase.order.financeco);
        });
}

 /**
 * Record a request for payment by the seller
 * @param {org.acme.sintegralabsbc.RequestPayment} purchase - the order to be processed
 * @transaction
 */
function RequestPayment(purchase) {
    
    if (purchase.order.status != "Purchased"){
    	throw new Error("your order is not purchased");
    } 

    purchase.order.status = "Payment_Requested";
    purchase.order.paymentRequestedDate = new Date().toISOString();
    
    return getAssetRegistry('org.acme.sintegralabsbc.Order')
        .then(function (assetRegistry) {
            return assetRegistry.update(purchase.order);
        });
}

 /**
 * Record a payment to the seller
 * @param {org.acme.sintegralabsbc.Pay} purchase - the order to be processed
 * @transaction
 */
function Pay(purchase) {
    
    if (purchase.order.status != "Payment_Requested"){
    	throw new Error("your payment is not requested");
    } 
    purchase.order.financeco.balance -= purchase.order.amount;
    purchase.order.seller.balance += purchase.order.amount;
    purchase.order.status = "Paid";
    purchase.order.paidDate = new Date().toISOString();
    
    return getAssetRegistry('org.acme.sintegralabsbc.Order')
        .then(function (assetRegistry) {
            return assetRegistry.update(purchase.order);
        }).then(function () {
            return getParticipantRegistry('org.acme.sintegralabsbc.FinanceCo')
        }).then (function (financeCoRegistry) {
            return financeCoRegistry.update(purchase.order.financeco);
        }).then(function () {
            return getParticipantRegistry('org.acme.sintegralabsbc.Seller')
        }).then (function (sellerCoRegistry) {
            return sellerCoRegistry.update(purchase.order.seller);
        });
}

/**
 * Record a request for payment by the seller
 * @param {org.acme.sintegralabsbc.RentedRequested} purchase - the order to be processed
 * @transaction
 */
function RentedRequested(purchase) {
    
    if (purchase.order.status != "Rented_Requested"){
    	throw new Error("your order is not purchased");
    } 

    purchase.order.status = "Payment_Requested";
    purchase.order.paymentRequestedDate = new Date().toISOString();
    
    return getAssetRegistry('org.acme.sintegralabsbc.Order')
        .then(function (assetRegistry) {
            return assetRegistry.update(purchase.order);
        });
}

/**
 * Record a request for contract by the seller
 * @param {org.acme.sintegralabsbc.ContractRequested} purchase - the order to be processed
 * @transaction
 */
function ContractRequested(purchase) {
    
    if (purchase.order.status != "Contract_Requested"){
    	throw new Error("your order is not purchased");
    } 

    purchase.order.status = "Payment_Requested";
    purchase.order.paymentRequestedDate = new Date().toISOString();
    
    return getAssetRegistry('org.acme.sintegralabsbc.Order')
        .then(function (assetRegistry) {
            return assetRegistry.update(purchase.order);
        });
}

function BreakRequested(purchase) {
    
    if (purchase.order.status != "Break_Contract_Requested"){
    	throw new Error("your order is not purchased");
    } 

    purchase.order.status = "Payment_Requested";
    purchase.order.paymentRequestedDate = new Date().toISOString();
    
    return getAssetRegistry('org.acme.sintegralabsbc.Order')
        .then(function (assetRegistry) {
            return assetRegistry.update(purchase.order);
        });
}
/**
 * @param {org.acme.sintegralabsbc.Exchange} purchase - the order to be processed
 * @transaction
 */
function Exchange(purchase) {
    if (purchase.order.status != "ToExchange"){
    throw new Error("object is not for Exchange");
    }
    purchase.order.status = "Exchange";
    purchase.order.exchangeDate = new Date().toISOString();
return getAssetRegistry('org.acme.sintegralabsbc.Order')
    .then(function (assetRegistry) {
        return assetRegistry.update(purchase.order);
    });
}

function PayRented(purchase) {
    
    if (purchase.order.status != "Payment_Requested"){
    	throw new Error("your payment is not requested");
    } 
    purchase.order.financeco.balance -= purchase.order.amount;
    purchase.order.financeco.balance -= purchase.order.guarantee;
    purchase.order.seller.balance += purchase.order.amount;
    purchase.order.seller.balance += purchase.order.guarantee;
    purchase.order.status = "Paid";
    purchase.order.paidDate = new Date().toISOString();
    
    return getAssetRegistry('org.acme.sintegralabsbc.Order')
        .then(function (assetRegistry) {
            return assetRegistry.update(purchase.order);
        }).then(function () {
            return getParticipantRegistry('org.acme.sintegralabsbc.FinanceCo')
        }).then (function (financeCoRegistry) {
            return financeCoRegistry.update(purchase.order.financeco);
        }).then(function () {
            return getParticipantRegistry('org.acme.sintegralabsbc.Seller')
        }).then (function (sellerCoRegistry) {
            return sellerCoRegistry.update(purchase.order.seller);
        });
}