let bagItemObjs=[];
let totalItem,totalMRP,totalDiscount,finalPayment;
extractIDs();
checkOutItems();
extractCheckOutItemsValue();


function extractIDs(){
    bag_items.forEach(function(value){
        for(let i=0; i<items.length;i++){
            if(value==items[i].id) 
                bagItemObjs.push(items[i]);
        }
    });
}

function checkOutItems(){
    let innerHtml='';
    bagItemObjs.forEach(function(item){
        innerHtml += bagItems_Container(item);
    });
    document.querySelector('.bag-items-container').innerHTML=innerHtml;
}

function removeFromBag(itemId){
    bag_items=bag_items.filter(bagItemId => bagItemId != itemId);
    // function checkBagItem(bagItemId) {
    //   if (bagItemId != itemId) {
    //       return true;  // Keep this item
    //   } else {
    //       return false; // Remove this item
    //   }
    // }
    // bag_items = bag_items.filter(checkBagItem);

    // let index=bag_items.indexOf(itemId);
    // bag_items=bag_items.splice(index,0);
    localStorage.setItem('bagItems',JSON.stringify(bag_items));
    // bag_items=JSON.parse(localStorage.getItem('bagItems'));
    bagItemObjs=[];
    extractIDs();
    checkOutItems();
    displayBagItems();
    extractCheckOutItemsValue();
}

function bagItems_Container(item){
  return `<div class="bag-item-container">
        <div class="item-left-part">
          <img class="bag-item-img" src="../${item.item_image}">
        </div>
        <div class="item-right-part">
          <div class="company">${item.company}</div>
          <div class="item-name">${item.item_name}</div>
          <div class="price-container">
            <span class="current-price">Rs ${item.current_price}</span>
            <span class="original-price">Rs ${item.org_price}</span>
            <span class="discount-percentage">(${item.discount}% OFF)</span>
          </div>
          <div class="return-period">
            <span class="return-period-days">${item.return_period} days</span> return available
          </div>
          <div class="delivery-details">
            Delivery by
            <span class="delivery-details-days">${item.delivery_date}</span>
          </div>
        </div>
        <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
      </div>`;
}

function bag_summery(totalItem,totalMRP,totalDiscount,finalPayment){
  return `<div class="bag-details-container">
                    <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
                    <div class="price-item">
                      <span class="price-item-tag">Total MRP</span>
                      <span class="price-item-value">₹${totalMRP}</span>
                    </div>
                    <div class="price-item">
                      <span class="price-item-tag">Discount on MRP</span>
                      <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
                    </div>
                    <div class="price-item">
                      <span class="price-item-tag">Convenience Fee</span>
                      <span class="price-item-value">₹99</span>
                    </div>
                    <hr>
                    <div class="price-footer">
                      <span class="price-item-tag">Total Amount</span>
                      <span class="price-item-value">₹${finalPayment}</span>
                    </div>
                  </div>
                  <button class="btn-place-order">
                    <div class="css-xjhrni">PLACE ORDER</div>
                  </button>`;
}

function extractCheckOutItemsValue(){
  totalMRP=0;
  totalItem= bagItemObjs.length;
  bagItemObjs.forEach(function(item){
    totalMRP += item.org_price;
  });
  let currentMRP=0;
  bagItemObjs.forEach(function(item){
    currentMRP += item.current_price;
  });
  totalDiscount= totalMRP-currentMRP;
  finalPayment=totalMRP-totalDiscount+99;
  document.querySelector('.bag-summary').innerHTML=bag_summery(totalItem,totalMRP,totalDiscount,finalPayment);
}