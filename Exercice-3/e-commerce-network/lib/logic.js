/**
 * Record a request to purchase
 * @param {org.acme.sintegralabsbc.SaleTransaction} purchase - the order to be processed
 * @transaction
 */
function SaleTransaction(saleTransaction) {
 
    var buyer = saleTransaction.owner ;
    var seller = saleTransaction.newOwner;
  
  	if( buyer.price != seller.price){
      throw new error ('Insufficient funds!')
    }
  
  	var SellerId=seller.customerId;
  	var BuyerId=buyer.customerId;
  
  	buyer.customerId = SellerId;
  	seller.customerId = BuyerId;
  
  	 return getAssetRegistry('org.acme.sintegralabsbc.Product')
        .then(function (buyerRegistry) {
            return buyerRegistry.update(buyer);
        })
        .then(function () {
            return getAssetRegistry('org.acme.sintegralabsbc.Product')
        }).then (function (sellerRegistry) {
            return sellerRegistry.update(seller);
        });
}