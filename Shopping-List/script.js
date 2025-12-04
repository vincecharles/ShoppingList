const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const categorySelect = document.getElementById('category-select');
const categoryFilterSelect = document.getElementById('category-filter-select');
const itemList = document.getElementById('item-list');
const checkedList = document.getElementById('checked-list');
const checkedSection = document.getElementById('checked-section');
const clearBtn = document.getElementById('clear');
const clearCheckedBtn = document.getElementById('clear-checked');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');

let isEditMode = false;

// Categories list
const categories = [
  'Fruits & Vegetables',
  'Dairy & Eggs',
  'Meat & Seafood',
  'Bakery & Bread',
  'Frozen Foods',
  'Canned & Jarred Goods',
  'Grains, Pasta & Rice',
  'Snacks & Chips',
  'Beverages',
  'Condiments & Sauces',
  'Spices & Seasonings',
  'Breakfast & Cereal',
  'Deli & Prepared Foods',
  'Health & Wellness',
  'Baby Products',
  'Pet Supplies',
  'Household & Cleaning',
  'Personal Care',
  'Paper & Plastic Products',
  'Baking Supplies',
  'Oils & Vinegars',
  'Nuts & Dried Fruits',
  'Candy & Sweets',
  'Coffee & Tea',
  'Alcohol & Wine',
  'International Foods',
  'Organic & Natural',
  'Gluten-Free',
  'Other'
];

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  
  const checkedFromStorage = getCheckedFromStorage();
  checkedFromStorage.forEach((item) => addCheckedItemToDOM(item));
  
  populateCategoryFilter();
  checkUI();
}

function populateCategoryFilter() {
  const itemsFromStorage = getItemsFromStorage();
  const usedCategories = [...new Set(itemsFromStorage.map(item => item.category).filter(Boolean))];
  
  categoryFilterSelect.innerHTML = '<option value="">All Categories</option>';
  usedCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilterSelect.appendChild(option);
  });
}

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItemName = itemInput.value.trim();
  const selectedCategory = categorySelect.value;

  if (newItemName === '') {
    alert('Please enter an item name');
    return;
  }

  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');
    const oldItemData = {
      name: itemToEdit.querySelector('.item-name').textContent,
      category: itemToEdit.dataset.category || ''
    };
    removeItemFromStorage(oldItemData);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  }

  const newItem = {
    name: newItemName,
    category: selectedCategory
  };

  // Check for duplicates
  const existingItems = getItemsFromStorage();
  const isDuplicate = existingItems.some(item => 
    item.name.toLowerCase() === newItemName.toLowerCase()
  );

  if (isDuplicate && !isEditMode) {
    alert('This item already exists in your list!');
    return;
  }

  addItemToDOM(newItem);
  addItemToStorage(newItem);
  populateCategoryFilter();
  checkUI();
  
  itemInput.value = '';
  categorySelect.value = '';
}

function addItemToDOM(item) {
  const li = document.createElement('li');
  li.dataset.category = item.category || '';
  
  // Create item content container
  const itemContent = document.createElement('div');
  itemContent.className = 'item-content';
  
  // Item name
  const itemName = document.createElement('span');
  itemName.className = 'item-name';
  itemName.textContent = item.name;
  itemContent.appendChild(itemName);
  
  // Category badge
  if (item.category) {
    const categoryBadge = document.createElement('span');
    categoryBadge.className = 'category-badge';
    categoryBadge.textContent = item.category;
    itemContent.appendChild(categoryBadge);
  }
  
  li.appendChild(itemContent);
  
  // Buttons container
  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'item-buttons';
  
  // Check button
  const checkBtn = document.createElement('button');
  checkBtn.className = 'check-item btn-link text-green';
  checkBtn.title = 'Mark as Checked';
  checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  buttonsDiv.appendChild(checkBtn);
  
  // Remove button
  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-item btn-link text-red';
  removeBtn.title = 'Remove Item';
  removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  buttonsDiv.appendChild(removeBtn);
  
  li.appendChild(buttonsDiv);
  itemList.appendChild(li);
}

function addCheckedItemToDOM(item) {
  const li = document.createElement('li');
  li.className = 'checked-item';
  li.dataset.category = item.category || '';
  
  // Create item content container
  const itemContent = document.createElement('div');
  itemContent.className = 'item-content';
  
  // Item name
  const itemName = document.createElement('span');
  itemName.className = 'item-name';
  itemName.textContent = item.name;
  itemContent.appendChild(itemName);
  
  // Category badge
  if (item.category) {
    const categoryBadge = document.createElement('span');
    categoryBadge.className = 'category-badge';
    categoryBadge.textContent = item.category;
    itemContent.appendChild(categoryBadge);
  }
  
  li.appendChild(itemContent);
  
  // Buttons container
  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'item-buttons';
  
  // Uncheck button
  const uncheckBtn = document.createElement('button');
  uncheckBtn.className = 'uncheck-item btn-link text-orange';
  uncheckBtn.title = 'Move back to list';
  uncheckBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i>';
  buttonsDiv.appendChild(uncheckBtn);
  
  // Remove button
  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-checked btn-link text-red';
  removeBtn.title = 'Remove Item';
  removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  buttonsDiv.appendChild(removeBtn);
  
  li.appendChild(buttonsDiv);
  checkedList.appendChild(li);
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}

function addCheckedToStorage(item) {
  const checkedFromStorage = getCheckedFromStorage();
  checkedFromStorage.push(item);
  localStorage.setItem('checkedItems', JSON.stringify(checkedFromStorage));
}

function getCheckedFromStorage() {
  let checkedFromStorage;
  if (localStorage.getItem('checkedItems') === null) {
    checkedFromStorage = [];
  } else {
    checkedFromStorage = JSON.parse(localStorage.getItem('checkedItems'));
  }
  return checkedFromStorage;
}

function onClickItem(e) {
  const target = e.target;
  const li = target.closest('li');
  
  if (!li) return;
  
  if (target.closest('.check-item')) {
    checkItem(li);
  } else if (target.closest('.remove-item')) {
    removeItem(li);
  } else if (target.closest('.item-content')) {
    setItemtoEdit(li);
  }
}

function onClickCheckedItem(e) {
  const target = e.target;
  const li = target.closest('li');
  
  if (!li) return;
  
  if (target.closest('.uncheck-item')) {
    uncheckItem(li);
  } else if (target.closest('.remove-checked')) {
    removeCheckedItem(li);
  }
}

function checkItem(li) {
  const itemData = {
    name: li.querySelector('.item-name').textContent,
    category: li.dataset.category || ''
  };
  
  // Remove from active list
  removeItemFromStorage(itemData);
  li.remove();
  
  // Add to checked list
  addCheckedToStorage(itemData);
  addCheckedItemToDOM(itemData);
  
  populateCategoryFilter();
  checkUI();
}

function uncheckItem(li) {
  const itemData = {
    name: li.querySelector('.item-name').textContent,
    category: li.dataset.category || ''
  };
  
  // Remove from checked list
  removeCheckedFromStorage(itemData);
  li.remove();
  
  // Add back to active list
  addItemToStorage(itemData);
  addItemToDOM(itemData);
  
  populateCategoryFilter();
  checkUI();
}

function setItemtoEdit(li) {
  isEditMode = true;

  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));
  
  const itemName = li.querySelector('.item-name').textContent;
  const itemCategory = li.dataset.category || '';
  
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'; 
  itemInput.value = itemName;
  categorySelect.value = itemCategory;
  formBtn.style.backgroundColor = '#ffc107';
  li.classList.add('edit-mode');
}

function removeItem(li) {
  if (confirm('Are you sure you want to remove this item?')) {
    const itemData = {
      name: li.querySelector('.item-name').textContent,
      category: li.dataset.category || ''
    };
    li.remove();
    removeItemFromStorage(itemData);
    populateCategoryFilter();
    checkUI();
  }
}

function removeCheckedItem(li) {
  if (confirm('Are you sure you want to remove this item?')) {
    const itemData = {
      name: li.querySelector('.item-name').textContent,
      category: li.dataset.category || ''
    };
    li.remove();
    removeCheckedFromStorage(itemData);
    checkUI();
  }
}

function removeItemFromStorage(itemData) {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage = itemsFromStorage.filter((i) => 
    i.name !== itemData.name
  );
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function removeCheckedFromStorage(itemData) {
  let checkedFromStorage = getCheckedFromStorage();
  checkedFromStorage = checkedFromStorage.filter((i) => 
    i.name !== itemData.name
  );
  localStorage.setItem('checkedItems', JSON.stringify(checkedFromStorage));
}

function clearItems() {
  if (confirm('Are you sure you want to clear all items?')) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
    localStorage.removeItem('items');
    populateCategoryFilter();
    checkUI();
  }
}

function clearCheckedItems() {
  if (confirm('Are you sure you want to clear all checked items?')) {
    while (checkedList.firstChild) {
      checkedList.removeChild(checkedList.firstChild);
    }
    localStorage.removeItem('checkedItems');
    checkUI();
  }
}

function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.querySelector('.item-name').textContent.toLowerCase();
    if (itemName.indexOf(text) !== -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function filterByCategory(e) {
  const selectedCategory = e.target.value;
  const items = itemList.querySelectorAll('li');

  items.forEach((item) => {
    if (selectedCategory === '' || item.dataset.category === selectedCategory) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function checkUI() {
  itemInput.value = '';
  const items = itemList.querySelectorAll('li');
  const checkedItems = checkedList.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }

  if (checkedItems.length === 0) {
    checkedSection.style.display = 'none';
  } else {
    checkedSection.style.display = 'block';
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';
  isEditMode = false;
}

function init() {
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  checkedList.addEventListener('click', onClickCheckedItem);
  clearBtn.addEventListener('click', clearItems);
  clearCheckedBtn.addEventListener('click', clearCheckedItems);
  itemFilter.addEventListener('keyup', filterItems);
  categoryFilterSelect.addEventListener('change', filterByCategory);
  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();
}

init();