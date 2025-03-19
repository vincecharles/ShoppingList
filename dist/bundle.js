/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./Shopping-List/script.js":
/*!*********************************!*\
  !*** ./Shopping-List/script.js ***!
  \*********************************/
/***/ (() => {

eval("const itemForm = document.getElementById('item-form');\r\nconst itemInput = document.getElementById('item-input');\r\nconst itemList = document.getElementById('item-list');\r\nconst clearBtn = document.getElementById('clear');\r\nconst itemFilter = document.getElementById('filter');\r\nconst formBtn = itemForm.querySelector('button');\r\n\r\nlet isEditMode = false;\r\n\r\nfunction displayItems() {\r\n  const itemsFromStorage = getItemsFromStorage();\r\n  itemsFromStorage.forEach((item) => addItemToDOM(item)); checkUI();\r\n}\r\n\r\nfunction onAddItemSubmit(e) {\r\n  e.preventDefault();\r\n\r\n  const newItem = itemInput.value;\r\n\r\n  if (itemInput.value === '') {\r\n    alert('Please enter a value');\r\n    return;\r\n  }\r\n\r\n  if (isEditMode) {\r\n    const itemToEdit = itemList.querySelector('.edit-mode');\r\n  \r\n    removeItemFromStorage(itemToEdit.textContent);\r\n    itemToEdit.classList.remove('edit-mode');\r\n    itemToEdit.remove();\r\n    isEditMode = false;\r\n    }\r\n\r\n    addItemToDOM(newItem);\r\n\r\n    addItemToStorage(newItem);\r\n\r\n    checkUI();\r\n    itemInput.value = '';\r\n}\r\n\r\nfunction addItemToDOM(item) {\r\n\r\n  const li = document.createElement('li');\r\n  li.appendChild(document.createTextNode(item));\r\n\r\n\r\n    const button = createButton('remove-item btn-link text-red');\r\n\r\n  li.appendChild(button);\r\n\r\n  itemList.appendChild(li);\r\n}\r\n\r\nfunction createButton(classes) {\r\n    const button = document.createElement('button');\r\n    button.className = classes;\r\n\r\n    const icon = createIcon('fa-solid fa-trash-alt');\r\n    button.appendChild(icon);\r\n    return button;\r\n}\r\n\r\nfunction createIcon(classes) {\r\n    const icon = document.createElement('i');\r\n    icon.className = classes;\r\n    return icon;\r\n}\r\n\r\nfunction addItemToStorage(item) {\r\n  const itemsFromStorage = getItemsFromStorage();\r\n  \r\n  itemsFromStorage.push(item);\r\n\r\n  localStorage.setItem('items', JSON.stringify(itemsFromStorage));\r\n}\r\n\r\nfunction getItemsFromStorage() {\r\n    let itemsFromStorage;\r\n\r\n    if (localStorage.getItem('items') === null) {\r\n        itemsFromStorage = [];\r\n        } else {\r\n        itemsFromStorage = JSON.parse(localStorage.getItem('items'));\r\n        }\r\n    return itemsFromStorage;\r\n}\r\n\r\nfunction onClickItem(e) {\r\n    if (e.target.parentElement.classList.contains('remove-item')) {\r\n    removeItem(e.target.parentElement.parentElement);\r\n    } else {\r\n    setItemtoEdit(e.target);\r\n    }\r\n}\r\n\r\nfunction setItemtoEdit(item) {\r\n  isEditMode = true;\r\n\r\n  itemList\r\n    .querySelectorAll('li')\r\n    .forEach((i) => i.classList.remove('edit-mode'));\r\n  \r\n  formBtn.innerHTML = '<i class=\"fa-solid fa-pen\"></i> Update Item'; \r\n\r\n  itemInput.value = item.textContent;\r\n\r\n  formBtn.style.backgroundColor = '#f8d7da';\r\n\r\n  item.classList.add('edit-mode');\r\n}\r\n\r\nfunction removeItem(item) {\r\n    if (confirm('Are you sure?')) {\r\n    item.remove();\r\n  removeItemFromStorage(item.textContent);\r\n\r\n  checkUI();\r\n    }\r\n}\r\n\r\nfunction removeItemFromStorage(item) {\r\n    let itemsFromStorage = getItemsFromStorage();\r\n    \r\n    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);\r\n\r\n    localStorage.setItem('items', JSON.stringify(itemsFromStorage));\r\n}\r\n\r\nfunction clearItems() {\r\n    while (itemList.firstChild) {\r\n    itemList.removeChild(itemList.firstChild);\r\n    }\r\n\r\n    localStorage.removeItem('items');\r\n    checkUI();\r\n}\r\n\r\nfunction filterItems(e) {\r\n    const items = itemList.querySelectorAll('li');\r\n    const text = e.target.value.toLowerCase();\r\n\r\n    itemList.forEach((item) => {\r\n    const itemName = item.firstChild.textContent.toLowerCase();\r\n\r\n    if (itemName.indexOf(text) !== -1) {\r\n        item.style.display = 'flex';\r\n    } else {\r\n        item.style.display = 'none';\r\n    }\r\n    });\r\n}\r\n\r\nfunction checkUI() {\r\n    itemInput.value = '';\r\n    const items = itemList.querySelectorAll\r\n    ('li');\r\n\r\n    if (items.length === 0) {\r\n        clearBtn.style.display = 'none';\r\n        itemFilter.style.display = 'none';\r\n    } else {\r\n        clearBtn.style.display = 'block';\r\n        itemFilter.style.display = 'block';\r\n    }\r\n\r\n    formBtn.innerHTML = '<i class =\"fa-solid fa-plus\"></i>Add Item';\r\n    formBtn.style.backgroundColor = '#007bff';\r\n\r\n    isEditMode = false;\r\n}\r\n\r\nfunction init() {\r\n\r\n    itemForm.addEventListener('submit', onAddItemSubmit);\r\n    itemList.addEventListener('click', onClickItem);\r\n    clearBtn.addEventListener('click', clearItems);\r\n    itemFilter.addEventListener('keyup', filterItems);\r\n    document.addEventListener('DOMContentLoaded', displayItems);\r\n\r\n    checkUI();\r\n}\r\n\r\ninit();\n\n//# sourceURL=webpack://shopping-list/./Shopping-List/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./Shopping-List/script.js"]();
/******/ 	
/******/ })()
;