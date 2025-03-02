let bag_items=[];
let bagItemsStr=localStorage.getItem('bagItems');
if(bagItemsStr) bag_items=JSON.parse(bagItemsStr);
else bag_items=[];

function itemContainer_inner(item){
    return `
            <div class="item-container">
                <img class="item-image" src="${item.item_image}" alt="sneaker">
                <div class="rating">
                    ${item.rating.stars}⭐ | ${item.rating.reviews}
                </div>
                <div class="company">
                    ${item.company}
                </div>
                <div class="item">
                    ${item.item_name}
                </div>
                <div class="price">
                    <span class="current-price">Rs. ${item.current_price}</span>
                    <span class="original-price">Rs. ${item.org_price}</span>
                    <span class="discount">(${item.discount}% off)</span>
                </div>
                <button class="add-bag" onclick="add_btn(${item.id}); displayBagItems(); ">Add to Bag</button>
        </div>`;
}

displayBagItems();
itemsDisplay();
function itemsDisplay(){
    let inner_html='';
    let itemsConEle=document.querySelector('.items-container');
    if(!itemsConEle) return;
    items.forEach(function(item,index){
    
        inner_html += itemContainer_inner(item);
    });
    itemsConEle.innerHTML=inner_html;
}


function add_btn(itemID){
    bag_items.push(itemID);
    localStorage.setItem('bagItems',JSON.stringify(bag_items));
}

function displayBagItems(){
    let count= document.querySelector(".bag-item-count");
    count.innerText= bag_items.length;
    if(bag_items.length>0) count.style.visibility="visible";
}




let priceArr=[];
let itemSorted=[];
extractPrice();
extractiemsFrom_prices();
function extractPrice(){
    items.forEach(function(item){
        priceArr.push(item.current_price);
    });
    priceArr.sort((a,b)=>a-b);
}
function extractiemsFrom_prices(){
    priceArr.forEach(function(value){
        for(let i=0; i<items.length;i++){
            if(value==items[i].current_price) 
                itemSorted.push(items[i]);
        }
    });
}

function sortDisplay(){
    let inner_html='';
    let itemsConEle=document.querySelector('.items-container');
    if(!itemsConEle) return;
    itemSorted.forEach(function(item,index){
        inner_html += itemContainer_inner(item);
    });
    itemsConEle.innerHTML=inner_html;
}

